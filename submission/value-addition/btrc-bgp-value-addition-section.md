# VALUE ADDITION: BGP Route Monitoring & Validation Module

## 1. Introduction

As a value-added feature beyond the core QoS monitoring requirements, we propose the inclusion of a **BGP Route Monitoring and Validation Module** to enhance BTRC's regulatory oversight capabilities. This module addresses a critical but often overlooked aspect of internet service quality: routing integrity and security.

While traditional QoS monitoring focuses on bandwidth, latency, and packet loss metrics, routing anomalies such as BGP hijacking, route leaks, and traffic interception through hostile networks can severely impact service quality and national cybersecurity—often without detection through conventional monitoring approaches.

This value addition positions BTRC as a forward-looking regulator with comprehensive visibility into Bangladesh's internet routing ecosystem.

---

## 2. Regulatory Value Proposition

The BGP Route Monitoring Module enables BTRC to:

- **Protect Bangladesh's IP Address Space:** Detect unauthorized announcements of Bangladesh-allocated prefixes by foreign autonomous systems
- **Verify Routing Hygiene:** Ensure ISPs maintain proper routing configurations and adopt security best practices such as RPKI (Resource Public Key Infrastructure)
- **Identify Security Risks:** Monitor for traffic paths transiting through high-risk jurisdictions that may pose surveillance or interception concerns
- **Support Incident Response:** Provide forensic data for investigating routing-related service disruptions
- **Measure Compliance:** Generate regulatory reports on ISP routing security maturity and RPKI adoption rates

---

## 3. Data Collection Mechanisms (Options)

The following data collection mechanisms are proposed as options for consideration. The final selection will be determined during subsequent project phases (RFP and detailed design) based on BTRC's requirements, ISP infrastructure compatibility, and implementation priorities.

### Option A: BGP Monitoring Protocol (BMP)

| Aspect | Description |
|--------|-------------|
| Protocol | BMP (RFC 7854) |
| Transport | TCP, typically port 11019 |
| Mechanism | ISP routers stream BGP RIB updates to BTRC collector in real-time |
| Vendor Support | Cisco IOS-XR, Juniper JunOS, Huawei VRP, Nokia SR-OS, MikroTik RouterOS v7+ |
| Advantages | Purpose-built for monitoring; minimal ISP configuration; real-time visibility |

### Option B: Passive BGP Peering

| Aspect | Description |
|--------|-------------|
| Protocol | BGP (RFC 4271) |
| Transport | TCP port 179 |
| Mechanism | BTRC route collector establishes BGP session with ISP routers; receives full RIB without advertising routes |
| Vendor Support | Universal (all BGP-capable devices) |
| Advantages | Works with any router; no special protocol support required |

### Option C: Router API Integration

| Aspect | Description |
|--------|-------------|
| Protocol | REST API, NETCONF/YANG, or RouterOS API |
| Mechanism | Periodic polling of BGP routing table via vendor-specific APIs |
| Vendor Support | Varies by vendor; well-supported on MikroTik, Cisco, Juniper |
| Advantages | No protocol changes required; suitable for legacy equipment |

### Option D: Hybrid Approach

A combination of the above mechanisms may be employed to accommodate the diverse equipment landscape across Bangladesh's ISP ecosystem. For example:
- BMP for Tier-1 ISPs with modern infrastructure
- BGP peering for Tier-2 ISPs
- API-based collection for smaller ISPs with MikroTik-dominated networks

*The optimal approach will be finalized in consultation with BTRC during the detailed design phase.*

---

## 4. Global Reference Data Integration (Options)

To validate locally collected routing data and detect anomalies, the platform may integrate with established global BGP monitoring and validation services. The following integration options are proposed for consideration:

### 4.1 Open/Free Data Sources

| Source | Description | Integration Method |
|--------|-------------|-------------------|
| **RouteViews (University of Oregon)** | Global BGP routing tables from 1,000+ peers across 20+ collectors worldwide | REST API, MRT data files |
| **RIPE RIS (Routing Information Service)** | BGP data from 300+ collectors with strong Asia-Pacific coverage | RIPEstat API, BGP streaming |
| **RPKI Repositories (APNIC, RIPE, etc.)** | Authoritative Route Origin Authorization (ROA) data for cryptographic route validation | RPKI-to-Router (RTR) protocol, REST API |
| **Cloudflare RPKI Portal** | Validated ROA payload and prefix-origin validation | REST API (free, CC BY-NC 4.0) |
| **NIST RPKI Monitor** | RPKI validation status tracking and analytics | Public data access |

### 4.2 Commercial Analytics Services (Optional Enhancement)

| Provider | Capabilities | Consideration |
|----------|--------------|---------------|
| **Kentik** | Enterprise BGP monitoring, hijack detection, RPKI validation, comprehensive API | Subscription-based; suitable for enhanced alerting |
| **Qrator.Radar** | Real-time BGP anomaly detection, AS reputation scoring | Per-ASN pricing model |
| **Cisco Crosswork Cloud** | BGP monitoring, historical analysis, integration with Cisco ecosystem | Enterprise licensing |
| **ThousandEyes** | BGP monitoring combined with synthetic transaction monitoring | Enterprise licensing |

### 4.3 Open-Source Tools

| Tool | Purpose | License |
|------|---------|---------|
| **BGPalerter** | Real-time hijack detection, RPKI validation, visibility monitoring | BSD (Free) |
| **BGPStream (CAIDA)** | Historical and real-time BGP data analysis framework | BSD (Free) |
| **Routinator** | Self-hosted RPKI validator | BSD (Free) |
| **OpenBMP** | BMP collector with Kafka integration | Apache 2.0 (Free) |

*The selection of global reference sources and commercial service integrations will be determined based on BTRC's budget allocation, data sovereignty considerations, and operational requirements. These decisions will be finalized during the RFP phase.*

---

## 5. Proposed Detection Capabilities

Subject to the data sources and integration options selected, the module can provide the following detection capabilities:

| Detection Type | Description | Data Requirement |
|----------------|-------------|------------------|
| **RPKI Validation** | Verify route announcements against cryptographically signed ROAs; identify RPKI-invalid routes | RPKI repository access |
| **Origin AS Anomaly** | Detect when Bangladesh prefixes are originated by unauthorized autonomous systems | ISP BGP data + global reference |
| **Sub-prefix Hijack** | Identify more-specific prefix announcements by foreign ASes | ISP BGP data + global reference |
| **Route Leak Detection** | Detect valley-free violations indicating accidental route propagation | ISP BGP data + AS relationship data |
| **High-Risk Path Monitoring** | Flag routes transiting through autonomous systems in designated high-risk jurisdictions | ISP BGP data + AS-to-country mapping |
| **Bogon Filtering Compliance** | Verify ISPs are not accepting or propagating reserved/private address space | ISP BGP data |
| **Visibility Monitoring** | Detect when Bangladesh prefixes lose global reachability | Global reference sources |

---

## 6. Implementation Approach

### Phase 1: Foundation (During Platform Development)
- Deploy BGP route collector infrastructure at BTRC data center
- Implement integration with selected open/free global reference sources
- Develop core detection algorithms and alerting framework

### Phase 2: ISP Onboarding (Post-Platform Deployment)
- Coordinate with ISPs on preferred data collection mechanism
- Pilot with select Tier-1 ISPs
- Refine detection thresholds based on Bangladesh routing patterns

### Phase 3: Enhancement (Future)
- Evaluate commercial service integration based on operational experience
- Expand coverage to all licensed ISPs
- Develop advanced analytics and predictive capabilities

---

## 7. Deliverables

| Deliverable | Description |
|-------------|-------------|
| BGP Route Collector | Centralized system to receive and store ISP routing data |
| RPKI Validation Engine | Integration with RPKI validators for route origin verification |
| Anomaly Detection Module | Real-time detection algorithms for hijacks, leaks, and suspicious paths |
| Global Comparison Engine | Cross-reference local routing with global reference sources |
| Regulatory Dashboard | Visual interface for BTRC to monitor routing health and ISP compliance |
| Alert System | Configurable notifications for routing security incidents |
| Compliance Reports | Periodic reports on ISP routing security posture and RPKI adoption |

---

## 8. Alignment with International Best Practices

This value addition aligns with globally recognized routing security initiatives:

- **MANRS (Mutually Agreed Norms for Routing Security):** Promotes filtering, anti-spoofing, coordination, and global validation
- **NIST Secure Inter-Domain Routing (SIDR):** US government guidelines for BGP security
- **APNIC Routing Security Recommendations:** Regional best practices for Asia-Pacific network operators

By implementing this module, BTRC would join a select group of national regulators with proactive routing security oversight capabilities.

---

## 9. Conclusion

The BGP Route Monitoring and Validation Module represents a strategic value addition that extends BTRC's regulatory visibility beyond traditional QoS metrics into the foundational layer of internet routing. The modular design—with multiple data collection options and flexible integration with global reference sources—ensures adaptability to BTRC's evolving requirements and budget considerations.

We welcome the opportunity to discuss these options in detail during subsequent project phases and to tailor the implementation to BTRC's specific priorities.

---

*Note: The specific data collection mechanisms, global service integrations, and commercial partnerships described herein are presented as options for BTRC's consideration. Final selections will be made collaboratively during the RFP evaluation and detailed design phases of the project.*
