/**
 * BPMN Renderer - Renders YAML process definitions to HTML
 * Uses js-yaml library for parsing
 */

class BpmnRenderer {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  async loadAndRender(yamlPath) {
    try {
      const response = await fetch(yamlPath);
      const yamlText = await response.text();
      const data = jsyaml.load(yamlText);
      this.render(data);
    } catch (error) {
      console.error('Error loading YAML:', error);
      this.container.innerHTML = `<div class="error">Error loading diagram: ${error.message}</div>`;
    }
  }

  render(data) {
    const { process, lanes, elements, messageFlows } = data;

    // Group elements by lane
    const elementsByLane = {};
    lanes.forEach(lane => {
      elementsByLane[lane.id] = elements.filter(el => el.lane === lane.id);
    });

    // Build message flow lookup
    const msgFlowLookup = {};
    if (messageFlows) {
      messageFlows.forEach(mf => {
        msgFlowLookup[mf.from] = mf;
      });
    }

    // Generate HTML
    let html = `
      <div class="a4-container">
        <div class="breadcrumb">Processes &gt; <strong>${process.name}</strong></div>
        <h1>Process: ${process.name}</h1>
        <div class="bpmn-container">
    `;

    lanes.forEach((lane, laneIndex) => {
      html += this.renderLane(lane, elementsByLane[lane.id], msgFlowLookup, laneIndex, lanes.length);
    });

    html += `
        </div>
        ${this.renderLegend()}
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderLane(lane, elements, msgFlowLookup, laneIndex, totalLanes) {
    let html = `
      <div class="swim-lane">
        <div class="lane-header">${lane.name.replace(' ', '<br>')}</div>
        <div class="lane-content">
    `;

    elements.forEach((el, idx) => {
      const msgFlow = msgFlowLookup[el.id];
      const hasMessageFlow = !!msgFlow;

      // Add flow arrow before element (except for first element or message-catch after spacer)
      if (idx > 0 && el.type !== 'message-catch') {
        html += '<div class="flow"></div>';
      }

      // Wrap element if it has message flow
      if (hasMessageFlow || el.type === 'message-catch') {
        html += '<div class="element-with-flow">';
      }

      // Render the element
      html += this.renderElement(el);

      // Add message flow indicator
      if (hasMessageFlow) {
        const flowHeight = msgFlow.direction === 'down' ? 40 : 75;
        const flowClass = msgFlow.direction === 'down' ? 'message-flow-down' : 'message-flow-up';
        const flowPos = msgFlow.direction === 'down' ? 'top: 100%' : 'bottom: 100%';
        html += `<div class="${flowClass}" style="height: ${flowHeight}px; ${flowPos};"></div>`;
      }

      // Add incoming message flow for message-catch
      if (el.type === 'message-catch' && el.receivesFrom) {
        // Determine direction based on lane position
        const flowClass = laneIndex > 0 ? 'message-flow-up' : 'message-flow-down';
        const flowPos = laneIndex > 0 ? 'bottom: 100%' : 'top: 100%';
        const flowHeight = 40;
        html += `<div class="${flowClass}" style="height: ${flowHeight}px; ${flowPos};"></div>`;
      }

      if (hasMessageFlow || el.type === 'message-catch') {
        html += '</div>';
      }

      // Add flow arrow after message-catch
      if (el.type === 'message-catch' && idx < elements.length - 1) {
        html += '<div class="flow"></div>';
      }
    });

    html += `
        </div>
      </div>
    `;

    return html;
  }

  renderElement(el) {
    switch (el.type) {
      case 'start':
        return '<div class="bpmn-start"></div>';

      case 'end':
        return '<div class="bpmn-end"></div>';

      case 'task':
        return `
          <div class="bpmn-task">
            <span class="task-num">${el.num}</span>
            ${el.name.replace(/ /g, '<br>')}
          </div>
        `;

      case 'subprocess':
        return `
          <div class="bpmn-subprocess" onclick="navigateToSubprocess('${el.subprocessId}')">
            <span class="task-num">${el.num}</span>
            ${el.name.replace(/ /g, '<br>')}
          </div>
        `;

      case 'message-catch':
        return `<div class="bpmn-message-catch" title="Receive"></div>`;

      case 'gateway-xor':
        return '<div class="bpmn-gateway"><span>X</span></div>';

      case 'gateway-and':
        return '<div class="bpmn-gateway"><span>+</span></div>';

      default:
        return `<div class="unknown">[${el.type}]</div>`;
    }
  }

  renderLegend() {
    return `
      <div class="legend">
        <div class="legend-item"><div class="bpmn-start"></div>Start</div>
        <div class="legend-item"><div class="bpmn-end"></div>End</div>
        <div class="legend-item"><div class="bpmn-task">N</div>Task</div>
        <div class="legend-item"><div class="bpmn-subprocess">N</div>Sub-Process</div>
        <div class="legend-item"><div class="bpmn-message-catch"></div>Receive</div>
        <div class="legend-item"><div class="bpmn-gateway"><span>X</span></div>XOR</div>
        <div class="legend-item"><div class="flow"></div>Flow</div>
        <div class="legend-item"><div class="msg-flow-sample"></div>Message</div>
      </div>
    `;
  }
}

// Navigation helper
function navigateToSubprocess(subprocessId) {
  const subprocessElement = document.getElementById(subprocessId);
  if (subprocessElement) {
    subprocessElement.scrollIntoView({ behavior: 'smooth' });
  }
}
