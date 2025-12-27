#!/usr/bin/env node
/**
 * Generates a Word document with ToR sections and Telcobright responses
 * Responses are in bold-italic with bordered rectangles
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        WidthType, BorderStyle, AlignmentType, HeadingLevel,
        ShadingType, TableBorders } = require('docx');
const fs = require('fs');
const path = require('path');

// Response box styling - creates a bordered rectangle with bold-italic text
function createResponseBox(title, content) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 12, color: '1E3A5F' },
      bottom: { style: BorderStyle.SINGLE, size: 12, color: '1E3A5F' },
      left: { style: BorderStyle.SINGLE, size: 12, color: '1E3A5F' },
      right: { style: BorderStyle.SINGLE, size: 12, color: '1E3A5F' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'F0F4F8', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: title, bold: true, italics: true, size: 22, color: '1E3A5F' }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: content, bold: true, italics: true, size: 20 }),
                ],
                spacing: { before: 100 },
              }),
            ],
            margins: { top: 150, bottom: 150, left: 200, right: 200 },
          }),
        ],
      }),
    ],
  });
}

// Create section heading
function createHeading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text: text,
    heading: level,
    spacing: { before: 300, after: 150 },
  });
}

// Create normal paragraph
function createParagraph(text) {
  return new Paragraph({
    children: [new TextRun({ text: text, size: 22 })],
    spacing: { after: 100 },
  });
}

// ToR sections with responses
const sections = [
  {
    section: '3.1',
    title: 'Inception, Requirement Study and System Design',
    content: `Conduct detailed stakeholder consultations with BTRC technical and relevant divisions, and selected fixed broadband service providers.

Prepare:
• Detailed Business Process Study and Gap Analysis
• Software Requirements Specification (SRS) covering functional and non-functional requirements
• High Level Design (HLD) and Low Level Design (LLD) including system architecture, modules, interfaces, security and data models

Define:
• Data collection frequency, granularity (per link, per region, per package, etc.)
• KPI definitions and computation logic
• SLAs and performance targets for the system`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Full inception phase with stakeholder workshops, requirement analysis, and iterative design reviews. Agile methodology with sprint-based delivery ensures continuous alignment with BTRC expectations.

APPROACH: We will conduct on-site workshops at BTRC premises with all relevant divisions. Our Business Analyst and Solution Architect will lead the sessions, documenting requirements in IEEE 830 compliant SRS format.

DELIVERABLES:
• SRS Document → [SRS-1.0]
• HLD/LLD Documents → [TP-3.1 Architecture Design]
• Gap Analysis Report → [TP-3.1.2]
• KPI Definition Matrix → [SRS-4.1]

CROSS-REFERENCES:
• Features: All (F001-F010)
• Use Cases: All (UC001-UC022)
• BPMN Processes: All (P001-P004)
• Technical Proposal: [TP-Section 3.1]

LIMITATIONS: None identified. Standard inception phase activities.

BETTER ALTERNATIVE: Recommend 2-week design sprints with prototype reviews for early validation.`
    }
  },
  {
    section: '3.2.1',
    title: 'Network Operation Data via SNMP',
    content: `Service Providers shall facilitate SNMP-based metric collection from within the service provider's network infrastructure. This architecture is mandated for security considerations including Attack Surface Minimization, Credential Protection, and Infrastructure Isolation.

Data Collection Architecture:
• Software-based agents (containerized/Docker) deployed within ISP infrastructure
• Deployment at ISP PoP (Point of Presence) for active QoS measurements
• Deployment at ISP NOC for SNMP data aggregation

Security Requirements:
• SNMP implementations must use secure protocols
• Agent-to-platform communication via secure APIs (TLS encrypted)
• Credentials and sensitive data must remain within ISP security perimeter

Data Collection Requirements:
• Integration with routers and relevant network elements (core, aggregation, BRAS)
• Device Scope: Core routers, aggregation devices, and BRAS only; CPE excluded
• Real-time/scheduled network counters: interface bandwidth, status, errors, BRAS metrics
• Support for multiple vendors' devices and MIBs`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Fully compliant SNMP-based data collection with containerized agents. We propose Telegraf-based collectors with SNMPv3 support for maximum security.

APPROACH: Docker containerized SNMP collectors deployed at ISP PoPs and NOCs. Our agents support:
• SNMPv3 with authentication and encryption (authPriv mode)
• Standard MIB-II and vendor-specific MIBs (Cisco, Juniper, Huawei, MikroTik)
• Configurable polling intervals (1-15 minutes)
• TLS 1.3 encrypted data transmission to central platform

ARCHITECTURE:
• ISP PoP Agent: Synthetic testing (latency, throughput, packet loss, DNS, HTTP)
• ISP NOC Agent: SNMP polling from network devices
• Central Platform: Kafka ingestion → Flink processing → TimescaleDB storage

CROSS-REFERENCES:
• Feature: F002 (QoS Data Collection)
• Use Cases: UC017 (Collect SNMP Data)
• BPMN: P004 (Collect QoS Data)
• Technical Proposal: [TP-3.2.1 SNMP Architecture]

LIMITATIONS:
• CPE devices excluded per ToR (acceptable)
• Requires ISP cooperation for agent deployment

BETTER ALTERNATIVE: Recommend gNMI/OpenConfig alongside SNMP for modern devices with streaming telemetry capability.`
    }
  },
  {
    section: '3.2.2',
    title: 'Integration with Service Provider Systems via APIs',
    content: `Data Submission Model:
• Data Source: Service Providers (ISPs)
• Submission Method: REST API endpoints provided by QoS Platform
• Data Flow: ISP Systems → BTRC REST API → QoS Platform
• Responsibility: Service Providers accountable for data accuracy, completeness, timely submission

Service Providers shall submit data via REST API from their internal systems including ERP, NMS, RADIUS server, Billing software, and CRM.

Data to be collected:
• Operational & Product Data: Package definitions, subscriber counts, bandwidth utilization, POP counts
• Service Quality Data: Network incidents, affected areas, restoration times, complaint metrics
• Revenue Data: Total revenue, revenue by package/region, ARPU indicators`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: RESTful API gateway with comprehensive data ingestion capabilities. We propose Kong API Gateway with OAuth 2.0 + API key authentication.

APPROACH:
• OpenAPI 3.0 specification for all endpoints
• Rate limiting per ISP (configurable)
• JSON/XML payload support with schema validation
• Automatic deduplication and timestamping
• ETL pipeline with Apache Flink for real-time processing

API ENDPOINTS:
• POST /api/v1/operational-data (subscriber counts, packages)
• POST /api/v1/quality-data (incidents, complaints)
• POST /api/v1/revenue-data (revenue submissions)
• GET /api/v1/submission-status (ISP self-service)

CROSS-REFERENCES:
• Feature: F002 (QoS Data Collection), F007 (Revenue Analytics)
• Use Cases: UC016 (Submit Operational Data), UC020 (Submit Revenue Data)
• BPMN: P004 (Collect QoS Data)
• Technical Proposal: [TP-3.2.2 API Gateway Design]

LIMITATIONS:
• ISP systems require modification to call our API
• Data accuracy depends on ISP submission quality

BETTER ALTERNATIVE: Provide SDK libraries for Java, Python, .NET to ease ISP integration. Offer CSV batch upload as fallback option.`
    }
  },
  {
    section: '3.2.3',
    title: 'Integration with BTRC and Other Systems',
    content: `Provide APIs / data feeds for:
• BTRC internal reporting systems
• Data warehouse / BI tools

Design the system such that new integrations (additional service providers, new systems) can be onboarded with minimal changes.`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Extensible integration layer with standard APIs and data export capabilities.

APPROACH:
• GraphQL API for flexible querying by BTRC systems
• REST API for standard CRUD operations
• Kafka topics for real-time data streaming to BI tools
• JDBC/ODBC connectors for direct database access (read-only)
• Scheduled data exports in CSV/JSON/Parquet formats

INTEGRATION POINTS:
• BTRC Reporting: Real-time dashboards via Grafana embedding
• Data Warehouse: ClickHouse for OLAP queries, supports standard SQL
• BI Tools: Compatible with Tableau, Power BI, Metabase

NEW ISP ONBOARDING:
• Self-service portal for ISP registration
• API credentials auto-generated
• Template-based configuration (< 1 day onboarding)

CROSS-REFERENCES:
• Feature: F001 (ISP Onboarding)
• Use Cases: UC001-UC009 (Onboarding flow)
• BPMN: P001 (Onboard Partner ISP)
• Technical Proposal: [TP-3.2.3 Integration Architecture]

LIMITATIONS: None. System designed for extensibility.

BETTER ALTERNATIVE: Implement webhook notifications for real-time event propagation to external systems.`
    }
  },
  {
    section: '3.2.5',
    title: 'Legacy DIS Data Migration',
    content: `BTRC currently operates a Data Information System (DIS) that stores historical ISP operational and service data. This data must be migrated to the new QoS Monitoring Platform.

Migration Requirements:
• Data Scope: All data categories including operation, package, user data
• Estimated Volume: Less than 2 TB
• Database Platform: To be disclosed during RFP stage
• Transition Strategy: Full migration with data validation prior to cutover
• Parallel Operation: Not required; cutover approach approved`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Full migration of DIS data with comprehensive validation. Our team has extensive ETL experience with government data systems.

APPROACH:
1. Data Assessment: Profile source data, identify schemas, map to target models
2. ETL Development: Python-based pipelines with Apache Airflow orchestration
3. Validation: Row counts, checksums, referential integrity checks
4. Dry Run: Test migration on staging environment
5. Cutover: Off-hours migration with rollback plan
6. Reconciliation: Post-migration data verification

TIMELINE (within 6-month build phase):
• Week 1-2: Data assessment and mapping
• Week 3-4: ETL development and testing
• Week 5: Dry run migration
• Week 6: Production migration and validation

CROSS-REFERENCES:
• Feature: F010 (Data Migration)
• Technical Proposal: [TP-3.2.5 Migration Strategy]
• SRS: [SRS-1.5 Migration Requirements]

LIMITATIONS:
• DIS data format documentation required from BTRC
• Database platform disclosure needed for connector selection

BETTER ALTERNATIVE: Phased migration by data category to reduce risk. Maintain DIS read-only access during validation period.`
    }
  },
  {
    section: '3.3',
    title: 'Operational Data Module',
    content: `This module shall provide real-time / near real-time dashboards on:
• Total upstream bandwidth and utilization by Provider, Region, Time period
• Number of users: Total active users, New activations / churn
• Coverage: Map-based coverage visualization, Number of access nodes / POPs per region

Historical trends and comparative views across different service providers, geographic regions, and time periods (hourly/daily/monthly).`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Real-time operational dashboards with sub-minute refresh capability using WebSocket-based updates.

APPROACH:
• Grafana dashboards with custom panels
• TimescaleDB for time-series data (hypertables with automatic partitioning)
• PostGIS for geographic queries and map rendering
• React-based custom UI for executive views

DASHBOARD COMPONENTS:
• Bandwidth Heatmap: Real-time utilization by region (color-coded)
• User Statistics: Active users, activations, churn with trend lines
• Coverage Map: Bangladesh map with POP markers, drill-down to district level
• Provider Comparison: Side-by-side metrics across ISPs

DRILL-DOWN HIERARCHY:
National → Division → District → Upazila → Thana → ISP → POP

CROSS-REFERENCES:
• Feature: F004 (Dashboard Analytics), F008 (Operational Monitoring)
• Use Cases: UC013 (Executive Dashboard), UC014 (QoS Dashboard)
• Technical Proposal: [TP-3.3 Operational Module Design]
• SRS: [SRS-3.1 Dashboard Requirements]

LIMITATIONS:
• Real-time accuracy depends on ISP data submission frequency

BETTER ALTERNATIVE: Push-based updates via WebSocket for sub-minute refresh on critical metrics.`
    }
  },
  {
    section: '3.4',
    title: 'QoS Monitoring Module',
    content: `The QoS monitoring module must compute, display and store key QoS parameters:
• Service Availability (Network uptime percentage)
• Download/Upload Speed (Actual vs. advertised speed ratio)
• Network Latency (Round-trip delay, 95th percentile)
• Packet Loss, Jitter, DNS Performance
• Web Page Reachability and Response Time
• Network Trace to national and international IP targets
• Service Degradation and Outage Detection

Features:
• Configurable QoS thresholds for each parameter and provider
• Automatic detection of service degradations and major incidents
• Geo-spatial view to detect regional QoS issues
• Drill-down from national to operator to region to network segment
• KPI computation engine aligned with BTRC QoS regulations`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Comprehensive QoS monitoring with all specified parameters. We propose Apache Flink for real-time KPI computation with configurable thresholds.

QOS COMPUTATION ENGINE:
• Service Availability: Calculated from SNMP interface status, aggregated by time windows
• Speed Ratio: (Measured Speed / Advertised Speed) from probe tests
• Latency 95th Percentile: Streaming computation with Flink windowing
• Anomaly Detection: Initial rule-based, evolving to ML-based (isolation forest)

ALERTING SYSTEM:
• Threshold Configuration: Per ISP, per region, per parameter
• Alert Channels: Email, SMS (via gateway), Dashboard notifications
• Escalation Workflow: L1 → L2 → L3 with configurable timeouts
• Alert Correlation: Group related alerts to reduce noise

STANDARDS COMPLIANCE:
• ITU-T E.800 series recommendations
• APT broadband QoS standards
• Aligned with BTRC QoS guidelines

CROSS-REFERENCES:
• Feature: F006 (Alert Management)
• Use Cases: UC014 (View QoS Dashboard), UC018-UC019 (Alert Configuration)
• Technical Proposal: [TP-3.4 QoS Module Architecture]
• SRS: [SRS-4.1 QoS Parameters], [SRS-4.2 Alerting]

LIMITATIONS:
• Some parameters require active probes at ISP locations
• ML anomaly detection requires 3-6 months baseline data

BETTER ALTERNATIVE: Distributed probe network for independent QoS verification not dependent on ISP infrastructure.`
    }
  },
  {
    section: '3.5',
    title: 'Revenue and Package Analytics Module',
    content: `This module will use data obtained from service providers' ERP/billing/CRM systems via APIs:

Revenue Metrics:
• Total revenue per provider, per period
• Revenue by package, region, and customer segment
• ARPU and related indicators

Package & Tariff Metrics:
• Master list of all active and historical broadband packages
• Tariff of each package and associated attributes
• Number of users per package
• Package-wise QoS and churn analysis

Analytics and Reporting:
• Time series trends
• Comparative views across operators and regions
• Export to Excel/PDF/CSV`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Revenue analytics with comprehensive package tracking and trend analysis.

APPROACH:
• Dedicated revenue data ingestion pipeline with validation
• Package master data management with version history
• ClickHouse OLAP for fast aggregation queries
• Grafana dashboards with drill-down capability

ANALYTICS FEATURES:
• Revenue Trends: Line charts with YoY/MoM comparison
• ARPU Calculation: Revenue / Active Subscribers by segment
• Package Popularity: User distribution across speed tiers
• Churn Correlation: Package churn vs QoS metrics

EXPORT CAPABILITIES:
• PDF: Formatted reports with charts and tables
• Excel: Raw data with pivot table compatibility
• CSV: Machine-readable for external analysis

CROSS-REFERENCES:
• Feature: F007 (Revenue Analytics)
• Use Cases: UC020 (Submit Revenue Data), UC021 (View Revenue Analytics)
• Technical Proposal: [TP-3.5 Revenue Module Design]
• SRS: [SRS-5.1 Revenue Requirements]

LIMITATIONS:
• Revenue data sensitivity - ISPs may be reluctant to share detailed figures
• ARPU accuracy depends on complete subscriber data

BETTER ALTERNATIVE: Aggregate-level revenue submission with hash verification to ensure data integrity while protecting competitive information.`
    }
  },
  {
    section: '3.6',
    title: 'User-facing Application (Mobile and Web)',
    content: `The Vendor shall design, develop and deploy a user-friendly app (Android mandatory; iOS and web interface preferable) with:

Speed Test:
• Download and upload speed measurement
• Logging results with timestamp, location, and operator/package info

Jitter Measurement and Packet Loss
Webpage Loading Time test

Additional:
• Display of historical test results
• Complaint/feedback submission
• Language support: Bengali and English

Required Data Types:
• Speed test results (download/upload)
• Network quality metrics (latency, jitter, packet loss)
• Geographic location (with user consent)
• ISP and connection identification
• Device information`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Cross-platform mobile app (Android + iOS) and Progressive Web App (PWA) using Flutter framework.

TECHNICAL APPROACH:
• Flutter for single codebase across Android, iOS, Web
• Native speed test engine using platform-specific network APIs
• Offline capability with SQLite local storage
• Bengali/English localization with RTL support

APP FEATURES:
• One-tap Speed Test: Download, upload, latency, jitter
• Results History: Stored locally, synced to cloud
• Location Mapping: GPS with user consent, fallback to IP geolocation
• ISP Detection: Automatic identification via IP lookup
• Complaint Submission: Linked to test results with photo attachment

UI/UX:
• Material Design 3 with BTRC branding
• Accessibility compliant (WCAG 2.1)
• Dark mode support
• Speedometer animation during test

CROSS-REFERENCES:
• Feature: F003 (Speed Test)
• Use Cases: UC010-UC012 (Speed Test flow)
• BPMN: P002 (Run Speed Test)
• Technical Proposal: [TP-3.6 Mobile App Architecture]
• SRS: [SRS-6.1 Mobile Requirements]

LIMITATIONS:
• Browser-based speed test has limitations on low-level network access
• Location requires user permission

BETTER ALTERNATIVE: WebRTC-based measurement for browser to improve accuracy. Offer PWA for quick access without app installation.`
    }
  },
  {
    section: '3.7',
    title: 'Regulatory/Monitoring Tool',
    content: `The Vendor shall design, develop and deploy a regulatory tool/app (Android mandatory; iOS and web interface preferable) for BTRC internal use with:
• Speed Test with detailed logging
• Jitter and Packet Loss measurement
• Webpage Loading Time test
• Historical test results
• Language support: Bengali and English

This is similar to user app but for BTRC official measurement capability.`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Dedicated regulatory tool with enhanced logging and evidence capture for official measurements.

DIFFERENCES FROM USER APP:
• Official Test Mode: Generates tamper-evident test certificates
• Detailed Logging: Full network trace, DNS resolution steps, HTTP headers
• Evidence Capture: Screenshots, location verification, timestamp with NTP sync
• Report Generation: PDF reports suitable for regulatory proceedings
• Device Binding: Optional secure provisioning to BTRC-issued devices

FEATURES:
• All user app features plus:
• Multi-test Scheduling: Batch tests at configurable intervals
• Comparison Mode: Side-by-side results for different ISPs
• Audit Trail: All actions logged with user identification
• Export: Detailed technical reports in PDF/CSV

SECURITY:
• Certificate-based authentication for BTRC users
• Device attestation for integrity verification
• Encrypted local storage

CROSS-REFERENCES:
• Feature: F009 (Regulatory Tool)
• Use Cases: UC022 (Run Official Test)
• Technical Proposal: [TP-3.7 Regulatory Tool Design]
• SRS: [SRS-7.1 Regulatory Tool Requirements]

LIMITATIONS: None identified.

BETTER ALTERNATIVE: Integrate with BTRC's existing authentication system for seamless user management.`
    }
  },
  {
    section: '3.8',
    title: 'Data Storage, Analytics and Dashboard',
    content: `Centralized database(s) designed for:
• High volume time-series data
• Historical storage with configurable retention policies

Analytics engine and dashboards for BTRC management and technical users.

Platform Capability Requirements:
• Scalability: Handle data from 1500+ ISPs and millions of measurements
• Availability: High uptime with disaster recovery provisions
• Data Retention: 1 year storage for historical analysis and audit
• Security: End-to-end encryption, access controls, audit trails
• Drill-down Analytics: National to operator to region to network segment
• Map-based Visualization: Geographic coverage and QoS
• Data Polling Resolution: Maximum 15 minutes
• Custom Report Builder with scheduled reporting`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Enterprise-grade data platform designed for high-volume time-series data with 99.5% availability.

DATABASE ARCHITECTURE:
• TimescaleDB: Time-series data (QoS metrics, measurements) - 1 year retention
• PostgreSQL + PostGIS: Relational data (ISPs, packages) with geographic queries
• ClickHouse: OLAP analytics for fast aggregation
• Redis: Caching layer for dashboard performance

STORAGE TIERS:
• Hot (30 days): SSD storage, fast queries
• Warm (1 year): HDD storage, standard access
• Cold (archive): Object storage for compliance

SCALABILITY:
• Horizontal scaling via Kubernetes
• Kafka for message buffering (handles burst traffic)
• TimescaleDB hypertables with automatic partitioning
• Tested for 1500+ ISPs with 5-minute polling intervals

DASHBOARD PLATFORM:
• Grafana Enterprise for visualization
• Custom React dashboards for executive views
• Role-based access control
• Scheduled report generation (PDF/Excel)

CROSS-REFERENCES:
• Feature: F004 (Dashboard Analytics), F005 (Report Generation)
• Use Cases: UC013-UC015 (Dashboard and Reporting)
• BPMN: P003 (Generate Report)
• Technical Proposal: [TP-3.8 Data Platform Architecture]
• SRS: [SRS-8.1 Storage Requirements]

LIMITATIONS: Storage requirements scale with ISP count.

BETTER ALTERNATIVE: Tiered storage with automatic data lifecycle management to optimize costs.`
    }
  },
  {
    section: '3.9',
    title: 'Security, Privacy and Compliance',
    content: `• Role-based access control and user management
• Secure authentication (multi-factor if required)
• Encryption of data at rest and in transit (TLS)
• Logging and audit trails for all critical actions and data access
• Compliance with relevant national cyber security regulations
• Compliance with BTRC's internal IT/security policies`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Comprehensive security framework aligned with BTRC policies and national regulations.

SECURITY COMPONENTS:
• Authentication: Keycloak for identity management, supports MFA (TOTP, SMS)
• Authorization: RBAC with predefined roles (Admin, Operator, Viewer, ISP)
• Encryption: TLS 1.3 in transit, AES-256 at rest, database-level encryption
• Audit: Tamper-evident logging with centralized SIEM integration

ROLES AND PERMISSIONS:
• BTRC Admin: Full access, user management, configuration
• BTRC Operator: Dashboards, reports, alert management
• BTRC Viewer: Read-only dashboard access
• ISP User: Own data submission and status view

COMPLIANCE:
• Bangladesh ICT Act 2006 (as amended)
• Bangladesh Digital Security Act 2018
• BTRC IT security policies
• ISO 27001 aligned practices

AUDIT CAPABILITIES:
• All user logins/logouts
• Data access logs
• Configuration changes
• API calls with payload hashes

CROSS-REFERENCES:
• Technical Proposal: [TP-3.9 Security Architecture]
• SRS: [SRS-9.1 Access Control], [SRS-9.2 Encryption], [SRS-9.3 Audit]

LIMITATIONS: None identified.

BETTER ALTERNATIVE: Integration with BTRC existing identity systems if available to enable single sign-on.`
    }
  },
  {
    section: '3.10',
    title: 'System Architecture, Hosting and Performance',
    content: `• Design scalable, modular and fault-tolerant architecture
• Hosting at Government/BTRC/BCC data center or other BTRC-approved arrangement
• Performance & availability targets: 99.5% uptime
• Backup, disaster recovery and business continuity plans

Minimum Infrastructure Specifications:
• HCI Cluster: 5 nodes minimum
• Per Node: 32 CPU cores, 256 GB RAM, 2x boot drives, 3x data drives, 2x cache drives
• Network: 2x 10G SFP+ per node, 1+1 switch stack with MC-LAG
• Load Balancer: Virtual appliance with HA`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Microservices architecture deployed on Kubernetes with 99.5% availability SLA.

ARCHITECTURE:
• Microservices: Loosely coupled services with clear API boundaries
• Container Orchestration: Kubernetes on HCI cluster
• Service Mesh: Istio for traffic management and observability
• API Gateway: Kong for external access

HIGH AVAILABILITY:
• Multi-node deployment across HCI cluster
• Active-passive DR with automated failover
• Database replication with automatic promotion
• Health monitoring with self-healing

HCI DEPLOYMENT:
• VMware vSAN or Nutanix AHV (compatible with spec)
• Kubernetes worker nodes distributed across all 5 HCI nodes
• Storage tiering: SSD cache, HDD data drives
• Network bonding for 20G aggregate throughput

DISASTER RECOVERY:
• Daily incremental backups
• Weekly full backups to offsite location
• RTO: 4 hours, RPO: 1 hour
• Annual DR drill

CROSS-REFERENCES:
• Technical Proposal: [TP-3.10 Architecture Design], [TP-3.10.1 Infrastructure Spec]
• SRS: [SRS-10.1 Scalability], [SRS-10.2 Availability]

LIMITATIONS:
• Depends on BTRC data center infrastructure quality
• HCI vendor compatibility to be confirmed

BETTER ALTERNATIVE: Multi-site deployment for geographic redundancy if second data center available.`
    }
  },
  {
    section: '3.11',
    title: 'Testing and Quality Assurance',
    content: `The Vendor shall prepare and implement a comprehensive Test Plan:
• Unit Testing
• Integration Testing
• Functional and Non-functional Testing
• Performance and Stress Testing
• Security and Vulnerability Testing
• Compatibility Testing (browsers, mobile devices)
• User Acceptance Testing (UAT) with BTRC and selected providers

Test cases, results and defect logs must be documented and submitted to BTRC.`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Comprehensive QA program with automated testing and continuous integration.

TESTING APPROACH:
• Unit Testing: JUnit/Jest with 80% code coverage target
• Integration Testing: API contract testing, database integration
• Functional Testing: Selenium/Playwright for UI automation
• Performance Testing: JMeter/Gatling for load testing
• Security Testing: OWASP ZAP, dependency scanning, penetration testing
• Mobile Testing: Appium for cross-device automation

CI/CD PIPELINE:
• GitHub Actions for automated builds
• Quality gates: code coverage, static analysis, security scans
• Automated deployment to staging environment
• Manual approval for production releases

UAT PROCESS:
• 2-week UAT period with BTRC and selected ISPs
• Structured test scenarios with acceptance criteria
• Defect tracking in JIRA with severity classification
• Go/No-Go decision meeting before production

DELIVERABLES:
• Test Plan Document
• Test Cases Repository
• Automated Test Scripts
• UAT Report with Sign-off

CROSS-REFERENCES:
• Technical Proposal: [TP-3.11 QA Methodology]
• SRS: [SRS-11.1 Testing Requirements]

LIMITATIONS: None identified.

BETTER ALTERNATIVE: Implement shift-left testing with TDD approach for critical modules.`
    }
  },
  {
    section: '3.12',
    title: 'Training and Knowledge Transfer',
    content: `Develop and provide:
• User Manuals (Admin, Operator, Viewer)
• Technical Documentation (architecture, APIs, data models, deployment scripts)

Conduct structured training sessions for:
• BTRC technical and operational staff
• Helpdesk/support staff

Training may include classroom/virtual sessions, hands-on exercises, and evaluation.`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: Comprehensive training program with role-based curriculum and bilingual materials.

TRAINING CURRICULUM:
• BTRC Administrators (2 days): System configuration, user management, security
• BTRC Operators (3 days): Dashboards, reports, alert management, data analysis
• Helpdesk Staff (2 days): Troubleshooting, ISP support, ticket handling
• ISP Users (1 day): Data submission, portal usage, API integration

DELIVERY METHODS:
• Classroom Training: On-site at BTRC premises
• Hands-on Labs: Sandbox environment for practice
• Video Tutorials: Recorded sessions for reference
• E-learning Platform: Self-paced modules (optional)

DOCUMENTATION:
• User Manuals: Bengali and English versions
• API Documentation: OpenAPI spec with examples
• Architecture Guide: Technical reference for IT staff
• Deployment Runbook: Step-by-step operational procedures

KNOWLEDGE TRANSFER:
• 2-week shadowing period post go-live
• Dedicated support channel during transition
• Monthly knowledge sessions for 3 months

CROSS-REFERENCES:
• Technical Proposal: [TP-3.12 Training Plan]
• SRS: [SRS-12.1 Training Requirements]

LIMITATIONS: None identified.

BETTER ALTERNATIVE: Develop e-learning platform for ongoing training and new staff onboarding.`
    }
  },
  {
    section: '3.13',
    title: 'Post-Implementation Support and Maintenance',
    content: `Provide maintenance and technical support for 24 months, including:
• Bug fixing and minor enhancements
• Performance tuning
• Security patching
• Assistance with onboarding new providers or integrations

Service Level Agreement (SLA) for:
• Incident response time
• Resolution time based on severity
• System availability`,
    response: {
      title: 'TELCOBRIGHT RESPONSE:',
      content: `ACHIEVABLE: 24-month support with 2 dedicated FTEs on-site at BTRC premises as per ToR requirement.

SUPPORT TIERS:
• L1 (Helpdesk): Issue logging, basic troubleshooting, user support
• L2 (Operations): Configuration, data issues, integration support
• L3 (Development): Bug fixes, enhancements, security patches

SLA COMMITMENTS:
• Critical (System Down): Response 15 min, Resolution 4 hours
• High (Major Feature Impacted): Response 1 hour, Resolution 8 hours
• Medium (Minor Feature Impacted): Response 4 hours, Resolution 24 hours
• Low (Cosmetic/Enhancement): Response 1 day, Resolution 5 days

ON-SITE RESOURCES:
• 2 FTEs at BTRC premises (as per ToR Section 5)
• System Administrator: Day-to-day operations, monitoring
• Support Engineer: Issue resolution, ISP onboarding

MAINTENANCE ACTIVITIES:
• Monthly security patches
• Quarterly performance tuning
• Bi-annual version upgrades
• Ad-hoc new ISP onboarding

CROSS-REFERENCES:
• Technical Proposal: [TP-3.13 Support Model]
• SRS: [SRS-13.1 SLA Requirements]

LIMITATIONS: None identified.

BETTER ALTERNATIVE: Remote monitoring and proactive maintenance to identify issues before user impact.`
    }
  }
];

// Build document
const doc = new Document({
  styles: {
    paragraphStyles: [
      {
        id: 'Normal',
        name: 'Normal',
        run: { size: 22 },
        paragraph: { spacing: { after: 100 } },
      },
    ],
  },
  sections: [{
    properties: {},
    children: [
      // Title
      new Paragraph({
        children: [
          new TextRun({ text: 'Terms of Reference (ToR)', bold: true, size: 36 }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Section 3: Scope of Work', bold: true, size: 28 }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'WITH TELCOBRIGHT RESPONSES', bold: true, size: 24, color: '1E3A5F' }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Source: BTRC EOI Reference 14.32.0000.000.400.07.0021.25.1685', italics: true, size: 20 }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),

      // Sections with responses
      ...sections.flatMap(s => [
        createHeading(`${s.section} ${s.title}`, HeadingLevel.HEADING_2),
        ...s.content.split('\n').map(line => createParagraph(line)),
        new Paragraph({ spacing: { before: 200 } }),
        createResponseBox(s.response.title, s.response.content),
        new Paragraph({ spacing: { after: 300 } }),
      ]),
    ],
  }],
});

// Save document
const outputPath = path.join(__dirname, '..', '..', '..', 'ToR-Section3-Telcobright-Response.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created: ${outputPath}`);
  console.log(`\nDocument contains ${sections.length} sections with responses.`);
  console.log('\nPlaceholders to finalize:');
  console.log('  - [TP-X.X] - Technical Proposal section references');
  console.log('  - [SRS-X.X] - SRS section references');
});
