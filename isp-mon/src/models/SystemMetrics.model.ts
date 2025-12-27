export type RiskLevel = 'low' | 'medium' | 'high';

export class SystemMetrics {
  totalTowers: number;
  operationalTowers: number;
  totalNTTNNodes: number;
  operationalNTTNNodes: number;
  activeAlerts: number;
  criticalAlerts: number;
  averageUptime: number;
  networkLoad: number;
  disasterRisk: RiskLevel;
  totalBandwidth: number;
  usedBandwidth: number;
  averageLatency: number;
  packetLossRate: number;
  timestamp: Date;

  constructor(data: Partial<SystemMetrics>) {
    this.totalTowers = data.totalTowers || 0;
    this.operationalTowers = data.operationalTowers || 0;
    this.totalNTTNNodes = data.totalNTTNNodes || 0;
    this.operationalNTTNNodes = data.operationalNTTNNodes || 0;
    this.activeAlerts = data.activeAlerts || 0;
    this.criticalAlerts = data.criticalAlerts || 0;
    this.averageUptime = data.averageUptime || 0;
    this.networkLoad = data.networkLoad || 0;
    this.disasterRisk = data.disasterRisk || 'low';
    this.totalBandwidth = data.totalBandwidth || 0;
    this.usedBandwidth = data.usedBandwidth || 0;
    this.averageLatency = data.averageLatency || 0;
    this.packetLossRate = data.packetLossRate || 0;
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
  }

  static fromJSON(json: any): SystemMetrics {
    return new SystemMetrics({
      ...json,
      timestamp: new Date(json.timestamp)
    });
  }

  toJSON(): any {
    return {
      totalTowers: this.totalTowers,
      operationalTowers: this.operationalTowers,
      totalNTTNNodes: this.totalNTTNNodes,
      operationalNTTNNodes: this.operationalNTTNNodes,
      activeAlerts: this.activeAlerts,
      criticalAlerts: this.criticalAlerts,
      averageUptime: this.averageUptime,
      networkLoad: this.networkLoad,
      disasterRisk: this.disasterRisk,
      totalBandwidth: this.totalBandwidth,
      usedBandwidth: this.usedBandwidth,
      averageLatency: this.averageLatency,
      packetLossRate: this.packetLossRate,
      timestamp: this.timestamp.toISOString()
    };
  }

  getTowerAvailability(): number {
    if (this.totalTowers === 0) return 0;
    return (this.operationalTowers / this.totalTowers) * 100;
  }

  getNodeAvailability(): number {
    if (this.totalNTTNNodes === 0) return 0;
    return (this.operationalNTTNNodes / this.totalNTTNNodes) * 100;
  }

  getBandwidthUtilization(): number {
    if (this.totalBandwidth === 0) return 0;
    return (this.usedBandwidth / this.totalBandwidth) * 100;
  }

  getHealthScore(): number {
    const towerScore = this.getTowerAvailability() * 0.3;
    const nodeScore = this.getNodeAvailability() * 0.3;
    const uptimeScore = this.averageUptime * 0.2;
    const alertScore = Math.max(0, 100 - (this.criticalAlerts * 10)) * 0.2;
    
    return Math.min(100, towerScore + nodeScore + uptimeScore + alertScore);
  }
}