# Doc 4: Original Requirement Matrices - Table of Contents

> **Document Purpose**: Summary and traceability of original ToR requirements
> **Target Format**: HTML (convertible to MS Word)
> **Status**: Layout Defined

---

## Document Structure

### 1. Executive Summary
- **1.1** Purpose of This Document
- **1.2** How to Use This Document
- **1.3** ToR Document Reference

### 2. Requirements by Category

#### 2.1 Business Objectives Requirements [ToR: Section 2, p.1-2]

| Req ID | High-Level Goal | Features/Requirements | ToR Page |
|--------|-----------------|----------------------|----------|
| BO-001 | Real-time operational data collection | Collect operational data from fixed broadband networks in real-time/near real-time | p.1 |
| BO-002 | QoS indicator processing | Process latency, throughput, availability, MTTR indicators | p.2 |
| BO-003 | Revenue & package data integration | Integrate revenue and package data from ISP systems | p.2 |
| BO-004 | Dashboards & analytics | Provide dashboards, reports, analytics for BTRC and stakeholders | p.2 |
| BO-005 | User-facing applications | Deploy mobile/web apps for crowd-sourced speed testing | p.2 |
| BO-006 | Secure SNMP data collection | Secure data collection via SNMP within ISP networks | p.2 |
| BO-007 | Long-term operation | Support maintenance, scalability, extensibility | p.2 |

#### 2.2 Data Acquisition Requirements [ToR: Section 3.2, p.2-6]

##### 2.2.1 SNMP-Based Collection [ToR: Section 3.2.1, p.3-4]

| Req ID | Requirement Category | Specific Requirements | ToR Page |
|--------|---------------------|----------------------|----------|
| DA-001 | Deployment Model | Software-based agents (containerized/Docker) | p.3 |
| DA-002 | Deployment Locations | ISP PoP and NOC locations | p.3 |
| DA-003 | Device Scope | Core routers, aggregation devices, BRAS (no CPE) | p.4 |
| DA-004 | Security - Attack Surface | SNMP not exposed to public networks | p.3 |
| DA-005 | Security - Credentials | Credentials within ISP security perimeter | p.3 |
| DA-006 | Security - Encryption | TLS encryption for data transmission | p.3 |
| DA-007 | Security - Isolation | Critical interfaces protected from external threats | p.3 |
| DA-008 | Data Metrics | Interface bandwidth utilization (up/down) | p.4 |
| DA-009 | Data Metrics | Interface status and errors | p.4 |
| DA-010 | Data Metrics | BRAS metrics | p.4 |
| DA-011 | Vendor Support | Multiple vendor MIBs (standard + specific) | p.4 |
| DA-012 | Configuration | Configurable polling intervals | p.4 |
| DA-013 | Alerts | Threshold-based alerts | p.4 |

##### 2.2.2 Automated QoS Measurements [ToR: Section 3.2.1, p.4]

| Req ID | Measurement Type | Details | ToR Page |
|--------|-----------------|---------|----------|
| DA-020 | Throughput | Download and upload throughput | p.4 |
| DA-021 | Latency | Network latency measurement | p.4 |
| DA-022 | Jitter | Jitter measurement | p.4 |
| DA-023 | Network Trace | Traceroute to multiple destinations | p.4 |
| DA-024 | Packet Loss | Packet loss measurement | p.4 |
| DA-025 | DNS | DNS resolution performance | p.4 |
| DA-026 | HTTP/Web | HTTP/web response times | p.4 |
| DA-027 | Reachability | Website reachability (national/international) | p.4 |

##### 2.2.3 API-Based Data Collection [ToR: Section 3.2.2, p.5-6]

| Req ID | Requirement Category | Specific Requirements | ToR Page |
|--------|---------------------|----------------------|----------|
| DA-030 | Data Source | Service Providers (ISPs) | p.5 |
| DA-031 | Submission Method | REST API endpoints by QoS Platform | p.5 |
| DA-032 | Data Flow | ISP Systems -> BTRC REST API -> QoS Platform | p.5 |
| DA-033 | ISP Responsibility | Accuracy, completeness, timely submission | p.5 |
| DA-034 | Source Systems | ERP integration | p.5 |
| DA-035 | Source Systems | NMS integration | p.5 |
| DA-036 | Source Systems | RADIUS server integration | p.5 |
| DA-037 | Source Systems | Billing software integration | p.5 |
| DA-038 | Source Systems | CRM/customer management integration | p.5 |

##### 2.2.4 Data Categories [ToR: Section 3.2.2, p.5-6]

**Operational & Product Data:**

| Req ID | Data Category | Data Elements | ToR Page |
|--------|--------------|---------------|----------|
| DC-001 | Package Definitions | Name, speeds, pricing, data cap, FUP, active/discontinued | p.5 |
| DC-002 | Subscriber Counts | Total by package and location | p.5 |
| DC-003 | New Subscribers | By package and location | p.5 |
| DC-004 | Removed Subscribers | By package and location | p.5 |
| DC-005 | Subscribed Bandwidth | Total per location/POP | p.5 |
| DC-006 | Access Nodes | POPs count by district/upazila/thana | p.5 |
| DC-007 | Upstream Capacity | Bandwidth capacity per location | p.5 |

**Service Quality Data:**

| Req ID | Data Category | Data Elements | ToR Page |
|--------|--------------|---------------|----------|
| DC-010 | Incident Reports | Outages, degradations with location | p.5 |
| DC-011 | Affected Areas | Areas and restoration times | p.5 |
| DC-012 | Complaints | Customer complaint volumes and resolution | p.6 |
| DC-013 | QoS Metrics | Latency, packet loss, throughput, uptime | p.6 |

**Revenue Data:**

| Req ID | Data Category | Data Elements | ToR Page |
|--------|--------------|---------------|----------|
| DC-020 | Total Revenue | Per provider, per period | p.9 |
| DC-021 | Revenue Breakdown | By package, region, customer segment | p.9 |
| DC-022 | ARPU | Average Revenue Per User indicators | p.9 |

##### 2.2.5 Legacy Migration [ToR: Section 3.2.5, p.7]

| Req ID | Aspect | Requirement | ToR Page |
|--------|--------|-------------|----------|
| DM-001 | Data Scope | All categories (operation, package, user data) | p.7 |
| DM-002 | Volume | Less than 2 TB | p.7 |
| DM-003 | Strategy | Full migration with data validation | p.7 |
| DM-004 | Parallel Operation | Not required; cutover approach | p.7 |

#### 2.3 Module Requirements

##### 2.3.1 Operational Data Module [ToR: Section 3.3, p.7-8]

| Req ID | Feature | Requirements | ToR Page |
|--------|---------|--------------|----------|
| OP-001 | Real-time Dashboards | Bandwidth utilization by provider, region, time | p.7 |
| OP-002 | User Statistics | Active users, new activations, churn | p.8 |
| OP-003 | Coverage Visualization | Map-based views, access nodes per region | p.8 |
| OP-004 | Historical Analysis | Trends across providers, regions, time periods | p.8 |

##### 2.3.2 QoS Monitoring Module [ToR: Section 3.4, p.8-9]

| Req ID | Parameter | Description | ToR Page |
|--------|-----------|-------------|----------|
| QM-001 | Service Availability | Network uptime percentage | p.8 |
| QM-002 | Download Speed | Actual vs. advertised speed ratio | p.8 |
| QM-003 | Upload Speed | Actual vs. advertised speed ratio | p.8 |
| QM-004 | Network Latency | Round-trip delay (95th percentile) | p.8 |
| QM-005 | Packet Loss | Data transmission reliability | p.8 |
| QM-006 | Jitter | Latency consistency/variation | p.8 |
| QM-007 | DNS Performance | Name resolution speed (ms) | p.8 |
| QM-008 | Web Reachability | Page accessibility status | p.8 |
| QM-009 | Web Response Time | Response time in ms | p.8 |
| QM-010 | Network Trace | Route to national/international IPs | p.9 |
| QM-011 | Degradation Detection | QoS below thresholds | p.9 |
| QM-012 | Outage Detection | Major incident identification | p.9 |

**QoS Module Features:**

| Req ID | Feature | Requirements | ToR Page |
|--------|---------|--------------|----------|
| QF-001 | Thresholds | Configurable per parameter/provider | p.9 |
| QF-002 | Detection | Automatic degradation/outage detection | p.9 |
| QF-003 | Geo-spatial | Regional QoS issue visualization | p.9 |
| QF-004 | Drill-down | National -> Operator -> Region -> Segment | p.9 |
| QF-005 | Standards | ITU/APT aligned computations | p.9 |

##### 2.3.3 Revenue & Package Analytics [ToR: Section 3.5, p.9-10]

| Req ID | Feature | Requirements | ToR Page |
|--------|---------|--------------|----------|
| RA-001 | Revenue Metrics | Total per provider/period, by package/region/segment | p.9 |
| RA-002 | ARPU | Average revenue per user calculations | p.9 |
| RA-003 | Package Master | All active/historical packages | p.10 |
| RA-004 | Tariff Tracking | Speed, data cap, FUP attributes | p.10 |
| RA-005 | User Distribution | Users per package | p.10 |
| RA-006 | Analysis | Package-wise QoS and churn | p.10 |
| RA-007 | Reporting | Time series, comparisons, Excel/PDF/CSV export | p.10 |

##### 2.3.4 User-facing Application [ToR: Section 3.6, p.10-11]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| UA-001 | Platform - Android | Mandatory | p.10 |
| UA-002 | Platform - iOS | Preferable | p.10 |
| UA-003 | Platform - Web | Preferable | p.10 |
| UA-004 | Speed Test | Download and upload measurement | p.10 |
| UA-005 | Jitter | Jitter and packet loss measurement | p.10 |
| UA-006 | Webpage Test | Page load time for reference sites | p.10 |
| UA-007 | History | Historical results display | p.10 |
| UA-008 | Feedback | Optional complaint submission | p.10 |
| UA-009 | Languages | Bengali and English | p.10 |

**Data Collected from User App:**

| Req ID | Data Element | Details | ToR Page |
|--------|--------------|---------|----------|
| UD-001 | Speed Results | Download/upload speeds | p.10 |
| UD-002 | Quality Metrics | Latency, jitter, packet loss | p.11 |
| UD-003 | DNS/Web Times | Response times | p.11 |
| UD-004 | Location | Geographic location (with consent) | p.11 |
| UD-005 | ISP Info | ISP and connection identification | p.11 |
| UD-006 | Metadata | Timestamp and device information | p.11 |
| UD-007 | Package Info | Service provider/package/tariff (if possible) | p.11 |
| UD-008 | Feedback | Complaint linked to test results | p.11 |

##### 2.3.5 Regulatory Monitoring Tool [ToR: Section 3.7, p.11]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| RT-001 | Platform - Android | Mandatory | p.11 |
| RT-002 | Platform - iOS | Preferable | p.11 |
| RT-003 | Platform - Web | Preferable | p.11 |
| RT-004 | Features | Same as user app | p.11 |
| RT-005 | Logging | Enhanced/detailed logging | p.11 |
| RT-006 | Reporting | Official measurement capability | p.11 |
| RT-007 | Languages | Bengali and English | p.11 |

##### 2.3.6 Data Storage & Dashboard [ToR: Section 3.8, p.12-13]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| DS-001 | Database Design | High-volume time-series data | p.12 |
| DS-002 | Retention | 1 year historical storage | p.12 |
| DS-003 | Retention Policy | Configurable retention policies | p.12 |
| DS-004 | BTRC Dashboards | Management dashboards | p.12 |
| DS-005 | Analyst Dashboards | Technical user dashboards | p.12 |
| DS-006 | Access Control | Role-based dashboards | p.12 |
| DS-007 | Custom Reports | Report builder with filters | p.13 |
| DS-008 | Scheduled Reports | Automatic periodic generation | p.13 |

**Platform Capabilities:**

| Req ID | Capability | Requirement | ToR Page |
|--------|------------|-------------|----------|
| PC-001 | Scalability | Handle 1500+ ISPs and millions of measurements | p.12 |
| PC-002 | Availability | High uptime with disaster recovery | p.12 |
| PC-003 | Retention | 1 year storage for analysis/audit | p.12 |
| PC-004 | Security | End-to-end encryption, RBAC, audit trails | p.12 |
| PC-005 | Polling | Maximum 15-minute resolution | p.13 |
| PC-006 | Drill-down | National -> Operator -> Region -> Segment | p.13 |
| PC-007 | Visualization | Map-based geographic/QoS views | p.13 |
| PC-008 | Granularity | Hourly, daily, weekly, monthly views | p.13 |
| PC-009 | Comparisons | Cross-provider and cross-region analytics | p.13 |

#### 2.4 Security & Compliance [ToR: Section 3.9, p.13]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| SC-001 | Access Control | Role-based access control | p.13 |
| SC-002 | Authentication | Secure authentication, MFA if required | p.13 |
| SC-003 | Encryption - Rest | Data encrypted at rest | p.13 |
| SC-004 | Encryption - Transit | TLS encryption | p.13 |
| SC-005 | Audit | Comprehensive audit trails | p.13 |
| SC-006 | BD Compliance | National cyber security regulations | p.13 |
| SC-007 | BTRC Policies | Internal IT/security policies | p.13 |

#### 2.5 Infrastructure Requirements [ToR: Section 3.10.1, p.14-15]

**HCI Cluster (5 Nodes Minimum):**

| Req ID | Component | Per-Node | Total | ToR Page |
|--------|-----------|----------|-------|----------|
| IF-001 | CPU | 32 cores | 160 cores | p.14 |
| IF-002 | Memory | 256 GB | 1.28 TB | p.14 |
| IF-003 | Boot Drives | 2x (mirrored) | 10x | p.14 |
| IF-004 | Data Drives | 3x minimum | 15x | p.14 |
| IF-005 | Cache Drives | 2x | 10x | p.14 |
| IF-006 | Network | 2x 10G SFP+ | 10x | p.14 |
| IF-007 | Management | IPMI/iLO/iDRAC | - | p.14 |
| IF-008 | Power | Redundant PSU | - | p.14 |

**Network Fabric:**

| Req ID | Component | Requirement | ToR Page |
|--------|-----------|-------------|----------|
| NF-001 | Configuration | 1+1 stack | p.15 |
| NF-002 | Redundancy | MC-LAG support | p.15 |
| NF-003 | Compatibility | HCI solution compatible | p.15 |
| NF-004 | Capacity | Sufficient 10G SFP+ ports | p.15 |

**Load Balancer:**

| Req ID | Component | Requirement | ToR Page |
|--------|-----------|-------------|----------|
| LB-001 | Type | Virtual appliance | p.15 |
| LB-002 | Availability | High availability config | p.15 |
| LB-003 | Capabilities | Application load balancing | p.15 |

#### 2.6 Testing Requirements [ToR: Section 3.11, p.15-16]

| Req ID | Test Type | Details | ToR Page |
|--------|-----------|---------|----------|
| TS-001 | Unit Testing | Component-level testing | p.15 |
| TS-002 | Integration Testing | Module integration testing | p.15 |
| TS-003 | Functional Testing | Feature verification | p.15 |
| TS-004 | Non-functional Testing | Performance, security, etc. | p.15 |
| TS-005 | Performance Testing | Load and stress testing | p.16 |
| TS-006 | Security Testing | Vulnerability assessment | p.16 |
| TS-007 | Compatibility Testing | Browsers, mobile devices | p.16 |
| TS-008 | UAT | With BTRC and selected ISPs | p.16 |

#### 2.7 Training Requirements [ToR: Section 3.12, p.16]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| TR-001 | User Manuals | Admin, Operator, Viewer roles | p.16 |
| TR-002 | Technical Docs | Architecture, APIs, data models, scripts | p.16 |
| TR-003 | BTRC Training | Technical and operational staff | p.16 |
| TR-004 | Support Training | Helpdesk/support staff | p.16 |
| TR-005 | Training Methods | Classroom, virtual, hands-on, evaluation | p.16 |

#### 2.8 Support & Maintenance [ToR: Section 3.13, p.16 & Section 8, p.23]

| Req ID | Requirement | Details | ToR Page |
|--------|-------------|---------|----------|
| SM-001 | Duration | 24 months maintenance period | p.23 |
| SM-002 | Bug Fixing | Bug fixes and minor enhancements | p.16 |
| SM-003 | Performance | Performance tuning | p.16 |
| SM-004 | Security | Security patching | p.16 |
| SM-005 | Onboarding | New provider/integration support | p.16 |
| SM-006 | SLA - Response | Incident response time | p.16 |
| SM-007 | SLA - Resolution | Resolution time by severity | p.16 |
| SM-008 | SLA - Availability | System availability target | p.16 |

#### 2.9 Personnel Requirements [ToR: Section 5, p.19-21]

| Req ID | Role | Count | Min. Experience | ToR Page |
|--------|------|-------|-----------------|----------|
| HR-001 | Project Manager | 1 | 10 years, 2+ Govt ICT | p.19 |
| HR-002 | Solution Architect | 1 | 7 years, telecom/OSS/BSS | p.19 |
| HR-003 | Network & QoS Expert | 1 | 7 years IP networks, SNMP | p.19 |
| HR-004 | Data Integration Expert | 1 | 5 years API, SNMP, ETL | p.19 |
| HR-005 | Senior Software Engineers | 2 | 5 years web development | p.19 |
| HR-006 | Mobile App Developers | 1-2 | 3 years Android (iOS pref) | p.20 |
| HR-007 | Database Admin/Data Engineer | 1 | 5-7 years, time-series | p.20 |
| HR-008 | Security Expert | 1 | 5-7 years, certifications | p.20 |
| HR-009 | QA Engineer | 1 | 5 years web and mobile | p.20 |
| HR-010 | UI/UX Designer | 1 | 3 years dashboards/mobile | p.20 |
| HR-011 | Business Analyst | 1 | 5 years, public sector | p.20 |
| HR-012 | Trainers/Support | 2-3 | Training, L1/L2 support | p.20 |
| HR-013 | Documentation Expert | 1 | 4 years ICT documentation | p.20 |
| HR-014 | Dedicated Ops (On-site) | 2 | System admin, NOC, data analysis | p.21 |

#### 2.10 Deliverables [ToR: Section 6, p.21-22]

| Req ID | Phase | Deliverables | ToR Page |
|--------|-------|--------------|----------|
| DL-001 | 6.1 | Inception Report & Project Plan | p.21 |
| DL-002 | 6.2 | SRS, HLD, Prototype | p.22 |
| DL-003 | 6.3 | Beta Release (core modules, pilot ISPs) | p.22 |
| DL-004 | 6.4 | Final System, Go-Live, UAT | p.22 |
| DL-005 | 6.5 | Training, Documentation, Handover | p.22 |

### 3. Requirements Traceability Matrix

| Our Doc Section | Requirement IDs | ToR Section | ToR Pages |
|-----------------|-----------------|-------------|-----------|
| SRS 3.1 | FR-DAQ-001 to FR-DAQ-033 | 3.2 | p.2-7 |
| SRS 3.2 | FR-OPS-001 to FR-OPS-009 | 3.3 | p.7-8 |
| SRS 3.3 | FR-QOS-001 to FR-QOS-016 | 3.4 | p.8-9 |
| SRS 3.4 | FR-REV-001 to FR-REV-012 | 3.5 | p.9-10 |
| SRS 3.5 | FR-APP-001 to FR-APP-015 | 3.6 | p.10-11 |
| SRS 3.6 | FR-REG-001 to FR-REG-007 | 3.7 | p.11 |
| SRS 3.7 | FR-DSH-001 to FR-DSH-012 | 3.8 | p.12-13 |
| SRS 3.8 | FR-SEC-001 to FR-SEC-008 | 3.9 | p.13 |
| Tech Proposal 5.2 | IF-001 to LB-003 | 3.10.1 | p.14-15 |
| Tech Proposal 7 | TS-001 to TS-008 | 3.11 | p.15-16 |
| Tech Proposal 8 | TR-001 to TR-005 | 3.12 | p.16 |
| Tech Proposal 9 | SM-001 to SM-008 | 3.13, 8 | p.16, 23 |

---

## Files to Generate

| File | Description | Priority |
|------|-------------|----------|
| `requirement-matrices.html` | Main matrices document | High |
| `tor-section-index.html` | ToR section quick reference | High |
| `traceability-matrix.html` | Full traceability matrix | High |
| `requirement-summary.html` | Executive summary of requirements | Medium |

---

*Document Layout Version: 1.0*
*Created: December 2024*
