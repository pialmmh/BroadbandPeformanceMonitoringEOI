export interface ISP {
  id: string;
  name: string;
  licenseNumber: string;
  subscribers: number;
  regions: string[];
  status: 'active' | 'suspended' | 'pending';
  qosScore: number;
  serviceAvailability: number;
  downloadSpeedRatio: number;
  uploadSpeedRatio: number;
  avgLatency: number;
  packetLoss: number;
  jitter: number;
}

export const mockIsps: ISP[] = [
  {
    id: 'isp001',
    name: 'Link3 Technologies',
    licenseNumber: 'ISP-NAT-001',
    subscribers: 250000,
    regions: ['dhaka', 'chittagong', 'sylhet'],
    status: 'active',
    qosScore: 94.5,
    serviceAvailability: 99.2,
    downloadSpeedRatio: 0.95,
    uploadSpeedRatio: 0.92,
    avgLatency: 28,
    packetLoss: 0.3,
    jitter: 4.2
  },
  {
    id: 'isp002',
    name: 'Amber IT',
    licenseNumber: 'ISP-NAT-002',
    subscribers: 180000,
    regions: ['dhaka', 'chittagong'],
    status: 'active',
    qosScore: 92.1,
    serviceAvailability: 98.8,
    downloadSpeedRatio: 0.93,
    uploadSpeedRatio: 0.90,
    avgLatency: 32,
    packetLoss: 0.5,
    jitter: 5.1
  },
  {
    id: 'isp003',
    name: 'Carnival Internet',
    licenseNumber: 'ISP-NAT-003',
    subscribers: 150000,
    regions: ['dhaka', 'rajshahi', 'khulna'],
    status: 'active',
    qosScore: 89.7,
    serviceAvailability: 98.1,
    downloadSpeedRatio: 0.88,
    uploadSpeedRatio: 0.85,
    avgLatency: 38,
    packetLoss: 0.8,
    jitter: 6.2
  },
  {
    id: 'isp004',
    name: 'Earth Telecommunication',
    licenseNumber: 'ISP-NAT-004',
    subscribers: 120000,
    regions: ['dhaka', 'mymensingh'],
    status: 'active',
    qosScore: 88.3,
    serviceAvailability: 97.5,
    downloadSpeedRatio: 0.87,
    uploadSpeedRatio: 0.84,
    avgLatency: 42,
    packetLoss: 0.9,
    jitter: 7.1
  },
  {
    id: 'isp005',
    name: 'Dot Internet',
    licenseNumber: 'ISP-NAT-005',
    subscribers: 100000,
    regions: ['dhaka', 'chittagong', 'sylhet'],
    status: 'active',
    qosScore: 91.2,
    serviceAvailability: 98.4,
    downloadSpeedRatio: 0.91,
    uploadSpeedRatio: 0.88,
    avgLatency: 35,
    packetLoss: 0.6,
    jitter: 5.5
  },
  {
    id: 'isp006',
    name: 'Mazeda Networks',
    licenseNumber: 'ISP-NAT-006',
    subscribers: 95000,
    regions: ['dhaka', 'rangpur'],
    status: 'active',
    qosScore: 86.5,
    serviceAvailability: 96.8,
    downloadSpeedRatio: 0.84,
    uploadSpeedRatio: 0.81,
    avgLatency: 48,
    packetLoss: 1.2,
    jitter: 8.3
  },
  {
    id: 'isp007',
    name: 'Circle Network',
    licenseNumber: 'ISP-NAT-007',
    subscribers: 85000,
    regions: ['dhaka', 'chittagong'],
    status: 'active',
    qosScore: 90.8,
    serviceAvailability: 98.2,
    downloadSpeedRatio: 0.90,
    uploadSpeedRatio: 0.87,
    avgLatency: 36,
    packetLoss: 0.7,
    jitter: 5.8
  },
  {
    id: 'isp008',
    name: 'BRACNet',
    licenseNumber: 'ISP-NAT-008',
    subscribers: 75000,
    regions: ['dhaka', 'khulna', 'barisal'],
    status: 'active',
    qosScore: 87.9,
    serviceAvailability: 97.2,
    downloadSpeedRatio: 0.86,
    uploadSpeedRatio: 0.83,
    avgLatency: 45,
    packetLoss: 1.0,
    jitter: 7.5
  },
  {
    id: 'isp009',
    name: 'Agni Systems',
    licenseNumber: 'ISP-NAT-009',
    subscribers: 70000,
    regions: ['dhaka', 'sylhet'],
    status: 'active',
    qosScore: 85.2,
    serviceAvailability: 96.5,
    downloadSpeedRatio: 0.83,
    uploadSpeedRatio: 0.80,
    avgLatency: 52,
    packetLoss: 1.4,
    jitter: 9.1
  },
  {
    id: 'isp010',
    name: 'ICC Communication',
    licenseNumber: 'ISP-NAT-010',
    subscribers: 65000,
    regions: ['dhaka', 'rajshahi', 'rangpur'],
    status: 'active',
    qosScore: 84.1,
    serviceAvailability: 96.1,
    downloadSpeedRatio: 0.82,
    uploadSpeedRatio: 0.79,
    avgLatency: 55,
    packetLoss: 1.6,
    jitter: 9.8
  },
  {
    id: 'isp011',
    name: 'Ranks ITT',
    licenseNumber: 'ISP-NAT-011',
    subscribers: 60000,
    regions: ['dhaka', 'chittagong'],
    status: 'active',
    qosScore: 88.6,
    serviceAvailability: 97.6,
    downloadSpeedRatio: 0.87,
    uploadSpeedRatio: 0.84,
    avgLatency: 40,
    packetLoss: 0.85,
    jitter: 6.8
  },
  {
    id: 'isp012',
    name: 'Delta Infocom',
    licenseNumber: 'ISP-NAT-012',
    subscribers: 55000,
    regions: ['dhaka', 'mymensingh'],
    status: 'active',
    qosScore: 82.4,
    serviceAvailability: 95.5,
    downloadSpeedRatio: 0.80,
    uploadSpeedRatio: 0.77,
    avgLatency: 58,
    packetLoss: 1.8,
    jitter: 10.2
  },
  {
    id: 'isp013',
    name: 'Fiber@Home',
    licenseNumber: 'ISP-NAT-013',
    subscribers: 50000,
    regions: ['dhaka', 'chittagong', 'sylhet', 'khulna'],
    status: 'active',
    qosScore: 93.2,
    serviceAvailability: 99.0,
    downloadSpeedRatio: 0.94,
    uploadSpeedRatio: 0.91,
    avgLatency: 30,
    packetLoss: 0.4,
    jitter: 4.5
  },
  {
    id: 'isp014',
    name: 'MetroNet',
    licenseNumber: 'ISP-NAT-014',
    subscribers: 45000,
    regions: ['dhaka'],
    status: 'active',
    qosScore: 79.8,
    serviceAvailability: 94.2,
    downloadSpeedRatio: 0.78,
    uploadSpeedRatio: 0.75,
    avgLatency: 62,
    packetLoss: 2.1,
    jitter: 11.5
  },
  {
    id: 'isp015',
    name: 'Dhakacom',
    licenseNumber: 'ISP-NAT-015',
    subscribers: 40000,
    regions: ['dhaka', 'chittagong'],
    status: 'suspended',
    qosScore: 65.3,
    serviceAvailability: 88.5,
    downloadSpeedRatio: 0.65,
    uploadSpeedRatio: 0.62,
    avgLatency: 85,
    packetLoss: 3.5,
    jitter: 15.2
  }
];

// Calculate aggregate metrics
export const getAggregateMetrics = (isps: ISP[] = mockIsps) => {
  const activeIsps = isps.filter(isp => isp.status === 'active');
  const totalSubscribers = activeIsps.reduce((sum, isp) => sum + isp.subscribers, 0);
  const avgAvailability = activeIsps.reduce((sum, isp) => sum + isp.serviceAvailability, 0) / activeIsps.length;
  const avgDownloadRatio = activeIsps.reduce((sum, isp) => sum + isp.downloadSpeedRatio, 0) / activeIsps.length;
  const avgUploadRatio = activeIsps.reduce((sum, isp) => sum + isp.uploadSpeedRatio, 0) / activeIsps.length;
  const avgLatency = activeIsps.reduce((sum, isp) => sum + isp.avgLatency, 0) / activeIsps.length;
  const avgPacketLoss = activeIsps.reduce((sum, isp) => sum + isp.packetLoss, 0) / activeIsps.length;
  const avgJitter = activeIsps.reduce((sum, isp) => sum + isp.jitter, 0) / activeIsps.length;

  return {
    totalIsps: isps.length,
    activeIsps: activeIsps.length,
    suspendedIsps: isps.filter(isp => isp.status === 'suspended').length,
    totalSubscribers,
    avgAvailability,
    avgDownloadRatio,
    avgUploadRatio,
    avgLatency,
    avgPacketLoss,
    avgJitter
  };
};
