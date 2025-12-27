#!/usr/bin/env node
/**
 * Generate Use Case and BPMN diagrams from requirements-matrix.xlsx
 * Uses custom BPMN renderer (same as v2-dsl.html)
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const MATRIX_FILE = path.join(__dirname, 'requirements-matrix.xlsx');
const OUTPUT_DIR = path.join(__dirname, '..', 'diagrams', 'generated');

// Load Excel
const wb = XLSX.readFile(MATRIX_FILE);
const sheetToJSON = name => XLSX.utils.sheet_to_json(wb.Sheets[name]);

const features = sheetToJSON('Features');
const actors = sheetToJSON('Actors');
const useCases = sheetToJSON('Use Cases');
const bpmnRows = sheetToJSON('BPMN');
const flowRows = sheetToJSON('Flows');

// Parse BPMN sheet
function parseBPMN() {
  const processes = [];
  let currentProcess = null;
  let currentSubprocess = null;

  bpmnRows.forEach(row => {
    const level = (row['Level'] || '').trim();

    if (level === 'Process') {
      currentProcess = {
        id: row['ID'],
        name: row['Name'],
        feature: row['Use Case'],
        tasks: [],
        subprocesses: []
      };
      currentSubprocess = null;
      processes.push(currentProcess);
    }
    else if (level === 'Subprocess' && currentProcess) {
      currentSubprocess = {
        id: row['ID'],
        name: row['Name'],
        tasks: []
      };
      currentProcess.subprocesses.push(currentSubprocess);
    }
    else if (level.includes('Task') && row['ID']) {
      const task = {
        num: String(row['ID']),
        name: row['Name'],
        lane: row['Lane'],
        type: row['Type'] || 'task',
        useCase: row['Use Case']
      };

      const indentLevel = (row['Level'] || '').match(/^\s*/)[0].length;
      if (currentSubprocess && indentLevel >= 4) {
        currentSubprocess.tasks.push(task);
      } else if (currentProcess) {
        currentProcess.tasks.push(task);
      }
    }
  });

  return processes;
}

// Parse flows
function parseFlows() {
  const flowsByProcess = {};
  flowRows.forEach(row => {
    if (!row['Process']) return;
    const procId = row['Process'];
    if (!flowsByProcess[procId]) flowsByProcess[procId] = [];
    flowsByProcess[procId].push({
      from: row['From'],
      to: row['To'],
      type: row['Type']
    });
  });
  return flowsByProcess;
}

const processes = parseBPMN();
const flowsByProcess = parseFlows();

// Create output dirs
fs.mkdirSync(path.join(OUTPUT_DIR, 'use-cases'), { recursive: true });
fs.mkdirSync(path.join(OUTPUT_DIR, 'bpmn'), { recursive: true });

// ============ BPMN DATA STRUCTURE ============
function buildBpmnData(process) {
  const tasks = process.tasks || [];
  const laneNames = [...new Set(tasks.map(t => t.lane).filter(Boolean))];
  const flows = flowsByProcess[process.id] || [];

  // Build lanes
  const lanes = laneNames.map(name => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name.replace(' ', '<br>')
  }));

  // Build nodes with auto x-positioning
  const nodes = [];
  const tasksByLane = {};
  laneNames.forEach(l => tasksByLane[l] = []);
  tasks.forEach(t => {
    if (t.lane && tasksByLane[t.lane]) {
      tasksByLane[t.lane].push(t);
    }
  });

  // First lane gets start/end
  if (laneNames.length > 0) {
    const firstLane = laneNames[0].toLowerCase().replace(/\s+/g, '-');
    nodes.push({ id: 'start', type: 'start', lane: firstLane, x: 5 });

    // Position tasks evenly
    laneNames.forEach(laneName => {
      const laneId = laneName.toLowerCase().replace(/\s+/g, '-');
      const laneTasks = tasksByLane[laneName];
      const count = laneTasks.length;

      laneTasks.forEach((t, idx) => {
        const x = Math.round(15 + (idx / Math.max(count, 1)) * 70);
        const nodeId = 't' + t.num.replace(/\./g, '').toLowerCase();
        // Limit to max 2 line breaks for compact display
        const words = t.name.split(/\s+/);
        let name;
        if (words.length <= 2) {
          name = words.join('<br>');
        } else if (words.length <= 4) {
          name = words.slice(0, 2).join(' ') + '<br>' + words.slice(2).join(' ');
        } else {
          name = words.slice(0, 2).join(' ') + '<br>' + words.slice(2, 4).join(' ');
        }
        nodes.push({
          id: nodeId,
          type: t.type || 'task',
          lane: laneId,
          x: x,
          num: t.num,
          name: name
        });
      });
    });

    nodes.push({ id: 'end', type: 'end', lane: firstLane, x: 95 });
  }

  // Build connections from flows
  const connections = flows.map(f => ({
    from: normalizeId(f.from),
    to: normalizeId(f.to),
    type: f.type || 'sequence'
  }));

  // If no flows defined, auto-generate sequence flows within lanes
  if (connections.length === 0) {
    laneNames.forEach(laneName => {
      const laneId = laneName.toLowerCase().replace(/\s+/g, '-');
      const laneNodes = nodes.filter(n => n.lane === laneId).sort((a, b) => a.x - b.x);
      for (let i = 0; i < laneNodes.length - 1; i++) {
        connections.push({
          from: laneNodes[i].id,
          to: laneNodes[i + 1].id,
          type: 'sequence'
        });
      }
    });
  }

  return { lanes, nodes, connections };
}

function normalizeId(name) {
  if (name === 'start' || name === 'end') return name;
  if (/^[\d.]+[A-Z]?$/.test(name)) {
    return 't' + name.replace(/\./g, '').toLowerCase();
  }
  return name;
}

// ============ BPMN HTML TEMPLATE ============
function generateBpmnHTML(process) {
  const data = buildBpmnData(process);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BPMN: ${process.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; padding: 20px; }
    .a4-container { width: 700px; margin: 0 auto; background: #fff; padding: 48px; border: 1px solid #ccc; }
    h1 { color: #1e3a5f; margin-bottom: 16px; font-size: 18px; }
    .bpmn-diagram { position: relative; border: 1px solid #ddd; overflow: hidden; }
    .connections-layer { position: absolute; top: 0; left: 0; pointer-events: none; z-index: 5; }
    .swim-lane { display: flex; border-bottom: 1px solid #ccc; margin: 10px 0; overflow: hidden; }
    .swim-lane:last-child { border-bottom: none; }
    .lane-header { width: 50px; min-width: 50px; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 9px; text-align: center; line-height: 1.2; }
    .lane-content { flex: 1; position: relative; background: #fafafa; }
    .bpmn-node { position: absolute; transform: translate(-50%, -50%); z-index: 10; }
    .bpmn-start { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #22c55e; background: #fff; }
    .bpmn-end { width: 24px; height: 24px; border-radius: 50%; border: 4px solid #dc2626; background: #fff; }
    .bpmn-message-catch { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #475569; background: #fff; display: flex; align-items: center; justify-content: center; }
    .bpmn-message-catch svg { width: 14px; height: 11px; }
    .bpmn-task, .bpmn-subprocess { padding: 3px 5px; width: 68px; max-height: 60px; text-align: center; border: 2px solid; overflow: hidden; }
    .bpmn-task { background: #dbeafe; border-color: #2563eb; }
    .bpmn-subprocess { background: #fef3c7; border-color: #d97706; }
    .task-num { font-size: 11px; font-weight: 700; color: #1e3a5f; display: block; }
    .task-name { font-size: 9px; color: #1f2937; line-height: 1.1; }
    .bpmn-gateway { width: 22px; height: 22px; background: #f3e8ff; border: 2px solid #7c3aed; transform: translate(-50%, -50%) rotate(45deg); display: flex; align-items: center; justify-content: center; }
    .bpmn-gateway span { transform: rotate(-45deg); font-size: 10px; font-weight: bold; color: #7c3aed; }
    .legend { margin-top: 12px; padding: 8px; background: #f9f9f9; border: 1px solid #ddd; display: flex; gap: 12px; flex-wrap: wrap; font-size: 9px; }
    .legend-item { display: flex; align-items: center; gap: 4px; }
    .legend-icon { width: 14px; height: 14px; }
    .legend-start { border-radius: 50%; border: 2px solid #22c55e; background: #fff; }
    .legend-end { border-radius: 50%; border: 3px solid #dc2626; background: #fff; }
    .legend-task { background: #dbeafe; border: 1px solid #2563eb; }
    .legend-line { width: 20px; height: 2px; background: #475569; }
    .legend-line-dash { width: 20px; border-top: 1px dashed #888; }
    .footer { margin-top: 8px; font-size: 9px; font-style: italic; color: #6b7280; text-align: center; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 10px; }
    th, td { border: 1px solid #ddd; padding: 4px 6px; text-align: left; }
    th { background: #1e3a5f; color: white; }
  </style>
</head>
<body>

<div class="a4-container">
  <h1>Process: ${process.name}</h1>
  <div id="diagram" class="bpmn-diagram"></div>
  <div class="legend">
    <div class="legend-item"><div class="legend-icon legend-start"></div>Start</div>
    <div class="legend-item"><div class="legend-icon legend-end"></div>End</div>
    <div class="legend-item"><div class="legend-icon legend-task">N</div>Task</div>
    <div class="legend-item"><div class="legend-line"></div>Sequence</div>
    <div class="legend-item"><div class="legend-line-dash"></div>Message</div>
  </div>
  <table>
    <tr><th>#</th><th>Task</th><th>Lane</th><th>Type</th><th>Use Case</th></tr>
    ${process.tasks.map(t => `<tr><td>${t.num}</td><td>${t.name}</td><td>${t.lane}</td><td>${t.type}</td><td>${t.useCase || ''}</td></tr>`).join('')}
  </table>
  <div class="footer">Generated from requirements-matrix.xlsx</div>
</div>

<script>
const LANE_COLORS = [
  { bg: '#2563eb', text: '#fff' },
  { bg: '#059669', text: '#fff' },
  { bg: '#d97706', text: '#fff' }
];
const PAGE_WIDTH = 604;
const LANE_HEADER_WIDTH = 50;
const LANE_CONTENT_WIDTH = PAGE_WIDTH - LANE_HEADER_WIDTH;
const LANE_HEIGHT = 80;
const LANE_MARGIN = 10;

const processData = ${JSON.stringify(data, null, 2)};

class BpmnRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.positions = {};
  }

  render(data) {
    const { lanes, nodes, connections } = data;
    const totalHeight = lanes.length * (LANE_HEIGHT + LANE_MARGIN * 2);

    let html = \`<svg class="connections-layer" width="\${PAGE_WIDTH}" height="\${totalHeight}"></svg>\`;

    lanes.forEach((lane, idx) => {
      const color = LANE_COLORS[idx % LANE_COLORS.length];
      html += \`<div class="swim-lane" style="height:\${LANE_HEIGHT}px">
        <div class="lane-header" style="background:\${color.bg};color:\${color.text}">\${lane.name}</div>
        <div class="lane-content"></div>
      </div>\`;
    });

    this.container.innerHTML = html;
    this.container.style.width = PAGE_WIDTH + 'px';

    const laneContents = this.container.querySelectorAll('.lane-content');
    nodes.forEach(node => {
      const laneIdx = lanes.findIndex(l => l.id === node.lane);
      if (laneIdx < 0) return;
      const el = this.createNode(node);
      laneContents[laneIdx].appendChild(el);

      const xPx = (node.x / 100) * LANE_CONTENT_WIDTH;
      this.positions[node.id] = {
        x: LANE_HEADER_WIDTH + xPx,
        y: laneIdx * (LANE_HEIGHT + LANE_MARGIN * 2) + LANE_MARGIN + LANE_HEIGHT / 2,
        laneIdx, el
      };
    });

    requestAnimationFrame(() => this.drawConnections(connections));
  }

  createNode(node) {
    const el = document.createElement('div');
    el.className = 'bpmn-node';
    el.style.left = node.x + '%';
    el.style.top = '50%';

    switch (node.type) {
      case 'start':
        el.classList.add('bpmn-start');
        break;
      case 'end':
        el.classList.add('bpmn-end');
        break;
      case 'task':
        el.classList.add('bpmn-task');
        el.innerHTML = \`<span class="task-num">\${node.num}</span><span class="task-name">\${node.name}</span>\`;
        break;
      case 'subprocess':
        el.classList.add('bpmn-subprocess');
        el.innerHTML = \`<span class="task-num">\${node.num}</span><span class="task-name">\${node.name}</span>\`;
        break;
      case 'message-catch':
        el.classList.add('bpmn-message-catch');
        el.innerHTML = \`<svg viewBox="0 0 24 18" fill="none" stroke="#475569" stroke-width="2"><rect x="1" y="1" width="22" height="16" rx="1"/><path d="M1 1 L12 10 L23 1"/></svg>\`;
        break;
      case 'gateway-xor':
        el.classList.add('bpmn-gateway');
        el.innerHTML = '<span>X</span>';
        break;
    }
    return el;
  }

  drawConnections(connections) {
    const svg = this.container.querySelector('.connections-layer');
    let content = \`<defs>
      <marker id="arr-s" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0,8 3,0 6" fill="#475569"/>
      </marker>
      <marker id="arr-m" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
        <polygon points="0 0,6 2.5,0 5" fill="#888"/>
      </marker>
    </defs>\`;

    connections.forEach(c => {
      const from = this.positions[c.from];
      const to = this.positions[c.to];
      if (!from || !to) return;

      const fromW = from.el.offsetWidth / 2;
      const toW = to.el.offsetWidth / 2;
      const fromH = from.el.offsetHeight / 2;
      const toH = to.el.offsetHeight / 2;

      if (c.type === 'sequence') {
        const x1 = from.x + fromW, y1 = from.y;
        const x2 = to.x - toW, y2 = to.y;
        let path;
        if (Math.abs(y1 - y2) < 2) {
          path = \`M\${x1},\${y1} L\${x2},\${y2}\`;
        } else {
          const midX = x1 + 12;
          path = \`M\${x1},\${y1} H\${midX} V\${y2} H\${x2}\`;
        }
        content += \`<path d="\${path}" stroke="#475569" stroke-width="1.5" fill="none" marker-end="url(#arr-s)"/>\`;
      } else {
        const goDown = from.laneIdx < to.laneIdx;
        const x1 = from.x, y1 = goDown ? from.y + fromH : from.y - fromH;
        const x2 = to.x, y2 = goDown ? to.y - toH : to.y + toH;
        let path;
        if (Math.abs(x1 - x2) < 3) {
          path = \`M\${x1},\${y1} V\${y2}\`;
        } else {
          const midY = (y1 + y2) / 2;
          path = \`M\${x1},\${y1} V\${midY} H\${x2} V\${y2}\`;
        }
        content += \`<path d="\${path}" stroke="#888" stroke-width="1" stroke-dasharray="4,2" fill="none" marker-end="url(#arr-m)"/>\`;
      }
    });

    svg.innerHTML = content;
  }
}

new BpmnRenderer('diagram').render(processData);
</script>
</body>
</html>`;
}

// ============ USE CASE (PlantUML) ============
function generateUseCaseHTML(feature) {
  const featureUCs = useCases.filter(uc => uc['Feature ID'] === feature['Feature ID']);
  const actorNames = [...new Set(featureUCs.map(uc => uc['Actor']))];

  let puml = `@startuml
skinparam backgroundColor #FAFAFA
skinparam packageStyle rectangle
skinparam actorStyle awesome
skinparam usecase {
  BackgroundColor #dbeafe
  BorderColor #2563eb
}

title ${feature['Feature Name']}

`;
  actorNames.forEach(a => puml += `actor "${a}" as ${a.replace(/\s+/g, '_')}\n`);
  puml += `\nrectangle "${feature['Feature Name']}" {\n`;
  featureUCs.forEach(uc => puml += `  usecase "${uc['Use Case Name']}" as ${uc['UC ID']}\n`);
  puml += `}\n\n`;
  featureUCs.forEach(uc => puml += `${uc['Actor'].replace(/\s+/g, '_')} --> ${uc['UC ID']}\n`);
  puml += `@enduml\n`;

  return `<!DOCTYPE html>
<html><head>
  <meta charset="UTF-8">
  <title>Use Case: ${feature['Feature Name']}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 32px; border: 1px solid #ccc; }
    h1 { color: #1E3A5F; font-size: 20px; }
    .diagram { text-align: center; margin: 20px 0; background: #fafafa; border: 1px solid #e0e0e0; padding: 20px; min-height: 200px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 11px; }
    th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
    th { background: #1E3A5F; color: white; }
    .footer { margin-top: 16px; font-size: 10px; color: #888; text-align: center; }
  </style>
</head><body>
<div class="container">
  <h1>Use Case: ${feature['Feature Name']}</h1>
  <p style="font-size:12px;color:#666">${feature['Description']} (ToR ${feature['ToR Section']})</p>
  <div class="diagram"><img id="diagram" alt="Loading..."></div>
  <table>
    <tr><th>ID</th><th>Actor</th><th>Use Case</th><th>Description</th><th>Priority</th></tr>
    ${featureUCs.map(uc => `<tr><td>${uc['UC ID']}</td><td>${uc['Actor']}</td><td>${uc['Use Case Name']}</td><td>${uc['Description']}</td><td>${uc['Priority']}</td></tr>`).join('')}
  </table>
  <div class="footer">Generated from requirements-matrix.xlsx</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js"></script>
<script>
const puml = ${JSON.stringify(puml)};
function encode64(d){let r="";for(let i=0;i<d.length;i+=3){if(i+2==d.length)r+=app3(d.charCodeAt(i),d.charCodeAt(i+1),0);else if(i+1==d.length)r+=app3(d.charCodeAt(i),0,0);else r+=app3(d.charCodeAt(i),d.charCodeAt(i+1),d.charCodeAt(i+2));}return r;}
function app3(b1,b2,b3){let c1=b1>>2,c2=((b1&0x3)<<4)|(b2>>4),c3=((b2&0xF)<<2)|(b3>>6),c4=b3&0x3F;return enc6(c1&0x3F)+enc6(c2&0x3F)+enc6(c3&0x3F)+enc6(c4&0x3F);}
function enc6(b){if(b<10)return String.fromCharCode(48+b);b-=10;if(b<26)return String.fromCharCode(65+b);b-=26;if(b<26)return String.fromCharCode(97+b);b-=26;if(b==0)return'-';if(b==1)return'_';return'?';}
const data=new TextEncoder().encode(puml);const compressed=pako.deflateRaw(data,{level:9});const encoded=encode64(String.fromCharCode.apply(null,compressed));
document.getElementById('diagram').src='https://www.plantuml.com/plantuml/svg/'+encoded;
</script>
</body></html>`;
}

// ============ MAIN ============
console.log('Generating diagrams from requirements-matrix.xlsx\n');

console.log('Use Case Diagrams:');
features.forEach(f => {
  const html = generateUseCaseHTML(f);
  const fname = `${f['Feature ID'].toLowerCase()}-${f['Feature Name'].toLowerCase().replace(/\s+/g, '-')}.html`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'use-cases', fname), html);
  console.log(`  ✓ ${fname}`);
});

console.log('\nBPMN Diagrams:');
processes.forEach(p => {
  const html = generateBpmnHTML(p);
  const fname = `${p.id.toLowerCase()}-${p.name.toLowerCase().replace(/\s+/g, '-')}.html`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'bpmn', fname), html);
  console.log(`  ✓ ${fname}`);

  p.subprocesses.forEach(sp => {
    const subHtml = generateBpmnHTML(sp);
    const subFname = `${sp.id.toLowerCase()}-${sp.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'bpmn', subFname), subHtml);
    console.log(`  ✓ ${subFname} (subprocess)`);
  });
});

console.log(`\nOutput: ${OUTPUT_DIR}`);
