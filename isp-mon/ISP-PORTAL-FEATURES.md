# ISP Self-Care Portal - Comprehensive Feature Breakdown

## Overview

The ISP Self-Care Portal enables Internet Service Providers to interact with BTRC's QoS Monitoring Platform. This document outlines all features organized by functional area.

---

## 1. Dashboard & Overview

### 1.1 ISP Home Dashboard
- **Quick Stats Cards**
  - Active Subscribers Count
  - Current Bandwidth Utilization (%)
  - QoS Compliance Score (%)
  - Open Support Tickets
  - Pending Submissions
  - Active Alerts Count

- **Quick Actions Panel**
  - Submit Monthly Report
  - Report Network Incident
  - Upload BGP Routes
  - Create Support Ticket

- **Pending Tasks Widget**
  - Overdue submissions with deadlines
  - Pending device approvals
  - Documents requiring renewal
  - Unacknowledged alerts

- **Recent Activity Feed**
  - Last 10 actions/events
  - Timestamps and status indicators
  - Quick links to related items

### 1.2 Compliance Status Widget
- Data submission calendar (monthly/quarterly)
- Compliance percentage meter
- Upcoming deadlines with countdown
- Historical compliance trend

---

## 2. Integration & Provisioning

### 2.1 Device Management
- **Device Registry**
  - Add/Edit/Remove network devices
  - Device types: Router, Switch, Firewall, Server, Probe
  - Device status: Active, Pending Approval, Suspended, Decommissioned
  - Location mapping (Division/District/Upazila)

- **Device Details**
  - IP Address / Management IP
  - SNMP credentials (v2c/v3)
  - Netflow/IPFIX configuration
  - Last polled timestamp
  - Data freshness indicator

### 2.2 SNMP Configuration
- **BTRC Collector Credentials**
  - Collector IP: 103.15.245.10
  - Port: 161
  - SNMPv3 Security Token
  - Auth Protocol: SHA-256
  - Privacy Protocol: AES-256

- **OID Configuration**
  - Standard MIB OIDs
  - Custom OID mapping
  - Polling interval settings

### 2.3 Netflow/IPFIX Configuration
- **BTRC Flow Collector**
  - Collector IP: 103.15.245.11
  - Port: 2055
  - Template ID: BTRC-TEMPLATE-001
  - Version: v9/IPFIX

- **Flow Export Settings**
  - Active timeout
  - Inactive timeout
  - Sampling rate

### 2.4 API Integration
- **REST API Credentials**
  - API Key generation
  - API Secret (hidden)
  - Rate limits display
  - Usage statistics

- **Webhook Configuration**
  - Callback URLs for events
  - Event types to subscribe
  - Authentication headers

---

## 3. BGP Routing Management

### 3.1 Route Table Submission
- **Manual Upload**
  - Upload BGP RIB dump (MRT format)
  - Upload text-based route table
  - CSV/JSON format support
  - Scheduled auto-upload via API

- **Route Table Viewer**
  - Prefix list with AS paths
  - Origin AS information
  - Next-hop details
  - Route age/freshness

### 3.2 Prefix Monitoring
- **Announced Prefixes**
  - List of ISP's announced prefixes
  - ROA (Route Origin Authorization) status
  - RPKI validation status (Valid/Invalid/Unknown)
  - Historical prefix changes

- **Prefix Alerts**
  - Unauthorized prefix announcements
  - Sub-prefix hijacking attempts
  - Route leaks detected
  - Path anomalies

### 3.3 Peering Information
- **Upstream Providers**
  - Provider name and ASN
  - Peering type (Transit/Peering/IXP)
  - Bandwidth capacity
  - Utilization metrics

- **Downstream Customers**
  - Customer ASN list
  - Prefix delegations
  - Traffic statistics

### 3.4 AS Path Analysis
- **Path Visualization**
  - AS path for each prefix
  - Path length statistics
  - Preferred vs backup paths
  - Path change history

- **Anomaly Detection**
  - Unusual AS path lengths
  - Suspicious AS insertions
  - Route flapping detection

---

## 4. Security & Threat Center

### 4.1 DDoS Attack Reporting
- **Report New Attack**
  - Attack type: Volumetric, Protocol, Application Layer
  - Attack vectors: UDP Flood, SYN Flood, DNS Amplification, NTP Amplification, HTTP Flood
  - Target IP/Subnet
  - Peak bandwidth (Gbps)
  - Start time / End time
  - Mitigation actions taken
  - Supporting evidence upload (pcap, logs)

- **Attack Dashboard**
  - Active attacks indicator
  - Attack history timeline
  - Attack statistics by type
  - Geographic origin analysis

- **Attack Details View**
  - Source IP/ASN breakdown
  - Top attacking countries
  - Attack signature/pattern
  - Mitigation effectiveness

### 4.2 BGP Threat Reporting
- **Route Hijacking Reports**
  - Affected prefix
  - Legitimate origin AS
  - Hijacker AS
  - Detection timestamp
  - Evidence (BGP updates, looking glass data)

- **Route Leak Reports**
  - Leaked prefix
  - Leaking AS
  - Upstream that accepted leak
  - Impact assessment

- **BGP Pollution Alerts**
  - Invalid route announcements
  - Bogon prefix announcements
  - Reserved/private prefix leaks

### 4.3 IP Reputation & Blocklist Management
- **Malicious IP Reporting**
  - Report IP/Subnet
  - Threat type: Spam, Botnet, Scanner, Brute Force, C2 Server
  - Confidence level: High, Medium, Low
  - Evidence attachment
  - Recommended action: Block, Monitor, Investigate

- **Blocklist Requests**
  - Request country-level blocks
  - Request ASN blocks
  - Request IP range blocks
  - Justification and evidence
  - BTRC approval workflow

- **Active Blocklists**
  - ISP's active block rules
  - BTRC-mandated blocks
  - Temporary vs permanent blocks
  - Block effectiveness metrics

### 4.4 Threat Intelligence Feed
- **Incoming Threats**
  - BTRC-distributed threat indicators
  - Industry threat sharing
  - Real-time threat alerts

- **Threat Subscriptions**
  - Subscribe to threat categories
  - Geographic threat focus
  - Sector-specific threats

---

## 5. Alerts & Notifications

### 5.1 Alert Dashboard
- **Active Alerts Panel**
  - Critical alerts (red) - requires immediate action
  - Warning alerts (orange) - attention needed
  - Info alerts (blue) - awareness only
  - Alert count by category

- **Alert Categories**
  - Network Performance (QoS threshold breaches)
  - Security (DDoS, BGP anomalies, threats)
  - Compliance (missed submissions, expiring documents)
  - System (device offline, data staleness)
  - Billing (payment reminders)

### 5.2 Alert Details
- **Alert Information**
  - Alert ID and timestamp
  - Severity level
  - Category and subcategory
  - Affected resource
  - Description and recommended action
  - Acknowledgment status
  - Resolution status

- **Alert Actions**
  - Acknowledge alert
  - Add notes/comments
  - Escalate to BTRC
  - Mark as resolved
  - Create support ticket from alert

### 5.3 Alert History
- **Historical View**
  - Date range filter
  - Severity filter
  - Category filter
  - Search by keyword
  - Export to CSV/PDF

- **Alert Analytics**
  - Alerts over time chart
  - Top alert categories
  - Mean time to acknowledge
  - Mean time to resolve

### 5.4 Notification Preferences
- **Channel Configuration**
  - Email notifications (primary/secondary)
  - SMS notifications (mobile number)
  - In-app notifications
  - Webhook callbacks

- **Notification Rules**
  - By severity (Critical, Warning, Info)
  - By category (Network, Security, Compliance)
  - By time (business hours, 24/7)
  - Escalation rules (if unacknowledged)

---

## 6. Support & Ticketing

### 6.1 Ticket Management
- **Create Ticket**
  - Category selection
  - Priority: Critical, High, Medium, Low
  - Subject and description
  - Attachment upload
  - Related device/resource selection

- **Ticket Categories**
  - Technical Support
  - Integration Issues
  - Data Discrepancy
  - Compliance Query
  - Billing Issue
  - Feature Request
  - Security Incident

### 6.2 Ticket Tracking
- **Ticket List View**
  - Status filters: Open, In Progress, Pending, Resolved, Closed
  - Priority sorting
  - Date range filter
  - Assigned agent display

- **Ticket Detail View**
  - Full conversation thread
  - Status timeline
  - Attachments gallery
  - Related tickets
  - Resolution details

### 6.3 Ticket Actions
- Add reply/comment
- Upload additional files
- Escalate ticket
- Request closure
- Rate support quality

---

## 7. Data Submissions & Compliance

### 7.1 Submission Dashboard
- **Submission Calendar**
  - Monthly submissions due dates
  - Quarterly reports schedule
  - Annual compliance submissions
  - Color-coded status (submitted, pending, overdue)

- **Submission Status**
  - Last submission date
  - Next due date
  - Submission streak
  - Compliance percentage

### 7.2 Data Submission Forms
- **Monthly Operational Data**
  - Subscriber count by package
  - Bandwidth utilization
  - Network coverage updates
  - New POPs/infrastructure

- **Quarterly QoS Report**
  - Service availability summary
  - Speed test results
  - Customer complaint statistics
  - Outage reports

- **Annual Compliance Report**
  - License renewal documents
  - Financial statements
  - Technical audit results
  - Security compliance attestation

### 7.3 Document Repository
- **Document Categories**
  - Licenses and Certificates
  - Compliance Reports
  - Technical Documents
  - Financial Documents
  - Legal Documents

- **Document Management**
  - Upload new document
  - Version control
  - Expiry tracking
  - Download history

---

## 8. Incident Management

### 8.1 Report Network Incident
- **Incident Types**
  - Service Outage (complete)
  - Service Degradation (partial)
  - Planned Maintenance
  - Emergency Maintenance
  - Security Breach
  - Natural Disaster Impact

- **Incident Details Form**
  - Incident type selection
  - Start time (actual/estimated)
  - Affected regions (multi-select)
  - Affected services
  - Estimated impact (subscribers affected)
  - Root cause (if known)
  - Mitigation steps

### 8.2 Incident Timeline
- **Active Incidents**
  - Real-time status
  - Progress updates
  - ETA to resolution

- **Incident History**
  - Past incidents list
  - Duration and impact
  - Resolution details
  - Post-incident reports

### 8.3 Planned Maintenance
- **Schedule Maintenance**
  - Date and time window
  - Affected infrastructure
  - Expected impact
  - BTRC notification (auto-generated)

- **Maintenance Calendar**
  - Upcoming maintenance
  - Past maintenance log
  - Recurring maintenance

---

## 9. Reports & Analytics

### 9.1 Performance Reports
- **QoS Metrics Report**
  - Service availability trend
  - Speed ratio analysis
  - Latency percentiles
  - Packet loss statistics

- **Comparison Reports**
  - Month-over-month comparison
  - Region comparison
  - Package/tier comparison

### 9.2 Custom Report Builder
- **Report Parameters**
  - Date range selection
  - Metric selection (multi)
  - Grouping options
  - Filter criteria

- **Output Options**
  - On-screen preview
  - PDF download
  - Excel export
  - Scheduled delivery

### 9.3 Automated Reports
- **Scheduled Reports**
  - Daily summary email
  - Weekly performance digest
  - Monthly compliance report
  - Custom schedules

---

## 10. Settings & Configuration

### 10.1 Company Profile
- Company legal name
- Trade license number
- ISP license number
- Contact information
- Billing address

### 10.2 User Management
- **User Accounts**
  - Add/remove users
  - Role assignment
  - Permission levels
  - Activity log

- **Roles**
  - Admin (full access)
  - Technical (provisioning, incidents)
  - Compliance (submissions, documents)
  - View Only (dashboards, reports)

### 10.3 Security Settings
- Password policy
- Two-factor authentication
- Session timeout
- IP whitelist
- API key management

### 10.4 Notification Settings
- Email preferences
- SMS preferences
- Alert thresholds
- Escalation rules

---

## Alert Types Summary

| Category | Alert Type | Severity | Description |
|----------|-----------|----------|-------------|
| Security | DDoS Attack Detected | Critical | Volumetric attack exceeding threshold |
| Security | BGP Hijack Detected | Critical | Unauthorized prefix announcement |
| Security | Route Leak Detected | High | Prefix leaked to unauthorized AS |
| Security | Suspicious IP Activity | Medium | Malicious traffic pattern detected |
| Network | Device Offline | Critical | Monitored device not responding |
| Network | QoS Threshold Breach | High | Performance below acceptable level |
| Network | High Latency Alert | Medium | Latency exceeds threshold |
| Network | Packet Loss Alert | Medium | Packet loss exceeds threshold |
| Compliance | Submission Overdue | High | Data submission past deadline |
| Compliance | Document Expiring | Medium | License/certificate expiring soon |
| Compliance | Submission Reminder | Info | Upcoming submission deadline |
| System | Data Staleness | High | No data received in 24 hours |
| System | API Rate Limit | Medium | Approaching API usage limit |

---

## Notification Triggers

| Event | Email | SMS | In-App | Webhook |
|-------|-------|-----|--------|---------|
| Critical Security Alert | ✓ | ✓ | ✓ | ✓ |
| DDoS Attack Started | ✓ | ✓ | ✓ | ✓ |
| Device Went Offline | ✓ | Optional | ✓ | ✓ |
| QoS Threshold Breach | ✓ | Optional | ✓ | ✓ |
| Submission Reminder | ✓ | - | ✓ | - |
| Ticket Update | ✓ | - | ✓ | Optional |
| Document Expiry Warning | ✓ | - | ✓ | - |
| New BTRC Announcement | ✓ | - | ✓ | - |

---

*Document Version: 1.0*
*Last Updated: December 2024*
