import { Alert, AlertSeverity, AlertType } from '../models/Alert.model';
import { AlertRepository } from '../repositories/AlertRepository';

export interface AlertStatistics {
  total: number;
  unacknowledged: number;
  bySeverity: Record<AlertSeverity, number>;
  byType: Record<AlertType, number>;
  criticalUnacknowledged: number;
  recentCount: number;
}

export class AlertService {
  private static instance: AlertService;
  private repository: AlertRepository;

  private constructor() {
    this.repository = new AlertRepository();
  }

  public static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService();
    }
    return AlertService.instance;
  }

  async getAllAlerts(): Promise<Alert[]> {
    return await this.repository.findAll();
  }

  async getAlertById(id: string): Promise<Alert | null> {
    return await this.repository.findById(id);
  }

  async getAlertsBySeverity(severity: AlertSeverity): Promise<Alert[]> {
    return await this.repository.findBySeverity(severity);
  }

  async getAlertsBySource(source: string): Promise<Alert[]> {
    return await this.repository.findBySource(source);
  }

  async getUnacknowledgedAlerts(): Promise<Alert[]> {
    return await this.repository.findUnacknowledged();
  }

  async createAlert(alertData: Partial<Alert>): Promise<Alert> {
    const alert = new Alert({
      ...alertData,
      timestamp: new Date(),
      acknowledged: false
    });
    return await this.repository.create(alert);
  }

  async acknowledgeAlert(id: string): Promise<Alert | null> {
    return await this.repository.acknowledge(id);
  }

  async acknowledgeMultipleAlerts(ids: string[]): Promise<boolean> {
    return await this.repository.acknowledgeMultiple(ids);
  }

  async deleteAlert(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  // Business logic methods
  async getCriticalAlerts(): Promise<Alert[]> {
    return await this.repository.findBySeverity('critical');
  }

  async getRecentAlerts(hours: number = 24): Promise<Alert[]> {
    const alerts = await this.getAllAlerts();
    const cutoffTime = new Date(Date.now() - hours * 3600000);
    return alerts.filter(a => new Date(a.timestamp) > cutoffTime);
  }

  async getAlertStatistics(): Promise<AlertStatistics> {
    const alerts = await this.getAllAlerts();
    const recentAlerts = await this.getRecentAlerts(24);
    
    const stats: AlertStatistics = {
      total: alerts.length,
      unacknowledged: alerts.filter(a => !a.acknowledged).length,
      bySeverity: {
        critical: 0,
        warning: 0,
        info: 0
      },
      byType: {
        power: 0,
        connectivity: 0,
        environmental: 0,
        structural: 0,
        disaster: 0
      },
      criticalUnacknowledged: 0,
      recentCount: recentAlerts.length
    };

    alerts.forEach(alert => {
      stats.bySeverity[alert.severity]++;
      stats.byType[alert.type]++;
      
      if (alert.severity === 'critical' && !alert.acknowledged) {
        stats.criticalUnacknowledged++;
      }
    });

    return stats;
  }

  async getAlertTrends(days: number = 7): Promise<any[]> {
    const alerts = await this.getAllAlerts();
    const trends: Map<string, any> = new Map();
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      trends.set(dateStr, {
        date: dateStr,
        critical: 0,
        warning: 0,
        info: 0,
        total: 0
      });
    }

    alerts.forEach(alert => {
      const dateStr = new Date(alert.timestamp).toISOString().split('T')[0];
      if (trends.has(dateStr)) {
        const dayData = trends.get(dateStr);
        dayData[alert.severity]++;
        dayData.total++;
      }
    });

    return Array.from(trends.values()).reverse();
  }

  async getPriorityAlerts(): Promise<Alert[]> {
    const alerts = await this.getUnacknowledgedAlerts();
    
    // Sort by severity score and timestamp
    return alerts.sort((a, b) => {
      const scoreDiff = b.getSeverityScore() - a.getSeverityScore();
      if (scoreDiff !== 0) return scoreDiff;
      
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }).slice(0, 10); // Return top 10 priority alerts
  }

  async getAlertsByTimeRange(startDate: Date, endDate: Date): Promise<Alert[]> {
    const alerts = await this.getAllAlerts();
    return alerts.filter(a => {
      const alertTime = new Date(a.timestamp);
      return alertTime >= startDate && alertTime <= endDate;
    });
  }

  async bulkCreateAlerts(alertsData: Partial<Alert>[]): Promise<Alert[]> {
    const createdAlerts: Alert[] = [];
    
    for (const data of alertsData) {
      const alert = await this.createAlert(data);
      createdAlerts.push(alert);
    }
    
    return createdAlerts;
  }
}