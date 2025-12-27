# BTRC QoS Monitoring Platform - Project Context

> **Project Type**: Government Tender Documentation (EOI Response)
> **Client**: Bangladesh Telecommunication Regulatory Commission (BTRC)
> **EOI Reference**: 14.32.0000.000.400.07.0021.25.1685
> **Bidder**: Telcobright

---

## Quick Reference

| Item | Value |
|------|-------|
| **Project Name** | Online Operation and QoS Monitoring System for Fixed Broadband Service Providers |
| **Procurement Method** | Quality and Cost Based Selection (QCBS) |
| **Duration** | 30 months (6 months build + 24 months maintenance) |
| **EOI Closing** | 28/12/2025, 02:00 PM |
| **Location** | Dhaka, Bangladesh |

---

## Project Folder Structure

```
BroadbandPeformanceMonitoringEOI/
├── EoITor2025-12-11-OriginalDocFromBTRC.pdf    # Original ToR (24 pages)
├── btrc-project-knowledge-base-tor-summary.md   # ToR summary
├── CLAUDE.md                                    # THIS FILE - Project context
├── MOCK-UI-AGENT-INSTRUCTIONS.md               # Instructions for UI agent
│
├── submission/doc/                              # Documentation files
│   ├── PROJECT-KNOWLEDGE-BASE.md               # Shared knowledge base
│   ├── eoi-response/                           # Doc 1: EOI Response
│   │   └── TABLE-OF-CONTENTS.md
│   ├── techical-proposal/                      # Doc 2: Technical Proposal
│   │   └── TABLE-OF-CONTENTS.md
│   ├── srs/                                    # Doc 3: SRS
│   │   └── TABLE-OF-CONTENTS.md
│   ├── requirement-matrices/                   # Doc 4: Requirement Matrices
│   │   └── TABLE-OF-CONTENTS.md
│   ├── mock-ui/                                # Doc 5: Mock UI specs
│   │   └── TABLE-OF-CONTENTS.md
│   └── diagram-guidelines/                     # Diagram creation guides
│
├── isp-mon/                                    # React Mock UI Code
│   ├── src/
│   │   ├── components/                         # React components
│   │   ├── contexts/                           # State management
│   │   ├── models/                             # TypeScript models
│   │   ├── services/                           # Business logic
│   │   └── data/                               # Mock data
│   ├── package.json                            # Dependencies (MUI, Recharts)
│   └── README.md                               # Setup instructions
│
├── worktrees/                                  # Git worktrees for parallel work
│   ├── wt-eoi-response/                        # Branch: doc1-eoi-response
│   ├── wt-technical-proposal/                  # Branch: doc2-technical-proposal
│   ├── wt-srs/                                 # Branch: doc3-srs
│   ├── wt-requirement-matrices/                # Branch: doc4-requirement-matrices
│   └── wt-mock-ui/                             # Branch: doc5-mock-ui
│
└── books/                                      # Reference materials
```

---

## What We're Building (Platform Overview)

A **National QoS Monitoring Platform** for BTRC to monitor 1500+ ISPs in Bangladesh:

### Core Modules
1. **Data Acquisition Layer** - SNMP collectors, REST APIs for ISP data submission
2. **Operational Data Module** - Real-time bandwidth, users, coverage dashboards
3. **QoS Monitoring Module** - KPI computation, alerts, anomaly detection
4. **Revenue & Package Analytics** - Tariff tracking, revenue analysis, ARPU
5. **User-facing Apps** - Mobile (Android/iOS) + Web speed test applications
6. **Regulatory Tool** - BTRC internal measurement tool
7. **Dashboards & Reports** - Grafana-style analytics with custom report builder

### Key QoS Parameters (ToR Section 3.4, p.8-9)
- Service Availability (uptime %)
- Download/Upload Speed (actual vs advertised ratio)
- Network Latency (95th percentile)
- Packet Loss, Jitter
- DNS Performance
- Web Page Reachability & Response Time
- Network Trace (traceroute)
- Service Degradation & Outage Detection

---

## Documentation We're Producing

### Doc 1: EOI Response
Formal compliance document proving Telcobright's eligibility:
- Company profile, certifications (ISO 9001 mandatory)
- 5+ similar projects, 2+ projects >= BDT 2 Crore
- 20 FTE ICT staff, financial capacity >= BDT 3 Crore

### Doc 2: Technical Proposal
Solution architecture and approach:
- Microservices architecture (Java/Kafka/Flink)
- Module-by-module design
- 15+ architecture diagrams
- Gantt chart project plan

### Doc 3: SRS (Software Requirements Specification)
IEEE 830 compliant requirements:
- 124 requirements (107 Must, 17 Should)
- Use case diagrams and specifications
- BPMN process flows
- Data model and dictionary

### Doc 4: Requirement Matrices
Traceability from ToR to our documents:
- All ToR requirements with page numbers
- Mapping to SRS requirement IDs
- Compliance checklist

### Doc 5: Mock UIs
Visual prototypes for key interfaces:
- BTRC Admin Dashboards (Executive, Operational, QoS, Revenue)
- Mobile Speed Test App (Android)
- ISP Data Submission Portal
- Regulatory Monitoring Tool

---

## Technology Stack (Proposed)

| Layer | Technology |
|-------|------------|
| **Frontend** | React + TypeScript + MUI |
| **Mobile** | Flutter (Android mandatory, iOS preferred) |
| **API Gateway** | Kong |
| **Message Queue** | Apache Kafka |
| **Stream Processing** | Apache Flink |
| **Backend Services** | Java 21 (Quarkus/Spring Boot) |
| **Time-Series DB** | TimescaleDB |
| **Analytics DB** | ClickHouse |
| **Relational DB** | PostgreSQL + PostGIS |
| **Dashboards** | Grafana |
| **Authentication** | Keycloak |
| **Container Orchestration** | Kubernetes |

---

## isp-mon React Project (Mock UI)

The `isp-mon/` folder contains a React + TypeScript project cloned from infra-mon:

### Key Technologies
- **React 19** with TypeScript
- **MUI (Material UI) v7** - Component library
- **Recharts** - Charting library
- **React Router v7** - Navigation
- **Axios** - API client

### Running the Mock UI
```bash
cd isp-mon
npm install
npm start          # Runs on port 3001
```

### Component Structure to Create
```
src/components/
├── BtrcDashboard/           # Executive overview
├── OperationalDashboard/    # Bandwidth, users, coverage
├── QosDashboard/            # KPIs, alerts, drill-down
├── RevenueDashboard/        # Revenue, packages, ARPU
├── ReportBuilder/           # Custom report builder
├── IspPortal/               # ISP data submission
├── MobileApp/               # Mobile UI mockups (web-based)
├── RegulatoryTool/          # BTRC measurement tool
└── shared/                  # Common components
```

---

## ToR Quick Reference (Page Numbers)

| Section | Title | Pages |
|---------|-------|-------|
| 1 | Background of the Project | p.1 (PDF p.3) |
| 2 | Objectives of the Assignment | p.1-2 |
| 3.1 | Inception, Requirement Study and System Design | p.2 |
| 3.2 | Data Acquisition and Integration Layer | p.2-6 |
| 3.3 | Operational Data Module | p.7-8 |
| 3.4 | QoS Monitoring Module | p.8-9 |
| 3.5 | Revenue and Package Analytics Module | p.9-10 |
| 3.6 | User-facing Application (Mobile/Web) | p.10-11 |
| 3.7 | Regulatory/Monitoring Tool | p.11 |
| 3.8 | Data Storage, Analytics and Dashboard | p.12-13 |
| 3.9 | Security, Privacy and Compliance | p.13 |
| 3.10 | System Architecture, Hosting and Performance | p.13-15 |
| 3.11 | Testing and Quality Assurance | p.15-16 |
| 3.12 | Training and Knowledge Transfer | p.16 |
| 3.13 | Post-Implementation Support and Maintenance | p.16 |
| 4 | Required Experience, Resources & Capacity | p.17-18 |
| 5 | Key Professional Staff Requirements | p.19-21 |
| 6 | Deliverables and Indicative Payment Schedule | p.21-22 |
| 7 | Project Duration | p.22-23 |
| 8 | Maintenance and Support | p.23 |

---

## Git Worktrees for Parallel Work

5 worktrees created for independent documentation work:

```bash
# List all worktrees
git worktree list

# Work on specific document
cd worktrees/wt-eoi-response        # EOI Response
cd worktrees/wt-technical-proposal  # Technical Proposal
cd worktrees/wt-srs                 # SRS Document
cd worktrees/wt-requirement-matrices # Requirement Matrices
cd worktrees/wt-mock-ui             # Mock UI

# Commit changes in worktree
git add . && git commit -m "message"

# Merge back to master
git checkout master
git merge doc1-eoi-response
```

---

## Key Files to Read

1. **Original ToR**: `EoITor2025-12-11-OriginalDocFromBTRC.pdf` (24 pages)
2. **ToR Summary**: `btrc-project-knowledge-base-tor-summary.md`
3. **Shared Knowledge**: `submission/doc/PROJECT-KNOWLEDGE-BASE.md`
4. **Document Layouts**: `submission/doc/*/TABLE-OF-CONTENTS.md`
5. **Mock UI Instructions**: `MOCK-UI-AGENT-INSTRUCTIONS.md`

---

## Important Notes

- **Port for React**: Use port 7000 range for containers (per user preference)
- **Java Version**: JDK 21 for this project
- **Languages**: Bengali and English support required for all UIs
- **Map Data**: Bangladesh geographic hierarchy (Division -> District -> Upazila -> Thana)
- **Standards**: ITU and APT QoS standards apply

---

## Contact for EOI

| Role | Name | Contact |
|------|------|---------|
| Official | Mohammad Rohol Amin | Tel: +880255667766 (Ext. 105) |
| Designation | Director, Administration Division | Email: diradmin@btrc.gov.bd |
| Address | Plot#E-5/A, Agargaon Administrative Area, Sher-e-Bangla Nagar, Dhaka |

---

*Last Updated: December 2024*
