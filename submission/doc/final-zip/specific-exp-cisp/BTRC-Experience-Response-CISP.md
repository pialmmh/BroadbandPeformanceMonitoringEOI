# Response to BTRC Requirement: Practical Experience in Integrated Platform Development

**Requirement Reference:** Bidder shall have at least 2 (two) practical experiences in developing monitoring/analytics/SAS/OSS/BSS/QoS platforms or integrated service management platforms with integration to at least 3 external systems.

---

## Project 1: Common Interconnection SMS Platform (CISP)

**Client:** Association of ICX Operators Bangladesh (AIOB)
**Status:** Live in Production
**Duration:** Ongoing since 2022

### Project Overview

Telcobright designed, developed, and operates the **Common Interconnection SMS Platform (CISP)** — the national SMS transit gateway that routes **all inter-operator SMS traffic in Bangladesh**. This mission-critical platform serves as the centralized softswitch for SMS interconnection among all Mobile Network Operators (Grameenphone, Robi, Banglalink, Teletalk) and 12+ IPTSP operators.

We humbly note that platforms of this complexity and national significance are typically delivered by global telecom vendors such as Ericsson, Huawei, and Nokia. Telcobright's successful delivery demonstrates our capability to execute carrier-grade, nationally critical infrastructure projects.

### Scope & Technical Achievement

| Aspect | Description |
|--------|-------------|
| **Architecture** | DC-DR redundant deployment across 2 geographically distributed POPs with automatic failover |
| **Availability** | 99.999% uptime SLA — satisfying the stringent requirements of Tier-1 MNOs |
| **Traffic Volume** | Processes millions of SMS messages daily across all Bangladesh operators |
| **Protocol Complexity** | SIGTRAN/SS7 signaling with complex MSU correlation across distributed nodes |
| **CDR Generation** | Real-time correlation of multi-leg signaling transactions to generate accurate billing records |
| **Billing System** | Complete billing platform with reconciliation accuracy matching MNO expectations |

### External System Integrations (Exceeds 3+ Requirement)

| # | Integration Type | Systems Integrated |
|---|-----------------|-------------------|
| 1 | **SIGTRAN Protocol Integration** | 5 MNOs (GP, Robi, Banglalink, Teletalk, and others) + 12+ IPTSPs |
| 2 | **NMS/OSS Integration** | Real-time statistics collection, system health monitoring |
| 3 | **Automated Alerting System** | Stakeholder notifications for link failures, transmission issues |
| 4 | **Billing/Settlement System** | CDR generation and inter-operator settlement reconciliation |
| 5 | **Network Infrastructure** | BGP routing, IPSec overlay networks, secure interconnection |

### Network Design Expertise

The project required sophisticated network architecture including:
- BGP-based routing for traffic engineering
- IPSec overlay networks for secure inter-operator connectivity
- BGP-over-IPSec for encrypted routing protocol exchange

This networking expertise was subsequently applied to design and implement the complete network infrastructure for **BTCL's SMSC project**, demonstrating repeatability of our capabilities.

---

## Relevance to BTRC QoS Monitoring Project

| CISP Experience | BTRC Project Application |
|-----------------|-------------------------|
| Handling MNO first-class citizen data (SMS) | Handling ISP operational data (secondary, less sensitive) |
| 99.999% availability for national infrastructure | High availability for regulatory monitoring platform |
| Real-time signaling correlation & CDR generation | Real-time QoS metric computation & reporting |
| Multi-operator integration (17+ entities) | Multi-ISP integration (1,500+ entities) |
| NMS/OSS integration with automated alerting | Dashboard integration with automated compliance alerts |
| Carrier-grade billing reconciliation | Revenue analytics and ARPU computation |

**Conclusion:** If Telcobright can satisfy the exacting standards of Bangladesh's major MNOs with their mission-critical SMS traffic, we are well-positioned to deliver a robust QoS monitoring platform for BTRC that handles secondary operational data from ISPs.

---

*[Project 2 documentation to follow]*

*Live URL and supporting documents available upon request.*
