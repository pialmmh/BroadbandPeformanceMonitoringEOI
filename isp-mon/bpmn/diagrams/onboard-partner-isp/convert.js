#!/usr/bin/env node
/**
 * Converts simple .bpmn.txt to process-data.txt
 * Lanes are auto-inferred from task section headers
 *
 * Usage: node convert.js onboard-partner-isp.bpmn.txt > process-data.txt
 */

const fs = require('fs');

const inputFile = process.argv[2] || 'onboard-partner-isp.bpmn.txt';
const content = fs.readFileSync(inputFile, 'utf-8');

function parse(text) {
  const processes = [];
  const sections = text.split(/^#\s+/m).filter(s => s.trim());

  for (const section of sections) {
    const lines = section.split('\n');
    const titleLine = lines[0].trim();
    if (!titleLine) continue;

    const isSubprocess = titleLine.toLowerCase().startsWith('subprocess:');
    const name = isSubprocess
      ? titleLine.replace(/^subprocess:\s*/i, '').trim()
      : titleLine;

    const process = {
      name,
      isSubprocess,
      lanes: [],
      tasksByLane: {}
    };

    let currentLane = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Lane header (e.g., "ISP:", "BTRC Admin:")
      const laneMatch = line.match(/^([A-Za-z][A-Za-z0-9 ]*):\s*$/);
      if (laneMatch) {
        currentLane = laneMatch[1].trim();
        if (!process.lanes.includes(currentLane)) {
          process.lanes.push(currentLane);
          process.tasksByLane[currentLane] = [];
        }
        continue;
      }

      // Task (e.g., "  - Task Name [type]")
      if (currentLane && line.match(/^\s+-\s+/)) {
        let taskText = line.replace(/^\s+-\s+/, '').trim();
        let type = 'task';

        const typeMatch = taskText.match(/\[(\w+)\]\s*$/);
        if (typeMatch) {
          type = typeMatch[1];
          taskText = taskText.replace(/\s*\[.*\]\s*$/, '').trim();
        }

        process.tasksByLane[currentLane].push({ name: taskText, type });
      }
    }

    processes.push(process);
  }

  return processes;
}

function generate(processes) {
  let output = `# BPMN Process Definitions (Generated)
# Source: ${inputFile}
# Generated: ${new Date().toISOString()}

`;

  for (const proc of processes) {
    const header = proc.isSubprocess ? 'SUBPROCESS' : 'PROCESS';
    output += `===================================================\n`;
    output += `${header}: ${proc.name}\n`;
    output += `===================================================\n\n`;

    output += `LANES:\n`;
    for (const lane of proc.lanes) {
      output += `  - ${lane}\n`;
    }
    output += `\n`;

    output += `NODES:\n`;

    const allNodes = [];
    let taskCounter = 0;

    for (const lane of proc.lanes) {
      output += `  ${lane}:\n`;
      const tasks = proc.tasksByLane[lane] || [];
      const isFirstLane = lane === proc.lanes[0];

      if (isFirstLane) {
        output += `    - start                           x:3\n`;
        allNodes.push({ id: 'start', type: 'start', lane, x: 3 });
      }

      const totalTasks = tasks.length;
      tasks.forEach((task, idx) => {
        taskCounter++;
        const num = proc.isSubprocess ? `1.${taskCounter}` : `${taskCounter}`;

        // Spread tasks evenly (leave room for start/end)
        const startOffset = isFirstLane ? 10 : 5;
        const endOffset = isFirstLane ? 85 : 95;
        const range = endOffset - startOffset;
        const x = Math.round(startOffset + (idx / Math.max(totalTasks - 1, 1)) * range);

        const paddedName = task.name.padEnd(28);
        const typeStr = task.type !== 'task' ? `   ${task.type}` : '';
        output += `    - ${num}. ${paddedName} x:${x}${typeStr}\n`;

        allNodes.push({ id: `t${num.replace(/\./g, '')}`, num, name: task.name, type: task.type, lane, x });
      });

      if (isFirstLane) {
        output += `    - end                             x:97\n`;
        allNodes.push({ id: 'end', type: 'end', lane, x: 97 });
      }

      output += `\n`;
    }

    // Sequence flows
    output += `FLOWS:\n  Sequence:\n`;
    for (const lane of proc.lanes) {
      const laneNodes = allNodes.filter(n => n.lane === lane);
      for (let i = 0; i < laneNodes.length - 1; i++) {
        const from = laneNodes[i].num || laneNodes[i].id;
        const to = laneNodes[i + 1].num || laneNodes[i + 1].id;
        output += `    - ${from} → ${to}\n`;
      }
    }

    // Message flows (cross-lane)
    output += `\n  Message:\n`;
    // TODO: Auto-infer message flows based on task alignment

    output += `\n\n`;
  }

  return output;
}

const processes = parse(content);
console.log(generate(processes));
