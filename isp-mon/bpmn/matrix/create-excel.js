#!/usr/bin/env node
/**
 * Creates a single Excel file with requirements traceability
 * BPMN processes and tasks are nested together for easy editing
 * Includes Requirements Response Matrix with remarks
 */

const XLSX = require('xlsx');
const path = require('path');

const sheets = {
  'Features': [
    ['Feature ID', 'Feature Name', 'Description', 'Module', 'ToR Section'],
    ['F001', 'ISP Onboarding', 'Register and onboard partner ISPs to the platform', 'Data Acquisition', '3.2'],
    ['F002', 'QoS Data Collection', 'Collect QoS metrics from ISPs via API/SNMP', 'Data Acquisition', '3.2'],
    ['F003', 'Speed Test', 'End-user speed test via mobile/web app', 'User App', '3.6'],
    ['F004', 'Dashboard Analytics', 'View KPIs and analytics dashboards', 'Dashboard', '3.8'],
    ['F005', 'Report Generation', 'Generate and export custom reports', 'Dashboard', '3.8'],
    ['F006', 'Alert Management', 'Configure and manage QoS alerts', 'QoS Monitoring', '3.4'],
    ['F007', 'Revenue Analytics', 'Track revenue and package data', 'Revenue Module', '3.5'],
    ['F008', 'Operational Monitoring', 'Monitor operational data in real-time', 'Operations', '3.3'],
    ['F009', 'Regulatory Tool', 'BTRC internal measurement tool', 'Regulatory', '3.7'],
    ['F010', 'Data Migration', 'Migrate data from legacy DIS system', 'Migration', '3.1'],
  ],

  'Actors': [
    ['Actor ID', 'Actor Name', 'Type', 'Description'],
    ['A001', 'ISP', 'External', 'Internet Service Provider representative'],
    ['A002', 'BTRC Admin', 'Internal', 'BTRC regulatory officer'],
    ['A003', 'System', 'Internal', 'Automated system processes'],
    ['A004', 'End User', 'External', 'Broadband subscriber'],
    ['A005', 'BTRC Executive', 'Internal', 'Senior BTRC management'],
    ['A006', 'NOC Operator', 'Internal', 'BTRC Network Operations Center staff'],
  ],

  'Use Cases': [
    ['UC ID', 'Feature ID', 'Actor', 'Use Case Name', 'Description', 'Priority'],
    ['UC001', 'F001', 'ISP', 'Register Company', 'ISP submits company registration form', 'Must'],
    ['UC002', 'F001', 'ISP', 'Upload Documents', 'ISP uploads required documents (NID, license)', 'Must'],
    ['UC003', 'F001', 'ISP', 'Verify OTP', 'ISP verifies mobile via OTP', 'Must'],
    ['UC004', 'F001', 'BTRC Admin', 'Review Application', 'BTRC admin reviews ISP application', 'Must'],
    ['UC005', 'F001', 'BTRC Admin', 'Approve/Reject ISP', 'BTRC admin approves or rejects application', 'Must'],
    ['UC006', 'F001', 'System', 'Validate Form Data', 'System validates submitted form data', 'Must'],
    ['UC007', 'F001', 'System', 'Verify NID', 'System verifies NID via external API', 'Must'],
    ['UC008', 'F001', 'System', 'Generate Credentials', 'System generates API credentials', 'Must'],
    ['UC009', 'F001', 'ISP', 'Configure API Access', 'ISP configures API keys in their system', 'Must'],
    ['UC010', 'F003', 'End User', 'Run Speed Test', 'End user initiates speed test', 'Must'],
    ['UC011', 'F003', 'End User', 'View Test Results', 'End user views test results', 'Must'],
    ['UC012', 'F003', 'End User', 'View Test History', 'End user views past test results', 'Should'],
    ['UC013', 'F004', 'BTRC Executive', 'View Executive Dashboard', 'Executive views KPI summary', 'Must'],
    ['UC014', 'F004', 'BTRC Admin', 'View QoS Dashboard', 'Admin views detailed QoS metrics', 'Must'],
    ['UC015', 'F004', 'BTRC Admin', 'Generate Reports', 'Admin generates custom reports', 'Must'],
    ['UC016', 'F002', 'ISP', 'Submit Operational Data', 'ISP submits operational metrics via API', 'Must'],
    ['UC017', 'F002', 'System', 'Collect SNMP Data', 'System polls SNMP agents at ISP PoPs', 'Must'],
    ['UC018', 'F006', 'BTRC Admin', 'Configure Alerts', 'Admin sets up threshold-based alerts', 'Must'],
    ['UC019', 'F006', 'System', 'Send Alert Notification', 'System sends alerts when thresholds breached', 'Must'],
    ['UC020', 'F007', 'ISP', 'Submit Revenue Data', 'ISP submits revenue and package data', 'Must'],
    ['UC021', 'F007', 'BTRC Admin', 'View Revenue Analytics', 'Admin views revenue dashboards', 'Must'],
    ['UC022', 'F009', 'BTRC Admin', 'Run Official Test', 'BTRC runs official QoS measurement', 'Must'],
  ],

  // Combined: Process > Tasks nested together
  'BPMN': [
    ['Level', 'ID', 'Name', 'Lane', 'Type', 'Use Case', 'Description'],
    // Process P001
    ['Process', 'P001', 'Onboard Partner ISP', '', '', 'F001', 'Main ISP onboarding flow'],
    ['  Task', '1', 'Register to BTRC Portal', 'ISP', 'subprocess', 'UC001', 'Opens sub-process P001.1'],
    ['  Task', '1.A', 'Review Application', 'BTRC Admin', 'task', 'UC004', 'Admin reviews submitted docs'],
    ['  Task', '2', 'Generate Credentials', 'System', 'task', 'UC008', 'Create API credentials'],
    ['  Task', '3', 'Configure API Access', 'ISP', 'task', 'UC009', 'ISP sets up integration'],
    ['  Task', '3.A', 'Create API Keys', 'System', 'task', 'UC008', 'Provision API keys'],
    ['', '', '', '', '', '', ''],
    // Sub-process P001.1
    ['  Subprocess', 'P001.1', 'Register to BTRC Portal', '', '', '', 'Registration sub-process'],
    ['    Task', '1.1', 'Fill Company Info', 'ISP', 'task', 'UC001', 'Enter company details'],
    ['    Task', '1.2', 'Upload Documents', 'ISP', 'task', 'UC002', 'Upload NID and license'],
    ['    Task', '1.3', 'Enter OTP', 'ISP', 'task', 'UC003', 'Verify mobile number'],
    ['    Task', '1.1.A', 'Validate Form', 'System', 'task', 'UC006', 'Validate form fields'],
    ['    Task', '1.2.A', 'Verify NID', 'System', 'task', 'UC007', 'Call NID verification API'],
    ['    Task', '1.2.B', 'Send OTP', 'System', 'task', 'UC003', 'Send OTP to mobile'],
    ['    Task', '1.3.A', 'Verify OTP', 'System', 'task', 'UC003', 'Validate entered OTP'],
    ['', '', '', '', '', '', ''],
    // Process P002
    ['Process', 'P002', 'Run Speed Test', '', '', 'F003', 'Speed test execution'],
    ['  Task', '1', 'Select Server', 'End User', 'task', 'UC010', 'Choose test server'],
    ['  Task', '2', 'Run Download Test', 'System', 'task', 'UC010', 'Measure download speed'],
    ['  Task', '3', 'Run Upload Test', 'System', 'task', 'UC010', 'Measure upload speed'],
    ['  Task', '4', 'Calculate Metrics', 'System', 'task', 'UC010', 'Compute latency, jitter'],
    ['  Task', '5', 'Display Results', 'System', 'task', 'UC011', 'Show results to user'],
    ['  Task', '6', 'Save Results', 'System', 'task', 'UC012', 'Store in history'],
    ['', '', '', '', '', '', ''],
    // Process P003
    ['Process', 'P003', 'Generate Report', '', '', 'F004', 'Report generation'],
    ['  Task', '1', 'Select Parameters', 'BTRC Admin', 'task', 'UC015', 'Choose filters'],
    ['  Task', '2', 'Query Data', 'System', 'task', 'UC015', 'Fetch from database'],
    ['  Task', '3', 'Generate Charts', 'System', 'task', 'UC015', 'Build visualizations'],
    ['  Task', '4', 'Export Report', 'System', 'task', 'UC015', 'PDF/Excel export'],
    ['', '', '', '', '', '', ''],
    // Process P004
    ['Process', 'P004', 'Collect QoS Data', '', '', 'F002', 'Data collection flow'],
    ['  Task', '1', 'Poll SNMP Agents', 'System', 'task', 'UC017', 'Collect from ISP devices'],
    ['  Task', '2', 'Receive API Data', 'System', 'task', 'UC016', 'Process ISP submissions'],
    ['  Task', '3', 'Validate Data', 'System', 'task', 'UC017', 'Check data integrity'],
    ['  Task', '4', 'Compute KPIs', 'System', 'task', 'UC017', 'Calculate QoS metrics'],
    ['  Task', '5', 'Store Metrics', 'System', 'task', 'UC017', 'Persist to time-series DB'],
    ['  Task', '6', 'Trigger Alerts', 'System', 'task', 'UC019', 'Check thresholds'],
  ],

  'Flows': [
    ['Process', 'From', 'To', 'Type', 'Condition'],
    ['P001', 'start', '1', 'sequence', ''],
    ['P001', '1', '1.A', 'message', 'Application submitted'],
    ['P001', '1.A', 'gw-approve', 'sequence', ''],
    ['P001', 'gw-approve', '2', 'message', 'Approved'],
    ['P001', '2', '3', 'sequence', ''],
    ['P001', '3', 'end', 'sequence', ''],
    ['', '', '', '', ''],
    ['P001.1', 'start', '1.1', 'sequence', ''],
    ['P001.1', '1.1', '1.2', 'sequence', ''],
    ['P001.1', '1.2', '1.3', 'sequence', ''],
    ['P001.1', '1.3', 'end', 'sequence', ''],
    ['P001.1', '1.1', '1.1.A', 'message', 'Form submitted'],
    ['P001.1', '1.1.A', '1.2.A', 'sequence', ''],
    ['P001.1', '1.2', '1.2.A', 'message', 'Docs uploaded'],
    ['P001.1', '1.2.A', '1.2.B', 'sequence', ''],
    ['P001.1', '1.2.B', '1.3', 'message', 'OTP sent'],
    ['P001.1', '1.3', '1.3.A', 'message', 'OTP entered'],
  ],

  // Requirements Response Matrix - ToR to Implementation Mapping
  'Requirements Response': [
    ['Req ID', 'ToR Section', 'Requirement', 'Response (Remarks)', 'Achievable', 'Limitations', 'Better Alternative', 'Feature Refs', 'Use Case Refs', 'BPMN Refs', 'Tech Proposal Section', 'SRS Section'],

    // Section 3.1 - Inception
    ['R001', '3.1', 'Inception, Requirement Study and System Design',
      'Full inception phase with stakeholder workshops, requirement analysis, and iterative design reviews. Agile methodology with sprint-based delivery.',
      'Yes', 'None', '-', 'All', 'All', 'All', '[TP-3.1]', '[SRS-1]'],

    // Section 3.2 - Data Acquisition
    ['R002', '3.2.1', 'ISP Onboarding and Registration',
      'Self-service portal for ISP registration with document upload, OTP verification, and admin approval workflow. API credentials auto-generated.',
      'Yes', 'NID verification depends on external API availability', 'Integration with national NID database for real-time verification', 'F001', 'UC001-UC009', 'P001, P001.1', '[TP-3.2.1]', '[SRS-2.1]'],

    ['R003', '3.2.2', 'REST API for ISP Data Submission',
      'RESTful API gateway with OpenAPI 3.0 spec, rate limiting, authentication via API keys + JWT. Supports JSON/XML payloads.',
      'Yes', 'ISP systems must be modified to call our API', 'Provide SDK libraries for common languages (Java, Python, .NET)', 'F002', 'UC016', 'P004', '[TP-3.2.2]', '[SRS-2.2]'],

    ['R004', '3.2.3', 'SNMP-Based Data Collection',
      'Containerized SNMP collectors (Docker) deployed at ISP PoPs. Polls MIB-II and vendor MIBs. TLS encryption for data transit.',
      'Yes', 'Requires ISP cooperation for agent deployment; CPE devices excluded per ToR', 'Use gNMI/OpenConfig for modern network devices alongside SNMP', 'F002', 'UC017', 'P004', '[TP-3.2.3]', '[SRS-2.3]'],

    ['R005', '3.2.4', 'Data Categories - Operational',
      'Collects: package definitions, subscriber counts, bandwidth utilization, POP counts, upstream capacity per location.',
      'Yes', 'Data accuracy depends on ISP submission quality', 'Automated cross-validation with SNMP-collected data', 'F008', 'UC016', 'P004', '[TP-3.2.4]', '[SRS-2.4]'],

    ['R006', '3.2.5', 'Data Categories - Revenue',
      'Revenue by provider, package, region, customer segment. ARPU derivation where data permits.',
      'Yes', 'Sensitive data; ISPs may be reluctant to share detailed revenue', 'Aggregate-level submission with hash verification', 'F007', 'UC020, UC021', '-', '[TP-3.2.5]', '[SRS-2.5]'],

    // Section 3.3 - Operational Data Module
    ['R007', '3.3.1', 'Real-time Operational Data Display',
      'Live dashboards showing bandwidth utilization, user statistics, coverage maps with 15-min refresh maximum.',
      'Yes', 'Real-time depends on ISP data submission frequency', 'Push-based updates via WebSocket for sub-minute refresh', 'F008', 'UC014', '-', '[TP-3.3.1]', '[SRS-3.1]'],

    ['R008', '3.3.2', 'Geographic Drill-down',
      'Hierarchical drill-down: National → Division → District → Upazila → Thana → ISP. PostGIS for geo-queries.',
      'Yes', 'None', '-', 'F004, F008', 'UC014', '-', '[TP-3.3.2]', '[SRS-3.2]'],

    // Section 3.4 - QoS Monitoring
    ['R009', '3.4.1', 'QoS Parameter Monitoring',
      'Monitors: Service Availability, Download/Upload Speed Ratio, Latency (95th %ile), Packet Loss, Jitter, DNS Performance.',
      'Yes', 'Some parameters require active probes deployed at ISP', 'Distributed probe network for independent verification', 'F006', 'UC014, UC018', '-', '[TP-3.4.1]', '[SRS-4.1]'],

    ['R010', '3.4.2', 'Threshold-based Alerting',
      'Configurable thresholds per ISP/region. Multi-channel alerts: email, SMS, dashboard. Alert escalation workflows.',
      'Yes', 'SMS gateway integration required', 'Integration with existing BTRC notification systems', 'F006', 'UC018, UC019', '-', '[TP-3.4.2]', '[SRS-4.2]'],

    ['R011', '3.4.3', 'Anomaly Detection',
      'ML-based anomaly detection for service degradation and outage identification. Historical baseline comparison.',
      'Yes', 'Requires 3-6 months of data for accurate baseline', 'Start with rule-based detection, evolve to ML', 'F006', 'UC019', '-', '[TP-3.4.3]', '[SRS-4.3]'],

    ['R012', '3.4.4', 'ITU/APT Standards Compliance',
      'QoS measurements aligned with ITU-T E.800 series and APT recommendations for broadband quality.',
      'Yes', 'None', '-', 'F006', '-', '-', '[TP-3.4.4]', '[SRS-4.4]'],

    // Section 3.5 - Revenue Analytics
    ['R013', '3.5.1', 'Revenue Dashboard',
      'Provider comparison, trend analysis, package-wise breakdown. ARPU indicators with geographic segmentation.',
      'Yes', 'Depends on complete revenue data submission', 'Automated data validation and completeness checks', 'F007', 'UC021', '-', '[TP-3.5.1]', '[SRS-5.1]'],

    ['R014', '3.5.2', 'Package Analytics',
      'Track package offerings: speed tiers, pricing, FUP policies. Monitor package changes over time.',
      'Yes', 'Historical package data from DIS migration', '-', 'F007', 'UC020', '-', '[TP-3.5.2]', '[SRS-5.2]'],

    // Section 3.6 - User App
    ['R015', '3.6.1', 'Mobile App - Android (Mandatory)',
      'Native Android app with speed test, latency/jitter measurement, webpage load test, history, Bengali/English.',
      'Yes', 'None', 'Flutter for cross-platform with single codebase', 'F003', 'UC010-UC012', 'P002', '[TP-3.6.1]', '[SRS-6.1]'],

    ['R016', '3.6.2', 'Mobile App - iOS (Preferable)',
      'iOS app with same features as Android. Flutter enables simultaneous iOS development.',
      'Yes', 'Apple Developer Program enrollment required', 'Flutter cross-platform recommended', 'F003', 'UC010-UC012', 'P002', '[TP-3.6.2]', '[SRS-6.2]'],

    ['R017', '3.6.3', 'Web Speed Test',
      'Browser-based speed test accessible without app installation. Progressive Web App (PWA) approach.',
      'Yes', 'Browser limitations on low-level network access', 'WebRTC-based measurement for better accuracy', 'F003', 'UC010-UC012', 'P002', '[TP-3.6.3]', '[SRS-6.3]'],

    ['R018', '3.6.4', 'Location-aware Testing',
      'GPS/network-based location capture (with consent) for geo-mapping of QoS measurements.',
      'Yes', 'User must grant location permission', 'Fallback to IP-based geolocation', 'F003', 'UC010', 'P002', '[TP-3.6.4]', '[SRS-6.4]'],

    // Section 3.7 - Regulatory Tool
    ['R019', '3.7.1', 'BTRC Regulatory Measurement Tool',
      'Dedicated app for BTRC officials. Official test capability with detailed logging, evidence capture, report generation.',
      'Yes', 'None', 'Secure device provisioning for BTRC devices', 'F009', 'UC022', '-', '[TP-3.7.1]', '[SRS-7.1]'],

    // Section 3.8 - Dashboards & Analytics
    ['R020', '3.8.1', 'Executive Dashboard',
      'High-level KPI summary, national QoS heatmap, top/bottom ISP rankings, alert summary.',
      'Yes', 'None', '-', 'F004', 'UC013', '-', '[TP-3.8.1]', '[SRS-8.1]'],

    ['R021', '3.8.2', 'Operational Dashboard',
      'Detailed metrics with drill-down, time-series charts, comparative analysis, filter by ISP/region/time.',
      'Yes', 'None', '-', 'F004', 'UC014', '-', '[TP-3.8.2]', '[SRS-8.2]'],

    ['R022', '3.8.3', 'Custom Report Builder',
      'User-defined report templates, scheduled generation, export to PDF/Excel/CSV.',
      'Yes', 'Complex reports may have performance implications', 'Pre-built report templates for common use cases', 'F005', 'UC015', 'P003', '[TP-3.8.3]', '[SRS-8.3]'],

    ['R023', '3.8.4', 'Data Retention - 1 Year',
      'Historical data storage for 1 year minimum. Time-series DB with automatic partitioning and archival.',
      'Yes', 'Storage requirements scale with ISP count', 'Tiered storage: hot (30 days) → warm (1 year) → cold (archive)', '-', '-', '-', '[TP-3.8.4]', '[SRS-8.4]'],

    // Section 3.9 - Security
    ['R024', '3.9.1', 'Role-Based Access Control',
      'RBAC with predefined roles (Admin, Operator, Viewer, ISP). Custom role creation supported.',
      'Yes', 'None', 'Integration with BTRC existing identity systems if available', '-', '-', '-', '[TP-3.9.1]', '[SRS-9.1]'],

    ['R025', '3.9.2', 'Encryption at Rest and Transit',
      'TLS 1.3 for all communications. AES-256 for data at rest. Database-level encryption.',
      'Yes', 'None', '-', '-', '-', '-', '[TP-3.9.2]', '[SRS-9.2]'],

    ['R026', '3.9.3', 'Audit Trails',
      'Comprehensive logging of all user actions, data access, configuration changes. Tamper-evident logs.',
      'Yes', 'Log storage requirements', 'SIEM integration for security monitoring', '-', '-', '-', '[TP-3.9.3]', '[SRS-9.3]'],

    // Section 3.10 - Architecture
    ['R027', '3.10.1', 'Scalability - 1500+ ISPs',
      'Microservices architecture with horizontal scaling. Kafka for message buffering. Auto-scaling on Kubernetes.',
      'Yes', 'None', '-', '-', '-', '-', '[TP-3.10.1]', '[SRS-10.1]'],

    ['R028', '3.10.2', '99.5% Availability',
      'HA deployment across HCI nodes. Active-passive DR. Automated failover. Health monitoring.',
      'Yes', 'Depends on data center infrastructure', 'Multi-site deployment for geographic redundancy', '-', '-', '-', '[TP-3.10.2]', '[SRS-10.2]'],

    ['R029', '3.10.3', 'HCI Infrastructure - 5 Nodes',
      'Deployment on provided HCI cluster. Container orchestration via Kubernetes. Resource optimization.',
      'Yes', 'HCI vendor compatibility', 'Provide hardware specifications for procurement', '-', '-', '-', '[TP-3.10.3]', '[SRS-10.3]'],

    ['R030', '3.10.4', '15-Minute Maximum Polling',
      'Data collection interval configurable from 1-15 minutes. Default 5 minutes for critical metrics.',
      'Yes', 'None', 'Sub-minute polling for critical infrastructure', '-', '-', '-', '[TP-3.10.4]', '[SRS-10.4]'],

    // Section 3.11 - Testing
    ['R031', '3.11.1', 'Quality Assurance',
      'Unit testing (80% coverage), integration testing, performance testing, security testing (OWASP), UAT.',
      'Yes', 'None', 'Automated CI/CD pipeline with quality gates', '-', '-', '-', '[TP-3.11.1]', '[SRS-11.1]'],

    // Section 3.12 - Training
    ['R032', '3.12.1', 'Training and Knowledge Transfer',
      'Role-based training: Admin, Operator, ISP users. Training materials in Bengali and English.',
      'Yes', 'None', 'Video tutorials and e-learning platform', '-', '-', '-', '[TP-3.12.1]', '[SRS-12.1]'],

    // Section 3.13 - Support
    ['R033', '3.13.1', '24-Month Post-Implementation Support',
      '2 dedicated FTEs on-site. L1/L2/L3 support tiers. SLA-based response times.',
      'Yes', 'None', 'Remote monitoring and proactive maintenance', '-', '-', '-', '[TP-3.13.1]', '[SRS-13.1]'],

    // Legacy Migration
    ['R034', '3.1.5', 'DIS Data Migration',
      'Full migration of existing DIS data (<2TB). Data validation and reconciliation. Cutover approach.',
      'Yes', 'DIS data format documentation required', 'Phased migration with parallel validation', 'F010', '-', '-', '[TP-3.1.5]', '[SRS-1.5]'],
  ],
};

// Create workbook
const wb = XLSX.utils.book_new();

Object.entries(sheets).forEach(([name, data]) => {
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Auto-width columns
  ws['!cols'] = data[0].map((_, i) => ({
    wch: Math.min(Math.max(...data.map(row => String(row[i] || '').length)) + 2, 50)
  }));

  // Style the Requirements Response sheet - make Response column bold-italic
  if (name === 'Requirements Response') {
    // Set column widths specifically for this sheet
    ws['!cols'] = [
      { wch: 8 },   // Req ID
      { wch: 12 },  // ToR Section
      { wch: 40 },  // Requirement
      { wch: 80 },  // Response (Remarks)
      { wch: 12 },  // Achievable
      { wch: 50 },  // Limitations
      { wch: 50 },  // Better Alternative
      { wch: 15 },  // Feature Refs
      { wch: 20 },  // Use Case Refs
      { wch: 15 },  // BPMN Refs
      { wch: 20 },  // Tech Proposal
      { wch: 15 },  // SRS Section
    ];
  }

  XLSX.utils.book_append_sheet(wb, ws, name);
});

const outputPath = path.join(__dirname, 'requirements-matrix.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(`Created: ${outputPath}`);
console.log('\nSheets:');
Object.keys(sheets).forEach(name => {
  const rowCount = sheets[name].length - 1;
  console.log(`  - ${name} (${rowCount} rows)`);
});
