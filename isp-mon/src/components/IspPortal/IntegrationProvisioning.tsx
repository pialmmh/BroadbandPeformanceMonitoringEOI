import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  Divider,
  Tooltip,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Router,
  Add,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  ContentCopy,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Settings,
  Speed,
  Refresh,
  Help
} from '@mui/icons-material';

interface Device {
  id: string;
  name: string;
  type: 'router' | 'switch';
  ipAddress: string;
  location: string;
  snmpStatus: 'configured' | 'pending' | 'error';
  netflowStatus: 'configured' | 'pending' | 'error';
  lastSeen: string;
}

const mockDevices: Device[] = [
  { id: 'R-DHK-001', name: 'Core Router Dhaka', type: 'router', ipAddress: '10.0.1.1', location: 'Dhaka DC', snmpStatus: 'configured', netflowStatus: 'configured', lastSeen: '2024-12-27 10:30:00' },
  { id: 'R-DHK-002', name: 'Edge Router Dhaka-1', type: 'router', ipAddress: '10.0.1.2', location: 'Dhaka POP-1', snmpStatus: 'configured', netflowStatus: 'configured', lastSeen: '2024-12-27 10:28:00' },
  { id: 'R-CTG-001', name: 'Core Router Chittagong', type: 'router', ipAddress: '10.0.2.1', location: 'CTG DC', snmpStatus: 'configured', netflowStatus: 'pending', lastSeen: '2024-12-27 10:25:00' },
  { id: 'S-DHK-001', name: 'Distribution Switch', type: 'switch', ipAddress: '10.0.1.10', location: 'Dhaka DC', snmpStatus: 'configured', netflowStatus: 'error', lastSeen: '2024-12-27 10:20:00' },
  { id: 'R-SYL-001', name: 'Edge Router Sylhet', type: 'router', ipAddress: '10.0.3.1', location: 'Sylhet POP', snmpStatus: 'pending', netflowStatus: 'pending', lastSeen: 'Never' },
];

const IntegrationProvisioning: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [configType, setConfigType] = useState<'snmp' | 'netflow'>('snmp');
  const [showSecrets, setShowSecrets] = useState(false);

  // BTRC Server Info (read-only)
  const btrcServerInfo = {
    snmp: {
      collectorIp: '103.15.245.10',
      collectorPort: '161',
      securityToken: 'BTRC-SNMPv3-2024-ABCD1234',
      authProtocol: 'SHA-256',
      privProtocol: 'AES-256'
    },
    netflow: {
      collectorIp: '103.15.245.11',
      collectorPort: '2055',
      securityToken: 'BTRC-NFLOW-2024-EFGH5678',
      version: 'v9/IPFIX',
      templateId: 'BTRC-TEMPLATE-001'
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleConfigureDevice = (device: Device, type: 'snmp' | 'netflow') => {
    setSelectedDevice(device);
    setConfigType(type);
    setConfigDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured': return <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />;
      case 'pending': return <Warning sx={{ color: 'warning.main', fontSize: 18 }} />;
      case 'error': return <ErrorIcon sx={{ color: 'error.main', fontSize: 18 }} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'configured': return 'success';
      case 'pending': return 'warning';
      case 'error': return 'error';
      default: return 'warning';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Integration Provisioning
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Configure network equipment for BTRC monitoring
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setAddDialogOpen(true)}>
          Add Device
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Router sx={{ color: 'primary.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Total Devices</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>{mockDevices.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle sx={{ color: 'success.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">SNMP Active</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockDevices.filter(d => d.snmpStatus === 'configured').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Speed sx={{ color: 'info.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Netflow Active</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockDevices.filter(d => d.netflowStatus === 'configured').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Warning sx={{ color: 'warning.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Pending Config</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockDevices.filter(d => d.snmpStatus === 'pending' || d.netflowStatus === 'pending').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* BTRC Server Info */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Settings sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                BTRC Collector Server Information
              </Typography>
              <Tooltip title="Use these settings to configure your devices">
                <Help sx={{ fontSize: 18, color: 'action.active', cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="SNMP Configuration" />
              <Tab label="Netflow Configuration" />
            </Tabs>

            {activeTab === 0 && (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="SNMP Collector IP"
                    value={btrcServerInfo.snmp.collectorIp}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => copyToClipboard(btrcServerInfo.snmp.collectorIp)}>
                            <ContentCopy sx={{ fontSize: 18 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="SNMP Port"
                    value={btrcServerInfo.snmp.collectorPort}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Security Token"
                    type={showSecrets ? 'text' : 'password'}
                    value={btrcServerInfo.snmp.securityToken}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowSecrets(!showSecrets)}>
                            {showSecrets ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                          </IconButton>
                          <IconButton size="small" onClick={() => copyToClipboard(btrcServerInfo.snmp.securityToken)}>
                            <ContentCopy sx={{ fontSize: 18 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField fullWidth size="small" label="Auth Protocol" value={btrcServerInfo.snmp.authProtocol} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField fullWidth size="small" label="Privacy Protocol" value={btrcServerInfo.snmp.privProtocol} InputProps={{ readOnly: true }} />
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Netflow Collector IP"
                    value={btrcServerInfo.netflow.collectorIp}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => copyToClipboard(btrcServerInfo.netflow.collectorIp)}>
                            <ContentCopy sx={{ fontSize: 18 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="Netflow Port" value={btrcServerInfo.netflow.collectorPort} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Security Token"
                    type={showSecrets ? 'text' : 'password'}
                    value={btrcServerInfo.netflow.securityToken}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowSecrets(!showSecrets)}>
                            {showSecrets ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                          </IconButton>
                          <IconButton size="small" onClick={() => copyToClipboard(btrcServerInfo.netflow.securityToken)}>
                            <ContentCopy sx={{ fontSize: 18 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField fullWidth size="small" label="Version" value={btrcServerInfo.netflow.version} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField fullWidth size="small" label="Template ID" value={btrcServerInfo.netflow.templateId} InputProps={{ readOnly: true }} />
                </Grid>
              </Grid>
            )}

            <Alert severity="info" sx={{ mt: 2 }}>
              Configure your network devices to send data to the above collector addresses. Once configured, data will automatically flow to BTRC servers.
            </Alert>
          </Paper>
        </Grid>

        {/* Device Table */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Provisioned Devices
              </Typography>
              <Button size="small" startIcon={<Refresh />}>Refresh Status</Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Device ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell align="center">SNMP Status</TableCell>
                    <TableCell align="center">Netflow Status</TableCell>
                    <TableCell>Last Seen</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockDevices.map((device) => (
                    <TableRow key={device.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                          {device.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={device.type}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem', textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {device.ipAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          {getStatusIcon(device.snmpStatus)}
                          <Chip
                            label={device.snmpStatus}
                            size="small"
                            color={getStatusColor(device.snmpStatus)}
                            sx={{ height: 18, fontSize: '0.6rem' }}
                            onClick={() => handleConfigureDevice(device, 'snmp')}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          {getStatusIcon(device.netflowStatus)}
                          <Chip
                            label={device.netflowStatus}
                            size="small"
                            color={getStatusColor(device.netflowStatus)}
                            sx={{ height: 18, fontSize: '0.6rem' }}
                            onClick={() => handleConfigureDevice(device, 'netflow')}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{device.lastSeen}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" title="Edit">
                          <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" title="Delete">
                          <Delete sx={{ fontSize: 18 }} />
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

      {/* Add Device Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Device</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth size="small" label="Device ID" placeholder="R-DHK-003" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth size="small" label="Device Name" placeholder="Edge Router Dhaka-2" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Device Type</InputLabel>
                  <Select label="Device Type" defaultValue="router">
                    <MenuItem value="router">Router</MenuItem>
                    <MenuItem value="switch">Switch</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth size="small" label="IP Address" placeholder="10.0.1.x" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth size="small" label="Location" placeholder="Dhaka POP-2" />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>Add Device</Button>
        </DialogActions>
      </Dialog>

      {/* Configuration Dialog */}
      <Dialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Configure {configType.toUpperCase()} - {selectedDevice?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Enter the {configType.toUpperCase()} configuration details for this device. Use the BTRC collector information shown above.
            </Alert>
            <Grid container spacing={2}>
              {configType === 'snmp' ? (
                <>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth size="small" label="SNMP Community String" placeholder="Enter community string" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" label="SNMP Version" defaultValue="v3" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" label="Polling Interval (sec)" defaultValue="60" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth size="small" label="Auth Password" type="password" />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" label="Source Interface" placeholder="GigabitEthernet0/0" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth size="small" label="Export Interval (sec)" defaultValue="60" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth size="small" label="Active Timeout (min)" defaultValue="1" />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth size="small" label="Inactive Timeout (sec)" defaultValue="15" />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={() => setConfigDialogOpen(false)}>
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationProvisioning;
