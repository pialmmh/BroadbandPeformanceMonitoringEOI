import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Assessment,
  FileDownload,
  PictureAsPdf,
  TableChart,
  Schedule,
  Add,
  Visibility,
  Delete,
  Send,
  CalendarMonth
} from '@mui/icons-material';

interface ScheduledReport {
  id: string;
  name: string;
  type: string;
  frequency: string;
  lastRun: string;
  nextRun: string;
  recipients: number;
  status: 'active' | 'paused';
}

const scheduledReports: ScheduledReport[] = [
  { id: '1', name: 'Weekly QoS Summary', type: 'QoS Metrics', frequency: 'Weekly', lastRun: '2024-12-20', nextRun: '2024-12-27', recipients: 5, status: 'active' },
  { id: '2', name: 'Monthly ISP Performance', type: 'ISP Analysis', frequency: 'Monthly', lastRun: '2024-12-01', nextRun: '2025-01-01', recipients: 8, status: 'active' },
  { id: '3', name: 'Daily Alert Report', type: 'Alerts', frequency: 'Daily', lastRun: '2024-12-25', nextRun: '2024-12-26', recipients: 3, status: 'active' },
  { id: '4', name: 'Quarterly Compliance', type: 'Compliance', frequency: 'Quarterly', lastRun: '2024-10-01', nextRun: '2025-01-01', recipients: 12, status: 'paused' },
];

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('last7days');
  const [selectedIsps, setSelectedIsps] = useState<string[]>([]);

  const reportTemplates = [
    { id: 'qos', name: 'QoS Performance Report', icon: <Assessment />, description: 'Detailed QoS metrics and trends' },
    { id: 'isp', name: 'ISP Compliance Report', icon: <TableChart />, description: 'ISP compliance and violations' },
    { id: 'speed', name: 'Speed Test Analysis', icon: <Assessment />, description: 'User speed test results analysis' },
    { id: 'alert', name: 'Alert Summary Report', icon: <Assessment />, description: 'Alert history and resolution times' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Reports
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Generate, schedule, and export QoS monitoring reports
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} size="small">
          Create Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Report Builder */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
              Report Builder
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="qos">QoS Performance</MenuItem>
                    <MenuItem value="isp">ISP Compliance</MenuItem>
                    <MenuItem value="speed">Speed Test Analysis</MenuItem>
                    <MenuItem value="alert">Alert Summary</MenuItem>
                    <MenuItem value="revenue">Revenue Analysis</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="last7days">Last 7 Days</MenuItem>
                    <MenuItem value="last30days">Last 30 Days</MenuItem>
                    <MenuItem value="lastQuarter">Last Quarter</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>ISP Filter</InputLabel>
                  <Select
                    multiple
                    value={selectedIsps}
                    label="ISP Filter"
                    onChange={(e) => setSelectedIsps(e.target.value as string[])}
                    renderValue={(selected) => `${selected.length} selected`}
                  >
                    <MenuItem value="all">All ISPs</MenuItem>
                    <MenuItem value="link3">Link3 Technologies</MenuItem>
                    <MenuItem value="amber">Amber IT</MenuItem>
                    <MenuItem value="carnival">Carnival Internet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Include Sections</Typography>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Executive Summary" />
                  <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Charts & Graphs" />
                  <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Data Tables" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Raw Data Export" />
                </FormGroup>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button variant="outlined" startIcon={<Visibility />} size="small">
                    Preview
                  </Button>
                  <Button variant="outlined" startIcon={<PictureAsPdf />} size="small">
                    Export PDF
                  </Button>
                  <Button variant="outlined" startIcon={<TableChart />} size="small">
                    Export Excel
                  </Button>
                  <Button variant="contained" startIcon={<FileDownload />} size="small">
                    Generate
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Report Templates */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Quick Templates
            </Typography>
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'action.hover', transform: 'translateX(4px)' }
                }}
                variant="outlined"
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ color: 'primary.main' }}>{template.icon}</Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {template.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {template.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Scheduled Reports */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                <Schedule sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
                Scheduled Reports
              </Typography>
              <Button variant="outlined" startIcon={<Add />} size="small">
                Schedule New
              </Button>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Frequency</TableCell>
                    <TableCell align="center">Last Run</TableCell>
                    <TableCell align="center">Next Run</TableCell>
                    <TableCell align="center">Recipients</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {report.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={report.type} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          <CalendarMonth sx={{ fontSize: 14 }} />
                          <Typography variant="body2">{report.frequency}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{report.lastRun}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{report.nextRun}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={`${report.recipients} users`} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={report.status}
                          size="small"
                          color={report.status === 'active' ? 'success' : 'default'}
                          sx={{ height: 20, fontSize: '0.65rem', textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" title="Run Now">
                          <Send sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" title="View">
                          <Visibility sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" title="Delete">
                          <Delete sx={{ fontSize: 16 }} />
                        </IconButton>
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

export default Reports;
