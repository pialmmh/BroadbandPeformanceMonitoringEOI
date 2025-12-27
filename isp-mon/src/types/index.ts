export interface Tower {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'operational' | 'warning' | 'critical' | 'offline';
  health: {
    structural: number;
    power: 'normal' | 'battery' | 'generator' | 'offline';
    environmental: {
      temperature: number;
      humidity: number;
      windSpeed: number;
    };
  };
  connectivity: number;
  lastUpdate: Date;
  alerts: Alert[];
}

export interface NTTNNode {
  id: string;
  name: string;
  type: 'core' | 'edge' | 'access';
  status: 'operational' | 'degraded' | 'critical' | 'offline';
  bandwidth: {
    current: number;
    capacity: number;
  };
  latency: number;
  packetLoss: number;
  load: number;
  connectedTowers: string[];
  lastUpdate: Date;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  type: 'power' | 'connectivity' | 'environmental' | 'structural' | 'disaster';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  source: string;
}

export interface DisasterEvent {
  id: string;
  type: 'flood' | 'earthquake' | 'storm' | 'fire' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRegion: {
    name: string;
    coordinates: [number, number][];
  };
  affectedInfrastructure: {
    towers: string[];
    nttnNodes: string[];
  };
  status: 'predicted' | 'active' | 'contained' | 'resolved';
  startTime: Date;
  endTime?: Date;
  responseTeams: string[];
}

export interface ResponseTeam {
  id: string;
  name: string;
  status: 'available' | 'deployed' | 'en-route';
  location?: {
    lat: number;
    lng: number;
  };
  assignedDisaster?: string;
  resources: {
    personnel: number;
    vehicles: number;
    equipment: string[];
  };
}

export interface IntegrationPoint {
  id: string;
  name: string;
  type: 'NOC' | 'SOC' | 'TOC' | 'TowerCo' | 'NTTN' | 'Third-Party' | 'Disaster-Org';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  dataPoints: number;
  errorRate: number;
}

export interface SystemMetrics {
  totalTowers: number;
  operationalTowers: number;
  totalNTTNNodes: number;
  operationalNTTNNodes: number;
  activeAlerts: number;
  criticalAlerts: number;
  averageUptime: number;
  networkLoad: number;
  disasterRisk: 'low' | 'medium' | 'high';
}