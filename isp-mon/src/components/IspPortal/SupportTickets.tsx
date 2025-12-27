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
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Add,
  Visibility,
  CheckCircle,
  Schedule,
  Error as ErrorIcon,
  SupportAgent,
  AttachFile,
  Send,
  Close,
  AccessTime,
  Person
} from '@mui/icons-material';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
}

interface TicketMessage {
  id: string;
  sender: string;
  senderType: 'isp' | 'btrc';
  message: string;
  timestamp: string;
  attachments?: string[];
}

const mockTickets: Ticket[] = [
  { id: 'TKT-2024-001', subject: 'SNMP configuration not working for router R-CTG-001', category: 'Integration', priority: 'high', status: 'in_progress', createdAt: '2024-12-25 14:30:00', updatedAt: '2024-12-26 09:15:00', assignedTo: 'Md. Karim' },
  { id: 'TKT-2024-002', subject: 'Unable to login to portal', category: 'Portal Access', priority: 'medium', status: 'resolved', createdAt: '2024-12-24 10:00:00', updatedAt: '2024-12-24 15:30:00', assignedTo: 'Fatima Akter' },
  { id: 'TKT-2024-003', subject: 'Netflow data not appearing in dashboard', category: 'Integration', priority: 'critical', status: 'open', createdAt: '2024-12-27 08:00:00', updatedAt: '2024-12-27 08:00:00', assignedTo: 'Pending' },
  { id: 'TKT-2024-004', subject: 'Request for additional device licenses', category: 'License', priority: 'low', status: 'closed', createdAt: '2024-12-20 11:00:00', updatedAt: '2024-12-22 16:00:00', assignedTo: 'Md. Karim' },
];

const mockMessages: TicketMessage[] = [
  { id: '1', sender: 'Link3 Admin', senderType: 'isp', message: 'We are unable to configure SNMP for our Chittagong router R-CTG-001. The device shows as pending in the dashboard despite following all configuration steps.', timestamp: '2024-12-25 14:30:00' },
  { id: '2', sender: 'BTRC Support', senderType: 'btrc', message: 'Thank you for reporting this issue. Can you please provide the device configuration output and confirm the SNMP version you are using?', timestamp: '2024-12-25 16:45:00' },
  { id: '3', sender: 'Link3 Admin', senderType: 'isp', message: 'We are using SNMPv3. Attached is the configuration output from the router.', timestamp: '2024-12-25 17:30:00', attachments: ['router_config.txt'] },
  { id: '4', sender: 'BTRC Support', senderType: 'btrc', message: 'We found the issue. Your security token was incorrect. Please use the updated token from the portal. We have also sent it to your registered email.', timestamp: '2024-12-26 09:15:00' },
];

const SupportTickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setViewDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <ErrorIcon sx={{ color: 'error.main', fontSize: 18 }} />;
      case 'in_progress': return <Schedule sx={{ color: 'warning.main', fontSize: 18 }} />;
      case 'resolved': return <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />;
      case 'closed': return <CheckCircle sx={{ color: 'grey.500', fontSize: 18 }} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string): 'error' | 'warning' | 'success' | 'default' => {
    switch (status) {
      case 'open': return 'error';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string): 'error' | 'warning' | 'info' | 'default' => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const filteredTickets = activeTab === 0
    ? mockTickets
    : activeTab === 1
      ? mockTickets.filter(t => t.status === 'open' || t.status === 'in_progress')
      : mockTickets.filter(t => t.status === 'resolved' || t.status === 'closed');

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Support Tickets
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Raise and track support requests with BTRC
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setCreateDialogOpen(true)}>
          New Ticket
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <SupportAgent sx={{ color: 'primary.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Total Tickets</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>{mockTickets.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ height: 90 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <ErrorIcon sx={{ color: 'error.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Open</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockTickets.filter(t => t.status === 'open').length}
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
                <Schedule sx={{ color: 'warning.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">In Progress</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockTickets.filter(t => t.status === 'in_progress').length}
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
                <CheckCircle sx={{ color: 'success.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">Resolved</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tickets Table */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label={`All Tickets (${mockTickets.length})`} />
              <Tab label={`Active (${mockTickets.filter(t => t.status === 'open' || t.status === 'in_progress').length})`} />
              <Tab label={`Resolved (${mockTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length})`} />
            </Tabs>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Priority</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} hover sx={{ cursor: 'pointer' }} onClick={() => handleViewTicket(ticket)}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500, color: 'primary.main' }}>
                          {ticket.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 250 }} noWrap>
                          {ticket.subject}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={ticket.category} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={ticket.priority}
                          size="small"
                          color={getPriorityColor(ticket.priority)}
                          sx={{ height: 18, fontSize: '0.65rem', textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                          {getStatusIcon(ticket.status)}
                          <Chip
                            label={ticket.status.replace('_', ' ')}
                            size="small"
                            color={getStatusColor(ticket.status)}
                            sx={{ height: 18, fontSize: '0.65rem', textTransform: 'capitalize' }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{ticket.assignedTo}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{ticket.updatedAt}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleViewTicket(ticket); }}>
                          <Visibility sx={{ fontSize: 18 }} />
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

      {/* Create Ticket Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Support Ticket</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth size="small" label="Subject" placeholder="Brief description of the issue" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" defaultValue="">
                    <MenuItem value="integration">Integration Issue</MenuItem>
                    <MenuItem value="portal">Portal Access</MenuItem>
                    <MenuItem value="license">License</MenuItem>
                    <MenuItem value="billing">Billing</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priority</InputLabel>
                  <Select label="Priority" defaultValue="medium">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Provide detailed information about your issue..."
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button variant="outlined" startIcon={<AttachFile />} size="small">
                  Attach Files
                </Button>
                <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                  Max 5 files, 10MB each
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>Submit Ticket</Button>
        </DialogActions>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{selectedTicket?.id}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedTicket?.subject}</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Chip
                label={selectedTicket?.priority}
                size="small"
                color={getPriorityColor(selectedTicket?.priority || '')}
                sx={{ textTransform: 'capitalize' }}
              />
              <Chip
                label={selectedTicket?.status.replace('_', ' ')}
                size="small"
                color={getStatusColor(selectedTicket?.status || '')}
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="caption" color="textSecondary">Category</Typography>
                <Typography variant="body2">{selectedTicket?.category}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="caption" color="textSecondary">Assigned To</Typography>
                <Typography variant="body2">{selectedTicket?.assignedTo}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="caption" color="textSecondary">Created</Typography>
                <Typography variant="body2">{selectedTicket?.createdAt}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="caption" color="textSecondary">Last Updated</Typography>
                <Typography variant="body2">{selectedTicket?.updatedAt}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Conversation</Typography>
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {mockMessages.map((msg) => (
              <ListItem key={msg.id} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{
                    bgcolor: msg.senderType === 'btrc' ? 'primary.main' : 'secondary.main',
                    width: 36,
                    height: 36
                  }}>
                    {msg.senderType === 'btrc' ? <SupportAgent /> : <Person />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {msg.sender}
                        {msg.senderType === 'btrc' && (
                          <Chip label="BTRC" size="small" sx={{ ml: 1, height: 16, fontSize: '0.6rem' }} color="primary" />
                        )}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        <AccessTime sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{msg.message}</Typography>
                      {msg.attachments && (
                        <Box display="flex" gap={0.5} mt={1}>
                          {msg.attachments.map((file, idx) => (
                            <Chip
                              key={idx}
                              icon={<AttachFile sx={{ fontSize: 14 }} />}
                              label={file}
                              size="small"
                              variant="outlined"
                              sx={{ height: 22, fontSize: '0.7rem' }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your reply..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="outlined" startIcon={<AttachFile />} size="small">
              Attach
            </Button>
            <Button variant="contained" startIcon={<Send />} size="small">
              Send
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportTickets;
