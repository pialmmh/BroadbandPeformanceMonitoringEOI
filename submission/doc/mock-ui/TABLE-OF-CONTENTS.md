# Doc 5: Mock UI Designs - Table of Contents

> **Document Purpose**: Visual prototypes for key platform interfaces
> **Target Format**: HTML mockups (responsive)
> **Status**: Layout Defined

---

## Document Structure

### 1. Overview
- **1.1** Design System Overview
- **1.2** Color Palette
- **1.3** Typography
- **1.4** Component Library Reference

### 2. BTRC Admin Dashboard Mockups [ToR: Section 3.3-3.8]

#### 2.1 Executive Dashboard [HIGH PRIORITY]
- **2.1.1** National QoS Overview
  - Real-time KPI summary cards
  - National map with QoS heatmap
  - Alert summary panel
  - Provider comparison chart
- **Wireframe**: `btrc-executive-dashboard.html`
- **ToR Reference**: Section 3.4, p.8-9

#### 2.2 Operational Dashboard [HIGH PRIORITY]
- **2.2.1** Bandwidth Utilization View
  - Provider-wise bandwidth charts
  - Regional breakdown
  - Time-series trends
- **2.2.2** User Statistics View
  - Total active users
  - New activations / Churn
  - User distribution by region
- **2.2.3** Coverage Map View
  - Interactive map
  - POPs per region
  - Coverage density
- **Wireframe**: `btrc-operational-dashboard.html`
- **ToR Reference**: Section 3.3, p.7-8

#### 2.3 QoS Monitoring Dashboard [HIGH PRIORITY]
- **2.3.1** KPI Overview Panel
  - Service Availability gauge
  - Speed ratio charts (actual vs advertised)
  - Latency/Jitter/Packet Loss metrics
- **2.3.2** Alerts Panel
  - Active alerts list
  - Alert severity indicators
  - Alert timeline
- **2.3.3** Drill-down View
  - National -> Provider -> Region -> Segment
  - Tabular KPI breakdown
- **Wireframe**: `btrc-qos-dashboard.html`
- **ToR Reference**: Section 3.4, p.8-9

#### 2.4 Revenue & Package Analytics [MEDIUM PRIORITY]
- **2.4.1** Revenue Overview
  - Revenue by provider chart
  - Revenue trend line
  - Regional revenue breakdown
- **2.4.2** Package Analytics
  - Package list with subscriber counts
  - Package-wise QoS comparison
  - Tariff comparison table
- **Wireframe**: `btrc-revenue-dashboard.html`
- **ToR Reference**: Section 3.5, p.9-10

#### 2.5 Report Builder [MEDIUM PRIORITY]
- **2.5.1** Report Configuration
  - Filter selection (provider, region, time)
  - KPI selection
  - Output format selection
- **2.5.2** Report Preview
  - Tabular preview
  - Chart preview
  - Export buttons
- **Wireframe**: `btrc-report-builder.html`
- **ToR Reference**: Section 3.8, p.12-13

#### 2.6 Administration Screens [LOW PRIORITY]
- **2.6.1** User Management
- **2.6.2** Role Management
- **2.6.3** Threshold Configuration
- **2.6.4** System Settings
- **Wireframe**: `btrc-admin-screens.html`
- **ToR Reference**: Section 3.9, p.13

### 3. ISP Portal Mockups [ToR: Section 3.2.2]

#### 3.1 ISP Data Submission Portal [MEDIUM PRIORITY]
- **3.1.1** Dashboard
  - Submission status overview
  - Data quality metrics
  - Compliance status
- **3.1.2** Data Entry Forms
  - Operational data form
  - Package data form
  - Revenue data form
  - Incident report form
- **3.1.3** Submission History
  - Submitted records list
  - Validation status
  - Resubmission option
- **Wireframe**: `isp-portal.html`
- **ToR Reference**: Section 3.2.2, p.5-6

### 4. Mobile Application Mockups [ToR: Section 3.6]

#### 4.1 Speed Test App Screens [HIGH PRIORITY]
- **4.1.1** Home / Speed Test Screen
  - Start test button (prominent)
  - Current ISP display
  - Connection type indicator
- **4.1.2** Testing in Progress
  - Download speed animation
  - Upload speed animation
  - Progress indicator
- **4.1.3** Test Results
  - Download/Upload speeds
  - Latency/Jitter values
  - Packet loss percentage
  - Share/Save buttons
- **4.1.4** History Screen
  - Test history list
  - Date/Time, ISP, Results
  - Filter/Search
- **4.1.5** Webpage Test Screen
  - URL/Site selection
  - Loading time display
  - Results comparison
- **4.1.6** Settings Screen
  - Language toggle (Bengali/English)
  - Location permission
  - Data consent
- **Wireframe**: `mobile-app-mockups.html`
- **ToR Reference**: Section 3.6, p.10-11

#### 4.2 Feedback/Complaint Screen [LOW PRIORITY]
- **4.2.1** Complaint Form
  - Issue category selection
  - Description field
  - Link to test results
  - Submit button
- **Wireframe**: `mobile-feedback-screen.html`
- **ToR Reference**: Section 3.6, p.10

### 5. Regulatory Monitoring Tool Mockups [ToR: Section 3.7]

#### 5.1 BTRC Measurement Tool [MEDIUM PRIORITY]
- **5.1.1** Official Test Interface
  - Enhanced test controls
  - Detailed logging display
  - Report generation
- **5.1.2** Measurement Report
  - Official report format
  - Timestamp and location
  - Detailed metrics
- **Wireframe**: `regulatory-tool-mockups.html`
- **ToR Reference**: Section 3.7, p.11

### 6. Public Dashboard Mockups [LOW PRIORITY]

#### 6.1 Public QoS Dashboard
- **6.1.1** Provider Comparison
  - Anonymous provider comparison
  - Regional QoS summary
  - Trend charts
- **Wireframe**: `public-dashboard.html`
- **ToR Reference**: Section 3.8, p.12

---

## Priority Summary

| Priority | Module | Files |
|----------|--------|-------|
| HIGH | Executive Dashboard | btrc-executive-dashboard.html |
| HIGH | Operational Dashboard | btrc-operational-dashboard.html |
| HIGH | QoS Monitoring Dashboard | btrc-qos-dashboard.html |
| HIGH | Mobile Speed Test App | mobile-app-mockups.html |
| MEDIUM | Revenue Analytics | btrc-revenue-dashboard.html |
| MEDIUM | Report Builder | btrc-report-builder.html |
| MEDIUM | ISP Portal | isp-portal.html |
| MEDIUM | Regulatory Tool | regulatory-tool-mockups.html |
| LOW | Admin Screens | btrc-admin-screens.html |
| LOW | Feedback Screen | mobile-feedback-screen.html |
| LOW | Public Dashboard | public-dashboard.html |

---

## Design Guidelines

### Color Scheme (Suggested)
```
Primary: #1E3A5F (Deep Blue - BTRC official color)
Secondary: #2ECC71 (Green - Success/Good QoS)
Warning: #F39C12 (Orange - Caution)
Danger: #E74C3C (Red - Alert/Poor QoS)
Background: #F8F9FA (Light Gray)
Text: #333333 (Dark Gray)
```

### Typography
```
Headings: Inter or Noto Sans Bengali (Bold)
Body: Inter or Noto Sans Bengali (Regular)
Data: Roboto Mono (for metrics)
```

### Component Standards
- Use Bootstrap 5 or Tailwind CSS
- Responsive design (mobile-first)
- Bengali language support required
- Accessibility compliance (WCAG 2.1 AA)

### Chart Libraries
- Chart.js or ApexCharts for data visualization
- Leaflet.js for maps (Bangladesh-specific)

---

## Files to Generate

| File | Description | Priority |
|------|-------------|----------|
| `btrc-executive-dashboard.html` | Executive overview | High |
| `btrc-operational-dashboard.html` | Operational metrics | High |
| `btrc-qos-dashboard.html` | QoS monitoring view | High |
| `mobile-app-mockups.html` | All mobile screens | High |
| `btrc-revenue-dashboard.html` | Revenue analytics | Medium |
| `btrc-report-builder.html` | Custom report builder | Medium |
| `isp-portal.html` | ISP data submission | Medium |
| `regulatory-tool-mockups.html` | BTRC measurement tool | Medium |
| `btrc-admin-screens.html` | Administration screens | Low |
| `public-dashboard.html` | Public-facing view | Low |
| `design-system.html` | Components & styles | Medium |

---

## Screen Resolution Targets

| Device | Resolution | Priority |
|--------|------------|----------|
| Desktop | 1920x1080 (Full HD) | High |
| Laptop | 1366x768 | High |
| Tablet | 1024x768 | Medium |
| Mobile | 375x812 (iPhone X) | High (for app) |
| Mobile | 360x640 (Android) | High (for app) |

---

*Document Layout Version: 1.0*
*Created: December 2024*
