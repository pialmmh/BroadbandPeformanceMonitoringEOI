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
  LinearProgress,
  Paper,
  Tooltip,
  Badge
} from '@mui/material';
import {
  CloudUpload,
  Refresh,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Help,
  Timeline,
  Router,
  Upload,
  Visibility,
  History,
  TrendingUp,
  Share
} from '@mui/icons-material';

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
const mockPrefixes = [
  { prefix: '103.15.240.0/22', origin: 'AS45925', status: 'valid', rpki: 'Valid', lastUpdate: '2024-12-28 10:30', path: '45925' },
  { prefix: '103.15.244.0/23', origin: 'AS45925', status: 'valid', rpki: 'Valid', lastUpdate: '2024-12-28 10:30', path: '45925' },
  { prefix: '103.15.246.0/24', origin: 'AS45925', status: 'valid', rpki: 'Valid', lastUpdate: '2024-12-28 10:30', path: '45925' },
  { prefix: '45.120.160.0/22', origin: 'AS45925', status: 'warning', rpki: 'Unknown', lastUpdate: '2024-12-28 09:15', path: '45925 13335' },
  { prefix: '103.48.16.0/22', origin: 'AS45925', status: 'valid', rpki: 'Valid', lastUpdate: '2024-12-28 10:28', path: '45925' },
];

const mockPeerings = [
  { asn: 'AS13335', name: 'Cloudflare', type: 'Transit', capacity: '10 Gbps', utilization: 45, status: 'active' },
  { asn: 'AS15169', name: 'Google', type: 'Peering', capacity: '10 Gbps', utilization: 62, status: 'active' },
  { asn: 'AS32934', name: 'Facebook', type: 'Peering', capacity: '10 Gbps', utilization: 38, status: 'active' },
  { asn: 'AS9498', name: 'BHARTI Airtel', type: 'Transit', capacity: '20 Gbps', utilization: 55, status: 'active' },
  { asn: 'AS4755', name: 'TATA Communications', type: 'Transit', capacity: '20 Gbps', utilization: 48, status: 'active' },
];

const mockPrefixAlerts = [
  { id: 1, type: 'hijack', prefix: '103.15.240.0/22', message: 'Possible hijack detected from AS64512', time: '2 hours ago', severity: 'critical' },
  { id: 2, type: 'leak', prefix: '45.120.160.0/22', message: 'Route leak via AS9498 to AS7018', time: '5 hours ago', severity: 'warning' },
  { id: 3, type: 'anomaly', prefix: '103.15.244.0/23', message: 'Unusual AS path length increase', time: '1 day ago', severity: 'info' },
];

const mockSubmissionHistory = [
  { id: 1, date: '2024-12-28', type: 'Full RIB', prefixes: 5, status: 'processed', size: '12 KB' },
  { id: 2, date: '2024-12-27', type: 'Full RIB', prefixes: 5, status: 'processed', size: '12 KB' },
  { id: 3, date: '2024-12-26', type: 'Full RIB', prefixes: 5, status: 'processed', size: '11 KB' },
  { id: 4, date: '2024-12-25', type: 'Incremental', prefixes: 2, status: 'processed', size: '3 KB' },
];

const BgpRouting: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewPathDialogOpen, setViewPathDialogOpen] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState<typeof mockPrefixes[0] | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getRpkiColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'success';
      case 'Invalid': return 'error';
      default: return 'warning';
    }
  };

  const getRpkiIcon = (status: string) => {
    switch (status) {
      case 'Valid': return <CheckCircle fontSize="small" />;
      case 'Invalid': return <ErrorIcon fontSize="small" />;
      default: return <Help fontSize="small" />;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            BGP Routing Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Submit routing tables, monitor prefixes, and manage peering information
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Refresh />} size="small">
            Refresh
          </Button>
          <Button variant="contained" startIcon={<CloudUpload />} onClick={() => setUploadDialogOpen(true)}>
            Upload Routes
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="caption" color="textSecondary">Announced Prefixes</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="caption" color="textSecondary">RPKI Valid</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>4</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="caption" color="textSecondary">Active Peerings</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'info.main' }}>5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="caption" color="textSecondary">Route Alerts</Typography>
              <Badge badgeContent={3} color="error">
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>3</Typography>
              </Badge>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Prefix Alerts */}
      {mockPrefixAlerts.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              <Warning sx={{ fontSize: 18, mr: 0.5, verticalAlign: 'middle', color: 'warning.main' }} />
              BGP Alerts
            </Typography>
            {mockPrefixAlerts.map((alert) => (
              <Alert
                key={alert.id}
                severity={alert.severity as 'error' | 'warning' | 'info'}
                sx={{ mb: 0.5, py: 0 }}
              >
                <Typography variant="body2">
                  <strong>{alert.prefix}</strong>: {alert.message}
                  <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                    ({alert.time})
                  </Typography>
                </Typography>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Card>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab icon={<Share />} iconPosition="start" label="Announced Prefixes" />
          <Tab icon={<Router />} iconPosition="start" label="Peering Info" />
          <Tab icon={<History />} iconPosition="start" label="Submission History" />
          <Tab icon={<Timeline />} iconPosition="start" label="Path Analysis" />
        </Tabs>

        <CardContent>
          {/* Announced Prefixes Tab */}
          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Prefix</TableCell>
                    <TableCell>Origin AS</TableCell>
                    <TableCell>RPKI Status</TableCell>
                    <TableCell>AS Path</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPrefixes.map((prefix, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                          {prefix.prefix}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={prefix.origin} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getRpkiIcon(prefix.rpki)}
                          label={prefix.rpki}
                          size="small"
                          color={getRpkiColor(prefix.rpki) as 'success' | 'error' | 'warning'}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {prefix.path}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{prefix.lastUpdate}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Path Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedPrefix(prefix);
                              setViewPathDialogOpen(true);
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Path History">
                          <IconButton size="small">
                            <TrendingUp fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Peering Info Tab */}
          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ASN</TableCell>
                    <TableCell>Provider Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Utilization</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPeerings.map((peer, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Chip label={peer.asn} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{peer.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={peer.type}
                          size="small"
                          color={peer.type === 'Transit' ? 'primary' : 'secondary'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{peer.capacity}</TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={peer.utilization}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            color={peer.utilization > 80 ? 'error' : peer.utilization > 60 ? 'warning' : 'success'}
                          />
                          <Typography variant="caption">{peer.utilization}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={peer.status} size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Submission History Tab */}
          <TabPanel value={tabValue} index={2}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Prefixes</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockSubmissionHistory.map((submission) => (
                    <TableRow key={submission.id} hover>
                      <TableCell>{submission.date}</TableCell>
                      <TableCell>
                        <Chip label={submission.type} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{submission.prefixes}</TableCell>
                      <TableCell>{submission.size}</TableCell>
                      <TableCell>
                        <Chip
                          icon={<CheckCircle fontSize="small" />}
                          label={submission.status}
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Path Analysis Tab */}
          <TabPanel value={tabValue} index={3}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>AS Path Visualization</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', my: 2 }}>
                <Chip label="Your Network" color="primary" />
                <Typography variant="body2">&rarr;</Typography>
                <Chip label="AS45925" variant="outlined" />
                <Typography variant="body2">&rarr;</Typography>
                <Chip label="AS9498 (BHARTI)" variant="outlined" />
                <Typography variant="body2">&rarr;</Typography>
                <Chip label="AS3356 (Level3)" variant="outlined" />
                <Typography variant="body2">&rarr;</Typography>
                <Chip label="Internet" color="success" />
              </Box>
              <Typography variant="caption" color="textSecondary">
                Average path length: 3.2 hops | Preferred path via AS9498
              </Typography>
            </Paper>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Path Statistics</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary.main">3.2</Typography>
                    <Typography variant="caption">Avg Path Length</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">2</Typography>
                    <Typography variant="caption">Backup Paths</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5" color="info.main">0</Typography>
                    <Typography variant="caption">Path Changes (24h)</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                    <Typography variant="h5" color="warning.main">1</Typography>
                    <Typography variant="caption">Flapping Routes</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload BGP Route Table</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Upload your BGP routing table for BTRC monitoring. Supported formats: MRT, CSV, JSON, or plain text.
          </Alert>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.light',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              bgcolor: 'grey.50',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Upload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="body1">Drag & drop file here or click to browse</Typography>
            <Typography variant="caption" color="textSecondary">
              Maximum file size: 50MB
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Description (optional)"
            placeholder="e.g., Full RIB dump, December 2024"
            sx={{ mt: 2 }}
            size="small"
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="textSecondary">
              <strong>Auto-upload enabled:</strong> Routes are automatically submitted daily via API.
              Last auto-upload: 2024-12-28 06:00 AM
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<CloudUpload />}>Upload</Button>
        </DialogActions>
      </Dialog>

      {/* View Path Dialog */}
      <Dialog open={viewPathDialogOpen} onClose={() => setViewPathDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Prefix Details: {selectedPrefix?.prefix}</DialogTitle>
        <DialogContent>
          {selectedPrefix && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Origin AS</Typography>
                  <Typography variant="body1">{selectedPrefix.origin}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">RPKI Status</Typography>
                  <Box>
                    <Chip
                      icon={getRpkiIcon(selectedPrefix.rpki)}
                      label={selectedPrefix.rpki}
                      size="small"
                      color={getRpkiColor(selectedPrefix.rpki) as 'success' | 'error' | 'warning'}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">Last Update</Typography>
                  <Typography variant="body1">{selectedPrefix.lastUpdate}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="textSecondary">AS Path</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedPrefix.path}</Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" gutterBottom>Path Visualization</Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Origin" size="small" color="primary" />
                  <Typography>&rarr;</Typography>
                  {selectedPrefix.path.split(' ').map((as, idx) => (
                    <React.Fragment key={idx}>
                      <Chip label={`AS${as}`} size="small" variant="outlined" />
                      {idx < selectedPrefix.path.split(' ').length - 1 && <Typography>&rarr;</Typography>}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPathDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BgpRouting;
