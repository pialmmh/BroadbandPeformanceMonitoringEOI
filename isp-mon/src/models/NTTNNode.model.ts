export interface IBandwidth {
  current: number;
  capacity: number;
}

export class NTTNNode {
  id: string;
  name: string;
  type: 'core' | 'edge' | 'access';
  status: 'operational' | 'degraded' | 'critical' | 'offline';
  bandwidth: IBandwidth;
  latency: number;
  packetLoss: number;
  connectedTowers: string[];
  lastUpdate: Date;

  constructor(data: Partial<NTTNNode>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'access';
    this.status = data.status || 'offline';
    this.bandwidth = data.bandwidth || { current: 0, capacity: 0 };
    this.latency = data.latency || 0;
    this.packetLoss = data.packetLoss || 0;
    this.connectedTowers = data.connectedTowers || [];
    this.lastUpdate = data.lastUpdate ? new Date(data.lastUpdate) : new Date();
  }

  static fromJSON(json: any): NTTNNode {
    return new NTTNNode({
      ...json,
      lastUpdate: new Date(json.lastUpdate)
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      status: this.status,
      bandwidth: this.bandwidth,
      latency: this.latency,
      packetLoss: this.packetLoss,
      connectedTowers: this.connectedTowers,
      lastUpdate: this.lastUpdate.toISOString()
    };
  }

  getUtilization(): number {
    if (this.bandwidth.capacity === 0) return 0;
    return (this.bandwidth.current / this.bandwidth.capacity) * 100;
  }
}