# Executive Dashboard - UI Features

## KPI Summary Cards (Top Row)
- Service Availability % (gauge)
- Avg Download Speed Ratio
- Total Active ISPs
- Active Alerts Count

## National Overview Section
- Bangladesh map with QoS heatmap by division
- Color: Green (good) → Yellow → Red (poor)
- Click division to drill-down

## Top ISPs Panel
- Horizontal bar chart
- Top 10 ISPs by QoS score
- Show provider name + score

## Alert Summary
- Last 24h alerts list
- Severity icons (critical/warning/info)
- Provider, region, time
- "View All" link

## Trend Chart
- Line chart: QoS over time (7 days default)
- Toggle: Availability / Speed / Latency
- Compare multiple providers

## Quick Stats Footer
- Total subscribers monitored
- Data points collected today
- Last refresh timestamp

---

**Component**: `src/components/BtrcDashboard/`
**ToR Ref**: Section 3.4, p.8-9
