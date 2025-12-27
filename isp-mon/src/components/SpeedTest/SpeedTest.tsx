import React, { useState } from 'react';
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
  Avatar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Speed,
  CloudDownload,
  CloudUpload,
  Timer,
  PhoneAndroid,
  Computer,
  Language,
  TrendingUp,
  People
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

const speedTestStats = {
  totalTests: 1847562,
  avgDownload: 48.5,
  avgUpload: 22.3,
  avgLatency: 35,
  testsToday: 12453,
  mobileTests: 65,
  webTests: 35
};

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  tests: Math.floor(300 + Math.random() * 700 + (i > 8 && i < 22 ? 500 : 0)),
  avgSpeed: 40 + Math.random() * 20
}));

const ispSpeedData = [
  { name: 'Link3', download: 52, upload: 25 },
  { name: 'Amber IT', download: 48, upload: 23 },
  { name: 'Carnival', download: 45, upload: 21 },
  { name: 'Fiber@Home', download: 55, upload: 28 },
  { name: 'Dot Internet', download: 47, upload: 22 },
];

const recentTests = [
  { id: 1, isp: 'Link3 Technologies', download: 52.3, upload: 24.8, latency: 28, device: 'mobile', region: 'Dhaka', time: '2 min ago' },
  { id: 2, isp: 'Amber IT', download: 45.6, upload: 21.2, latency: 35, device: 'web', region: 'Chittagong', time: '5 min ago' },
  { id: 3, isp: 'Carnival Internet', download: 38.9, upload: 18.5, latency: 42, device: 'mobile', region: 'Sylhet', time: '8 min ago' },
  { id: 4, isp: 'Fiber@Home', download: 58.2, upload: 28.1, latency: 25, device: 'web', region: 'Dhaka', time: '12 min ago' },
  { id: 5, isp: 'BRACNet', download: 35.4, upload: 16.8, latency: 48, device: 'mobile', region: 'Khulna', time: '15 min ago' },
];

const deviceData = [
  { name: 'Android', value: 45, color: '#3DDC84' },
  { name: 'iOS', value: 20, color: '#007AFF' },
  { name: 'Windows', value: 25, color: '#00A4EF' },
  { name: 'macOS', value: 7, color: '#555555' },
  { name: 'Other', value: 3, color: '#999999' },
];

const SpeedTest: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Speed Test Analytics
          </Typography>
          <Typography variant="body2" color="textSecondary">
            User speed test results from mobile app and web platform
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(_, v) => v && setTimeRange(v)}
          size="small"
        >
          <ToggleButton value="today" sx={{ px: 2 }}>Today</ToggleButton>
          <ToggleButton value="week" sx={{ px: 2 }}>This Week</ToggleButton>
          <ToggleButton value="month" sx={{ px: 2 }}>This Month</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Speed sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Tests Today</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {speedTestStats.testsToday.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <CloudDownload sx={{ color: 'success.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Avg Download</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {speedTestStats.avgDownload} Mbps
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <CloudUpload sx={{ color: 'info.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Avg Upload</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {speedTestStats.avgUpload} Mbps
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Timer sx={{ color: 'warning.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Avg Latency</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {speedTestStats.avgLatency} ms
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneAndroid sx={{ color: 'secondary.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Mobile Tests</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {speedTestStats.mobileTests}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <People sx={{ color: 'error.main' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Total Tests</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {(speedTestStats.totalTests / 1000000).toFixed(1)}M
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tests by Hour */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, height: 320 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Speed Tests by Hour
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="tests" fill="#667eea" name="Tests" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Device Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: 320 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Device Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* ISP Speed Comparison */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Average Speed by ISP
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={ispSpeedData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="download" fill="#2ECC71" name="Download (Mbps)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="upload" fill="#3498DB" name="Upload (Mbps)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Tests */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Recent Speed Tests
            </Typography>
            <TableContainer sx={{ maxHeight: 240 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ISP</TableCell>
                    <TableCell align="center">Down</TableCell>
                    <TableCell align="center">Up</TableCell>
                    <TableCell align="center">Latency</TableCell>
                    <TableCell align="center">Device</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTests.map((test) => (
                    <TableRow key={test.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                            {test.isp}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {test.region} - {test.time}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                          {test.download}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: 'info.main' }}>
                          {test.upload}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {test.latency}ms
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {test.device === 'mobile' ? (
                          <PhoneAndroid sx={{ fontSize: 18, color: 'secondary.main' }} />
                        ) : (
                          <Computer sx={{ fontSize: 18, color: 'primary.main' }} />
                        )}
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

export default SpeedTest;
