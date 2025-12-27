# BTRC QoS Monitoring Platform - Mock UI Project

> **Purpose**: Create React mock UI components for BTRC EOI tender proposal
> **Project Type**: Government Tender Documentation (Quality and Cost Based Selection)
> **Client**: Bangladesh Telecommunication Regulatory Commission (BTRC)

---

## Quick Start

```bash
cd isp-mon
npm install
npm start      # Runs on http://localhost:7001
```

---

## Project Context

### What This Is
This is a **mock UI project** for a tender proposal. We are bidding on BTRC's EOI for an "Online Operation and QoS Monitoring System for Fixed Broadband Service Providers".

The React components created here will be:
1. Used to generate **screenshots** for proposal documentation
2. Demonstrated as **working prototypes** to show technical capability
3. Based on actual **ToR requirements** from BTRC

### EOI Reference
- **EOI No**: 14.32.0000.000.400.07.0021.25.1685
- **Closing Date**: 28/12/2025, 02:00 PM
- **Duration**: 30 months (6 months build + 24 months maintenance)
- **Original ToR**: `../EoITor2025-12-11-OriginalDocFromBTRC.pdf` (24 pages)

---

## What We're Building (The Actual Platform)

A **National QoS Monitoring Platform** for BTRC to monitor 1500+ ISPs in Bangladesh:

### Core Modules (from ToR)
| Module | ToR Section | Description |
|--------|-------------|-------------|
| Data Acquisition | 3.2 (p.2-6) | SNMP collectors, REST APIs for ISP data |
| Operational Data | 3.3 (p.7-8) | Bandwidth, users, coverage dashboards |
| QoS Monitoring | 3.4 (p.8-9) | KPI computation, alerts, anomaly detection |
| Revenue Analytics | 3.5 (p.9-10) | Tariff tracking, revenue, ARPU |
| User App | 3.6 (p.10-11) | Mobile speed test (Android/iOS/Web) |
| Regulatory Tool | 3.7 (p.11) | BTRC internal measurement tool |
| Dashboards | 3.8 (p.12-13) | Analytics, reports, visualizations |

### Key QoS Parameters (ToR Section 3.4, p.8-9)
| Parameter | Description | Unit |
|-----------|-------------|------|
| Service Availability | Network uptime | % |
| Download Speed | Actual vs advertised ratio | ratio |
| Upload Speed | Actual vs advertised ratio | ratio |
| Network Latency | Round-trip delay (95th percentile) | ms |
| Packet Loss | Transmission reliability | % |
| Jitter | Latency variation | ms |
| DNS Performance | Name resolution speed | ms |
| Web Reachability | Site accessibility | status |
| Web Response Time | Page load time | ms |

---

## Technology Stack (Already Configured)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| TypeScript | - | Type safety |
| MUI (Material UI) | 7.x | Component library |
| Recharts | 3.x | Charts and visualizations |
| React Router | 7.x | Navigation |
| Axios | 1.x | HTTP client (mock data) |
| date-fns | 4.x | Date utilities |

---

## UI Components to Create

### Priority 1: HIGH (Create First)

#### 1. BTRC Executive Dashboard
**Location**: `src/components/BtrcDashboard/`
**ToR Reference**: Section 3.4, p.8-9

Create high-level overview showing:
- **KPI Summary Cards** (4 cards):
  - Average Service Availability (gauge %)
  - Average Download Speed Ratio
  - Active ISPs count
  - Active Alerts count
- **National QoS Heatmap** (Bangladesh map with color-coded regions)
- **Top 10 ISPs by Performance** (horizontal bar chart)
- **Alert Timeline** (last 24 hours)
- **Provider Comparison** (multi-line chart)

```
src/components/BtrcDashboard/
├── BtrcDashboard.tsx
├── KpiSummaryCards.tsx
├── QosHeatmap.tsx
├── TopIspsChart.tsx
├── AlertTimeline.tsx
└── index.ts
```

#### 2. QoS Monitoring Dashboard
**Location**: `src/components/QosDashboard/`
**ToR Reference**: Section 3.4, p.8-9

- **KPI Gauges Panel**: Service Availability, Speed Ratios, Latency, Packet Loss, Jitter
- **Alerts Table** (DataGrid with severity, ISP, message, timestamp)
- **Drill-down View** (Tabs: National → Provider → Region → Segment)
- **Time Range Selector** (1h, 6h, 24h, 7d, 30d)
- **Provider Filter** (Dropdown)

```
src/components/QosDashboard/
├── QosDashboard.tsx
├── KpiGaugesPanel.tsx
├── AlertsTable.tsx
├── DrilldownView.tsx
└── index.ts
```

#### 3. Mobile Speed Test App Mockup
**Location**: `src/components/MobileApp/`
**ToR Reference**: Section 3.6, p.10-11

Web-based mockup of mobile app screens (use phone frame wrapper):
- **Home Screen**: Big "START TEST" button, ISP name, connection type
- **Testing Screen**: Animated speedometer, download/upload progress
- **Results Screen**: Download, Upload, Latency, Jitter, Packet Loss
- **History Screen**: List of past tests
- **Settings Screen**: Language toggle (Bengali/English)

```
src/components/MobileApp/
├── MobileApp.tsx
├── PhoneFrame.tsx        # Visual phone frame wrapper
├── HomeScreen.tsx
├── TestingScreen.tsx
├── ResultsScreen.tsx
├── HistoryScreen.tsx
└── SettingsScreen.tsx
```

#### 4. Operational Dashboard
**Location**: `src/components/OperationalDashboard/`
**ToR Reference**: Section 3.3, p.7-8

- **Bandwidth Utilization** (Area chart by time)
- **User Statistics Cards** (Total users, New activations, Churn)
- **Coverage Map** (Bangladesh map with POPs markers)
- **Regional Breakdown Table** (Division, District, POP count, Users)

```
src/components/OperationalDashboard/
├── OperationalDashboard.tsx
├── BandwidthChart.tsx
├── UserStatsCards.tsx
├── CoverageMap.tsx
└── RegionalTable.tsx
```

### Priority 2: MEDIUM (Create Second)

#### 5. Revenue & Package Analytics
**Location**: `src/components/RevenueDashboard/`
**ToR Reference**: Section 3.5, p.9-10

- Revenue by Provider (bar chart)
- Revenue Trend (line chart)
- Package List (DataGrid: name, speed, price, subscribers)
- ARPU by Region

#### 6. Report Builder
**Location**: `src/components/ReportBuilder/`
**ToR Reference**: Section 3.8, p.12-13

- Filter Panel (Provider, Region, Date Range, KPIs)
- Preview Panel (Table/Chart toggle)
- Export Buttons (PDF, Excel, CSV)

#### 7. ISP Portal
**Location**: `src/components/IspPortal/`
**ToR Reference**: Section 3.2.2, p.5-6

- Submission Dashboard (status cards)
- Data Entry Form
- Submission History (DataGrid)

#### 8. Regulatory Tool
**Location**: `src/components/RegulatoryTool/`
**ToR Reference**: Section 3.7, p.11

- Official Test Interface
- Detailed Logging Display
- Report Generation

---

## Design Guidelines

### Color Palette
```css
/* Primary - BTRC Official Blue */
--primary: #1E3A5F;
--primary-light: #2E5A8F;
--primary-dark: #0E2A4F;

/* QoS Status Colors */
--qos-excellent: #2ECC71;  /* Green - >90% */
--qos-good: #27AE60;       /* Dark Green - 80-90% */
--qos-fair: #F39C12;       /* Orange - 60-80% */
--qos-poor: #E74C3C;       /* Red - <60% */

/* Background */
--bg-primary: #F8F9FA;
--bg-card: #FFFFFF;

/* Text */
--text-primary: #333333;
--text-secondary: #666666;
```

### QoS Color Thresholds
| Parameter | Excellent (Green) | Good (Light Green) | Fair (Orange) | Poor (Red) |
|-----------|------------------|-------------------|---------------|------------|
| Availability | >98% | 95-98% | 90-95% | <90% |
| Speed Ratio | >0.95 | 0.85-0.95 | 0.7-0.85 | <0.7 |
| Latency | <30ms | 30-50ms | 50-100ms | >100ms |
| Packet Loss | <0.5% | 0.5-1% | 1-3% | >3% |
| Jitter | <5ms | 5-10ms | 10-30ms | >30ms |

### Typography
- Headings: MUI Typography, fontWeight: 600
- Data/Metrics: Monospace font for numbers
- Languages: Include Noto Sans Bengali for Bengali text

### Layout
- Use MUI Grid for responsive layouts
- Card-based design for dashboard sections
- Padding: 16px (sm), 24px (md), 32px (lg)
- Max content width: 1400px

---

## Mock Data Structures

### QoS Metrics
```typescript
interface QosMetrics {
  providerId: string;
  providerName: string;
  region: string;
  timestamp: Date;
  serviceAvailability: number;      // 0-100%
  downloadSpeedRatio: number;       // actual/advertised (0-1+)
  uploadSpeedRatio: number;
  latency: number;                  // ms
  packetLoss: number;               // 0-100%
  jitter: number;                   // ms
  dnsResolutionTime: number;        // ms
  webResponseTime: number;          // ms
}
```

### Provider
```typescript
interface Provider {
  id: string;
  name: string;
  licenseNumber: string;
  activeSubscribers: number;
  regions: string[];
  status: 'active' | 'suspended' | 'pending';
}
```

### Alert
```typescript
interface Alert {
  id: string;
  providerId: string;
  providerName: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'degradation' | 'outage' | 'threshold';
  message: string;
  region: string;
  timestamp: Date;
  resolved: boolean;
}
```

### Speed Test Result
```typescript
interface SpeedTestResult {
  id: string;
  downloadSpeed: number;    // Mbps
  uploadSpeed: number;      // Mbps
  latency: number;          // ms
  jitter: number;           // ms
  packetLoss: number;       // %
  isp: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  timestamp: Date;
  deviceInfo: string;
}
```

---

## Sample Data

### Bangladesh Divisions
```typescript
export const divisions = [
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
  { id: 'chittagong', name: 'Chittagong', nameBn: 'চট্টগ্রাম' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা' },
  { id: 'barisal', name: 'Barisal', nameBn: 'বরিশাল' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
];
```

### Sample ISPs
```typescript
export const mockIsps = [
  { id: 'isp001', name: 'Link3 Technologies', subscribers: 250000 },
  { id: 'isp002', name: 'Amber IT', subscribers: 180000 },
  { id: 'isp003', name: 'Carnival Internet', subscribers: 150000 },
  { id: 'isp004', name: 'Earth Telecommunication', subscribers: 120000 },
  { id: 'isp005', name: 'Dot Internet', subscribers: 100000 },
  { id: 'isp006', name: 'Mazeda Networks', subscribers: 95000 },
  { id: 'isp007', name: 'Circle Network', subscribers: 85000 },
  { id: 'isp008', name: 'BRACNet', subscribers: 75000 },
  { id: 'isp009', name: 'Agni Systems', subscribers: 70000 },
  { id: 'isp010', name: 'ICC Communication', subscribers: 65000 },
];
```

---

## Navigation Structure

Update `src/App.tsx` with these routes:

```typescript
const routes = [
  { path: '/', element: <BtrcDashboard />, label: 'Executive Dashboard', icon: <DashboardIcon /> },
  { path: '/operational', element: <OperationalDashboard />, label: 'Operational', icon: <SpeedIcon /> },
  { path: '/qos', element: <QosDashboard />, label: 'QoS Monitoring', icon: <MonitorIcon /> },
  { path: '/revenue', element: <RevenueDashboard />, label: 'Revenue', icon: <AttachMoneyIcon /> },
  { path: '/reports', element: <ReportBuilder />, label: 'Reports', icon: <AssessmentIcon /> },
  { path: '/isp-portal', element: <IspPortal />, label: 'ISP Portal', icon: <BusinessIcon /> },
  { path: '/mobile-app', element: <MobileApp />, label: 'Mobile Preview', icon: <PhoneIcon /> },
  { path: '/regulatory', element: <RegulatoryTool />, label: 'Regulatory', icon: <GavelIcon /> },
  { path: '/settings', element: <Settings />, label: 'Settings', icon: <SettingsIcon /> },
];
```

---

## Component Template

Use this template for new components:

```typescript
// src/components/ExampleDashboard/ExampleDashboard.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

interface ExampleDashboardProps {
  title?: string;
}

export const ExampleDashboard: React.FC<ExampleDashboardProps> = ({
  title = 'Dashboard'
}) => {
  return (
    <Box sx={{ p: 3, bgcolor: '#F8F9FA', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1E3A5F' }}>
        {title}
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Service Availability
              </Typography>
              <Typography variant="h3" sx={{ color: '#2ECC71', fontWeight: 600 }}>
                98.5%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* More grid items... */}
      </Grid>
    </Box>
  );
};

export default ExampleDashboard;
```

---

## Chart Examples

### Line Chart (Recharts)
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="download" stroke="#2ECC71" strokeWidth={2} />
    <Line type="monotone" dataKey="upload" stroke="#3498DB" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

### Gauge Component (Custom)
```typescript
import { CircularProgress, Box, Typography } from '@mui/material';

interface GaugeProps {
  value: number;
  label: string;
  size?: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, label, size = 120 }) => {
  const getColor = (v: number) => {
    if (v >= 95) return '#2ECC71';
    if (v >= 80) return '#F39C12';
    return '#E74C3C';
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={4}
        sx={{ color: getColor(value) }}
      />
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>{value}%</Typography>
        <Typography variant="caption" color="textSecondary">{label}</Typography>
      </Box>
    </Box>
  );
};
```

### Data Table (MUI DataGrid)
```typescript
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'provider', headerName: 'Provider', width: 200 },
  { field: 'availability', headerName: 'Availability', width: 120 },
  { field: 'downloadRatio', headerName: 'Download Ratio', width: 130 },
  { field: 'latency', headerName: 'Latency (ms)', width: 120 },
  { field: 'status', headerName: 'Status', width: 100 },
];

<DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  rowsPerPageOptions={[10, 25, 50]}
  disableSelectionOnClick
  autoHeight
/>
```

---

## File Structure After Implementation

```
src/
├── components/
│   ├── BtrcDashboard/
│   │   ├── BtrcDashboard.tsx
│   │   ├── KpiSummaryCards.tsx
│   │   ├── QosHeatmap.tsx
│   │   ├── TopIspsChart.tsx
│   │   ├── AlertTimeline.tsx
│   │   └── index.ts
│   ├── QosDashboard/
│   │   ├── QosDashboard.tsx
│   │   ├── KpiGaugesPanel.tsx
│   │   ├── AlertsTable.tsx
│   │   ├── DrilldownView.tsx
│   │   └── index.ts
│   ├── OperationalDashboard/
│   │   └── ...
│   ├── RevenueDashboard/
│   │   └── ...
│   ├── ReportBuilder/
│   │   └── ...
│   ├── IspPortal/
│   │   └── ...
│   ├── MobileApp/
│   │   ├── MobileApp.tsx
│   │   ├── PhoneFrame.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── TestingScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── RegulatoryTool/
│   │   └── ...
│   └── shared/
│       ├── Gauge.tsx
│       ├── KpiCard.tsx
│       ├── StatusBadge.tsx
│       └── BangladeshMap.tsx
├── data/
│   ├── bangladeshRegions.ts
│   ├── mockIsps.ts
│   ├── mockQosData.ts
│   └── mockAlerts.ts
├── models/
│   ├── QosMetrics.ts
│   ├── Provider.ts
│   ├── Alert.ts
│   └── SpeedTest.ts
├── contexts/
│   └── ...
├── App.tsx
└── index.tsx
```

---

## Testing Checklist

After creating components:

- [ ] All dashboards render without errors
- [ ] Charts display with mock data
- [ ] Navigation works between all routes
- [ ] Responsive on 1920x1080 (desktop)
- [ ] Responsive on 1366x768 (laptop)
- [ ] Mobile app mockup displays correctly
- [ ] Bengali text renders properly
- [ ] Color coding matches QoS thresholds

---

## Deliverables

1. **Working React Application** - Runs on localhost:7001
2. **Screenshots** - Capture each dashboard for proposal docs
3. **Mock Data** - Realistic Bangladesh ISP data

---

## Related Files

| File | Location | Purpose |
|------|----------|---------|
| Original ToR | `../EoITor2025-12-11-OriginalDocFromBTRC.pdf` | Source requirements |
| Project Context | `../CLAUDE.md` | Full project documentation |
| UI Specs | `../submission/doc/mock-ui/TABLE-OF-CONTENTS.md` | Detailed UI specifications |
| ToR Summary | `../btrc-project-knowledge-base-tor-summary.md` | Summarized requirements |

---

## Notes

- **Port**: 7001 (not 3000 range)
- **No Backend**: All data is mocked
- **Languages**: Bengali + English required
- **Screenshots**: Will be used in proposal documentation
- **Keep it Simple**: Focus on visual representation, not full functionality

---

*BTRC QoS Monitoring Platform - Mock UI Project*
*Telcobright - December 2024*
