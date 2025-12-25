# BTRC QoS Monitoring Platform - Project Knowledge Base

> **Purpose**: Reference document for all conversations in this project. Contains complete technical scope, requirements, and context derived from the official Terms of Reference (ToR).

---

## 1. Project Identity

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

## 2. Business Problems (Why This Project Exists)

1. **Limited Real-Time Supervision**: QoS data currently collected through periodic reports and limited system integrations — BTRC cannot perform real-time supervision or detect service degradation early.

2. **No Independent Measurement Tools**: End-users have limited tools to independently measure and report service quality.

3. **Data Correlation Gap**: No centralized, data-driven way to correlate QoS metrics with coverage and revenue data for regulatory analysis.

4. **Fragmented Reporting**: 1500+ ISPs submit data in inconsistent formats; no unified platform for comparison and enforcement.

---

## 3. Business Objectives (Measurable Outcomes)

1. Collect **real-time/near real-time operational data** from all fixed broadband networks
2. Process **QoS indicators** (latency, throughput, availability, MTTR) systematically
3. Integrate **revenue and package data** from service providers for regulatory analysis
4. Provide **dashboards, reports, analytics** for BTRC and authorized stakeholders
5. Deploy **user-facing mobile/web apps** for crowd-sourced speed testing
6. Ensure **secure data collection** via SNMP within ISP internal networks
7. Support **long-term operation, maintenance, scalability and extensibility**

---

## 4. Product Concept (The Solution)

A centralized, secure, and scalable **National QoS Monitoring Platform** comprising:

### 4.1 Core Components

| Component | Description |
|-----------|-------------|
| **Data Acquisition Layer** | SNMP collectors, REST API gateway, ISP system adapters |
| **Processing Layer** | Stream processing, ETL, KPI computation engine |
| **Storage Layer** | Time-series DB, analytics DB, geo-enabled relational DB |
| **Analytics Engine** | QoS calculations, anomaly detection, trend analysis |
| **Presentation Layer** | BTRC Admin Dashboard, ISP Portal, Public Dashboard |
| **User Applications** | Mobile app (Android mandatory, iOS preferred), Web app |
| **Regulatory Tool** | BTRC-specific measurement and monitoring tool |

### 4.2 Key Platform Capabilities

| Capability | Requirement |
|------------|-------------|
| Scalability | Handle data from 1500+ ISPs and millions of measurements |
| Availability | 99.5% uptime with disaster recovery |
| Data Retention | 1 year historical storage for analysis and audit |
| Security | End-to-end encryption, RBAC, audit trails |
| Data Polling | Maximum 15-minute resolution |
| Drill-down | National → Operator → Region → Network segment |

---

## 5. Technical Scope Details

### 5.1 Data Collection Methods

#### SNMP-Based Collection (Within ISP Networks)
- **Deployment**: Software-based agents (containerized/Docker)
- **Locations**: ISP PoP (Point of Presence) and NOC
- **Device Scope**: Core routers, aggregation devices, BRAS (CPE excluded)
- **Metrics**: Interface bandwidth utilization, status, errors, BRAS metrics
- **Security**: No exposure to public networks, credentials within ISP perimeter, TLS encryption

#### API-Based Collection (ISP Systems)
- **Source Systems**: ERP, NMS, RADIUS, Billing, CRM
- **Method**: REST API endpoints provided by QoS Platform
- **Data Flow**: ISP Systems → BTRC REST API → QoS Platform
- **Responsibility**: ISPs accountable for accuracy, completeness, timely submission

#### Automated QoS Measurements
- Download/upload throughput
- Network latency and jitter
- Network trace (traceroute) to multiple destinations
- Packet loss
- DNS resolution performance
- HTTP/web response times
- Website reachability (national and international)

### 5.2 Data Categories

#### Operational & Product Data
- Package definitions (name, speeds, pricing, data cap, FUP, active/discontinued)
- Subscriber counts by package and location
- New/removed subscribers by package and location
- Total subscribed bandwidth per location/POP
- Access nodes/POPs count by district/upazila/thana
- Upstream bandwidth capacity per location

#### Service Quality Data
- Network incident reports (outages, degradations) with location
- Affected areas and restoration times
- Customer complaint volumes and resolution metrics
- Latency, packet loss, throughput statistics, uptime

#### Revenue Data
- Total revenue per provider, per period
- Revenue by package, region, customer segment
- ARPU indicators (where derivable)

---

## 6. QoS Parameters (Key Performance Indicators)

| Parameter | Description | Measurement Method |
|-----------|-------------|-------------------|
| Service Availability | Network uptime percentage | SNMP polling, incident reports |
| Download Speed | Actual vs. advertised speed ratio | Automated probes, user app |
| Upload Speed | Actual vs. advertised speed ratio | Automated probes, user app |
| Network Latency | Round-trip delay (95th percentile) | ICMP, TCP probes |
| Packet Loss | Data transmission reliability % | Network probes |
| Jitter | Latency consistency/variation | Continuous measurement |
| DNS Performance | Name resolution speed (ms) | DNS query tests |
| Web Page Reachability | Accessibility status | HTTP/HTTPS probes |
| Web Site Response Time | Response time in ms | HTTP timing |
| Network Trace | Path check to national/international IPs | Traceroute |
| Service Degradation | QoS falling below thresholds | Threshold-based detection |
| Outage Detection | Major incident identification | Anomaly detection |

**Standards Reference**: ITU, APT international standards

---

## 7. User Interfaces

### 7.1 BTRC Admin Dashboard
- Real-time operational overview
- QoS monitoring and alerts
- Revenue and package analytics
- Custom report builder
- Role-based access control

### 7.2 ISP Portal
- Data submission interface
- Self-service reporting
- Compliance status view

### 7.3 Public Dashboard
- Aggregated QoS statistics
- Provider comparisons
- Coverage maps

### 7.4 Mobile Application (End-User)
- **Platforms**: Android (mandatory), iOS and Web (preferable)
- **Features**:
  - Speed test (download/upload)
  - Jitter and packet loss measurement
  - Webpage loading time test
  - Historical results display
  - Optional complaint/feedback submission
- **Languages**: Bengali and English
- **Data Collected**: Speed results, quality metrics, location (with consent), ISP identification, timestamp, device info

### 7.5 Regulatory Monitoring Tool
- Similar to user app but for BTRC internal use
- Official measurement capability
- Detailed logging and reporting

---

## 8. Infrastructure Specifications

### 8.1 Hyper-Converged Infrastructure (HCI) - 5 Nodes Minimum

| Component | Per-Node | Total (5 Nodes) |
|-----------|----------|-----------------|
| CPU Cores | 32 | 160 |
| Memory | 256 GB | 1,280 GB (1.25 TB) |
| Boot Drives | 2x (mirrored) | 10x |
| Data Drives | 3x minimum | 15x |
| Cache Drives | 2x | 10x |
| Network | 2x 10G SFP+ | 10x 10G ports |
| Management | IPMI/iLO/iDRAC | Out-of-band |
| Power | Redundant PSU (1+1) | Redundant |

### 8.2 Network Fabric
- 1+1 stack configuration
- MC-LAG support
- Compatible with HCI solution
- Sufficient 10G SFP+ ports for growth

### 8.3 Load Balancer
- Virtual appliance
- High availability configuration
- Application load balancing

### 8.4 Hosting
- Government/BTRC/BCC data center
- Or other BTRC-approved arrangement

---

## 9. Legacy System Migration

| Aspect | Requirement |
|--------|-------------|
| Source System | Existing Data Information System (DIS) |
| Data Scope | All categories (operation, package, user data) |
| Volume | Less than 2 TB |
| Strategy | Full migration with data validation prior to cutover |
| Parallel Operation | Not required; cutover approach approved |

---

## 10. Security & Compliance Requirements

- Role-based access control (RBAC)
- Multi-factor authentication (if required)
- Encryption at rest and in transit (TLS)
- Comprehensive audit trails
- Compliance with Bangladesh national cyber security regulations
- BTRC internal IT/security policies

---

## 11. Team Requirements

### Minimum Key Personnel

| Role | Count | Min. Experience |
|------|-------|-----------------|
| Project Manager | 1 | 10 years, 2+ Govt ICT projects |
| Solution Architect | 1 | 7 years, telecom/OSS/BSS preferred |
| Network & QoS Expert | 1 | 7 years IP networks, SNMP, NMS |
| Data Integration Expert | 1 | 5 years API, SNMP, ETL |
| Senior Software Engineers | 2 | 5 years web development |
| Mobile App Developer(s) | 1-2 | 3 years Android (iOS preferred) |
| Database Admin/Data Engineer | 1 | 5-7 years, time-series experience |
| Security Expert | 1 | 5-7 years, certifications preferred |
| QA Engineer | 1 | 5 years web and mobile QA |
| UI/UX Designer | 1 | 3 years dashboards/mobile |
| Business Analyst | 1 | 5 years, public sector preferred |
| Trainer/Support Engineers | 2-3 | Training and L1/L2 support |
| Documentation Expert | 1 | 4 years ICT documentation |

### Dedicated Operations Personnel
- 2 FTEs on-site at BTRC premises for entire 30-month duration
- Responsibilities: System administration, NOC operations, data analysis

### Total Requirement
- Minimum **20 full-time ICT professionals** on company payroll

---

## 12. Vendor Eligibility Requirements

### Experience
- 5+ years in ICT/software development in Bangladesh
- 5+ similar projects with Government/Semi-Government/Multinational organizations
- 2+ completed projects with single contract value ≥ BDT 2 Crore
- 2+ practical experiences in monitoring/analytics/OSS/BSS/QoS platforms

### Financial
- Average annual turnover ≥ BDT 3 Crore (last 3 years, audited)
- Liquid assets/line of credit ≥ BDT 3 Crore

### Certifications
- ISO 9001 (mandatory)
- ISO 27001 or equivalent (preferable)
- ISO/IEC 20000 or similar (added advantage)
- RJSC registration

---

## 13. Deliverables & Milestones

| Phase | Deliverable |
|-------|-------------|
| **6.1** | Inception Report & Project Plan |
| **6.2** | SRS, HLD & Prototype |
| **6.3** | Beta Release (core modules, pilot ISPs) |
| **6.4** | Final System, Go-Live & UAT |
| **6.5** | Training, Documentation & Handover |

---

## 14. Intellectual Property

- All source code, documentation, configurations, data models = **exclusive property of BTRC/Government of Bangladesh**
- Vendor shall not claim royalty or proprietary rights
- No reuse or replication without explicit BTRC written consent
- All project data treated as confidential

---

## 15. Key Contacts

| Role | Name | Contact |
|------|------|---------|
| Official Inviting EOI | Mohammad Rohol Amin | Tel: +880255667766 (Ext. 105) |
| Designation | Director, Administration Division | Email: diradmin@btrc.gov.bd |
| Address | Plot#E-5/A, Agargaon Administrative Area, Sher-e-Bangla Nagar, Dhaka |

---

## 16. Diagram Requirements (For Proposal)

Based on the ToR and drawing agent instructions, key diagrams to create:

1. **Business Objectives Model** - Problem → Objective → Product Concept → Features
2. **Master Architecture Diagram** - Complete system overview
3. **Data Collection Architecture** - SNMP, APIs, protocols
4. **ISP Integration Options** - 5 integration paths
5. **Data Flow Diagram** - End-to-end data movement
6. **QoS Monitoring Flow** - Measurement to dashboard
7. **Mobile App Architecture** - Flutter/native components
8. **Security Architecture** - Authentication, encryption, audit
9. **Infrastructure Deployment** - HCI cluster, network fabric
10. **API Gateway Structure** - Endpoints, routing, security

---

## 17. Technology Stack (Recommended)

Based on requirements analysis:

| Layer | Recommended Technologies |
|-------|-------------------------|
| Data Collection | Telegraf, Prometheus, GoFlow2, gNMI |
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
| Monitoring | Zabbix, Prometheus, Grafana |

---

## 18. Bangladesh-Specific Context

| Element | Description |
|---------|-------------|
| **BDIX** | Bangladesh Internet Exchange - local peering point |
| **IIG** | International Internet Gateway |
| **SMW4/SMW5** | Submarine cables for international connectivity |
| **Geographic Hierarchy** | Division → District → Upazila → Thana |
| **Regulatory Body** | BTRC under Post and Telecommunications Division |
| **ISP Count** | 1500+ licensed fixed broadband providers |

---

*Document Version: 1.0*  
*Created: December 2024*  
*Source: BTRC EOI ToR Document (14.32.0000.000.400.07.0021.25.1685)*
