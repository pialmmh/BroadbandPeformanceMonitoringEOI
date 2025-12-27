import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Tooltip

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Hub,
  CheckCircle,
  Error,
  Warning,
  Refresh,
  CloudSync,
  Api,
  Storage,
  AccessTime,
  TrendingUp,
  NetworkCheck,
  Security,
  Business,
  Public
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { IntegrationPoint } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const IntegrationPoints: React.FC = () => {
  const { filteredIntegrationPoints: integrationPoints, refreshData } = useData();

  const getStatusIcon = (status: IntegrationPoint['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'disconnected':
        return <Warning sx={{ color: '#ff9800' }} />;
      case 'error':
        return <Error sx={{ color: '#f44336' }} />;
      default:
        return <Warning />;
    }
  };

  const getTypeIcon = (type: IntegrationPoint['type']) => {
    switch (type) {
      case 'NOC':
      case 'SOC':
      case 'TOC':
        return <NetworkCheck />;
      case 'TowerCo':
      case 'NTTN':
        return <Business />;
      case 'Third-Party':
        return <Api />;
      case 'Disaster-Org':
        return <Public />;
      default:
        return <Hub />;
    }
  };

  const getStatusColor = (status: IntegrationPoint['status']) => {
    switch (status) {
      case 'connected': return '#4caf50';
      case 'disconnected': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const connectionStats = [
    {
      name: 'Connected',
      value: integrationPoints.filter(p => p.status === 'connected').length,
      color: '#4caf50'
    },
    {
      name: 'Disconnected',
      value: integrationPoints.filter(p => p.status === 'disconnected').length,
      color: '#ff9800'
    },
    {
      name: 'Error',
      value: integrationPoints.filter(p => p.status === 'error').length,
      color: '#f44336'
    }
  ];

  const totalDataPoints = integrationPoints.reduce((acc, p) => acc + p.dataPoints, 0);
  const avgErrorRate = integrationPoints.reduce((acc, p) => acc + p.errorRate, 0) / integrationPoints.length;

  const formatDataPoints = (points: number) => {
    if (points >= 1000000) return `${(points / 1000000).toFixed(1)}M`;
    if (points >= 1000) return `${(points / 1000).toFixed(1)}K`;
    return points.toString();
  };

  const getTimeSinceSync = (lastSync: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(lastSync).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    return `${minutes}m ago`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Integration Points Monitoring
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={refreshData}
        >
          Refresh All
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Total Integrations</Typography>
                  <Typography variant="h3">{integrationPoints.length}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {integrationPoints.filter(p => p.status === 'connected').length} Active
                  </Typography>
                </Box>
                <Hub sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Data Points</Typography>
                  <Typography variant="h3">{formatDataPoints(totalDataPoints)}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Collected Today
                  </Typography>
                </Box>
                <Storage sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>Avg Error Rate</Typography>
                  <Typography variant="h3">{(avgErrorRate * 100).toFixed(2)}%</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Across all points
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Connection Status</Typography>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={connectionStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {connectionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Integration Points Details
            </Typography>
            <Grid container spacing={2}>
              {integrationPoints.map((point) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={point.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getTypeIcon(point.type)}
                          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                            {point.name}
                          </Typography>
                        </Box>
                        {getStatusIcon(point.status)}
                      </Box>

                      <Chip
                        label={point.type}
                        size="small"
                        sx={{ mb: 2 }}
                        color="primary"
                        variant="outlined"
                      />

                      <List dense>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <CloudSync sx={{ fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Last Sync"
                            secondary={getTimeSinceSync(point.lastSync)}
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <Storage sx={{ fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Data Points"
                            secondary={formatDataPoints(point.dataPoints)}
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <Warning sx={{ fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Error Rate"
                            secondary={`${(point.errorRate * 100).toFixed(2)}%`}
                          />
                        </ListItem>
                      </List>

                      {point.status === 'connected' && (
                        <LinearProgress
                          variant="determinate"
                          value={100 - (point.errorRate * 100)}
                          sx={{ mt: 2, height: 6, borderRadius: 3 }}
                          color="success"
                        />
                      )}

                      {point.status === 'error' && (
                        <Box sx={{ mt: 2 }}>
                          <Chip
                            label="Connection Failed"
                            size="small"
                            color="error"
                            icon={<Error />}
                          />
                        </Box>
                      )}

                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="Refresh Connection">
                          <IconButton size="small" color="primary">
                            <Refresh />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IntegrationPoints;