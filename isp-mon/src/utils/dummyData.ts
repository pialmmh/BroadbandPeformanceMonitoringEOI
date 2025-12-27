import { Tower, NTTNNode, Alert, DisasterEvent, ResponseTeam, IntegrationPoint } from '../types';

export const generateDummyTowers = (): Tower[] => {
  const towers: Tower[] = [];
  const locations = [
    { name: 'Dhaka-Tower-01', lat: 23.8103, lng: 90.4125, address: 'Gulshan, Dhaka' },
    { name: 'Dhaka-Tower-02', lat: 23.7509, lng: 90.3954, address: 'Dhanmondi, Dhaka' },
    { name: 'Chittagong-Tower-01', lat: 22.3569, lng: 91.7832, address: 'Agrabad, Chittagong' },
    { name: 'Sylhet-Tower-01', lat: 24.8949, lng: 91.8687, address: 'Zindabazar, Sylhet' },
    { name: 'Rajshahi-Tower-01', lat: 24.3745, lng: 88.6042, address: 'Shaheb Bazar, Rajshahi' },
    { name: 'Khulna-Tower-01', lat: 22.8456, lng: 89.5403, address: 'Khalishpur, Khulna' },
    { name: 'Barisal-Tower-01', lat: 22.7010, lng: 90.3535, address: 'Nathullabad, Barisal' },
    { name: 'Rangpur-Tower-01', lat: 25.7468, lng: 89.2508, address: 'Dhap, Rangpur' },
    { name: 'Mymensingh-Tower-01', lat: 24.7471, lng: 90.4203, address: 'Charpara, Mymensingh' },
    { name: 'Comilla-Tower-01', lat: 23.4607, lng: 91.1809, address: 'Kandirpar, Comilla' }
  ];

  const statuses: Tower['status'][] = ['operational', 'operational', 'operational', 'warning', 'critical'];
  const powerStates: Tower['health']['power'][] = ['normal', 'normal', 'battery', 'generator'];

  locations.forEach((loc, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    towers.push({
      id: `tower-${index + 1}`,
      name: loc.name,
      location: {
        lat: loc.lat,
        lng: loc.lng,
        address: loc.address
      },
      status,
      health: {
        structural: 85 + Math.random() * 15,
        power: powerStates[Math.floor(Math.random() * powerStates.length)],
        environmental: {
          temperature: 25 + Math.random() * 15,
          humidity: 60 + Math.random() * 30,
          windSpeed: Math.random() * 50
        }
      },
      connectivity: status === 'operational' ? 95 + Math.random() * 5 : 60 + Math.random() * 30,
      lastUpdate: new Date(Date.now() - Math.random() * 3600000),
      alerts: status !== 'operational' ? generateAlerts(1 + Math.floor(Math.random() * 3), loc.name) : []
    });
  });

  return towers;
};

export const generateDummyNTTNNodes = (): NTTNNode[] => {
  const nodes: NTTNNode[] = [];
  const nodeTypes: NTTNNode['type'][] = ['core', 'edge', 'access'];
  const nodeNames = [
    'NTTN-CORE-DHK-01', 'NTTN-CORE-CTG-01', 'NTTN-EDGE-DHK-01', 
    'NTTN-EDGE-SYL-01', 'NTTN-ACCESS-DHK-01', 'NTTN-ACCESS-CTG-01',
    'NTTN-EDGE-RAJ-01', 'NTTN-ACCESS-KHU-01', 'NTTN-CORE-DHK-02',
    'NTTN-EDGE-BAR-01'
  ];

  nodeNames.forEach((name, index) => {
    const type = nodeTypes[index % 3];
    const status = Math.random() > 0.8 ? 'degraded' : 'operational';
    
    nodes.push({
      id: `nttn-${index + 1}`,
      name,
      type,
      status,
      bandwidth: {
        current: (50 + Math.random() * 40) * (type === 'core' ? 100 : type === 'edge' ? 10 : 1),
        capacity: (type === 'core' ? 10000 : type === 'edge' ? 1000 : 100)
      },
      latency: 5 + Math.random() * 20,
      packetLoss: Math.random() * 2,
      load: 30 + Math.random() * 60,
      connectedTowers: [`tower-${(index % 10) + 1}`, `tower-${((index + 1) % 10) + 1}`],
      lastUpdate: new Date(Date.now() - Math.random() * 3600000)
    });
  });

  return nodes;
};

export const generateAlerts = (count: number, source: string): Alert[] => {
  const alerts: Alert[] = [];
  const types: Alert['type'][] = ['power', 'connectivity', 'environmental', 'structural'];
  const severities: Alert['severity'][] = ['info', 'warning', 'critical'];
  const messages: { [key: string]: string[] } = {
    power: ['Power switched to battery backup', 'Generator activated', 'Low fuel warning'],
    connectivity: ['High packet loss detected', 'Bandwidth utilization above 90%', 'Link failure'],
    environmental: ['High temperature alert', 'Flood warning in area', 'Strong winds detected'],
    structural: ['Vibration detected', 'Tilt angle exceeded threshold', 'Maintenance required'],
    disaster: ['Disaster event detected', 'Emergency response required', 'Infrastructure damage']
  };

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    alerts.push({
      id: `alert-${Date.now()}-${i}`,
      severity,
      type,
      message: messages[type][Math.floor(Math.random() * messages[type].length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000),
      acknowledged: Math.random() > 0.7,
      source
    });
  }

  return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateDummyDisasterEvents = (): DisasterEvent[] => {
  const events: DisasterEvent[] = [
    {
      id: 'disaster-1',
      type: 'flood',
      severity: 'high',
      affectedRegion: {
        name: 'Sylhet Division',
        coordinates: [[24.8949, 91.8687], [24.9049, 91.8787], [24.8849, 91.8787], [24.8849, 91.8587]]
      },
      affectedInfrastructure: {
        towers: ['tower-4'],
        nttnNodes: ['nttn-4']
      },
      status: 'active',
      startTime: new Date(Date.now() - 7200000),
      responseTeams: ['team-1', 'team-2']
    },
    {
      id: 'disaster-2',
      type: 'storm',
      severity: 'medium',
      affectedRegion: {
        name: 'Chittagong Coast',
        coordinates: [[22.3569, 91.7832], [22.3669, 91.7932], [22.3469, 91.7932], [22.3469, 91.7732]]
      },
      affectedInfrastructure: {
        towers: ['tower-3'],
        nttnNodes: ['nttn-2', 'nttn-6']
      },
      status: 'predicted',
      startTime: new Date(Date.now() + 3600000),
      responseTeams: ['team-3']
    }
  ];

  return events;
};

export const generateDummyResponseTeams = (): ResponseTeam[] => {
  const teams: ResponseTeam[] = [
    {
      id: 'team-1',
      name: 'Emergency Response Unit Alpha',
      status: 'deployed',
      location: { lat: 24.8849, lng: 91.8687 },
      assignedDisaster: 'disaster-1',
      resources: {
        personnel: 12,
        vehicles: 3,
        equipment: ['Generator', 'Satellite Phone', 'Emergency Toolkit', 'Pump']
      }
    },
    {
      id: 'team-2',
      name: 'Technical Support Team Bravo',
      status: 'en-route',
      location: { lat: 24.7471, lng: 90.4203 },
      assignedDisaster: 'disaster-1',
      resources: {
        personnel: 8,
        vehicles: 2,
        equipment: ['Fiber Repair Kit', 'Tower Climbing Gear', 'Testing Equipment']
      }
    },
    {
      id: 'team-3',
      name: 'Rapid Response Squad Charlie',
      status: 'available',
      location: { lat: 22.3569, lng: 91.7832 },
      resources: {
        personnel: 10,
        vehicles: 3,
        equipment: ['Generator', 'Emergency Supplies', 'Communication Equipment']
      }
    },
    {
      id: 'team-4',
      name: 'Infrastructure Team Delta',
      status: 'available',
      location: { lat: 23.8103, lng: 90.4125 },
      resources: {
        personnel: 15,
        vehicles: 4,
        equipment: ['Heavy Equipment', 'Structural Repair Tools', 'Safety Gear']
      }
    }
  ];

  return teams;
};

export const generateDummyIntegrationPoints = (): IntegrationPoint[] => {
  const points: IntegrationPoint[] = [
    {
      id: 'int-1',
      name: 'TowerCo NOC-1',
      type: 'NOC',
      status: 'connected',
      lastSync: new Date(Date.now() - 60000),
      dataPoints: 15420,
      errorRate: 0.02
    },
    {
      id: 'int-2',
      name: 'NTTN SOC Central',
      type: 'SOC',
      status: 'connected',
      lastSync: new Date(Date.now() - 120000),
      dataPoints: 28930,
      errorRate: 0.01
    },
    {
      id: 'int-3',
      name: 'Tower Operations Center',
      type: 'TOC',
      status: 'connected',
      lastSync: new Date(Date.now() - 30000),
      dataPoints: 9876,
      errorRate: 0.03
    },
    {
      id: 'int-4',
      name: 'Weather Service API',
      type: 'Third-Party',
      status: 'connected',
      lastSync: new Date(Date.now() - 180000),
      dataPoints: 4532,
      errorRate: 0.05
    },
    {
      id: 'int-5',
      name: 'National Disaster Management',
      type: 'Disaster-Org',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000),
      dataPoints: 876,
      errorRate: 0.01
    },
    {
      id: 'int-6',
      name: 'TowerCo NTTN-2',
      type: 'NTTN',
      status: 'error',
      lastSync: new Date(Date.now() - 3600000),
      dataPoints: 0,
      errorRate: 1.0
    }
  ];

  return points;
};

export const generateSystemMetrics = (towers: Tower[], nodes: NTTNNode[], alerts: Alert[]) => {
  const operationalTowers = towers.filter(t => t.status === 'operational').length;
  const operationalNodes = nodes.filter(n => n.status === 'operational').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length;
  
  return {
    totalTowers: towers.length,
    operationalTowers,
    totalNTTNNodes: nodes.length,
    operationalNTTNNodes: operationalNodes,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
    criticalAlerts,
    averageUptime: (operationalTowers / towers.length) * 100,
    networkLoad: 65 + Math.random() * 20,
    disasterRisk: criticalAlerts > 5 ? 'high' : criticalAlerts > 2 ? 'medium' : 'low' as 'low' | 'medium' | 'high'
  };
};