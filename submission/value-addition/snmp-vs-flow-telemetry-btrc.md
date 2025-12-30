# SNMP vs Flow Telemetry: Enhanced Regulatory Visibility

## The Fundamental Difference

| Aspect | SNMP | NetFlow/IPFIX/sFlow |
|--------|------|---------------------|
| **What it sees** | Interface totals (aggregate counters) | Individual conversations (per-flow) |
| **Granularity** | "Port 1 passed 500GB today" | "IP A sent 50MB to IP B on port 443" |
| **Analogy** | Water meter on building entrance | Individual apartment meters |

---

## What SNMP Tells You

```
Interface GigabitEthernet0/1:
  - Total bytes in: 523,847,293,847
  - Total bytes out: 412,938,472,938
  - Packets in: 892,374,823
  - Packets out: 734,928,374
  - Errors: 23
  - Discards: 0
```

**Limitation:** You know the pipe is full. You don't know WHO filled it or with WHAT.

---

## What Flow Telemetry Adds

```
Flow Records (sample):
  10.1.1.5 → 142.250.185.206:443  | 45MB  | HTTPS (Google)
  10.1.1.8 → 31.13.71.36:443      | 32MB  | HTTPS (Facebook)
  10.1.1.3 → 103.21.244.15:80     | 28MB  | HTTP (Local CDN)
  10.1.1.9 → 185.199.108.153:443  | 12MB  | HTTPS (GitHub)
  ...
```

**Gain:** You know WHO is talking to WHOM, on WHAT service, using HOW MUCH.

---

## Regulatory Insights (Without DPI)

| Insight | SNMP | Flow | How It Helps BTRC |
|---------|------|------|-------------------|
| Total bandwidth used | ✅ | ✅ | Capacity verification |
| Which interface is congested | ✅ | ✅ | Bottleneck identification |
| **Which services dominate traffic** | ❌ | ✅ | Understand subscriber usage patterns |
| **Traffic to specific destinations** | ❌ | ✅ | See top content providers (Google, Facebook, etc.) |
| **International vs domestic ratio** | ❌ | ✅ | BDIX utilization, IIG capacity |
| **Traffic anomalies by destination** | ❌ | ✅ | Potential DDoS, service disruption |
| **Peak hour breakdown by service** | ❌ | ✅ | Congestion root cause |
| **Comparative fairness across destinations** | ❌ | ✅ | Net neutrality indicators |

---

## What Flow Telemetry Does NOT Provide (Without DPI)

| Cannot See | Why | Impact |
|------------|-----|--------|
| Actual application (YouTube vs Netflix on port 443) | Encrypted, same port | Service classification is approximate |
| Content of traffic | No payload inspection | Cannot detect malware in transit |
| True latency/RTT | Not in standard export | QoE measurement limited |
| Packet loss | Requires sequence analysis | Quality metrics incomplete |

---

## Realistic Value for BTRC

**With SNMP alone, BTRC can answer:**
- Is the ISP's link full? (Yes/No)
- Is there packet loss on the interface? (Yes/No)

**With Flow Telemetry added, BTRC can answer:**
- What is filling the link? (Video streaming: 58%, Web: 22%, etc.)
- Where is traffic going? (International: 65%, Domestic: 25%, BDIX: 10%)
- Who are the top destinations? (Google: 30%, Facebook: 18%, etc.)
- Are there unusual traffic patterns? (Spike to single IP = possible attack)
- Is one service being treated differently? (Comparative throughput analysis)

---

## Summary

Flow telemetry (NetFlow/IPFIX/sFlow) extends SNMP-based monitoring by providing per-conversation visibility. While SNMP reports aggregate interface statistics, flow data reveals traffic composition, destination distribution, and usage patterns—without requiring deep packet inspection.

This enables BTRC to understand not just *how much* traffic ISPs carry, but *what kind* of traffic and *where* it flows. Insights include service category breakdown, international vs domestic ratios, top destination analysis, and traffic anomaly detection.

**Limitation acknowledged:** Flow telemetry provides metadata analysis only. Application-layer details within encrypted traffic (HTTPS) and quality metrics (latency, jitter) are not available through standard flow export.

---

**SNMP enables monitoring. Flow telemetry enables informed regulation.**
