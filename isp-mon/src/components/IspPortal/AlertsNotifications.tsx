import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
  Tooltip,
  FormControlLabel,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Notifications,
  Warning,
  Error as ErrorIcon,
  Info,
  CheckCircle,
  Visibility,
  Done,
  DoneAll,
  Schedule,
  FilterList,
  Settings,
  Email,
  Sms,
  Webhook,
  NotificationsActive,
  Security,
  Speed,
  Router,
  Description,
  AttachMoney
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Mock data
const mockAlerts = [
  {
    id: 1,
    category: 'security',
    type: 'DDoS Attack Detected',
    severity: 'critical',
    message: 'Active DNS amplification attack on 103.15.244.5 - Peak 85 Gbps',
    resource: '103.15.244.5',
    timestamp: '2024-12-28 11:00',
    acknowledged: false,
    resolved: false
  },
  {
    id: 2,
    category: 'security',
    type: 'BGP Hijack Detected',
    severity: 'critical',
    message: 'Possible route hijack on 103.15.240.0/22 from AS64512',
    resource: '103.15.240.0/22',
    timestamp: '2024-12-28 10:30',
    acknowledged: true,
    resolved: false
  },
  {
    id: 3,
    category: 'network',
    type: 'Device Offline',
    severity: 'high',
    message: 'Core router RTR-DHAKA-01 not responding to SNMP polls',
    resource: 'RTR-DHAKA-01',
    timestamp: '2024-12-28 09:45',
    acknowledged: true,
    resolved: false
  },
  {
    id: 4,
    category: 'network',
    type: 'QoS Threshold Breach',
    severity: 'warning',
    message: 'Download speed ratio below 0.85 in Chittagong region',
    resource: 'Chittagong Division',
    timestamp: '2024-12-28 08:30',
    acknowledged: false,
    resolved: false
  },
  {
    id: 5,
    category: 'compliance',
    type: 'Submission Overdue',
    severity: 'high',
    message: 'Monthly operational data submission is 2 days overdue',
    resource: 'December 2024 Report',
    timestamp: '2024-12-28 00:00',
    acknowledged: false,
    resolved: false
  },
  {
    id: 6,
    category: 'network',
    type: 'High Latency Alert',
    severity: 'warning',
    message: 'Latency to international destinations exceeds 150ms',
    resource: 'International Link',
    timestamp: '2024-12-27 22:15',
    acknowledged: true,
    resolved: true
  },
  {
    id: 7,
    category: 'compliance',
    type: 'Document Expiring',
    severity: 'info',
    message: 'ISP License renewal due in 30 days',
    resource: 'ISP License',
    timestamp: '2024-12-27 09:00',
    acknowledged: true,
    resolved: false
  },
  {
    id: 8,
    category: 'system',
    type: 'Data Staleness',
    severity: 'warning',
    message: 'No Netflow data received from RTR-CTG-02 in 6 hours',
    resource: 'RTR-CTG-02',
    timestamp: '2024-12-28 06:00',
    acknowledged: false,
    resolved: false
  },
];

const alertTrendData = [
  { day: 'Mon', critical: 2, warning: 5, info: 8 },
  { day: 'Tue', critical: 1, warning: 4, info: 6 },
  { day: 'Wed', critical: 3, warning: 7, info: 5 },
  { day: 'Thu', critical: 0, warning: 3, info: 4 },
  { day: 'Fri', critical: 2, warning: 6, info: 7 },
  { day: 'Sat', critical: 1, warning: 2, info: 3 },
  { day: 'Sun', critical: 2, warning: 4, info: 5 },
];

const alertCategoryData = [
  { category: 'Security', count: 12, color: '#E74C3C' },
  { category: 'Network', count: 25, color: '#F39C12' },
  { category: 'Compliance', count: 8, color: '#3498DB' },
  { category: 'System', count: 15, color: '#9B59B6' },
];

const AlertsNotifications: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<typeof mockAlerts[0] | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <ErrorIcon fontSize="small" />;
      case 'high': return <Warning fontSize="small" />;
      case 'warning': return <Warning fontSize="small" />;
      case 'info': return <Info fontSize="small" />;
      default: return <Info fontSize="small" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Security fontSize="small" />;
      case 'network': return <Speed fontSize="small" />;
      case 'compliance': return <Description fontSize="small" />;
      case 'system': return <Router fontSize="small" />;
      case 'billing': return <AttachMoney fontSize="small" />;
      default: return <Notifications fontSize="small" />;
    }
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterCategory !== 'all' && alert.category !== filterCategory) return false;
    if (!showResolved && alert.resolved) return false;
    return true;
  });

  const criticalCount = mockAlerts.filter(a => a.severity === 'critical' && !a.resolved).length;
  const unacknowledgedCount = mockAlerts.filter(a => !a.acknowledged && !a.resolved).length;

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            <Badge badgeContent={criticalCount} color="error" sx={{ mr: 1 }}>
              <Notifications />
            </Badge>
            Alerts & Notifications
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Monitor alerts, manage notifications, and configure preferences
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<DoneAll />} size="small">
            Acknowledge All
          </Button>
        </Box>
      </Box>

      {/* Critical Alert Banner */}
      {criticalCount > 0 && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          icon={<ErrorIcon />}
          action={
            <Button color="inherit" size="small">View All</Button>
          }
        >
          <Typography variant="subtitle2">
            {criticalCount} CRITICAL ALERT{criticalCount > 1 ? 'S' : ''} REQUIRE IMMEDIATE ATTENTION
          </Typography>
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <ErrorIcon sx={{ fontSize: 24 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{criticalCount}</Typography>
              <Typography variant="caption">Critical</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Warning sx={{ fontSize: 24 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {mockAlerts.filter(a => (a.severity === 'warning' || a.severity === 'high') && !a.resolved).length}
              </Typography>
              <Typography variant="caption">Warnings</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'info.main' }}>
                {mockAlerts.filter(a => a.severity === 'info' && !a.resolved).length}
              </Typography>
              <Typography variant="caption">Info</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Badge badgeContent={unacknowledgedCount} color="error">
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {unacknowledgedCount}
                </Typography>
              </Badge>
              <Typography variant="caption">Unacknowledged</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                {mockAlerts.filter(a => a.resolved).length}
              </Typography>
              <Typography variant="caption">Resolved (24h)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alert Trend Chart */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Alert Trend (Last 7 Days)</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={alertTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <RechartsTooltip />
                  <Bar dataKey="critical" stackId="a" fill="#E74C3C" name="Critical" />
                  <Bar dataKey="warning" stackId="a" fill="#F39C12" name="Warning" />
                  <Bar dataKey="info" stackId="a" fill="#3498DB" name="Info" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>By Category</Typography>
              <List dense>
                {alertCategoryData.map((cat) => (
                  <ListItem key={cat.category} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getCategoryIcon(cat.category.toLowerCase())}
                    </ListItemIcon>
                    <ListItemText primary={cat.category} />
                    <Chip label={cat.count} size="small" sx={{ bgcolor: cat.color, color: 'white' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab icon={<NotificationsActive />} iconPosition="start" label="Active Alerts" />
          <Tab icon={<Schedule />} iconPosition="start" label="Alert History" />
          <Tab icon={<Settings />} iconPosition="start" label="Preferences" />
        </Tabs>

        <CardContent>
          {/* Active Alerts Tab */}
          <TabPanel value={tabValue} index={0}>
            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Severity</InputLabel>
                <Select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} label="Severity">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} label="Category">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                  <MenuItem value="network">Network</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Switch checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} size="small" />}
                label="Show Resolved"
              />
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Showing {filteredAlerts.length} alerts
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Alert Type</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Resource</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow
                      key={alert.id}
                      hover
                      sx={{
                        bgcolor: alert.severity === 'critical' && !alert.resolved ? 'error.light' : 'inherit',
                        opacity: alert.resolved ? 0.6 : 1
                      }}
                    >
                      <TableCell>
                        <Chip
                          icon={getSeverityIcon(alert.severity)}
                          label={alert.severity.toUpperCase()}
                          size="small"
                          color={getSeverityColor(alert.severity) as 'error' | 'warning' | 'info'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getCategoryIcon(alert.category)}
                          label={alert.category}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{alert.type}</Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" noWrap title={alert.message}>{alert.message}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{alert.resource}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{alert.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        {alert.resolved ? (
                          <Chip icon={<CheckCircle />} label="Resolved" size="small" color="success" />
                        ) : alert.acknowledged ? (
                          <Chip icon={<Done />} label="Ack'd" size="small" color="primary" variant="outlined" />
                        ) : (
                          <Chip label="New" size="small" color="error" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedAlert(alert);
                              setDetailDialogOpen(true);
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {!alert.acknowledged && (
                          <Tooltip title="Acknowledge">
                            <IconButton size="small" color="primary">
                              <Done fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {!alert.resolved && (
                          <Tooltip title="Mark Resolved">
                            <IconButton size="small" color="success">
                              <CheckCircle fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Alert History Tab */}
          <TabPanel value={tabValue} index={1}>
            <Alert severity="info" sx={{ mb: 2 }}>
              View historical alerts and analyze patterns. Use filters to narrow down results.
            </Alert>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField fullWidth label="From Date" type="date" InputLabelProps={{ shrink: true }} size="small" />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField fullWidth label="To Date" type="date" InputLabelProps={{ shrink: true }} size="small" />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <TextField fullWidth label="Search" placeholder="Search alerts..." size="small" />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Button variant="outlined" fullWidth>Export CSV</Button>
              </Grid>
            </Grid>

            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>Alert Statistics (Last 30 Days)</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="h4" color="primary.main">156</Typography>
                  <Typography variant="caption">Total Alerts</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="h4" color="success.main">4.2 hrs</Typography>
                  <Typography variant="caption">Avg. Resolution Time</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="h4" color="info.main">92%</Typography>
                  <Typography variant="caption">Acknowledged Rate</Typography>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Typography variant="h4" color="warning.main">8</Typography>
                  <Typography variant="caption">Recurring Issues</Typography>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {/* Notification Channels */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Email Notifications
                  </Typography>
                  <TextField
                    fullWidth
                    label="Primary Email"
                    defaultValue="admin@link3.net"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Secondary Email"
                    defaultValue="noc@link3.net"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable Email Notifications"
                  />
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Sms sx={{ verticalAlign: 'middle', mr: 1 }} />
                    SMS Notifications
                  </Typography>
                  <TextField
                    fullWidth
                    label="Primary Mobile"
                    defaultValue="+8801712345678"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Secondary Mobile"
                    defaultValue="+8801812345678"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable SMS for Critical Alerts"
                  />
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Webhook sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Webhook Integration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Webhook URL"
                    placeholder="https://your-server.com/webhook"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable Webhook Callbacks"
                  />
                </Paper>
              </Grid>

              {/* Alert Rules */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <FilterList sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Alert Rules
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Critical Alerts" secondary="Email + SMS immediately" />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Warning Alerts" secondary="Email within 5 minutes" />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Info Alerts" secondary="Daily digest email" />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Escalation" secondary="SMS if unacknowledged for 30 min" />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained">Save Preferences</Button>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Alert Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAlert && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={getSeverityIcon(selectedAlert.severity)}
                label={selectedAlert.severity.toUpperCase()}
                size="small"
                color={getSeverityColor(selectedAlert.severity) as 'error' | 'warning' | 'info'}
              />
              {selectedAlert.type}
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Box>
              <Alert severity={selectedAlert.severity === 'critical' || selectedAlert.severity === 'high' ? 'error' : selectedAlert.severity === 'warning' ? 'warning' : 'info'} sx={{ mb: 2 }}>
                {selectedAlert.message}
              </Alert>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Category</Typography>
                  <Typography variant="body1">{selectedAlert.category}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Affected Resource</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedAlert.resource}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Detected At</Typography>
                  <Typography variant="body1">{selectedAlert.timestamp}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Status</Typography>
                  <Typography variant="body1">
                    {selectedAlert.resolved ? 'Resolved' : selectedAlert.acknowledged ? 'Acknowledged' : 'New'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>Recommended Actions</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle fontSize="small" color="primary" /></ListItemIcon>
                  <ListItemText primary="Investigate the root cause" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle fontSize="small" color="primary" /></ListItemIcon>
                  <ListItemText primary="Apply mitigation measures" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle fontSize="small" color="primary" /></ListItemIcon>
                  <ListItemText primary="Document resolution steps" />
                </ListItem>
              </List>

              <TextField
                fullWidth
                label="Add Note"
                multiline
                rows={2}
                placeholder="Add a note about this alert..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          {selectedAlert && !selectedAlert.acknowledged && (
            <Button variant="outlined" startIcon={<Done />}>Acknowledge</Button>
          )}
          {selectedAlert && !selectedAlert.resolved && (
            <Button variant="contained" color="success" startIcon={<CheckCircle />}>Mark Resolved</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertsNotifications;
