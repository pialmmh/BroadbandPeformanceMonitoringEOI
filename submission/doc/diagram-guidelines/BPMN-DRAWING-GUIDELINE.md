# BPMN Drawing Guideline

> **Purpose**: Standards for creating BPMN process diagrams for BTRC EOI documentation
> **Applies to**: SRS, Technical Proposal, Mock UI documentation

---

## Page Layout Constraints

### A4 Width Requirement
All diagrams must fit within A4 page width with standard margins:

| Dimension | Value |
|-----------|-------|
| A4 page width | 210mm |
| Standard margins | 25mm left + 25mm right = 50mm total |
| **Usable content width** | **160mm (≈605px at 96 DPI)** |

```css
.a4-container {
  width: 605px;      /* 160mm ≈ 605px */
  max-width: 100%;
}
```

### Single Responsibility Principle
- Do NOT overcrowd diagrams with too many tasks
- If a process has >5-7 tasks per swim lane, consider breaking into sub-processes
- Each diagram should focus on ONE cohesive process
- Use sub-processes to decompose complexity hierarchically

---

## Task Numbering Convention

### Main Process Tasks
Number sequentially: **1, 2, 3, 4...**

Example:
- **1.** Register to BTRC Portal
- **2.** Receive Credentials
- **3.** Configure API Access

### Sub-Process Tasks
Add decimal level: **1.1, 1.2, 1.3...**

Example (Sub-process of "1. Register to BTRC Portal"):
- **1.1** Fill Company Information
- **1.2** Upload NID & Documents
- **1.3** Enter OTP Code

### Supporting/Parallel Tasks
Append letter suffix: **1.A, 1.B, 1.1.A, 1.1.B...**

Example (System tasks supporting ISP tasks):
- **1.1.A** Validate Form Data
- **1.2.A** Verify NID via API
- **1.3.A** Send OTP & Verify

### Numbering Display
Always show task number prominently within the task box:

```html
<div class="bpmn-task">
  <span class="task-num">1.1</span>
  Fill Company Information
</div>
```

---

## Task Naming Rules

### All Tasks Must Be Verbs (Action-Oriented)

| Wrong | Correct |
|-------|---------|
| Company Information | Fill Company Information |
| NID Documents | Upload NID Documents |
| Credential Email | Receive Credentials |
| Application Form | Review Application |
| API Keys | Generate API Keys |
| OTP | Enter OTP Code |

### Common Verb Prefixes
| Category | Verbs |
|----------|-------|
| Data Entry | Fill, Enter, Input, Provide, Submit |
| Documents | Upload, Attach, Download, Export |
| Communication | Send, Receive, Notify, Alert |
| Processing | Process, Calculate, Generate, Create |
| Validation | Validate, Verify, Check, Confirm |
| Review | Review, Approve, Reject, Evaluate |
| System | Store, Retrieve, Query, Update, Delete |

---

## Swim Lanes (Actors)

### Standard Actors for BTRC Platform
| Actor | Description | Header Color |
|-------|-------------|--------------|
| **ISP** | Internet Service Provider staff | Primary (#1E3A5F) |
| **BTRC Admin** | BTRC administrative staff | Primary (#1E3A5F) |
| **System** | Automated system processes | Primary (#1E3A5F) |
| **End User** | Mobile app / web portal users | Primary (#1E3A5F) |
| **External** | Third-party services (NID API, SMS) | Primary (#1E3A5F) |

### Lane Layout
- Lane header: 70px width, left-aligned
- Lane content: Flexible, contains process elements
- Minimum lane height: 70px
- Border between lanes: 1px solid

```
┌──────────┬─────────────────────────────────────────────┐
│   ISP    │ [Start] → [Task 1] → [Task 2] → [End]      │
├──────────┼─────────────────────────────────────────────┤
│  System  │         [Task 1.A] → [Task 2.A]            │
└──────────┴─────────────────────────────────────────────┘
```

---

## BPMN Elements

### Start Event
- Circle with thin green border
- 24px diameter
- Border: 2px solid #2ECC71
- Background: #E8F8F0

```html
<div class="bpmn-start"></div>
```

### End Event
- Circle with thick red border
- 24px diameter
- Border: 3px solid #E74C3C
- Background: #FDECEC

```html
<div class="bpmn-end"></div>
```

### Message Catch Event (Receive)
- Circle with envelope icon (✉)
- **Only shown in the RECEIVING lane** (not in the sending lane)
- Border: 1.5px solid #1E3A5F
- Background: white

```html
<!-- Place only in the lane that RECEIVES the data -->
<div class="bpmn-message-catch" title="Receive Application"></div>
```

**Rule**: The sending task just has a message flow arrow going out. The receiving lane shows the ✉ event where the message arrives.

### Task (Activity)
- Rounded rectangle
- Border: 1.5px solid #3498DB
- Background: white
- Min width: 90px, Max width: 100px
- Font size: 9px

```html
<div class="bpmn-task">
  <span class="task-num">1</span>
  Task Name
</div>
```

### Sub-Process (Collapsed)
- Rounded rectangle with orange border
- Displays [+] indicator
- Clickable to navigate to expanded view
- Border: 1.5px solid #F39C12
- Background: #FFF9E6

```html
<div class="bpmn-subprocess">
  <span class="task-num">1</span>
  Sub-Process Name
</div>
```

### Gateway (Decision/Merge)

#### XOR Gateway (Exclusive)
- Diamond shape, rotated 45 degrees
- Contains "X" symbol
- Border: 1.5px solid #9B59B6
- Use when: Only ONE path will be taken

```html
<div class="bpmn-gateway"><span>X</span></div>
```

#### AND Gateway (Parallel)
- Diamond shape, rotated 45 degrees
- Contains "+" symbol
- Border: 1.5px solid #9B59B6
- Use when: ALL paths execute in parallel

```html
<div class="bpmn-gateway"><span>+</span></div>
```

### Sequence Flow Arrow (within lane)
- Solid line with arrowhead
- 20px minimum length
- Color: #666
- Arrow points right (toward next element)
- Connects elements within the same swim lane

```html
<div class="flow"></div>
```

### Message Flow (between lanes)
- **Thin dashed** vertical line with small arrowhead
- Width: 1px (thin/lightweight)
- Dash pattern: 3px dash, 2px gap (tight spacing)
- Color: #888 (gray, less prominent than sequence flow)
- Arrow points toward receiving lane
- **No event at sending end** - only arrow going out
- **Event (✉) only at receiving end**

```html
<!-- Message flowing down to next lane -->
<div class="message-flow-down" style="height: 40px; top: 100%;"></div>

<!-- Message flowing up to previous lane -->
<div class="message-flow-up" style="height: 40px; bottom: 100%;"></div>
```

**Message Flow Pattern:**
```
┌─────────────────────────────────────────────────────┐
│ ISP    │ [Task: Submit Form]                        │
│        │         :                                   │
│        │         : (thin dashed line)               │
│        │         ▼                                   │
├────────┼─────────────────────────────────────────────┤
│ System │        ○✉ → [Validate Form]                │
│        │   (receive event only here)                │
└─────────────────────────────────────────────────────┘
```

---

## Color Palette

### Element Colors

| Element | Border | Background | Text |
|---------|--------|------------|------|
| Start Event | #2ECC71 | #E8F8F0 | - |
| End Event | #E74C3C | #FDECEC | - |
| Message Catch | #1E3A5F (1.5px) | #FFFFFF | #1E3A5F (✉) |
| Task | #3498DB | #FFFFFF | #333333 |
| Sub-Process | #F39C12 | #FFF9E6 | #333333 |
| Gateway | #9B59B6 | #FFFFFF | #9B59B6 |
| Lane Header | - | #1E3A5F | #FFFFFF |
| Sequence Flow | #666666 (2px solid) | - | - |
| Message Flow | #888888 (1px dashed) | - | - |

### Task Number Color
- Main process: #1E3A5F (dark blue)
- Sub-process: #F39C12 (orange)

---

## Hierarchy and Sub-Processes

### When to Create a Sub-Process
Create a sub-process when:
1. A task has 3+ internal steps
2. Multiple actors are involved in completing one logical task
3. The process is reused elsewhere
4. Detail would clutter the parent diagram

### Sub-Process Naming
Name sub-processes as single action statements:
- "Register to BTRC Portal"
- "Process Application"
- "Generate Monthly Report"

### Navigation Pattern
In HTML/interactive diagrams:
- Sub-process element shows [+] indicator
- Click navigates to detailed sub-process diagram
- Breadcrumb shows hierarchy: `Processes > Parent > Sub-Process`

Example breadcrumb:
```
Processes > Onboard Partner ISP > 1. Register to BTRC Portal
```

### Sub-Process Numbering Hierarchy

```
1. Register to BTRC Portal (sub-process)
   └── 1.1 Fill Company Information
   └── 1.2 Upload NID & Documents
   └── 1.3 Enter OTP Code
       └── 1.3.A Send OTP & Verify (system)

2. Receive Credentials (task)
   └── 2.A Generate Credentials (system)

3. Configure API Access (task)
   └── 3.A Create API Keys (system)
```

---

## Page Break Handling

### Multi-Page Diagrams
When a process spans multiple pages:
1. Place page break indicator between diagrams
2. Each page should be self-contained
3. Reference continued processes

```html
<div class="page-break">--- Page Break ---</div>
```

### What Goes on Each Page
- **Page 1**: Parent/main process (overview level)
- **Page 2+**: Sub-processes (detail level)
- **Last Page**: Legend and reference info

---

## Legend

Every diagram should include a legend showing element meanings:

```
┌──────────────────────────────────────────────────────┐
│ Legend:                                               │
│ ○ Start    ◉ End    [N] Task    [N+] Sub-Process    │
│ ◇X XOR Gateway    ◇+ AND Gateway    ─→ Flow         │
└──────────────────────────────────────────────────────┘
```

---

## HTML/CSS Template

### Complete CSS for BPMN Elements

```css
/* A4 container */
.a4-container {
  width: 605px;
  margin: 0 auto;
  background: #fff;
  padding: 15px;
  border: 1px solid #ccc;
}

/* Swim Lane */
.swim-lane {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.swim-lane:last-child { border-bottom: none; }

.lane-header {
  width: 70px;
  min-width: 70px;
  background: #1E3A5F;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 10px;
  padding: 5px;
  text-align: center;
}

.lane-content {
  flex: 1;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  min-height: 70px;
}

/* Start/End Events */
.bpmn-start, .bpmn-end {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}
.bpmn-start { border: 2px solid #2ECC71; background: #E8F8F0; }
.bpmn-end { border: 3px solid #E74C3C; background: #FDECEC; }

/* Message Event (only in receiving lane) */
.bpmn-message-catch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid #1E3A5F;
  background: #fff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bpmn-message-catch::after {
  content: '✉';
  font-size: 10px;
  color: #1E3A5F;
}

/* Task */
.bpmn-task {
  background: white;
  border: 1.5px solid #3498DB;
  border-radius: 6px;
  padding: 6px 8px;
  min-width: 90px;
  max-width: 100px;
  text-align: center;
  font-size: 9px;
  color: #333;
}
.bpmn-task .task-num {
  font-weight: 700;
  color: #1E3A5F;
  display: block;
  margin-bottom: 2px;
  font-size: 10px;
}

/* Sub-Process */
.bpmn-subprocess {
  background: #FFF9E6;
  border: 1.5px solid #F39C12;
  border-radius: 6px;
  padding: 6px 8px;
  min-width: 90px;
  max-width: 100px;
  text-align: center;
  font-size: 9px;
  cursor: pointer;
}
.bpmn-subprocess .task-num {
  font-weight: 700;
  color: #F39C12;
  display: block;
  margin-bottom: 2px;
  font-size: 10px;
}
.bpmn-subprocess::after {
  content: ' [+]';
  font-size: 8px;
  color: #F39C12;
}

/* Gateway */
.bpmn-gateway {
  width: 28px;
  height: 28px;
  background: #FFF;
  border: 1.5px solid #9B59B6;
  transform: rotate(45deg);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bpmn-gateway span {
  transform: rotate(-45deg);
  font-size: 12px;
  font-weight: bold;
  color: #9B59B6;
}

/* Sequence Flow Arrow */
.flow {
  width: 20px;
  height: 2px;
  background: #666;
  position: relative;
  flex-shrink: 0;
  margin: 0 2px;
}
.flow::after {
  content: '';
  position: absolute;
  right: -1px;
  top: -4px;
  border: 5px solid transparent;
  border-left: 6px solid #666;
}

/* Message Flow (thin dashed, between lanes) */
.element-with-flow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message-flow-down {
  position: absolute;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    #888 0px, #888 3px,
    transparent 3px, transparent 5px
  );
  left: 50%;
  transform: translateX(-50%);
}
.message-flow-down::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: -3px;
  border: 4px solid transparent;
  border-top: 5px solid #888;
}

.message-flow-up {
  position: absolute;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    #888 0px, #888 3px,
    transparent 3px, transparent 5px
  );
  left: 50%;
  transform: translateX(-50%);
}
.message-flow-up::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -3px;
  border: 4px solid transparent;
  border-bottom: 5px solid #888;
}

/* Page Break */
.page-break {
  margin: 20px 0;
  border-top: 2px dashed #999;
  text-align: center;
  font-size: 10px;
  color: #999;
  padding-top: 5px;
}

/* Legend */
.legend {
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 9px;
}
.legend-item { display: flex; align-items: center; gap: 4px; }
.legend .bpmn-start, .legend .bpmn-end,
.legend .bpmn-message-catch, .legend .bpmn-message-throw {
  width: 14px; height: 14px;
}
.legend .bpmn-message-catch::after,
.legend .bpmn-message-throw::after { font-size: 8px; }
.legend .bpmn-task, .legend .bpmn-subprocess {
  padding: 2px 5px; min-width: auto; font-size: 8px;
}
.legend .bpmn-gateway { width: 14px; height: 14px; }
.legend .flow { width: 15px; }
.legend .msg-flow-sample {
  width: 20px;
  height: 1px;
  background: repeating-linear-gradient(
    to right, #888 0px, #888 3px,
    transparent 3px, transparent 5px
  );
}
```

---

## Process Examples for BTRC Platform

### High-Level Processes
1. Onboard Partner ISP
2. Submit Operational Data
3. Submit Revenue Report
4. Process QoS Alert
5. Generate Monthly Report
6. Run Speed Test (Mobile App)
7. Review ISP Performance
8. Manage User Account

### Example: Onboard Partner ISP

**Main Process (Page 1)**
```
Start → [1. Register to BTRC Portal] → [2. Receive Credentials] → [3. Configure API Access] → End
        └─[1.A Review Application]    └─[2.A Generate Credentials]  └─[3.A Create API Keys]
          ◇X (Approve/Reject)
```

**Sub-Process 1: Register to BTRC Portal (Page 2)**
```
Start → [1.1 Fill Company Info] → [1.2 Upload NID & Docs] → [1.3 Enter OTP] → End
        └─[1.1.A Validate Form]   └─[1.2.A Verify NID API]   └─[1.3.A Send OTP & Verify]
                                    ◇+ (parallel)
```

---

## Checklist for BPMN Diagrams

Before finalizing any BPMN diagram, verify:

- [ ] Fits within A4 width (605px/160mm)
- [ ] All tasks are numbered (1, 2, 3 or 1.1, 1.2, 1.3)
- [ ] All task names are action verbs
- [ ] Swim lanes show correct actors
- [ ] Sequence flows connect elements within lanes
- [ ] **Message flows** (thin dashed) connect sending task to receiving lane
- [ ] **Receive event (✉) only in receiving lane** (not at sender)
- [ ] Gateways used appropriately (XOR for decisions, AND for parallel)
- [ ] Sub-processes marked with [+] if expandable
- [ ] Legend included
- [ ] Breadcrumb shows location in hierarchy
- [ ] Not overcrowded (Single Responsibility Principle)

---

## Reference Files

| File | Purpose |
|------|---------|
| `isp-mon/bpmn-demo.html` | Working HTML example |
| `submission/doc/srs/TABLE-OF-CONTENTS.md` | SRS document structure |
| `EoITor2025-12-11-OriginalDocFromBTRC.pdf` | Original ToR |

---

*BTRC QoS Monitoring Platform - BPMN Guidelines*
*Telcobright - December 2024*
