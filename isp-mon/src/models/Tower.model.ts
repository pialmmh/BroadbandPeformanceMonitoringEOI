export interface ITowerLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface ITowerEnvironmental {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface ITowerHealth {
  structural: number;
  power: 'normal' | 'battery' | 'generator' | 'offline';
  environmental: ITowerEnvironmental;
}

export class Tower {
  id: string;
  name: string;
  location: ITowerLocation;
  status: 'operational' | 'warning' | 'critical' | 'offline';
  health: ITowerHealth;
  connectivity: number;
  lastUpdate: Date;
  alerts: string[];

  constructor(data: Partial<Tower>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.location = data.location || { lat: 0, lng: 0, address: '' };
    this.status = data.status || 'offline';
    this.health = data.health || {
      structural: 0,
      power: 'offline',
      environmental: { temperature: 0, humidity: 0, windSpeed: 0 }
    };
    this.connectivity = data.connectivity || 0;
    this.lastUpdate = data.lastUpdate ? new Date(data.lastUpdate) : new Date();
    this.alerts = data.alerts || [];
  }

  static fromJSON(json: any): Tower {
    return new Tower({
      ...json,
      lastUpdate: new Date(json.lastUpdate)
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      status: this.status,
      health: this.health,
      connectivity: this.connectivity,
      lastUpdate: this.lastUpdate.toISOString(),
      alerts: this.alerts
    };
  }
}