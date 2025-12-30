# VALUE ADDITION: Bangladesh Internet Routing Integrity Protection System

## 1. Introduction

As a value-added capability beyond the core QoS monitoring requirements, we propose the inclusion of a **Routing Integrity Protection System** to provide BTRC with visibility into Bangladesh's internet routing ecosystem.

Internet routing relies on the Border Gateway Protocol (BGP), which was designed without built-in security mechanisms. This creates vulnerabilities where Bangladesh's IP address space could potentially be announced by unauthorized foreign networks—either through misconfiguration or malicious intent. Such incidents can redirect traffic through unintended paths, potentially impacting service availability and data security.

Currently, BTRC has limited visibility into how Bangladesh's IP prefixes are routed globally. This module addresses that gap by providing monitoring and alerting capabilities.

---

## 2. Objectives

The Routing Integrity Protection System aims to provide:

- **Visibility:** Understand what routes Bangladesh ISPs are receiving and advertising
- **Validation:** Verify route announcements against authoritative registries (RPKI/ROA)
- **Alerting:** Notify BTRC when routing anomalies are detected
- **Reporting:** Document ISP routing practices for regulatory oversight

**Important Clarification:** This system provides *detection and alerting* capabilities. Actual route filtering or traffic manipulation remains the responsibility of individual ISPs. The system does not interfere with ISP routing decisions.

---

## 3. Data Collection Options

The following mechanisms are proposed as options for collecting routing data from ISPs. The appropriate method(s) will be determined during subsequent project phases based on ISP infrastructure and BTRC requirements.

### Option A: BGP Monitoring Protocol (BMP)

- Standard protocol (RFC 7854) for streaming routing table data
- Supported by major router vendors (Cisco, Juniper, Huawei, Nokia)
- Limited support on older MikroTik devices

### Option B: BGP Route Collector

- BTRC operates a passive BGP peer that receives routes from ISPs
- ISPs configure their routers to send routing tables to BTRC
- BTRC collector does not advertise any routes (read-only)
- Works with all BGP-capable equipment

### Option C: Periodic Export via API

- ISPs export routing table snapshots via router APIs
- Suitable for equipment not supporting BMP or BGP peering
- Less timely than real-time options

*The selection of collection method(s) will be finalized during the detailed design phase in consultation with ISPs.*

---

## 4. Global Reference Data Options

To identify routing anomalies, locally collected data may be compared against global reference sources. The following options are available:

### 4.1 Publicly Available Sources (No Cost)

| Source | Data Provided | Limitations |
|--------|---------------|-------------|
| RPKI Repositories (via public validators) | Route Origin Authorization records | Coverage limited to prefixes with published ROAs (~50% globally) |
| RIPE RIS | BGP routing data from global collectors | Detection delays of 1-5 minutes typical |
| RouteViews | Historical and current BGP tables | Data intervals of 15 minutes to 2 hours |
| RIPEstat API | Routing status queries | Rate-limited; suitable for periodic checks |

### 4.2 Open-Source Tools

| Tool | Function |
|------|----------|
| BGPalerter | Anomaly detection using public BGP streams |
| Routinator | Self-hosted RPKI validator |
| FRRouting (FRR) | BGP route collector software |

### 4.3 Commercial Services (Optional, Future Consideration)

Commercial BGP monitoring services (such as Kentik, Qrator.Radar, or similar) may offer faster detection and additional features. These may be evaluated as optional enhancements based on operational experience and budget availability. No commercial service integration is included in the base proposal.

---

## 5. Detection Capabilities

Subject to the data sources implemented, the system can provide the following detection capabilities:

| Detection Type | Method | Expected Detection Time |
|----------------|--------|------------------------|
| RPKI Invalid Routes | Query against RPKI validators | Near real-time (seconds) |
| Origin AS Mismatch | Compare against expected originators | 1-5 minutes (via public BGP streams) |
| Unexpected Sub-prefix Announcements | Monitor for more-specific prefixes | 1-5 minutes |
| Visibility Loss | Monitor prefix reachability from global collectors | 5-15 minutes |
| Suspicious AS Path | Flag paths through designated high-risk ASNs | 1-5 minutes |

**Note on Detection Speed:** Detection times depend on the propagation of BGP updates through global collector networks. The system provides *near real-time* monitoring, not instantaneous detection. Typical detection latency ranges from 1 to 5 minutes for most anomaly types.

---

## 6. Limitations

For transparency, we note the following limitations:

| Aspect | Limitation |
|--------|------------|
| Detection Speed | Minutes, not seconds—dependent on global BGP propagation |
| RPKI Coverage | Only effective for prefixes with published ROAs |
| Automatic Mitigation | Not supported—system provides alerts only |
| Global Visibility | Dependent on coverage of public route collectors |
| Historical Analysis | Limited to data retention period |

---

## 7. Proposed Deliverables

| Deliverable | Description |
|-------------|-------------|
| Route Collector Infrastructure | Server(s) to receive and store ISP routing data |
| RPKI Validation Integration | Capability to check routes against RPKI repositories |
| Anomaly Detection Engine | Rule-based detection for common routing anomalies |
| Alert Notifications | Email/SMS alerts for detected anomalies |
| Basic Dashboard | Interface to view current routing status and recent alerts |
| Periodic Reports | Summary reports on routing health and ISP compliance |

---

## 8. Implementation Approach

### Phase 1: Foundation
- Deploy route collector infrastructure
- Integrate with publicly available RPKI validators
- Implement basic detection rules
- Establish alerting mechanism

### Phase 2: ISP Integration
- Coordinate with ISPs on data collection method
- Begin with pilot group of willing ISPs
- Refine detection thresholds based on observed patterns

### Phase 3: Expansion (Future)
- Extend coverage to additional ISPs
- Evaluate need for commercial service integration
- Enhance reporting capabilities

---

## 9. Summary

This value addition provides BTRC with foundational visibility into Bangladesh's internet routing ecosystem—a capability that currently does not exist at the regulatory level.

The system is designed with realistic expectations:
- Detection in minutes, not seconds
- Alerting and visibility, not automatic blocking
- Based on publicly available infrastructure
- Extensible with commercial options if required

By implementing this module, BTRC gains the ability to independently observe routing behavior across licensed ISPs and receive alerts when anomalies occur, supporting informed regulatory decisions.

---

*The specific implementation details, data sources, and integration options described herein will be finalized in consultation with BTRC during subsequent project phases.*
