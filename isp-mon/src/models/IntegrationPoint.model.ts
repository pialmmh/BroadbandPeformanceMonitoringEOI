export type IntegrationType = 'NOC' | 'SOC' | 'TOC' | 'TowerCo' | 'NTTN' | 'Third-Party' | 'Disaster-Org';
export type IntegrationStatus = 'connected' | 'disconnected' | 'error';
export type IntegrationProtocol = 'REST' | 'SOAP' | 'GraphQL' | 'WebSocket' | 'MQTT';

export class IntegrationPoint {
  id: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  lastSync: Date;
  dataPoints: number;
  errorRate: number;
  endpoint: string;
  protocol: IntegrationProtocol;
  apiKey?: string;
  syncInterval: number; // in minutes
  lastError?: string;
  metadata?: Record<string, any>;

  constructor(data: Partial<IntegrationPoint>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'Third-Party';
    this.status = data.status || 'disconnected';
    this.lastSync = data.lastSync ? new Date(data.lastSync) : new Date();
    this.dataPoints = data.dataPoints || 0;
    this.errorRate = data.errorRate || 0;
    this.endpoint = data.endpoint || '';
    this.protocol = data.protocol || 'REST';
    this.apiKey = data.apiKey;
    this.syncInterval = data.syncInterval || 30;
    this.lastError = data.lastError;
    this.metadata = data.metadata || {};
  }

  static fromJSON(json: any): IntegrationPoint {
    return new IntegrationPoint({
      ...json,
      lastSync: new Date(json.lastSync)
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      status: this.status,
      lastSync: this.lastSync.toISOString(),
      dataPoints: this.dataPoints,
      errorRate: this.errorRate,
      endpoint: this.endpoint,
      protocol: this.protocol,
      apiKey: this.apiKey,
      syncInterval: this.syncInterval,
      lastError: this.lastError,
      metadata: this.metadata
    };
  }

  isHealthy(): boolean {
    return this.status === 'connected' && this.errorRate < 0.05;
  }

  getTimeSinceLastSync(): number {
    return Date.now() - this.lastSync.getTime();
  }

  needsSync(): boolean {
    const syncIntervalMs = this.syncInterval * 60 * 1000;
    return this.getTimeSinceLastSync() > syncIntervalMs;
  }
}