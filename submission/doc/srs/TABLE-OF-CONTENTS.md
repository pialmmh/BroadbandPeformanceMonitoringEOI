# Doc 3: Software Requirements Specification (SRS) - Table of Contents

> **Document Purpose**: Detailed software requirements based on IEEE 830 standard
> **Target Format**: HTML (convertible to MS Word)
> **Status**: Layout Defined

---

## Document Structure

### 1. Introduction
- **1.1** Purpose
- **1.2** Scope
- **1.3** Definitions, Acronyms, and Abbreviations
  - BTRC, QoS, ISP, SNMP, BRAS, PoP, NOC, API, KPI, ETL, HCI, SLA
- **1.4** References
  - ToR Document (EOI Ref: 14.32.0000.000.400.07.0021.25.1685)
  - ITU QoS Standards
  - APT Standards
- **1.5** Document Overview

### 2. Overall Description
- **2.1** Product Perspective [ToR: Section 1, p.1]
  - **2.1.1** System Context Diagram
  - **DIAGRAM**: System Context
  - **2.1.2** System Interfaces
  - **2.1.3** User Interfaces
  - **2.1.4** Hardware Interfaces
  - **2.1.5** Software Interfaces
  - **2.1.6** Communication Interfaces
- **2.2** Product Functions Summary [ToR: Section 2, p.1-2]
  - **DIAGRAM**: High-level Use Case Overview
- **2.3** User Classes and Characteristics
  - **2.3.1** BTRC Administrator
  - **2.3.2** BTRC Analyst
  - **2.3.3** BTRC Management
  - **2.3.4** ISP Data Submitter
  - **2.3.5** ISP Viewer
  - **2.3.6** Public User (Mobile App)
  - **2.3.7** System Administrator
- **2.4** Operating Environment [ToR: Section 3.10, p.13-15]
- **2.5** Design and Implementation Constraints
- **2.6** Assumptions and Dependencies

### 3. Functional Requirements

#### 3.1 Data Acquisition Module [ToR: Section 3.2, p.2-6]

##### 3.1.1 SNMP Data Collection [ToR: Section 3.2.1, p.3-4]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-DAQ-001 | System shall deploy containerized SNMP collection agents | p.3 | Must |
| FR-DAQ-002 | Agents shall collect data from ISP PoP locations | p.3 | Must |
| FR-DAQ-003 | Agents shall collect data from ISP NOC locations | p.3 | Must |
| FR-DAQ-004 | System shall collect interface bandwidth utilization (up/down) | p.4 | Must |
| FR-DAQ-005 | System shall collect interface status and errors | p.4 | Must |
| FR-DAQ-006 | System shall collect BRAS metrics | p.4 | Must |
| FR-DAQ-007 | System shall support multiple vendor MIBs | p.4 | Must |
| FR-DAQ-008 | System shall support configurable polling intervals | p.4 | Must |
| FR-DAQ-009 | System shall support threshold-based alerts | p.4 | Must |

- **USE CASE**: UC-DAQ-01 Configure SNMP Agent
- **USE CASE**: UC-DAQ-02 Collect Network Metrics
- **USE CASE**: UC-DAQ-03 Manage SNMP Credentials
- **BPMN**: SNMP Data Collection Flow

##### 3.1.2 Automated QoS Measurements [ToR: Section 3.2.1, p.4]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-DAQ-010 | System shall measure download throughput | p.4 | Must |
| FR-DAQ-011 | System shall measure upload throughput | p.4 | Must |
| FR-DAQ-012 | System shall measure network latency | p.4 | Must |
| FR-DAQ-013 | System shall measure jitter | p.4 | Must |
| FR-DAQ-014 | System shall perform network trace to multiple destinations | p.4 | Must |
| FR-DAQ-015 | System shall measure packet loss | p.4 | Must |
| FR-DAQ-016 | System shall measure DNS resolution performance | p.4 | Must |
| FR-DAQ-017 | System shall measure HTTP/web response times | p.4 | Must |
| FR-DAQ-018 | System shall test website reachability (national/international) | p.4 | Must |

- **USE CASE**: UC-DAQ-04 Execute Automated Speed Test
- **USE CASE**: UC-DAQ-05 Perform Network Trace
- **BPMN**: Automated QoS Measurement Flow

##### 3.1.3 API-Based Data Submission [ToR: Section 3.2.2, p.5-6]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-DAQ-020 | System shall provide REST API endpoints for ISP data submission | p.5 | Must |
| FR-DAQ-021 | System shall accept data from ISP ERP systems | p.5 | Must |
| FR-DAQ-022 | System shall accept data from ISP NMS | p.5 | Must |
| FR-DAQ-023 | System shall accept data from ISP RADIUS servers | p.5 | Must |
| FR-DAQ-024 | System shall accept data from ISP Billing systems | p.5 | Must |
| FR-DAQ-025 | System shall accept data from ISP CRM systems | p.5 | Must |
| FR-DAQ-026 | System shall support real-time to monthly submission frequencies | p.6 | Must |
| FR-DAQ-027 | System shall validate submitted data integrity | p.6 | Must |
| FR-DAQ-028 | System shall deduplicate submitted data | p.6 | Must |
| FR-DAQ-029 | System shall timestamp all submitted data | p.6 | Must |

- **USE CASE**: UC-DAQ-06 Submit Operational Data via API
- **USE CASE**: UC-DAQ-07 Submit Revenue Data via API
- **BPMN**: ISP Data Submission Flow

##### 3.1.4 Data Migration [ToR: Section 3.2.5, p.7]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-DAQ-030 | System shall migrate all data from legacy DIS | p.7 | Must |
| FR-DAQ-031 | System shall support data volume up to 2 TB | p.7 | Must |
| FR-DAQ-032 | System shall validate migrated data | p.7 | Must |
| FR-DAQ-033 | System shall generate migration reconciliation report | p.7 | Must |

- **USE CASE**: UC-DAQ-08 Execute Data Migration
- **BPMN**: Legacy Data Migration Flow

#### 3.2 Operational Data Module [ToR: Section 3.3, p.7-8]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-OPS-001 | System shall display real-time bandwidth utilization by provider | p.7 | Must |
| FR-OPS-002 | System shall display real-time bandwidth utilization by region | p.7 | Must |
| FR-OPS-003 | System shall display bandwidth utilization by time period | p.7 | Must |
| FR-OPS-004 | System shall display total active users | p.8 | Must |
| FR-OPS-005 | System shall display new activations/churn | p.8 | Should |
| FR-OPS-006 | System shall provide map-based coverage visualization | p.8 | Must |
| FR-OPS-007 | System shall display access nodes/POPs per region | p.8 | Must |
| FR-OPS-008 | System shall provide historical trend comparison | p.8 | Must |
| FR-OPS-009 | System shall support hourly/daily/monthly views | p.8 | Must |

- **USE CASE**: UC-OPS-01 View Bandwidth Dashboard
- **USE CASE**: UC-OPS-02 View User Statistics
- **USE CASE**: UC-OPS-03 View Coverage Map
- **USE CASE**: UC-OPS-04 Compare Provider Performance
- **BPMN**: Operational Dashboard Workflow

#### 3.3 QoS Monitoring Module [ToR: Section 3.4, p.8-9]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-QOS-001 | System shall compute service availability percentage | p.8 | Must |
| FR-QOS-002 | System shall compute actual vs. advertised download speed ratio | p.8 | Must |
| FR-QOS-003 | System shall compute actual vs. advertised upload speed ratio | p.8 | Must |
| FR-QOS-004 | System shall compute network latency (95th percentile) | p.8 | Must |
| FR-QOS-005 | System shall compute packet loss percentage | p.8 | Must |
| FR-QOS-006 | System shall compute jitter statistics | p.8 | Must |
| FR-QOS-007 | System shall measure DNS resolution speed | p.8 | Must |
| FR-QOS-008 | System shall monitor web page reachability | p.8 | Must |
| FR-QOS-009 | System shall measure web site response time | p.8 | Must |
| FR-QOS-010 | System shall perform network trace to IP targets | p.9 | Must |
| FR-QOS-011 | System shall detect service degradation automatically | p.9 | Must |
| FR-QOS-012 | System shall detect outages automatically | p.9 | Must |
| FR-QOS-013 | System shall support configurable thresholds per parameter/provider | p.9 | Must |
| FR-QOS-014 | System shall provide geo-spatial QoS visualization | p.9 | Must |
| FR-QOS-015 | System shall support drill-down from national to network segment | p.9 | Must |
| FR-QOS-016 | System shall align KPIs with ITU/APT standards | p.9 | Must |

- **USE CASE**: UC-QOS-01 View QoS Dashboard
- **USE CASE**: UC-QOS-02 Configure QoS Thresholds
- **USE CASE**: UC-QOS-03 View QoS Alerts
- **USE CASE**: UC-QOS-04 Drill-down QoS Analysis
- **BPMN**: QoS Computation Flow
- **BPMN**: Alert Generation Flow

#### 3.4 Revenue & Package Analytics Module [ToR: Section 3.5, p.9-10]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-REV-001 | System shall display total revenue per provider per period | p.9 | Must |
| FR-REV-002 | System shall display revenue by package | p.9 | Should |
| FR-REV-003 | System shall display revenue by region | p.9 | Should |
| FR-REV-004 | System shall display revenue by customer segment | p.9 | Should |
| FR-REV-005 | System shall compute ARPU indicators | p.9 | Should |
| FR-REV-006 | System shall maintain master list of all packages | p.10 | Must |
| FR-REV-007 | System shall track package tariff attributes | p.10 | Must |
| FR-REV-008 | System shall display users per package | p.10 | Must |
| FR-REV-009 | System shall support package-wise QoS analysis | p.10 | Should |
| FR-REV-010 | System shall support churn analysis | p.10 | Should |
| FR-REV-011 | System shall provide time series trend reports | p.10 | Must |
| FR-REV-012 | System shall export reports to Excel/PDF/CSV | p.10 | Must |

- **USE CASE**: UC-REV-01 View Revenue Dashboard
- **USE CASE**: UC-REV-02 Manage Package Master Data
- **USE CASE**: UC-REV-03 Generate Revenue Report
- **BPMN**: Revenue Analytics Workflow

#### 3.5 User-facing Application Module [ToR: Section 3.6, p.10-11]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-APP-001 | System shall provide Android mobile application | p.10 | Must |
| FR-APP-002 | System shall provide iOS mobile application | p.10 | Should |
| FR-APP-003 | System shall provide web application | p.10 | Should |
| FR-APP-004 | Application shall measure download speed | p.10 | Must |
| FR-APP-005 | Application shall measure upload speed | p.10 | Must |
| FR-APP-006 | Application shall measure jitter | p.10 | Must |
| FR-APP-007 | Application shall measure packet loss | p.10 | Must |
| FR-APP-008 | Application shall test webpage loading time | p.10 | Must |
| FR-APP-009 | Application shall display historical test results | p.10 | Must |
| FR-APP-010 | Application shall support complaint/feedback submission | p.10 | Should |
| FR-APP-011 | Application shall support Bengali language | p.10 | Must |
| FR-APP-012 | Application shall support English language | p.10 | Must |
| FR-APP-013 | Application shall collect location with user consent | p.11 | Must |
| FR-APP-014 | Application shall identify ISP and connection | p.11 | Must |
| FR-APP-015 | Application shall send data securely to platform | p.11 | Must |

- **USE CASE**: UC-APP-01 Run Speed Test
- **USE CASE**: UC-APP-02 View Test History
- **USE CASE**: UC-APP-03 Submit Complaint/Feedback
- **USE CASE**: UC-APP-04 Change Language
- **BPMN**: Speed Test Execution Flow

#### 3.6 Regulatory Monitoring Tool [ToR: Section 3.7, p.11]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-REG-001 | Tool shall provide Android application | p.11 | Must |
| FR-REG-002 | Tool shall provide iOS application | p.11 | Should |
| FR-REG-003 | Tool shall provide web interface | p.11 | Should |
| FR-REG-004 | Tool shall perform all measurements as user app | p.11 | Must |
| FR-REG-005 | Tool shall provide enhanced logging | p.11 | Must |
| FR-REG-006 | Tool shall generate official measurement reports | p.11 | Must |
| FR-REG-007 | Tool shall support Bengali and English | p.11 | Must |

- **USE CASE**: UC-REG-01 Conduct Official Measurement
- **USE CASE**: UC-REG-02 Generate Measurement Report

#### 3.7 Data Storage & Dashboard Module [ToR: Section 3.8, p.12-13]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-DSH-001 | System shall store high-volume time-series data | p.12 | Must |
| FR-DSH-002 | System shall retain historical data for 1 year | p.12 | Must |
| FR-DSH-003 | System shall support configurable retention policies | p.12 | Must |
| FR-DSH-004 | System shall provide BTRC management dashboards | p.12 | Must |
| FR-DSH-005 | System shall provide technical analyst dashboards | p.12 | Must |
| FR-DSH-006 | System shall support role-based dashboard access | p.12 | Must |
| FR-DSH-007 | System shall provide custom report builder | p.13 | Must |
| FR-DSH-008 | System shall support scheduled report generation | p.13 | Must |
| FR-DSH-009 | System shall support drill-down analytics | p.13 | Must |
| FR-DSH-010 | System shall provide geographic/map visualization | p.13 | Must |
| FR-DSH-011 | System shall support comparative analytics | p.13 | Must |
| FR-DSH-012 | System shall poll data at maximum 15-minute resolution | p.13 | Must |

- **USE CASE**: UC-DSH-01 View Management Dashboard
- **USE CASE**: UC-DSH-02 Build Custom Report
- **USE CASE**: UC-DSH-03 Schedule Report
- **USE CASE**: UC-DSH-04 Export Report
- **BPMN**: Report Generation Workflow

#### 3.8 Security & Access Control [ToR: Section 3.9, p.13]

| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| FR-SEC-001 | System shall implement role-based access control | p.13 | Must |
| FR-SEC-002 | System shall support secure authentication | p.13 | Must |
| FR-SEC-003 | System shall support multi-factor authentication | p.13 | Should |
| FR-SEC-004 | System shall encrypt data at rest | p.13 | Must |
| FR-SEC-005 | System shall encrypt data in transit (TLS) | p.13 | Must |
| FR-SEC-006 | System shall maintain comprehensive audit trails | p.13 | Must |
| FR-SEC-007 | System shall comply with Bangladesh cyber security regulations | p.13 | Must |
| FR-SEC-008 | System shall comply with BTRC IT/security policies | p.13 | Must |

- **USE CASE**: UC-SEC-01 User Login
- **USE CASE**: UC-SEC-02 Manage User Roles
- **USE CASE**: UC-SEC-03 View Audit Logs
- **BPMN**: User Authentication Flow

### 4. Non-Functional Requirements

#### 4.1 Performance Requirements [ToR: Section 3.8, p.12-13]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-PRF-001 | System shall handle data from 1500+ ISPs | p.12 | Must |
| NFR-PRF-002 | System shall handle millions of measurements | p.12 | Must |
| NFR-PRF-003 | System shall poll data at <=15 minute resolution | p.13 | Must |
| NFR-PRF-004 | Dashboard shall load within 3 seconds | - | Should |

#### 4.2 Availability Requirements [ToR: Section 3.8, p.12]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-AVL-001 | System shall maintain 99.5% uptime | p.12 | Must |
| NFR-AVL-002 | System shall support disaster recovery | p.12 | Must |
| NFR-AVL-003 | System shall support high availability configuration | p.15 | Must |

#### 4.3 Scalability Requirements
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-SCL-001 | System shall scale horizontally | p.12 | Must |
| NFR-SCL-002 | System shall support future node expansion | p.15 | Must |

#### 4.4 Security Requirements [ToR: Section 3.9, p.13]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-SEC-001 | All data transmission shall use TLS encryption | p.13 | Must |
| NFR-SEC-002 | SNMP credentials shall remain within ISP perimeter | p.3 | Must |
| NFR-SEC-003 | System shall pass security vulnerability testing | p.16 | Must |

#### 4.5 Usability Requirements
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-USB-001 | UI shall support Bengali and English languages | p.10-11 | Must |
| NFR-USB-002 | Mobile app shall follow platform best practices | p.11 | Must |
| NFR-USB-003 | Dashboards shall be accessible on modern browsers | p.16 | Must |

#### 4.6 Compatibility Requirements [ToR: Section 3.11, p.16]
| Req ID | Requirement | ToR Ref | Priority |
|--------|-------------|---------|----------|
| NFR-CMP-001 | System shall support major web browsers | p.16 | Must |
| NFR-CMP-002 | Mobile app shall support Android devices | p.10 | Must |
| NFR-CMP-003 | Mobile app shall support iOS devices | p.10 | Should |

### 5. External Interface Requirements

#### 5.1 User Interfaces
- **5.1.1** BTRC Admin Dashboard
- **5.1.2** ISP Portal
- **5.1.3** Public Dashboard
- **5.1.4** Mobile Application (User)
- **5.1.5** Regulatory Monitoring Tool

#### 5.2 Hardware Interfaces
- **5.2.1** Network Devices (SNMP)
- **5.2.2** HCI Infrastructure

#### 5.3 Software Interfaces
- **5.3.1** ISP ERP Systems
- **5.3.2** ISP NMS
- **5.3.3** ISP RADIUS
- **5.3.4** ISP Billing Systems
- **5.3.5** ISP CRM Systems
- **5.3.6** BTRC Reporting Systems
- **5.3.7** BI Tools

#### 5.4 Communication Interfaces
- **5.4.1** REST APIs (JSON)
- **5.4.2** SNMP v2c/v3
- **5.4.3** TLS/HTTPS

### 6. Use Case Specifications

#### 6.1 Use Case Diagrams
- **DIAGRAM**: UC-D01 Data Acquisition Use Cases
- **DIAGRAM**: UC-D02 Operational Module Use Cases
- **DIAGRAM**: UC-D03 QoS Monitoring Use Cases
- **DIAGRAM**: UC-D04 Revenue Analytics Use Cases
- **DIAGRAM**: UC-D05 User Application Use Cases
- **DIAGRAM**: UC-D06 Dashboard & Reporting Use Cases
- **DIAGRAM**: UC-D07 Administration Use Cases

#### 6.2 Detailed Use Case Specifications
(Each use case with Actor, Precondition, Main Flow, Alternative Flows, Postcondition)

### 7. Process Flows (BPMN)

- **BPMN-01**: SNMP Data Collection Process
- **BPMN-02**: ISP Data Submission Process
- **BPMN-03**: QoS KPI Computation Process
- **BPMN-04**: Alert Generation & Notification Process
- **BPMN-05**: Speed Test Execution Process
- **BPMN-06**: Report Generation Process
- **BPMN-07**: User Authentication Process
- **BPMN-08**: Data Migration Process

### 8. Data Requirements

#### 8.1 Data Model Overview
- **DIAGRAM**: Entity Relationship Diagram (Conceptual)

#### 8.2 Data Dictionary
- **TABLE**: Operational Data Entities
- **TABLE**: QoS Metrics Entities
- **TABLE**: Revenue & Package Entities
- **TABLE**: User & Authentication Entities

### 9. Appendices
- **Appendix A**: Glossary
- **Appendix B**: ToR Requirements Traceability Matrix
- **Appendix C**: API Specification Summary
- **Appendix D**: Data Validation Rules

---

## Requirements Summary

| Category | Total Requirements | Must | Should | Could |
|----------|-------------------|------|--------|-------|
| Data Acquisition | 33 | 30 | 3 | 0 |
| Operational Module | 9 | 8 | 1 | 0 |
| QoS Monitoring | 16 | 16 | 0 | 0 |
| Revenue Analytics | 12 | 7 | 5 | 0 |
| User Application | 15 | 12 | 3 | 0 |
| Regulatory Tool | 7 | 5 | 2 | 0 |
| Dashboard & Storage | 12 | 12 | 0 | 0 |
| Security | 8 | 7 | 1 | 0 |
| **Functional Total** | **112** | **97** | **15** | **0** |
| Non-Functional | 12 | 10 | 2 | 0 |
| **Grand Total** | **124** | **107** | **17** | **0** |

---

## Files to Generate

| File | Description | Priority |
|------|-------------|----------|
| `srs-main.html` | Main SRS document | High |
| `functional-requirements.html` | All FR tables | High |
| `non-functional-requirements.html` | All NFR tables | High |
| `use-case-diagrams.html` | Use case diagrams | High |
| `use-case-specifications.html` | Detailed use cases | Medium |
| `bpmn-process-flows.html` | BPMN diagrams | Medium |
| `data-model.html` | ER diagrams & data dictionary | Medium |
| `traceability-matrix.html` | Requirements to ToR mapping | High |

---

*Document Layout Version: 1.0*
*Created: December 2024*
