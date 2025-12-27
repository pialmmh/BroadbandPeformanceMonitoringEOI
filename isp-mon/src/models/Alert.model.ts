export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertType = 'power' | 'connectivity' | 'environmental' | 'structural' | 'disaster';

export class Alert {
  id: string;
  severity: AlertSeverity;
  type: AlertType;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  source: string;
  metadata?: Record<string, any>;

  constructor(data: Partial<Alert>) {
    this.id = data.id || '';
    this.severity = data.severity || 'info';
    this.type = data.type || 'connectivity';
    this.message = data.message || '';
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.acknowledged = data.acknowledged || false;
    this.source = data.source || '';
    this.metadata = data.metadata || {};
  }

  static fromJSON(json: any): Alert {
    return new Alert({
      ...json,
      timestamp: new Date(json.timestamp)
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      severity: this.severity,
      type: this.type,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      acknowledged: this.acknowledged,
      source: this.source,
      metadata: this.metadata
    };
  }

  acknowledge(): void {
    this.acknowledged = true;
  }

  getSeverityScore(): number {
    switch (this.severity) {
      case 'critical': return 3;
      case 'warning': return 2;
      case 'info': return 1;
      default: return 0;
    }
  }
}