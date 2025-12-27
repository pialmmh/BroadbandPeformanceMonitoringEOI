import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
  Avatar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Router,
  CheckCircle,
  Warning,
  Speed,
  CloudUpload,
  SupportAgent,
  Settings,
  Notifications,
  TrendingUp,
  Schedule,
  Description,
  ArrowForward
} from '@mui/icons-material';

const IspDashboard: React.FC = () => {
  const ispInfo = {
    name: 'Link3 Technologies Ltd.',
    licenseNumber: 'ISP-NAT-001',
    status: 'active',
    registeredDate: '2024-01-15',
    lastLogin: '2024-12-27 09:45:00'
  };

  const integrationStatus = {
    totalDevices: 12,
    activeDevices: 10,
    pendingDevices: 2,
    snmpConfigured: 8,
    netflowConfigured: 6,
    dataLastReceived: '2024-12-27 10:30:00'
  };

  const recentActivities = [
    { action: 'Router R-CTG-001 provisioned', time: '2 hours ago', type: 'success' },
    { action: 'SNMP configuration updated for R-DHK-003', time: '5 hours ago', type: 'info' },
    { action: 'Support ticket #1234 resolved', time: '1 day ago', type: 'success' },
    { action: 'New firmware update available', time: '2 days ago', type: 'warning' },
  ];

  const pendingTasks = [
    { task: 'Configure Netflow for 2 devices', priority: 'high' },
    { task: 'Upload updated ISP license', priority: 'medium' },
    { task: 'Review QoS compliance report', priority: 'low' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
              L3
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {ispInfo.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  label={ispInfo.licenseNumber}
                  size="small"
                  sx={{ height: 20, fontSize: '0.7rem', fontFamily: 'monospace' }}
                />
                <Chip
                  label="Active"
                  size="small"
                  color="success"
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box textAlign="right">
          <Typography variant="caption" color="textSecondary">Last Login</Typography>
          <Typography variant="body2">{ispInfo.lastLogin}</Typography>
        </Box>
      </Box>

      {/* Alert Banner */}
      <Alert severity="info" sx={{ mb: 3 }} action={
        <Button size="small" color="inherit">View</Button>
      }>
        2 devices pending Netflow configuration. Complete setup to ensure full data reporting to BTRC.
      </Alert>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 100, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Total Devices</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{integrationStatus.totalDevices}</Typography>
                </Box>
                <Router sx={{ fontSize: 36, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 100, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Active</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{integrationStatus.activeDevices}</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 36, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 100, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>SNMP Configured</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{integrationStatus.snmpConfigured}</Typography>
                </Box>
                <Speed sx={{ fontSize: 36, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 100, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Netflow Configured</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{integrationStatus.netflowConfigured}</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 36, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                  }}
                >
                  <Router sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Add Device</Typography>
                  <Typography variant="caption" color="textSecondary">Provision new router</Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                  }}
                >
                  <Settings sx={{ fontSize: 32, color: 'secondary.main', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Configure SNMP</Typography>
                  <Typography variant="caption" color="textSecondary">Setup monitoring</Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                  }}
                >
                  <SupportAgent sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>New Ticket</Typography>
                  <Typography variant="caption" color="textSecondary">Get support</Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                  }}
                >
                  <CloudUpload sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Upload Docs</Typography>
                  <Typography variant="caption" color="textSecondary">Update license</Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Pending Tasks */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Pending Tasks
              </Typography>
              <Chip label={pendingTasks.length} size="small" color="warning" sx={{ height: 20 }} />
            </Box>
            <List dense>
              {pendingTasks.map((task, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Schedule sx={{
                      fontSize: 18,
                      color: task.priority === 'high' ? 'error.main' : task.priority === 'medium' ? 'warning.main' : 'info.main'
                    }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.task}
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                  <Chip
                    label={task.priority}
                    size="small"
                    color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                    sx={{ height: 18, fontSize: '0.6rem', textTransform: 'capitalize' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Recent Activity
              </Typography>
              <Button size="small" endIcon={<ArrowForward />}>View All</Button>
            </Box>
            <List dense>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {activity.type === 'success' ? (
                        <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                      ) : activity.type === 'warning' ? (
                        <Warning sx={{ fontSize: 18, color: 'warning.main' }} />
                      ) : (
                        <Notifications sx={{ fontSize: 18, color: 'info.main' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                      secondaryTypographyProps={{ fontSize: '0.7rem' }}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Data Reporting Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Data Reporting Status
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2">SNMP Data Collection</Typography>
                <Typography variant="body2" color="success.main">Active</Typography>
              </Box>
              <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="textSecondary">8 of 10 devices reporting</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2">Netflow Data Collection</Typography>
                <Typography variant="body2" color="warning.main">Partial</Typography>
              </Box>
              <LinearProgress variant="determinate" value={60} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="textSecondary">6 of 10 devices reporting</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="textSecondary">
                Last data received: {integrationStatus.dataLastReceived}
              </Typography>
              <Chip label="Real-time" size="small" color="success" sx={{ height: 18, fontSize: '0.6rem' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IspDashboard;
