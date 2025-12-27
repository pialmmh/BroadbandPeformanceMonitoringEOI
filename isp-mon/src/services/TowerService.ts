import { Tower } from '../models/Tower.model';
import { TowerRepository } from '../repositories/TowerRepository';
import { Alert } from '../models/Alert.model';

export class TowerService {
  private static instance: TowerService;
  private repository: TowerRepository;

  private constructor() {
    this.repository = new TowerRepository();
  }

  public static getInstance(): TowerService {
    if (!TowerService.instance) {
      TowerService.instance = new TowerService();
    }
    return TowerService.instance;
  }

  async getAllTowers(): Promise<Tower[]> {
    return await this.repository.findAll();
  }

  async getTowerById(id: string): Promise<Tower | null> {
    return await this.repository.findById(id);
  }

  async getTowersByStatus(status: string): Promise<Tower[]> {
    return await this.repository.findByStatus(status);
  }

  async getNearbyTowers(lat: number, lng: number, radiusKm: number): Promise<Tower[]> {
    return await this.repository.findByLocation(lat, lng, radiusKm);
  }

  async createTower(towerData: Partial<Tower>): Promise<Tower> {
    const tower = new Tower(towerData);
    return await this.repository.create(tower);
  }

  async updateTower(id: string, updates: Partial<Tower>): Promise<Tower | null> {
    return await this.repository.update(id, updates);
  }

  async updateTowerHealth(id: string, health: any): Promise<Tower | null> {
    return await this.repository.updateHealth(id, health);
  }

  async deleteTower(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  // Business logic methods
  async getTowerHealth(id: string): Promise<number> {
    const tower = await this.getTowerById(id);
    if (!tower) return 0;

    const structuralScore = tower.health.structural * 0.4;
    const powerScore = this.getPowerScore(tower.health.power) * 0.3;
    const connectivityScore = tower.connectivity * 0.3;

    return Math.min(100, structuralScore + powerScore + connectivityScore);
  }

  async getCriticalTowers(): Promise<Tower[]> {
    const towers = await this.getAllTowers();
    return towers.filter(t => t.status === 'critical' || t.status === 'offline');
  }

  async getTowersNeedingMaintenance(): Promise<Tower[]> {
    const towers = await this.getAllTowers();
    return towers.filter(t => {
      const healthScore = t.health.structural;
      const hasAlerts = t.alerts && t.alerts.length > 0;
      return healthScore < 80 || hasAlerts || t.status === 'warning';
    });
  }

  async getTowerStatistics(): Promise<any> {
    const towers = await this.getAllTowers();
    
    return {
      total: towers.length,
      operational: towers.filter(t => t.status === 'operational').length,
      warning: towers.filter(t => t.status === 'warning').length,
      critical: towers.filter(t => t.status === 'critical').length,
      offline: towers.filter(t => t.status === 'offline').length,
      averageHealth: towers.reduce((acc, t) => acc + t.health.structural, 0) / towers.length,
      averageConnectivity: towers.reduce((acc, t) => acc + t.connectivity, 0) / towers.length,
      powerStatus: {
        normal: towers.filter(t => t.health.power === 'normal').length,
        battery: towers.filter(t => t.health.power === 'battery').length,
        generator: towers.filter(t => t.health.power === 'generator').length,
        offline: towers.filter(t => t.health.power === 'offline').length
      }
    };
  }

  private getPowerScore(powerStatus: Tower['health']['power']): number {
    switch (powerStatus) {
      case 'normal': return 100;
      case 'battery': return 75;
      case 'generator': return 50;
      case 'offline': return 0;
      default: return 0;
    }
  }

  async getEnvironmentalRisks(): Promise<Tower[]> {
    const towers = await this.getAllTowers();
    return towers.filter(t => {
      const env = t.health.environmental;
      return env.temperature > 35 || env.humidity > 85 || env.windSpeed > 40;
    });
  }
}