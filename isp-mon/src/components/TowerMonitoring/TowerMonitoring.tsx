import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tabs,
  Tab

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search,
  Refresh,
  LocationOn,
  Power,
  ThermostatAuto,
  Air,
  Water,
  Warning,
  CheckCircle,
  Error,
  SignalCellular4Bar,
  Battery80,
  LocalGasStation
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { Tower } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const TowerMonitoring: React.FC = () => {
  const { filteredTowers: towers, refreshData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const filteredTowers = towers.filter(tower =>
    tower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tower.location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: Tower['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'warning':
        return <Warning sx={{ color: '#ff9800' }} />;
      case 'critical':
        return <Error sx={{ color: '#f44336' }} />;
      default:
        return <Error sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getPowerIcon = (power: Tower['health']['power']) => {
    switch (power) {
      case 'normal':
        return <Power sx={{ color: '#4caf50' }} />;
      case 'battery':
        return <Battery80 sx={{ color: '#ff9800' }} />;
      case 'generator':
        return <LocalGasStation sx={{ color: '#2196f3' }} />;
      default:
        return <Power sx={{ color: '#9e9e9e' }} />;
    }
  };

  const handleTowerClick = (tower: Tower) => {
    setSelectedTower(tower);
  };

  const handleCloseDialog = () => {
    setSelectedTower(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Tower Infrastructure Monitoring
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            placeholder="Search towers..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={refreshData}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Grid View" />
              <Tab label="Table View" />
              <Tab label="Map View" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                {filteredTowers.map((tower) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tower.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                      }}
                      onClick={() => handleTowerClick(tower)}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {tower.name}
                          </Typography>
                          {getStatusIcon(tower.status)}
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={0.5} sx={{ mb: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2" color="textSecondary">
                            {tower.location.address}
                          </Typography>
                        </Box>

                        <Grid container spacing={1} sx={{ mt: 2 }}>
                          <Grid size={{ xs: 6 }}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {getPowerIcon(tower.health.power)}
                              <Typography variant="body2">
                                {tower.health.power}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <SignalCellular4Bar sx={{ fontSize: 20 }} />
                              <Typography variant="body2">
                                {tower.connectivity.toFixed(0)}%
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="textSecondary">
                            Structural Health
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={tower.health.structural}
                            sx={{ height: 6, borderRadius: 3 }}
                            color={tower.health.structural > 90 ? 'success' : tower.health.structural > 75 ? 'warning' : 'error'}
                          />
                        </Box>

                        {tower.alerts.length > 0 && (
                          <Chip
                            label={`${tower.alerts.length} Alerts`}
                            size="small"
                            color="warning"
                            sx={{ mt: 2 }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tower Name</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Power</TableCell>
                      <TableCell>Connectivity</TableCell>
                      <TableCell>Structural Health</TableCell>
                      <TableCell>Temperature</TableCell>
                      <TableCell>Alerts</TableCell>
                      <TableCell>Last Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTowers.map((tower) => (
                      <TableRow
                        key={tower.id}
                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                        onClick={() => handleTowerClick(tower)}
                      >
                        <TableCell>{tower.name}</TableCell>
                        <TableCell>{tower.location.address}</TableCell>
                        <TableCell>
                          <Chip
                            label={tower.status}
                            size="small"
                            color={
                              tower.status === 'operational' ? 'success' :
                              tower.status === 'warning' ? 'warning' :
                              tower.status === 'critical' ? 'error' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{tower.health.power}</TableCell>
                        <TableCell>{tower.connectivity.toFixed(1)}%</TableCell>
                        <TableCell>{tower.health.structural.toFixed(1)}%</TableCell>
                        <TableCell>{tower.health.environmental.temperature.toFixed(1)}°C</TableCell>
                        <TableCell>
                          {tower.alerts.length > 0 ? (
                            <Chip label={tower.alerts.length} size="small" color="warning" />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(tower.lastUpdate).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Paper sx={{ p: 3, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" color="textSecondary">
                  Map View - Integration with mapping service required
                </Typography>
              </Paper>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={!!selectedTower} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedTower && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{selectedTower.name} - Detailed View</Typography>
                <Chip
                  label={selectedTower.status}
                  color={
                    selectedTower.status === 'operational' ? 'success' :
                    selectedTower.status === 'warning' ? 'warning' :
                    selectedTower.status === 'critical' ? 'error' : 'default'
                  }
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Location Information
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
                      <LocationOn />
                      <Typography>{selectedTower.location.address}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Lat: {selectedTower.location.lat.toFixed(4)}, Lng: {selectedTower.location.lng.toFixed(4)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Power Status
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      {getPowerIcon(selectedTower.health.power)}
                      <Typography>{selectedTower.health.power.toUpperCase()}</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Environmental Conditions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 4 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <ThermostatAuto />
                          <Box>
                            <Typography variant="body2" color="textSecondary">Temperature</Typography>
                            <Typography>{selectedTower.health.environmental.temperature.toFixed(1)}°C</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Water />
                          <Box>
                            <Typography variant="body2" color="textSecondary">Humidity</Typography>
                            <Typography>{selectedTower.health.environmental.humidity.toFixed(1)}%</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Air />
                          <Box>
                            <Typography variant="body2" color="textSecondary">Wind Speed</Typography>
                            <Typography>{selectedTower.health.environmental.windSpeed.toFixed(1)} km/h</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Active Alerts ({selectedTower.alerts.length})
                    </Typography>
                    {selectedTower.alerts.length > 0 ? (
                      <Box>
                        {selectedTower.alerts.map((alert) => (
                          <Box key={alert.id} sx={{ mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2">{alert.message}</Typography>
                              <Chip
                                label={alert.severity}
                                size="small"
                                color={
                                  alert.severity === 'critical' ? 'error' :
                                  alert.severity === 'warning' ? 'warning' : 'info'
                                }
                              />
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(alert.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">No active alerts</Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TowerMonitoring;