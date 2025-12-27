import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Link
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Speed,
  Warning,
  Error as ErrorIcon,
  Info,
  CheckCircle,
  TrendingUp,
  Business,
  People,
  Timeline,
  Refresh,
  AccessTime,
  DataUsage,
  Public,
  ArrowForward
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useRegionFilter } from '../../contexts/RegionFilterContext';
import { mockIsps, getAggregateMetrics } from '../../data/mockIsps';
import {
  generateTrendData,
  divisionQosData,
  generateAlerts,
  getQuickStats,
  getQosColor,
  IspAlert
} from '../../data/mockQosData';

const BtrcDashboard: React.FC = () => {
  const { getSelectedDistricts } = useRegionFilter();
  const [trendMetric, setTrendMetric] = useState<'availability' | 'downloadRatio' | 'latency'>('availability');

  // Get data
  const metrics = useMemo(() => getAggregateMetrics(mockIsps), []);
  const trendData = useMemo(() => generateTrendData(), []);
  const alerts = useMemo(() => generateAlerts(), []);
  const quickStats = useMemo(() => getQuickStats(), []);

  // Sort ISPs by QoS score for top 10
  const topIsps = useMemo(() =>
    [...mockIsps]
      .filter(isp => isp.status === 'active')
      .sort((a, b) => b.qosScore - a.qosScore)
      .slice(0, 10),
    []
  );

  const activeAlerts = alerts.filter(a => !a.resolved);

  const getSeverityIcon = (severity: IspAlert['severity']) => {
    switch (severity) {
      case 'critical': return <ErrorIcon sx={{ color: '#E74C3C' }} />;
      case 'warning': return <Warning sx={{ color: '#F39C12' }} />;
      case 'info': return <Info sx={{ color: '#3498DB' }} />;
    }
  };

  const getSeverityColor = (severity: IspAlert['severity']) => {
    switch (severity) {
      case 'critical': return '#E74C3C';
      case 'warning': return '#F39C12';
      case 'info': return '#3498DB';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleTrendChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMetric: 'availability' | 'downloadRatio' | 'latency' | null
  ) => {
    if (newMetric) setTrendMetric(newMetric);
  };

  const selectedDistrictsCount = getSelectedDistricts().length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            BTRC Executive Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            National QoS Monitoring Overview
            {selectedDistrictsCount > 0 && selectedDistrictsCount < 64 && (
              <Chip
                label={`${selectedDistrictsCount} districts selected`}
                size="small"
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                color="primary"
              />
            )}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label={`Last updated: ${new Date().toLocaleTimeString()}`}
            size="small"
            variant="outlined"
          />
          <IconButton size="small" title="Refresh Data">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* KPI Summary Cards - Fixed height uniform rectangles */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            height: 120
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }} noWrap>
                    Service Availability
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {metrics.avgAvailability.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem' }} noWrap>
                    National Average
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 44, opacity: 0.8, flexShrink: 0 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            height: 120
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }} noWrap>
                    Download Speed Ratio
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {(metrics.avgDownloadRatio * 100).toFixed(0)}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem' }} noWrap>
                    Actual vs Advertised
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 44, opacity: 0.8, flexShrink: 0 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            height: 120
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }} noWrap>
                    Active ISPs
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {metrics.activeIsps}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem' }} noWrap>
                    {metrics.suspendedIsps} suspended
                  </Typography>
                </Box>
                <Business sx={{ fontSize: 44, opacity: 0.8, flexShrink: 0 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{
            background: activeAlerts.length > 3
              ? 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)'
              : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            height: 120
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }} noWrap>
                    Active Alerts
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {activeAlerts.length}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem' }} noWrap>
                    {alerts.filter(a => a.severity === 'critical' && !a.resolved).length} critical
                  </Typography>
                </Box>
                <Warning sx={{ fontSize: 44, opacity: 0.8, flexShrink: 0 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* National QoS Overview by Division */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                <Public sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 18 }} />
                National QoS by Division
              </Typography>
            </Box>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              flex: 1,
              overflow: 'hidden'
            }}>
              {divisionQosData.map((division) => (
                <Tooltip
                  key={division.divisionId}
                  title={
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>{division.divisionName}</Typography>
                      <Typography variant="caption" display="block">Availability: {division.availability}%</Typography>
                      <Typography variant="caption" display="block">Download: {(division.downloadRatio * 100).toFixed(0)}%</Typography>
                      <Typography variant="caption" display="block">Latency: {division.latency}ms</Typography>
                      <Typography variant="caption" display="block">ISPs: {division.ispCount}</Typography>
                    </Box>
                  }
                  arrow
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: '2px solid',
                      borderColor: getQosColor(division.qosScore),
                      height: '100%',
                      minHeight: 0,
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{
                      p: 1,
                      '&:last-child': { pb: 1 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="caption" noWrap sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
                        {division.divisionName}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: getQosColor(division.qosScore), lineHeight: 1.2, fontSize: '1.1rem' }}
                      >
                        {division.qosScore.toFixed(0)}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                        {division.ispCount} ISPs
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Top 10 ISPs by QoS Score */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
              Top 10 ISPs by QoS Score
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                layout="vertical"
                data={topIsps}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  formatter={(value: number) => [`${value.toFixed(1)}`, 'QoS Score']}
                  contentStyle={{ borderRadius: 8 }}
                />
                <Bar dataKey="qosScore" name="QoS Score" radius={[0, 4, 4, 0]}>
                  {topIsps.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getQosColor(entry.qosScore)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* QoS Trend Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, height: '350px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                <Timeline sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                QoS Trend (7 Days)
              </Typography>
              <ToggleButtonGroup
                value={trendMetric}
                exclusive
                onChange={handleTrendChange}
                size="small"
              >
                <ToggleButton value="availability" sx={{ textTransform: 'none', px: 2 }}>
                  Availability
                </ToggleButton>
                <ToggleButton value="downloadRatio" sx={{ textTransform: 'none', px: 2 }}>
                  Speed Ratio
                </ToggleButton>
                <ToggleButton value="latency" sx={{ textTransform: 'none', px: 2 }}>
                  Latency
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis
                  domain={
                    trendMetric === 'availability'
                      ? [95, 100]
                      : trendMetric === 'latency'
                        ? [0, 80]
                        : [0.7, 1]
                  }
                  tickFormatter={(v) =>
                    trendMetric === 'latency'
                      ? `${v}ms`
                      : trendMetric === 'availability'
                        ? `${v}%`
                        : `${(v * 100).toFixed(0)}%`
                  }
                />
                <RechartsTooltip
                  formatter={(value: number) => [
                    trendMetric === 'latency'
                      ? `${value}ms`
                      : trendMetric === 'availability'
                        ? `${value}%`
                        : `${(value * 100).toFixed(1)}%`,
                    trendMetric === 'availability'
                      ? 'Availability'
                      : trendMetric === 'downloadRatio'
                        ? 'Download Ratio'
                        : 'Latency'
                  ]}
                  contentStyle={{ borderRadius: 8 }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={trendMetric}
                  stroke={trendMetric === 'latency' ? '#E74C3C' : '#2ECC71'}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name={
                    trendMetric === 'availability'
                      ? 'Availability'
                      : trendMetric === 'downloadRatio'
                        ? 'Download Ratio'
                        : 'Latency'
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Alert Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '350px', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                <Warning sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                Recent Alerts (24h)
              </Typography>
              <Link href="#" underline="hover" sx={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                View All <ArrowForward sx={{ fontSize: 14, ml: 0.5 }} />
              </Link>
            </Box>
            <List sx={{ flexGrow: 1, overflow: 'auto', py: 0 }}>
              {alerts.slice(0, 6).map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    sx={{
                      px: 1,
                      py: 0.75,
                      borderRadius: 1,
                      mb: 0.5,
                      bgcolor: alert.resolved ? 'transparent' : `${getSeverityColor(alert.severity)}10`,
                      opacity: alert.resolved ? 0.6 : 1
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {alert.resolved ? (
                        <CheckCircle sx={{ color: '#27AE60', fontSize: 20 }} />
                      ) : (
                        getSeverityIcon(alert.severity)
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                            {alert.ispName}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: '0.6rem',
                              bgcolor: getSeverityColor(alert.severity),
                              color: 'white'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                          {alert.message} - {alert.region}
                        </Typography>
                      }
                    />
                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                      {formatTimeAgo(alert.timestamp)}
                    </Typography>
                  </ListItem>
                  {index < 5 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Stats Footer */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <People sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Total Subscribers</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {(quickStats.totalSubscribers / 1000000).toFixed(2)}M
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <DataUsage sx={{ color: 'secondary.main', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Data Points Today</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {(quickStats.dataPointsToday / 1000000).toFixed(2)}M
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Business sx={{ color: 'info.main', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Active ISPs</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {quickStats.activeIsps}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Public sx={{ color: 'success.main', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Regions Monitored</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {quickStats.regionsMonitored}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircle sx={{ color: '#27AE60', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Alerts Resolved (24h)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {quickStats.alertsResolved24h}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime sx={{ color: 'text.secondary', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">Last Refresh</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {quickStats.lastRefresh.toLocaleTimeString()}
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

export default BtrcDashboard;
