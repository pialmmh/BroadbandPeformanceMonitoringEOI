import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Save,
  Notifications,
  Security,
  Refresh,
  Language,
  Palette,
  AccessTime,
  Email,
  Phone,
  Delete,
  Add,
  Edit
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
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [saved, setSaved] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'Infrastructure Monitoring System',
    refreshInterval: 30,
    language: 'en',
    timezone: 'Asia/Dhaka',
    theme: 'light'
  });

  const [alertSettings, setAlertSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    criticalOnly: false,
    alertSound: true,
    alertFrequency: 5
  });

  const [thresholds, setThresholds] = useState({
    towerHealth: 75,
    networkLoad: 80,
    latency: 50,
    packetLoss: 2,
    bandwidthUtilization: 85
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Operations Manager', email: 'ops@telco.com', phone: '+8801234567890', role: 'primary' },
    { id: 2, name: 'Network Engineer', email: 'network@telco.com', phone: '+8801234567891', role: 'secondary' }
  ]);

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        System Settings
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings have been saved successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="General" />
          <Tab label="Alerts & Notifications" />
          <Tab label="Thresholds" />
          <Tab label="Emergency Contacts" />
          <Tab label="Integration" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="System Name"
                value={generalSettings.systemName}
                onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={generalSettings.language}
                  label="Language"
                  onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="bn">Bengali</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={generalSettings.timezone}
                  label="Timezone"
                  onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                >
                  <MenuItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={generalSettings.theme}
                  label="Theme"
                  onChange={(e) => setGeneralSettings({ ...generalSettings, theme: e.target.value })}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom>
                Data Refresh Interval: {generalSettings.refreshInterval} seconds
              </Typography>
              <Slider
                value={generalSettings.refreshInterval}
                onChange={(e, value) => setGeneralSettings({ ...generalSettings, refreshInterval: value as number })}
                min={10}
                max={300}
                step={10}
                marks={[
                  { value: 10, label: '10s' },
                  { value: 60, label: '1m' },
                  { value: 120, label: '2m' },
                  { value: 300, label: '5m' }
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                Notification Channels
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={alertSettings.emailNotifications}
                    onChange={(e) => setAlertSettings({ ...alertSettings, emailNotifications: e.target.checked })}
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={alertSettings.smsNotifications}
                    onChange={(e) => setAlertSettings({ ...alertSettings, smsNotifications: e.target.checked })}
                  />
                }
                label="SMS Notifications"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={alertSettings.pushNotifications}
                    onChange={(e) => setAlertSettings({ ...alertSettings, pushNotifications: e.target.checked })}
                  />
                }
                label="Push Notifications"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={alertSettings.alertSound}
                    onChange={(e) => setAlertSettings({ ...alertSettings, alertSound: e.target.checked })}
                  />
                }
                label="Alert Sound"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                Alert Preferences
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={alertSettings.criticalOnly}
                    onChange={(e) => setAlertSettings({ ...alertSettings, criticalOnly: e.target.checked })}
                  />
                }
                label="Critical Alerts Only"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom>
                Alert Frequency: Every {alertSettings.alertFrequency} minutes
              </Typography>
              <Slider
                value={alertSettings.alertFrequency}
                onChange={(e, value) => setAlertSettings({ ...alertSettings, alertFrequency: value as number })}
                min={1}
                max={60}
                step={1}
                marks={[
                  { value: 1, label: '1m' },
                  { value: 15, label: '15m' },
                  { value: 30, label: '30m' },
                  { value: 60, label: '1h' }
                ]}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                System Thresholds
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Set warning thresholds for various system metrics
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom>
                Tower Health Warning: {thresholds.towerHealth}%
              </Typography>
              <Slider
                value={thresholds.towerHealth}
                onChange={(e, value) => setThresholds({ ...thresholds, towerHealth: value as number })}
                min={50}
                max={100}
                step={5}
                marks
                valueLabelDisplay="auto"
                color="warning"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom>
                Network Load Warning: {thresholds.networkLoad}%
              </Typography>
              <Slider
                value={thresholds.networkLoad}
                onChange={(e, value) => setThresholds({ ...thresholds, networkLoad: value as number })}
                min={50}
                max={100}
                step={5}
                marks
                valueLabelDisplay="auto"
                color="warning"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom>
                Latency Warning: {thresholds.latency}ms
              </Typography>
              <Slider
                value={thresholds.latency}
                onChange={(e, value) => setThresholds({ ...thresholds, latency: value as number })}
                min={10}
                max={200}
                step={10}
                marks
                valueLabelDisplay="auto"
                color="warning"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography gutterBottom>
                Packet Loss Warning: {thresholds.packetLoss}%
              </Typography>
              <Slider
                value={thresholds.packetLoss}
                onChange={(e, value) => setThresholds({ ...thresholds, packetLoss: value as number })}
                min={0.5}
                max={10}
                step={0.5}
                marks
                valueLabelDisplay="auto"
                color="warning"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom>
                Bandwidth Utilization Warning: {thresholds.bandwidthUtilization}%
              </Typography>
              <Slider
                value={thresholds.bandwidthUtilization}
                onChange={(e, value) => setThresholds({ ...thresholds, bandwidthUtilization: value as number })}
                min={50}
                max={100}
                step={5}
                marks
                valueLabelDisplay="auto"
                color="warning"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Emergency Contacts
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  size="small"
                >
                  Add Contact
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <List>
                {contacts.map((contact) => (
                  <Paper key={contact.id} sx={{ mb: 2 }}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="edit">
                            <Edit />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <Delete />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={contact.name}
                        secondary={
                          <Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Email sx={{ fontSize: 16 }} />
                              <Typography variant="body2">{contact.email}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Phone sx={{ fontSize: 16 }} />
                              <Typography variant="body2">{contact.phone}</Typography>
                            </Box>
                            <Chip label={contact.role} size="small" sx={{ mt: 1 }} />
                          </Box>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                API Configuration
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="NOC/SOC API Endpoint"
                defaultValue="https://api.noc.telco.com/v1"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="API Key"
                type="password"
                defaultValue="••••••••••••••••"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Weather Service API"
                defaultValue="https://api.weather.gov.bd/v2"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Disaster Management API"
                defaultValue="https://api.disaster.gov.bd"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                Database Configuration
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Database Host"
                defaultValue="db.telco.local"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Database Port"
                defaultValue="5432"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;