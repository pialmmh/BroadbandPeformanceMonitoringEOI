import { TowerService } from './TowerService';
import { AlertService } from './AlertService';

// Re-export all services
export { TowerService } from './TowerService';
export { AlertService } from './AlertService';

// Service Manager for centralized service access
export class ServiceManager {
  private static instance: ServiceManager;
  
  private towerService: TowerService;
  private alertService: AlertService;

  private constructor() {
    this.towerService = TowerService.getInstance();
    this.alertService = AlertService.getInstance();
  }

  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  public getTowerService(): TowerService {
    return this.towerService;
  }

  public getAlertService(): AlertService {
    return this.alertService;
  }
}