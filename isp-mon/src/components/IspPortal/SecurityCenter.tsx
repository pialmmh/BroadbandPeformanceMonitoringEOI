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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import {
  Security,
  Warning,
  Error as ErrorIcon,
  CheckCircle,
  Add,
  Visibility,
  Block,
  Shield,
  BugReport,
  Public,
  Router,
  Timeline,
  TrendingUp,
  Flag,
  Refresh
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

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
const mockDdosAttacks = [
  {
    id: 1,
    type: 'UDP Flood',
    target: '103.15.240.10',
    peakBandwidth: '45 Gbps',
    startTime: '2024-12-28 08:15',
    endTime: '2024-12-28 09:45',
    status: 'mitigated',
    sources: 12500,
    topCountries: ['CN', 'RU', 'BR']
  },
  {
    id: 2,
    type: 'SYN Flood',
    target: '103.15.241.0/24',
    peakBandwidth: '12 Gbps',
    startTime: '2024-12-27 14:30',
    endTime: '2024-12-27 15:15',
    status: 'mitigated',
    sources: 8200,
    topCountries: ['US', 'DE', 'NL']
  },
  {
    id: 3,
    type: 'DNS Amplification',
    target: '103.15.244.5',
    peakBandwidth: '85 Gbps',
    startTime: '2024-12-28 11:00',
    endTime: null,
    status: 'active',
    sources: 25000,
    topCountries: ['CN', 'VN', 'TH']
  },
];

const mockBgpThreats = [
  {
    id: 1,
    type: 'Route Hijack',
    prefix: '103.15.240.0/22',
    originAs: 'AS45925',
    hijackerAs: 'AS64512',
    detectedTime: '2024-12-28 10:30',
    status: 'investigating',
    severity: 'critical'
  },
  {
    id: 2,
    type: 'Route Leak',
    prefix: '45.120.160.0/22',
    originAs: 'AS45925',
    leakingAs: 'AS9498',
    detectedTime: '2024-12-27 22:15',
    status: 'resolved',
    severity: 'warning'
  },
];

const mockBlocklistRequests = [
  { id: 1, type: 'IP Range', target: '185.220.100.0/24', reason: 'Tor Exit Nodes', status: 'approved', submittedDate: '2024-12-25' },
  { id: 2, type: 'ASN', target: 'AS64496', reason: 'Known Botnet C2', status: 'pending', submittedDate: '2024-12-27' },
  { id: 3, type: 'Country', target: 'North Korea (KP)', reason: 'State-sponsored attacks', status: 'approved', submittedDate: '2024-12-20' },
];

const mockMaliciousIps = [
  { ip: '185.220.101.45', type: 'Botnet C2', confidence: 'High', reports: 15, lastSeen: '2024-12-28 10:00' },
  { ip: '91.134.248.12', type: 'Scanner', confidence: 'Medium', reports: 8, lastSeen: '2024-12-28 09:30' },
  { ip: '45.155.205.233', type: 'Brute Force', confidence: 'High', reports: 22, lastSeen: '2024-12-28 11:15' },
  { ip: '194.26.192.77', type: 'Spam', confidence: 'Medium', reports: 12, lastSeen: '2024-12-27 18:00' },
];

const attackTrendData = [
  { time: '00:00', attacks: 2, bandwidth: 5 },
  { time: '04:00', attacks: 1, bandwidth: 2 },
  { time: '08:00', attacks: 5, bandwidth: 45 },
  { time: '12:00', attacks: 3, bandwidth: 20 },
  { time: '16:00', attacks: 4, bandwidth: 30 },
  { time: '20:00', attacks: 2, bandwidth: 15 },
];

const attackTypeData = [
  { name: 'UDP Flood', value: 35, color: '#E74C3C' },
  { name: 'SYN Flood', value: 25, color: '#F39C12' },
  { name: 'DNS Amp', value: 20, color: '#3498DB' },
  { name: 'HTTP Flood', value: 12, color: '#9B59B6' },
  { name: 'Other', value: 8, color: '#95A5A6' },
];

const SecurityCenter: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportType, setReportType] = useState('ddos');
  const [blocklistDialogOpen, setBlocklistDialogOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'error';
      case 'mitigated': return 'success';
      case 'investigating': return 'warning';
      case 'resolved': return 'success';
      case 'pending': return 'warning';
      case 'approved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            <Security sx={{ verticalAlign: 'middle', mr: 1 }} />
            Security & Threat Center
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Report attacks, manage threats, and monitor security events
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Refresh />} size="small">
            Refresh
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<BugReport />}
            onClick={() => setReportDialogOpen(true)}
          >
            Report Threat
          </Button>
        </Box>
      </Box>

      {/* Active Threat Alert */}
      {mockDdosAttacks.some(a => a.status === 'active') && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small">View Details</Button>
          }
        >
          <Typography variant="subtitle2">ACTIVE DDOS ATTACK DETECTED</Typography>
          <Typography variant="body2">
            DNS Amplification attack on 103.15.244.5 - Peak: 85 Gbps - 25,000 sources
          </Typography>
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Badge badgeContent={1} color="warning">
                <ErrorIcon sx={{ fontSize: 28 }} />
              </Badge>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>1</Typography>
              <Typography variant="caption">Active Attacks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>3</Typography>
              <Typography variant="caption">Attacks (24h)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'info.main' }}>2</Typography>
              <Typography variant="caption">BGP Threats</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>15</Typography>
              <Typography variant="caption">Blocked IPs</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>85</Typography>
              <Typography variant="caption">Peak Gbps</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Attack Trend (24 Hours)</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={attackTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="bandwidth" stroke="#E74C3C" fill="#E74C3C" fillOpacity={0.3} name="Bandwidth (Gbps)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Attack Types</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={attackTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {attackTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab icon={<BugReport />} iconPosition="start" label="DDoS Attacks" />
          <Tab icon={<Router />} iconPosition="start" label="BGP Threats" />
          <Tab icon={<Block />} iconPosition="start" label="Blocklist" />
          <Tab icon={<Flag />} iconPosition="start" label="Malicious IPs" />
        </Tabs>

        <CardContent>
          {/* DDoS Attacks Tab */}
          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Peak</TableCell>
                    <TableCell>Sources</TableCell>
                    <TableCell>Top Countries</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockDdosAttacks.map((attack) => (
                    <TableRow key={attack.id} hover sx={{ bgcolor: attack.status === 'active' ? 'error.light' : 'inherit' }}>
                      <TableCell>
                        <Chip
                          label={attack.status.toUpperCase()}
                          size="small"
                          color={getStatusColor(attack.status) as 'error' | 'success' | 'warning'}
                          icon={attack.status === 'active' ? <ErrorIcon /> : <CheckCircle />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{attack.type}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{attack.target}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>{attack.peakBandwidth}</Typography>
                      </TableCell>
                      <TableCell>{attack.sources.toLocaleString()}</TableCell>
                      <TableCell>
                        {attack.topCountries.map(c => (
                          <Chip key={c} label={c} size="small" sx={{ mr: 0.5 }} />
                        ))}
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{attack.startTime}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="View Timeline">
                          <IconButton size="small"><Timeline fontSize="small" /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* BGP Threats Tab */}
          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Prefix</TableCell>
                    <TableCell>Origin AS</TableCell>
                    <TableCell>Threat AS</TableCell>
                    <TableCell>Detected</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBgpThreats.map((threat) => (
                    <TableRow key={threat.id} hover>
                      <TableCell>
                        <Chip
                          label={threat.severity.toUpperCase()}
                          size="small"
                          color={threat.severity === 'critical' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{threat.type}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{threat.prefix}</Typography>
                      </TableCell>
                      <TableCell><Chip label={threat.originAs} size="small" variant="outlined" /></TableCell>
                      <TableCell>
                        <Chip
                          label={threat.hijackerAs || threat.leakingAs}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{threat.detectedTime}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={threat.status} size="small" color={getStatusColor(threat.status) as 'success' | 'warning'} />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Blocklist Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="outlined" startIcon={<Add />} onClick={() => setBlocklistDialogOpen(true)}>
                Request Block
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Submitted</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBlocklistRequests.map((req) => (
                    <TableRow key={req.id} hover>
                      <TableCell>
                        <Chip
                          icon={req.type === 'Country' ? <Public /> : req.type === 'ASN' ? <Router /> : <Block />}
                          label={req.type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{req.target}</Typography>
                      </TableCell>
                      <TableCell>{req.reason}</TableCell>
                      <TableCell>{req.submittedDate}</TableCell>
                      <TableCell>
                        <Chip label={req.status} size="small" color={getStatusColor(req.status) as 'success' | 'warning'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Malicious IPs Tab */}
          <TabPanel value={tabValue} index={3}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Report malicious IP addresses you've detected. BTRC will investigate and add confirmed threats to the national blocklist.
            </Alert>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Threat Type</TableCell>
                    <TableCell>Confidence</TableCell>
                    <TableCell>Reports</TableCell>
                    <TableCell>Last Seen</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockMaliciousIps.map((ip, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{ip.ip}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={ip.type} size="small" color="error" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ip.confidence}
                          size="small"
                          color={ip.confidence === 'High' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{ip.reports}</TableCell>
                      <TableCell>
                        <Typography variant="caption">{ip.lastSeen}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Report Again">
                          <IconButton size="small"><Flag fontSize="small" /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Report Threat Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <BugReport sx={{ verticalAlign: 'middle', mr: 1 }} />
          Report Security Threat
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
            <InputLabel>Threat Type</InputLabel>
            <Select value={reportType} onChange={(e) => setReportType(e.target.value)} label="Threat Type">
              <MenuItem value="ddos">DDoS Attack</MenuItem>
              <MenuItem value="bgp_hijack">BGP Route Hijack</MenuItem>
              <MenuItem value="bgp_leak">BGP Route Leak</MenuItem>
              <MenuItem value="malicious_ip">Malicious IP/Subnet</MenuItem>
            </Select>
          </FormControl>

          {reportType === 'ddos' && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Attack Type</InputLabel>
                <Select label="Attack Type" defaultValue="">
                  <MenuItem value="udp_flood">UDP Flood</MenuItem>
                  <MenuItem value="syn_flood">SYN Flood</MenuItem>
                  <MenuItem value="dns_amp">DNS Amplification</MenuItem>
                  <MenuItem value="ntp_amp">NTP Amplification</MenuItem>
                  <MenuItem value="http_flood">HTTP Flood</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Target IP/Subnet" placeholder="e.g., 103.15.240.10" sx={{ mb: 2 }} size="small" />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <TextField fullWidth label="Peak Bandwidth (Gbps)" type="number" size="small" />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField fullWidth label="Estimated Sources" type="number" size="small" />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <TextField fullWidth label="Start Time" type="datetime-local" InputLabelProps={{ shrink: true }} size="small" />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField fullWidth label="End Time (if ended)" type="datetime-local" InputLabelProps={{ shrink: true }} size="small" />
                </Grid>
              </Grid>
            </>
          )}

          {reportType === 'malicious_ip' && (
            <>
              <TextField fullWidth label="IP Address or Subnet" placeholder="e.g., 185.220.100.0/24" sx={{ mb: 2 }} size="small" />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Threat Category</InputLabel>
                <Select label="Threat Category" defaultValue="">
                  <MenuItem value="botnet">Botnet C2</MenuItem>
                  <MenuItem value="scanner">Scanner/Probe</MenuItem>
                  <MenuItem value="brute_force">Brute Force</MenuItem>
                  <MenuItem value="spam">Spam Source</MenuItem>
                  <MenuItem value="tor_exit">Tor Exit Node</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Confidence Level</InputLabel>
                <Select label="Confidence Level" defaultValue="">
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          <TextField
            fullWidth
            label="Description / Evidence"
            multiline
            rows={3}
            placeholder="Provide details about the threat, including any evidence..."
            sx={{ mb: 2 }}
          />

          <Paper sx={{ p: 2, bgcolor: 'grey.50', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Attach supporting files (pcap, logs, screenshots)
            </Typography>
            <Button variant="outlined" size="small" sx={{ mt: 1 }}>Choose Files</Button>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error">Submit Report</Button>
        </DialogActions>
      </Dialog>

      {/* Blocklist Request Dialog */}
      <Dialog open={blocklistDialogOpen} onClose={() => setBlocklistDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Block sx={{ verticalAlign: 'middle', mr: 1 }} />
          Request Block
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mt: 1, mb: 2 }}>
            Block requests require BTRC approval. Provide justification and evidence.
          </Alert>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Block Type</InputLabel>
            <Select label="Block Type" defaultValue="">
              <MenuItem value="ip">IP Address/Range</MenuItem>
              <MenuItem value="asn">Autonomous System (ASN)</MenuItem>
              <MenuItem value="country">Country</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Target" placeholder="e.g., 185.220.100.0/24 or AS64496" sx={{ mb: 2 }} size="small" />
          <TextField
            fullWidth
            label="Justification"
            multiline
            rows={3}
            placeholder="Explain why this should be blocked..."
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Duration</InputLabel>
            <Select label="Duration" defaultValue="">
              <MenuItem value="24h">24 Hours</MenuItem>
              <MenuItem value="7d">7 Days</MenuItem>
              <MenuItem value="30d">30 Days</MenuItem>
              <MenuItem value="permanent">Permanent</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlocklistDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Submit Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SecurityCenter;
