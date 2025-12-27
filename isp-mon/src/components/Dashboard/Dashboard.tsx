import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Error,
  Router,
  CellTower,
  Speed,
  CloudQueue
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard: React.FC = () => {
  const { 
    filteredSystemMetrics: systemMetrics, 
    filteredTowers: towers, 
    filteredNttnNodes: nttnNodes, 
    filteredAlerts: alerts, 
    filteredDisasterEvents: disasterEvents, 
    filteredResponseTeams: responseTeams, 
    filteredIntegrationPoints: integrationPoints 
  } = useData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'critical': return '#f44336';
      case 'degraded': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const towerStatusData = [
    { name: 'Operational', value: towers.filter(t => t.status === 'operational').length, color: '#4caf50' },
    { name: 'Warning', value: towers.filter(t => t.status === 'warning').length, color: '#ff9800' },
    { name: 'Critical', value: towers.filter(t => t.status === 'critical').length, color: '#f44336' },
    { name: 'Offline', value: towers.filter(t => t.status === 'offline').length, color: '#9e9e9e' }
  ];

  const networkLoadData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    load: 40 + Math.random() * 40 + (i > 8 && i < 20 ? 20 : 0)
  }));

  const alertTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      critical: Math.floor(Math.random() * 10),
      warning: Math.floor(Math.random() * 20),
      info: Math.floor(Math.random() * 30)
    };
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Infrastructure Monitoring Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Total Towers</Typography>
                  <Typography variant="h3">{systemMetrics.totalTowers}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {systemMetrics.operationalTowers} Operational
                  </Typography>
                </Box>
                <CellTower sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>NTTN Nodes</Typography>
                  <Typography variant="h3">{systemMetrics.totalNTTNNodes}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {systemMetrics.operationalNTTNNodes} Online
                  </Typography>
                </Box>
                <Router sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Active Alerts</Typography>
                  <Typography variant="h3">{systemMetrics.activeAlerts}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {systemMetrics.criticalAlerts} Critical
                  </Typography>
                </Box>
                <Warning sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Uptime</Typography>
                  <Typography variant="h3">{systemMetrics.averageUptime.toFixed(1)}%</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    System Average
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>Network Load (24 Hours)</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={networkLoadData}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="load" stroke="#8884d8" fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>Tower Status Distribution</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={towerStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {towerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '350px' }}>
            <Typography variant="h6" gutterBottom>Alert Trends (7 Days)</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="critical" fill="#f44336" />
                <Bar dataKey="warning" fill="#ff9800" />
                <Bar dataKey="info" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '350px' }}>
            <Typography variant="h6" gutterBottom>Disaster Response Status</Typography>
            <Box sx={{ mt: 2 }}>
              {disasterEvents.map((event) => (
                <Box key={event.id} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{event.affectedRegion.name}</Typography>
                    <Chip
                      label={event.status}
                      color={event.status === 'active' ? 'error' : event.status === 'predicted' ? 'warning' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                    <CloudQueue sx={{ fontSize: 20, color: '#666' }} />
                    <Typography variant="body2" color="textSecondary">
                      Type: {event.type} | Severity: {event.severity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    Affected: {event.affectedInfrastructure.towers.length} towers, {event.affectedInfrastructure.nttnNodes.length} nodes
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={event.status === 'resolved' ? 100 : event.status === 'contained' ? 75 : event.status === 'active' ? 50 : 25}
                    sx={{ mt: 1 }}
                    color={event.severity === 'critical' ? 'error' : event.severity === 'high' ? 'warning' : 'primary'}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>System Health Overview</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Network Load</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LinearProgress
                      variant="determinate"
                      value={systemMetrics.networkLoad}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      color={systemMetrics.networkLoad > 80 ? 'error' : systemMetrics.networkLoad > 60 ? 'warning' : 'success'}
                    />
                    <Typography variant="body2">{systemMetrics.networkLoad.toFixed(1)}%</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Disaster Risk Level</Typography>
                  <Chip
                    label={systemMetrics.disasterRisk.toUpperCase()}
                    color={systemMetrics.disasterRisk === 'high' ? 'error' : systemMetrics.disasterRisk === 'medium' ? 'warning' : 'success'}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Response Teams Available</Typography>
                  <Typography variant="h6">
                    {responseTeams.filter(t => t.status === 'available').length} / {responseTeams.length}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Integration Points</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                    <Typography variant="body1">
                      {integrationPoints.filter(p => p.status === 'connected').length} Connected
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;