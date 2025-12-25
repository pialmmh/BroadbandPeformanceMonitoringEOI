# BTRC QoS Monitoring Platform - Shared Project Knowledge Base

> **For All Documentation Agents**: This file contains the common project context shared across all worktrees.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Online Operation and QoS Monitoring System for Fixed Broadband Service Providers |
| **Client** | Bangladesh Telecommunication Regulatory Commission (BTRC) |
| **EOI Reference** | 14.32.0000.000.400.07.0021.25.1685 |
| **Procurement Method** | Quality and Cost Based Selection (QCBS) |
| **Duration** | 30 months (6 months build + 24 months maintenance) |
| **Location** | Dhaka, Bangladesh |
| **EOI Closing Date** | 28/12/2025, 02:00 PM |

---

## Document Cross-Reference Map

All generated documents must reference back to the original ToR sections:

| Our Document | Purpose | Maps to ToR Sections |
|--------------|---------|---------------------|
| **doc1: EOI Response** | Formal response to EOI | Pages 1-2, Section 4 |
| **doc2: Technical Proposal** | Technical solution overview | Sections 3.1-3.13, 5 |
| **doc3: SRS** | Detailed requirements specification | Sections 3.2-3.8 |
| **doc4: Requirement Matrices** | Traceability matrix | All sections |
| **doc5: Mock UIs** | Visual prototypes | Sections 3.3-3.8 |

---

## ToR Section Reference (Original Document Pages)

| ToR Section | Title | Page |
|-------------|-------|------|
| 1 | Background of the Project | 1 (p.3 PDF) |
| 2 | Objectives of the Assignment | 1-2 (p.3-4) |
| 3 | Scope of Work | 2-16 (p.4-18) |
| 3.1 | Inception, Requirement Study and System Design | 2 (p.4) |
| 3.2 | Data Acquisition and Integration Layer | 2-6 (p.4-8) |
| 3.2.1 | Network Operation Data via SNMP | 3 (p.5) |
| 3.2.2 | Integration with Service Provider Systems via APIs | 5 (p.7) |
| 3.2.3 | Integration with BTRC and Other Systems | 6 (p.8) |
| 3.2.4 | Service Provider Facilitation and Accountability | 6 (p.8) |
| 3.2.5 | Legacy DIS Data Migration | 7 (p.9) |
| 3.3 | Operational Data Module | 7-8 (p.9-10) |
| 3.4 | QoS Monitoring Module | 8-9 (p.10-11) |
| 3.5 | Revenue and Package Analytics Module | 9-10 (p.11-12) |
| 3.6 | User-facing Application (Mobile and/or Web) | 10-11 (p.12-13) |
| 3.7 | Regulatory/Monitoring Tool | 11 (p.13) |
| 3.8 | Data Storage, Analytics and Dashboard | 12-13 (p.14-15) |
| 3.9 | Security, Privacy and Compliance | 13 (p.15) |
| 3.10 | System Architecture, Hosting and Performance | 13-15 (p.15-17) |
| 3.10.1 | Minimum Infrastructure Specifications | 14-15 (p.16-17) |
| 3.11 | Testing and Quality Assurance | 15-16 (p.17-18) |
| 3.12 | Training and Knowledge Transfer | 16 (p.18) |
| 3.13 | Post-Implementation Support and Maintenance | 16 (p.18) |
| 4 | Required Experience, Resources & Capacity | 17-18 (p.19-20) |
| 5 | Key Professional Staff Requirements | 19-21 (p.21-23) |
| 6 | Deliverables and Indicative Payment Schedule | 21-22 (p.23-24) |
| 7 | Project Duration | 22-23 (p.24-25) |
| 8 | Maintenance and Support | 23 (p.25) |
| 9 | Performance Monitoring | 23 (p.25) |
| 10 | Taxation | 23 (p.25) |
| 11 | Intellectual Property & Copyright | 24 (p.26) |
| 12 | Confidentiality | 24 (p.26) |

---

## Core Platform Modules

1. **Data Acquisition Layer** - SNMP collectors, REST API gateway, ISP adapters
2. **Operational Data Module** - Real-time dashboards, bandwidth, users, coverage
3. **QoS Monitoring Module** - KPI computation, threshold alerts, anomaly detection
4. **Revenue & Package Analytics** - Tariff analysis, revenue metrics, churn
5. **User-facing Apps** - Mobile (Android/iOS), Web speed test apps
6. **Regulatory Tool** - BTRC internal measurement tool
7. **Data Storage & Analytics** - Time-series DB, dashboards, reports

---

## Key QoS Parameters (ToR Section 3.4, Page 8)

| Parameter | Description | ToR Reference |
|-----------|-------------|---------------|
| Service Availability | Network uptime percentage | p.8 |
| Download Speed | Actual vs. advertised speed ratio | p.8 |
| Upload Speed | Actual vs. advertised speed ratio | p.8 |
| Network Latency | Round-trip delay (95th percentile) | p.8 |
| Packet Loss | Data transmission reliability % | p.8 |
| Jitter | Latency consistency/variation | p.8 |
| DNS Performance | Name resolution speed (ms) | p.8 |
| Web Page Reachability | Accessibility status | p.8 |
| Web Site Response Time | Response time in ms | p.8 |
| Network Trace | Path check to national/international IPs | p.9 |
| Service Degradation Detection | QoS falling below thresholds | p.9 |
| Outage Detection | Major incident identification | p.9 |

---

## Infrastructure Requirements (ToR Section 3.10.1, Pages 14-15)

### HCI Cluster (5 Nodes Minimum)
- CPU: 32 cores per node (160 total)
- Memory: 256 GB per node (1.25 TB total)
- Boot Drives: 2x per node (mirrored)
- Data Drives: 3x per node minimum
- Cache Drives: 2x per node
- Network: 2x 10G SFP+ per node

### Network Fabric
- 1+1 stack configuration
- MC-LAG support
- Compatible with HCI solution

---

## Recommended Technology Stack

| Layer | Technology |
|-------|------------|
| Data Collection | Telegraf, Prometheus, GoFlow2 |
| Message Queue | Apache Kafka |
| Stream Processing | Apache Flink |
| Time-Series DB | TimescaleDB |
| Analytics DB | ClickHouse |
| Relational + Geo | PostgreSQL + PostGIS |
| API Gateway | Kong |
| Authentication | Keycloak |
| Dashboards | Grafana |
| Mobile App | Flutter (Android + iOS) |
| Containerization | Docker, Kubernetes |

---

## Deliverables & Milestones (ToR Section 6, Pages 21-22)

| Phase | Deliverable | ToR Reference |
|-------|-------------|---------------|
| 6.1 | Inception Report & Project Plan | p.21 |
| 6.2 | SRS, HLD & Prototype | p.22 |
| 6.3 | Beta Release (core modules, pilot ISPs) | p.22 |
| 6.4 | Final System, Go-Live & UAT | p.22 |
| 6.5 | Training, Documentation & Handover | p.22 |

---

## Vendor Eligibility Summary (ToR Section 4, Pages 17-18)

| Requirement | Criteria | ToR Reference |
|-------------|----------|---------------|
| Business Experience | 5 years ICT in Bangladesh | p.17 |
| Similar Projects | 5+ with Govt/Semi-Govt/MNC | p.17 |
| Large Projects | 2+ completed >= BDT 2 Crore | p.17 |
| Platform Experience | 2+ in monitoring/analytics/OSS/BSS/QoS | p.17 |
| Annual Turnover | >= BDT 3 Crore (3 years avg) | p.17 |
| Liquid Assets | >= BDT 3 Crore | p.17 |
| ISO 9001 | Mandatory | p.17 |
| ISO 27001 | Preferable | p.17 |
| ICT Staff | Minimum 20 full-time | p.17 |

---

*Last Updated: December 2024*
*Source: BTRC EOI ToR Document*
