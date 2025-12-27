import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Warning,
  LocalFireDepartment,
  Flood,
  Air,
  Terrain,
  Groups,
  DirectionsCar,
  Build,
  Phone,
  LocationOn,
  AccessTime,
  Assignment,
  CheckCircle,
  Schedule,
  NavigateNext
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { DisasterEvent, ResponseTeam } from '../../types';

const DisasterResponse: React.FC = () => {
  const { filteredDisasterEvents: disasterEvents, filteredResponseTeams: responseTeams, filteredTowers: towers, filteredNttnNodes: nttnNodes } = useData();
  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(null);

  const getDisasterIcon = (type: DisasterEvent['type']) => {
    switch (type) {
      case 'flood': return <Flood />;
      case 'fire': return <LocalFireDepartment />;
      case 'storm': return <Air />;
      case 'earthquake': return <Terrain />;
      default: return <Warning />;
    }
  };

  const getSeverityColor = (severity: DisasterEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: DisasterEvent['status']) => {
    switch (status) {
      case 'predicted': return 'warning';
      case 'active': return 'error';
      case 'contained': return 'info';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const getTeamStatusColor = (status: ResponseTeam['status']) => {
    switch (status) {
      case 'available': return '#4caf50';
      case 'en-route': return '#ff9800';
      case 'deployed': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  const activeEvents = disasterEvents.filter(e => e.status === 'active' || e.status === 'predicted');
  const availableTeams = responseTeams.filter(t => t.status === 'available');
  const deployedTeams = responseTeams.filter(t => t.status === 'deployed' || t.status === 'en-route');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Disaster Response Cell
      </Typography>

      {activeEvents.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Active Disaster Events</AlertTitle>
          {activeEvents.length} disaster event(s) currently requiring attention
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Active Events</Typography>
              <Typography variant="h3">{activeEvents.length}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {disasterEvents.filter(e => e.status === 'predicted').length} Predicted
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Response Teams</Typography>
              <Typography variant="h3">{responseTeams.length}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {availableTeams.length} Available
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Affected Towers</Typography>
              <Typography variant="h3">
                {disasterEvents.reduce((acc, e) => acc + e.affectedInfrastructure.towers.length, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Across all events
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Affected NTTN</Typography>
              <Typography variant="h3">
                {disasterEvents.reduce((acc, e) => acc + e.affectedInfrastructure.nttnNodes.length, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Network nodes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Disaster Events Timeline
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Infrastructure Impact</TableCell>
                    <TableCell>Response Teams</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disasterEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getDisasterIcon(event.type)}
                          <Typography>{event.id}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>
                        <Chip
                          label={event.severity}
                          size="small"
                          color={getSeverityColor(event.severity)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={event.status}
                          size="small"
                          color={getStatusColor(event.status)}
                        />
                      </TableCell>
                      <TableCell>{event.affectedRegion.name}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {event.affectedInfrastructure.towers.length} towers,{' '}
                          {event.affectedInfrastructure.nttnNodes.length} nodes
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={event.responseTeams.length} color="primary">
                          <Groups />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <NavigateNext />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Response Teams Status
            </Typography>
            <List>
              {responseTeams.map((team) => (
                <React.Fragment key={team.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Badge
                        badgeContent={team.status === 'available' ? '✓' : '!'}
                        color={team.status === 'available' ? 'success' : 'warning'}
                      >
                        <Groups />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={team.name}
                      secondary={
                        <Box>
                          <Chip
                            label={team.status}
                            size="small"
                            sx={{
                              bgcolor: getTeamStatusColor(team.status),
                              color: 'white',
                              fontSize: '0.7rem'
                            }}
                          />
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {team.resources.personnel} personnel, {team.resources.vehicles} vehicles
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {selectedEvent && (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Event Details: {selectedEvent.affectedRegion.name} - {selectedEvent.type}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Event Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><AccessTime /></ListItemIcon>
                        <ListItemText
                          primary="Start Time"
                          secondary={new Date(selectedEvent.startTime).toLocaleString()}
                        />
                      </ListItem>
                      {selectedEvent.endTime && (
                        <ListItem>
                          <ListItemIcon><Schedule /></ListItemIcon>
                          <ListItemText
                            primary="End Time"
                            secondary={new Date(selectedEvent.endTime).toLocaleString()}
                          />
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemIcon><LocationOn /></ListItemIcon>
                        <ListItemText
                          primary="Affected Region"
                          secondary={selectedEvent.affectedRegion.name}
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Affected Infrastructure
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Towers ({selectedEvent.affectedInfrastructure.towers.length})
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {selectedEvent.affectedInfrastructure.towers.map(towerId => {
                          const tower = towers.find(t => t.id === towerId);
                          return tower ? (
                            <Chip key={towerId} label={tower.name} size="small" />
                          ) : null;
                        })}
                      </Box>
                      <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                        NTTN Nodes ({selectedEvent.affectedInfrastructure.nttnNodes.length})
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {selectedEvent.affectedInfrastructure.nttnNodes.map(nodeId => {
                          const node = nttnNodes.find(n => n.id === nodeId);
                          return node ? (
                            <Chip key={nodeId} label={node.name} size="small" />
                          ) : null;
                        })}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Assigned Response Teams
                    </Typography>
                    <List dense>
                      {selectedEvent.responseTeams.map(teamId => {
                        const team = responseTeams.find(t => t.id === teamId);
                        return team ? (
                          <ListItem key={teamId}>
                            <ListItemIcon><Groups /></ListItemIcon>
                            <ListItemText
                              primary={team.name}
                              secondary={`Status: ${team.status}`}
                            />
                          </ListItem>
                        ) : null;
                      })}
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Response Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={
                    selectedEvent.status === 'resolved' ? 100 :
                    selectedEvent.status === 'contained' ? 75 :
                    selectedEvent.status === 'active' ? 50 : 25
                  }
                  sx={{ height: 10, borderRadius: 5 }}
                  color={selectedEvent.severity === 'critical' ? 'error' : 'warning'}
                />
              </Box>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<Phone />}>
                  Contact Teams
                </Button>
                <Button variant="outlined" startIcon={<Assignment />}>
                  View SOPs
                </Button>
                <Button variant="outlined" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DisasterResponse;