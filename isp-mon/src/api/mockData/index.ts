import { Tower } from '../../models/Tower.model';
import { NTTNNode } from '../../models/NTTNNode.model';
import { Alert } from '../../models/Alert.model';
import { DisasterEvent } from '../../models/DisasterEvent.model';
import { ResponseTeam } from '../../models/ResponseTeam.model';
import { IntegrationPoint } from '../../models/IntegrationPoint.model';
import { SystemMetrics } from '../../models/SystemMetrics.model';

export function generateMockTowers(): any[] {
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

  return locations.map((loc, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const tower = new Tower({
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
      alerts: status !== 'operational' ? [`alert-${index}-1`, `alert-${index}-2`] : []
    });
    return tower.toJSON();
  });
}

export function generateMockNTTNNodes(): any[] {
  const nodeNames = [
    'NTTN-CORE-DHK-01', 'NTTN-CORE-CTG-01', 'NTTN-EDGE-DHK-01', 
    'NTTN-EDGE-SYL-01', 'NTTN-ACCESS-DHK-01', 'NTTN-ACCESS-CTG-01',
    'NTTN-EDGE-RAJ-01', 'NTTN-ACCESS-KHU-01', 'NTTN-CORE-DHK-02',
    'NTTN-EDGE-BAR-01'
  ];

  const nodeTypes: NTTNNode['type'][] = ['core', 'edge', 'access'];

  return nodeNames.map((name, index) => {
    const type = nodeTypes[index % 3];
    const status = Math.random() > 0.8 ? 'degraded' : 'operational';
    
    const node = new NTTNNode({
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
      connectedTowers: [`tower-${(index % 10) + 1}`, `tower-${((index + 1) % 10) + 1}`],
      lastUpdate: new Date(Date.now() - Math.random() * 3600000)
    });
    return node.toJSON();
  });
}

export function generateMockAlerts(): any[] {
  const alerts: any[] = [];
  const types: Alert['type'][] = ['power', 'connectivity', 'environmental', 'structural', 'disaster'];
  const severities: Alert['severity'][] = ['info', 'warning', 'critical'];
  const messages: Record<string, string[]> = {
    power: ['UPS battery low', 'Generator not starting', 'Power fluctuation detected', 'Solar panel offline'],
    connectivity: ['Signal strength degraded', 'Fiber cut detected', 'High packet loss', 'Bandwidth exhausted'],
    environmental: ['High temperature alert', 'Humidity above threshold', 'Smoke detected', 'Flood warning'],
    structural: ['Tower vibration detected', 'Guy wire tension abnormal', 'Foundation shift detected', 'Unauthorized access'],
    disaster: ['Disaster event detected', 'Emergency response required', 'Infrastructure damage']
  };

  for (let i = 0; i < 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    const alert = new Alert({
      id: `alert-${i + 1}`,
      severity,
      type,
      message: messages[type][Math.floor(Math.random() * messages[type].length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
      acknowledged: Math.random() > 0.7,
      source: `tower-${Math.floor(Math.random() * 10) + 1}`,
      metadata: {
        priority: Math.floor(Math.random() * 5) + 1,
        affectedComponents: Math.floor(Math.random() * 3) + 1
      }
    });
    alerts.push(alert.toJSON());
  }

  return alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function generateMockDisasterEvents(): any[] {
  const events = [
    new DisasterEvent({
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
      responseTeams: ['team-1', 'team-2'],
      estimatedImpact: 'High impact on network connectivity in Sylhet region',
      actionsTaken: ['Emergency response team deployed', 'Backup power activated', 'Traffic rerouted']
    }),
    new DisasterEvent({
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
      responseTeams: ['team-3'],
      estimatedImpact: 'Potential disruption to coastal infrastructure',
      actionsTaken: ['Pre-positioning response teams', 'Alerting local authorities']
    }),
    new DisasterEvent({
      id: 'disaster-3',
      type: 'earthquake',
      severity: 'low',
      affectedRegion: {
        name: 'Dhaka Metropolitan',
        coordinates: [[23.8103, 90.4125], [23.8203, 90.4225], [23.8003, 90.4225], [23.8003, 90.4025]]
      },
      affectedInfrastructure: {
        towers: [],
        nttnNodes: []
      },
      status: 'resolved',
      startTime: new Date(Date.now() - 86400000),
      endTime: new Date(Date.now() - 82800000),
      responseTeams: ['team-4'],
      estimatedImpact: 'Minor structural assessments needed',
      actionsTaken: ['Infrastructure inspection completed', 'No damage detected']
    })
  ];

  return events.map(e => e.toJSON());
}

export function generateMockResponseTeams(): any[] {
  const teams = [
    new ResponseTeam({
      id: 'team-1',
      name: 'Alpha Response Unit',
      status: 'deployed',
      location: { lat: 24.8949, lng: 91.8687 },
      assignedDisaster: 'disaster-1',
      resources: {
        personnel: 12,
        vehicles: 3,
        equipment: ['Emergency Generator', 'Fiber Splicing Kit', 'Satellite Phone', 'Medical Kit']
      },
      specialization: 'technical',
      contactNumber: '+8801711111111',
      responseTime: 30,
      lastDeployment: new Date(Date.now() - 7200000)
    }),
    new ResponseTeam({
      id: 'team-2',
      name: 'Bravo Support Team',
      status: 'deployed',
      location: { lat: 24.8849, lng: 91.8587 },
      assignedDisaster: 'disaster-1',
      resources: {
        personnel: 8,
        vehicles: 2,
        equipment: ['Water Pumps', 'Emergency Supplies', 'Communication Equipment']
      },
      specialization: 'rescue',
      contactNumber: '+8801722222222',
      responseTime: 45,
      lastDeployment: new Date(Date.now() - 7200000)
    }),
    new ResponseTeam({
      id: 'team-3',
      name: 'Charlie Emergency Squad',
      status: 'en-route',
      location: { lat: 22.3569, lng: 91.7832 },
      assignedDisaster: 'disaster-2',
      resources: {
        personnel: 10,
        vehicles: 2,
        equipment: ['Tower Stabilization Kit', 'Weather Monitoring', 'Backup Batteries']
      },
      specialization: 'technical',
      contactNumber: '+8801733333333',
      responseTime: 20
    }),
    new ResponseTeam({
      id: 'team-4',
      name: 'Delta Rapid Response',
      status: 'available',
      location: { lat: 23.8103, lng: 90.4125 },
      resources: {
        personnel: 15,
        vehicles: 4,
        equipment: ['Mobile Command Center', 'Drone Unit', 'Advanced Medical Equipment']
      },
      specialization: 'general',
      contactNumber: '+8801744444444',
      responseTime: 15
    }),
    new ResponseTeam({
      id: 'team-5',
      name: 'Echo Medical Unit',
      status: 'available',
      location: { lat: 23.7509, lng: 90.3954 },
      resources: {
        personnel: 6,
        vehicles: 2,
        equipment: ['Ambulance', 'Medical Supplies', 'Emergency Surgery Kit']
      },
      specialization: 'medical',
      contactNumber: '+8801755555555',
      responseTime: 10
    })
  ];

  return teams.map(t => t.toJSON());
}

export function generateMockIntegrationPoints(): any[] {
  const integrations = [
    new IntegrationPoint({
      id: 'int-1',
      name: 'NOC Central System',
      type: 'NOC',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000),
      dataPoints: 45678,
      errorRate: 0.001,
      endpoint: 'https://noc.telco.bd/api/v2',
      protocol: 'REST',
      syncInterval: 5,
      metadata: { region: 'Central', priority: 'high' }
    }),
    new IntegrationPoint({
      id: 'int-2',
      name: 'SOC Security Platform',
      type: 'SOC',
      status: 'connected',
      lastSync: new Date(Date.now() - 600000),
      dataPoints: 23456,
      errorRate: 0.002,
      endpoint: 'https://soc.telco.bd/api/v1',
      protocol: 'REST',
      syncInterval: 10,
      metadata: { securityLevel: 'critical', encryption: 'AES-256' }
    }),
    new IntegrationPoint({
      id: 'int-3',
      name: 'TowerCo Management API',
      type: 'TowerCo',
      status: 'connected',
      lastSync: new Date(Date.now() - 900000),
      dataPoints: 34567,
      errorRate: 0.005,
      endpoint: 'https://towerco.bd/api/infrastructure',
      protocol: 'GraphQL',
      syncInterval: 15,
      metadata: { vendor: 'TowerCo BD', contract: 'TC-2024-001' }
    }),
    new IntegrationPoint({
      id: 'int-4',
      name: 'NTTN Operations Hub',
      type: 'NTTN',
      status: 'connected',
      lastSync: new Date(Date.now() - 120000),
      dataPoints: 56789,
      errorRate: 0.001,
      endpoint: 'wss://nttn.telco.bd/stream',
      protocol: 'WebSocket',
      syncInterval: 1,
      metadata: { bandwidth: '10Gbps', latency: '5ms' }
    }),
    new IntegrationPoint({
      id: 'int-5',
      name: 'Weather Service API',
      type: 'Third-Party',
      status: 'connected',
      lastSync: new Date(Date.now() - 1800000),
      dataPoints: 12345,
      errorRate: 0.01,
      endpoint: 'https://api.weather.gov.bd/v2',
      protocol: 'REST',
      syncInterval: 30,
      metadata: { provider: 'BMD', updateFrequency: '30min' }
    }),
    new IntegrationPoint({
      id: 'int-6',
      name: 'Disaster Management System',
      type: 'Disaster-Org',
      status: 'error',
      lastSync: new Date(Date.now() - 7200000),
      dataPoints: 5678,
      errorRate: 0.15,
      endpoint: 'https://disaster.gov.bd/api',
      protocol: 'SOAP',
      syncInterval: 60,
      lastError: 'Connection timeout after 30000ms',
      metadata: { authority: 'DDM', alertLevel: 'national' }
    }),
    new IntegrationPoint({
      id: 'int-7',
      name: 'TOC Traffic Analytics',
      type: 'TOC',
      status: 'disconnected',
      lastSync: new Date(Date.now() - 3600000),
      dataPoints: 8901,
      errorRate: 0.05,
      endpoint: 'mqtt://toc.telco.bd:1883',
      protocol: 'MQTT',
      syncInterval: 5,
      metadata: { qos: 2, topics: ['traffic/*', 'performance/*'] }
    })
  ];

  return integrations.map(i => i.toJSON());
}

export function generateMockSystemMetrics(): any {
  const towers = generateMockTowers();
  const nodes = generateMockNTTNNodes();
  const alerts = generateMockAlerts();
  
  const metrics = new SystemMetrics({
    totalTowers: towers.length,
    operationalTowers: towers.filter(t => t.status === 'operational').length,
    totalNTTNNodes: nodes.length,
    operationalNTTNNodes: nodes.filter(n => n.status === 'operational').length,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length,
    averageUptime: 95.5 + Math.random() * 4,
    networkLoad: 60 + Math.random() * 30,
    disasterRisk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    totalBandwidth: 100000,
    usedBandwidth: 60000 + Math.random() * 30000,
    averageLatency: 10 + Math.random() * 20,
    packetLossRate: Math.random() * 2,
    timestamp: new Date()
  });

  return metrics.toJSON();
}