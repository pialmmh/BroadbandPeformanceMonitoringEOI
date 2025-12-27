export interface QosTrendData {
  timestamp: string;
  date: string;
  availability: number;
  downloadRatio: number;
  uploadRatio: number;
  latency: number;
  packetLoss: number;
  jitter: number;
}

export interface DivisionQos {
  divisionId: string;
  divisionName: string;
  qosScore: number;
  availability: number;
  downloadRatio: number;
  latency: number;
  ispCount: number;
  subscribers: number;
}

export interface IspAlert {
  id: string;
  ispId: string;
  ispName: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'degradation' | 'outage' | 'threshold' | 'compliance';
  message: string;
  region: string;
  timestamp: Date;
  resolved: boolean;
}

// Generate 7 days of trend data
export const generateTrendData = (): QosTrendData[] => {
  const data: QosTrendData[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Add some variance to make it look realistic
    const baseAvailability = 97.5 + Math.random() * 1.5;
    const baseDownload = 0.88 + Math.random() * 0.08;
    const baseUpload = 0.85 + Math.random() * 0.08;
    const baseLatency = 35 + Math.random() * 15;
    const basePacketLoss = 0.5 + Math.random() * 0.8;
    const baseJitter = 5 + Math.random() * 4;

    data.push({
      timestamp: date.toISOString(),
      date: date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
      availability: parseFloat(baseAvailability.toFixed(2)),
      downloadRatio: parseFloat(baseDownload.toFixed(3)),
      uploadRatio: parseFloat(baseUpload.toFixed(3)),
      latency: parseFloat(baseLatency.toFixed(1)),
      packetLoss: parseFloat(basePacketLoss.toFixed(2)),
      jitter: parseFloat(baseJitter.toFixed(1))
    });
  }

  return data;
};

// Division-level QoS data for heatmap
export const divisionQosData: DivisionQos[] = [
  {
    divisionId: 'dhaka',
    divisionName: 'Dhaka',
    qosScore: 92.5,
    availability: 98.8,
    downloadRatio: 0.93,
    latency: 28,
    ispCount: 450,
    subscribers: 1250000
  },
  {
    divisionId: 'chittagong',
    divisionName: 'Chittagong',
    qosScore: 88.3,
    availability: 97.5,
    downloadRatio: 0.88,
    latency: 38,
    ispCount: 280,
    subscribers: 650000
  },
  {
    divisionId: 'sylhet',
    divisionName: 'Sylhet',
    qosScore: 85.1,
    availability: 96.2,
    downloadRatio: 0.85,
    latency: 45,
    ispCount: 120,
    subscribers: 280000
  },
  {
    divisionId: 'rajshahi',
    divisionName: 'Rajshahi',
    qosScore: 82.7,
    availability: 95.5,
    downloadRatio: 0.82,
    latency: 52,
    ispCount: 180,
    subscribers: 320000
  },
  {
    divisionId: 'khulna',
    divisionName: 'Khulna',
    qosScore: 81.2,
    availability: 94.8,
    downloadRatio: 0.80,
    latency: 55,
    ispCount: 150,
    subscribers: 240000
  },
  {
    divisionId: 'barisal',
    divisionName: 'Barisal',
    qosScore: 78.5,
    availability: 93.5,
    downloadRatio: 0.77,
    latency: 62,
    ispCount: 85,
    subscribers: 120000
  },
  {
    divisionId: 'rangpur',
    divisionName: 'Rangpur',
    qosScore: 79.8,
    availability: 94.2,
    downloadRatio: 0.78,
    latency: 58,
    ispCount: 110,
    subscribers: 180000
  },
  {
    divisionId: 'mymensingh',
    divisionName: 'Mymensingh',
    qosScore: 80.5,
    availability: 94.5,
    downloadRatio: 0.79,
    latency: 56,
    ispCount: 95,
    subscribers: 150000
  }
];

// Generate ISP alerts
export const generateAlerts = (): IspAlert[] => {
  const now = new Date();

  return [
    {
      id: 'alert001',
      ispId: 'isp015',
      ispName: 'Dhakacom',
      severity: 'critical',
      type: 'outage',
      message: 'Service outage detected - multiple POPs unreachable',
      region: 'Dhaka',
      timestamp: new Date(now.getTime() - 15 * 60000), // 15 mins ago
      resolved: false
    },
    {
      id: 'alert002',
      ispId: 'isp014',
      ispName: 'MetroNet',
      severity: 'critical',
      type: 'threshold',
      message: 'Packet loss exceeds 2% threshold',
      region: 'Dhaka',
      timestamp: new Date(now.getTime() - 45 * 60000), // 45 mins ago
      resolved: false
    },
    {
      id: 'alert003',
      ispId: 'isp012',
      ispName: 'Delta Infocom',
      severity: 'warning',
      type: 'degradation',
      message: 'Download speed ratio below 80%',
      region: 'Mymensingh',
      timestamp: new Date(now.getTime() - 2 * 3600000), // 2 hours ago
      resolved: false
    },
    {
      id: 'alert004',
      ispId: 'isp009',
      ispName: 'Agni Systems',
      severity: 'warning',
      type: 'threshold',
      message: 'Latency exceeds 50ms threshold',
      region: 'Sylhet',
      timestamp: new Date(now.getTime() - 3 * 3600000), // 3 hours ago
      resolved: false
    },
    {
      id: 'alert005',
      ispId: 'isp006',
      ispName: 'Mazeda Networks',
      severity: 'warning',
      type: 'compliance',
      message: 'QoS data submission delayed by 2 hours',
      region: 'Rangpur',
      timestamp: new Date(now.getTime() - 4 * 3600000), // 4 hours ago
      resolved: false
    },
    {
      id: 'alert006',
      ispId: 'isp010',
      ispName: 'ICC Communication',
      severity: 'info',
      type: 'threshold',
      message: 'Jitter approaching threshold (9.8ms)',
      region: 'Rajshahi',
      timestamp: new Date(now.getTime() - 5 * 3600000), // 5 hours ago
      resolved: false
    },
    {
      id: 'alert007',
      ispId: 'isp008',
      ispName: 'BRACNet',
      severity: 'info',
      type: 'degradation',
      message: 'Minor latency increase observed',
      region: 'Khulna',
      timestamp: new Date(now.getTime() - 8 * 3600000), // 8 hours ago
      resolved: true
    },
    {
      id: 'alert008',
      ispId: 'isp003',
      ispName: 'Carnival Internet',
      severity: 'warning',
      type: 'threshold',
      message: 'Service availability dropped to 97.5%',
      region: 'Rajshahi',
      timestamp: new Date(now.getTime() - 10 * 3600000), // 10 hours ago
      resolved: true
    },
    {
      id: 'alert009',
      ispId: 'isp004',
      ispName: 'Earth Telecommunication',
      severity: 'info',
      type: 'compliance',
      message: 'Weekly QoS report submitted',
      region: 'Dhaka',
      timestamp: new Date(now.getTime() - 12 * 3600000), // 12 hours ago
      resolved: true
    },
    {
      id: 'alert010',
      ispId: 'isp002',
      ispName: 'Amber IT',
      severity: 'info',
      type: 'degradation',
      message: 'Scheduled maintenance completed',
      region: 'Chittagong',
      timestamp: new Date(now.getTime() - 18 * 3600000), // 18 hours ago
      resolved: true
    }
  ];
};

// Quick stats
export const getQuickStats = () => {
  return {
    totalSubscribers: 3190000,
    dataPointsToday: 2847562,
    lastRefresh: new Date(),
    activeIsps: 1487,
    regionsMonitored: 64,
    alertsResolved24h: 45
  };
};

// Get QoS color based on score
export const getQosColor = (score: number): string => {
  if (score >= 90) return '#2ECC71'; // Excellent - Green
  if (score >= 80) return '#27AE60'; // Good - Dark Green
  if (score >= 70) return '#F39C12'; // Fair - Orange
  return '#E74C3C'; // Poor - Red
};

// Get QoS status label
export const getQosStatus = (score: number): string => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  return 'Poor';
};
