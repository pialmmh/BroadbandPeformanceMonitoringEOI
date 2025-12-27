import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Speed,
  NetworkCheck,
  Timer,
  Warning,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Refresh,
  FilterList
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { mockIsps } from '../../data/mockIsps';
import { generateTrendData, getQosColor } from '../../data/mockQosData';

const QosMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const trendData = useMemo(() => generateTrendData(), []);

  const handleTimeRangeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newRange: '1h' | '6h' | '24h' | '7d' | null
  ) => {
    if (newRange) setTimeRange(newRange);
  };

  // KPI thresholds
  const kpis = [
    { label: 'Service Availability', value: 97.4, unit: '%', threshold: 95, icon: <CheckCircle /> },
    { label: 'Download Ratio', value: 87, unit: '%', threshold: 80, icon: <Speed /> },
    { label: 'Upload Ratio', value: 84, unit: '%', threshold: 80, icon: <TrendingUp /> },
    { label: 'Avg Latency', value: 42, unit: 'ms', threshold: 50, icon: <Timer />, inverse: true },
    { label: 'Packet Loss', value: 0.8, unit: '%', threshold: 1, icon: <NetworkCheck />, inverse: true },
    { label: 'Jitter', value: 6.5, unit: 'ms', threshold: 10, icon: <Speed />, inverse: true }
  ];

  const isWithinThreshold = (value: number, threshold: number, inverse?: boolean) => {
    return inverse ? value <= threshold : value >= threshold;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            QoS Monitoring
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Real-time Quality of Service metrics and KPI tracking
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            size="small"
          >
            <ToggleButton value="1h" sx={{ px: 2 }}>1H</ToggleButton>
            <ToggleButton value="6h" sx={{ px: 2 }}>6H</ToggleButton>
            <ToggleButton value="24h" sx={{ px: 2 }}>24H</ToggleButton>
            <ToggleButton value="7d" sx={{ px: 2 }}>7D</ToggleButton>
          </ToggleButtonGroup>
          <IconButton size="small">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        {kpis.map((kpi, index) => (
          <Grid size={{ xs: 6, md: 2 }} key={index}>
            <Card sx={{ height: 100 }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="caption" color="textSecondary" noWrap sx={{ fontSize: '0.7rem' }}>
                    {kpi.label}
                  </Typography>
                  <Box sx={{ color: isWithinThreshold(kpi.value, kpi.threshold, kpi.inverse) ? 'success.main' : 'error.main' }}>
                    {React.cloneElement(kpi.icon, { sx: { fontSize: 16 } })}
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, my: 0.5 }}>
                  {kpi.value}{kpi.unit}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Chip
                    label={isWithinThreshold(kpi.value, kpi.threshold, kpi.inverse) ? 'OK' : 'ALERT'}
                    size="small"
                    color={isWithinThreshold(kpi.value, kpi.threshold, kpi.inverse) ? 'success' : 'error'}
                    sx={{ height: 16, fontSize: '0.6rem' }}
                  />
                  <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                    Threshold: {kpi.threshold}{kpi.unit}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* QoS Trend Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              QoS Metrics Trend
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2ECC71" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[95, 100]} tick={{ fontSize: 11 }} />
                <RechartsTooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="availability"
                  stroke="#2ECC71"
                  fillOpacity={1}
                  fill="url(#colorAvail)"
                  name="Availability %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Latency & Packet Loss Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Latency & Packet Loss
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#E74C3C" name="Latency (ms)" dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="packetLoss" stroke="#F39C12" name="Packet Loss %" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* ISP Performance Table */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                ISP Performance Comparison
              </Typography>
              <IconButton size="small">
                <FilterList />
              </IconButton>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ISP Name</TableCell>
                    <TableCell align="center">QoS Score</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">Download Ratio</TableCell>
                    <TableCell align="center">Upload Ratio</TableCell>
                    <TableCell align="center">Latency</TableCell>
                    <TableCell align="center">Packet Loss</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockIsps.slice(0, 10).map((isp) => (
                    <TableRow key={isp.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {isp.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                          <LinearProgress
                            variant="determinate"
                            value={isp.qosScore}
                            sx={{
                              width: 60,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getQosColor(isp.qosScore),
                                borderRadius: 3
                              }
                            }}
                          />
                          <Typography variant="caption" sx={{ fontWeight: 500, minWidth: 35 }}>
                            {isp.qosScore.toFixed(1)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: isp.serviceAvailability >= 98 ? 'success.main' : 'warning.main' }}>
                          {isp.serviceAvailability}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {(isp.downloadSpeedRatio * 100).toFixed(0)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {(isp.uploadSpeedRatio * 100).toFixed(0)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: isp.avgLatency <= 40 ? 'success.main' : 'warning.main' }}>
                          {isp.avgLatency}ms
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: isp.packetLoss <= 1 ? 'success.main' : 'error.main' }}>
                          {isp.packetLoss}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={isp.status}
                          size="small"
                          color={isp.status === 'active' ? 'success' : 'error'}
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QosMonitoring;
