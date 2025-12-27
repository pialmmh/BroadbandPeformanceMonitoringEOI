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
  LinearProgress,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions

} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Router,
  Speed,
  DataUsage,
  NetworkCheck,
  Warning,
  CheckCircle,
  Error,
  Refresh,
  TrendingUp,
  TrendingDown,
  ShowChart
} from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { NTTNNode } from '../../types';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts';

const NTTNMonitoring: React.FC = () => {
  const { filteredNttnNodes: nttnNodes, filteredTowers: towers, refreshData } = useData();
  const [selectedNode, setSelectedNode] = useState<NTTNNode | null>(null);

  const getStatusColor = (status: NTTNNode['status']) => {
    switch (status) {
      case 'operational': return '#4caf50';
      case 'degraded': return '#ff9800';
      case 'critical': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getNodeTypeColor = (type: NTTNNode['type']) => {
    switch (type) {
      case 'core': return '#3f51b5';
      case 'edge': return '#9c27b0';
      case 'access': return '#00bcd4';
      default: return '#9e9e9e';
    }
  };

  const generateBandwidthHistory = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 2}:00`,
      bandwidth: 40 + Math.random() * 50 + (i > 4 && i < 10 ? 20 : 0)
    }));
  };

  const generateLatencyHistory = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      minute: i,
      latency: 5 + Math.random() * 15 + (Math.random() > 0.9 ? 20 : 0)
    }));
  };

  const nodeTypeStats = [
    {
      type: 'Core',
      count: nttnNodes.filter(n => n.type === 'core').length,
      operational: nttnNodes.filter(n => n.type === 'core' && n.status === 'operational').length
    },
    {
      type: 'Edge',
      count: nttnNodes.filter(n => n.type === 'edge').length,
      operational: nttnNodes.filter(n => n.type === 'edge' && n.status === 'operational').length
    },
    {
      type: 'Access',
      count: nttnNodes.filter(n => n.type === 'access').length,
      operational: nttnNodes.filter(n => n.type === 'access' && n.status === 'operational').length
    }
  ];

  const handleNodeClick = (node: NTTNNode) => {
    setSelectedNode(node);
  };

  const handleCloseDialog = () => {
    setSelectedNode(null);
  };

  const calculateBandwidthUtilization = (node: NTTNNode) => {
    return (node.bandwidth.current / node.bandwidth.capacity) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          NTTN Network Monitoring
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={refreshData}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Core Nodes</Typography>
              <Typography variant="h3">
                {nodeTypeStats[0].operational}/{nodeTypeStats[0].count}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Operational</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Edge Nodes</Typography>
              <Typography variant="h3">
                {nodeTypeStats[1].operational}/{nodeTypeStats[1].count}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Operational</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Access Nodes</Typography>
              <Typography variant="h3">
                {nodeTypeStats[2].operational}/{nodeTypeStats[2].count}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Operational</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Avg Latency</Typography>
              <Typography variant="h3">
                {(nttnNodes.reduce((acc, n) => acc + n.latency, 0) / nttnNodes.length).toFixed(1)}ms
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Network Average</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Network Bandwidth Utilization</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={generateBandwidthHistory()}>
                <defs>
                  <linearGradient id="colorBandwidth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="bandwidth" stroke="#8884d8" fillOpacity={1} fill="url(#colorBandwidth)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Network Latency Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateLatencyHistory()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minute" label={{ value: 'Minutes Ago', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="latency" stroke="#ff7300" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>NTTN Nodes Status</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Node Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Bandwidth Utilization</TableCell>
                    <TableCell>Current/Capacity</TableCell>
                    <TableCell>Latency</TableCell>
                    <TableCell>Packet Loss</TableCell>
                    <TableCell>Connected Towers</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nttnNodes.map((node) => {
                    const utilization = calculateBandwidthUtilization(node);
                    return (
                      <TableRow key={node.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Router sx={{ color: getNodeTypeColor(node.type) }} />
                            <Typography>{node.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={node.type.toUpperCase()}
                            size="small"
                            sx={{ bgcolor: getNodeTypeColor(node.type), color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={node.status}
                            size="small"
                            color={
                              node.status === 'operational' ? 'success' :
                              node.status === 'degraded' ? 'warning' :
                              node.status === 'critical' ? 'error' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{ mb: 0.5 }}>
                              <Typography variant="body2">{utilization.toFixed(1)}%</Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={utilization}
                              color={utilization > 80 ? 'error' : utilization > 60 ? 'warning' : 'success'}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          {node.bandwidth.current.toFixed(0)} / {node.bandwidth.capacity} Gbps
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Speed sx={{ fontSize: 16 }} />
                            {node.latency.toFixed(1)} ms
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={node.packetLoss > 1 ? 'error' : node.packetLoss > 0.5 ? 'warning' : 'textPrimary'}
                          >
                            {node.packetLoss.toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell>{node.connectedTowers.length}</TableCell>
                        <TableCell>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => handleNodeClick(node)}>
                              <ShowChart />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={!!selectedNode} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedNode && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{selectedNode.name} - Detailed Metrics</Typography>
                <Chip
                  label={selectedNode.status}
                  color={
                    selectedNode.status === 'operational' ? 'success' :
                    selectedNode.status === 'degraded' ? 'warning' :
                    selectedNode.status === 'critical' ? 'error' : 'default'
                  }
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Node Information
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="textSecondary">Type</Typography>
                      <Chip
                        label={selectedNode.type.toUpperCase()}
                        size="small"
                        sx={{ bgcolor: getNodeTypeColor(selectedNode.type), color: 'white', mt: 0.5 }}
                      />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="textSecondary">Last Update</Typography>
                      <Typography>{new Date(selectedNode.lastUpdate).toLocaleString()}</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Performance Metrics
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Latency</Typography>
                      <Typography variant="h6">{selectedNode.latency.toFixed(1)} ms</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">Packet Loss</Typography>
                      <Typography variant="h6">{selectedNode.packetLoss.toFixed(3)}%</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Bandwidth Details
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography>Current Usage</Typography>
                        <Typography>{selectedNode.bandwidth.current.toFixed(1)} Gbps</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography>Total Capacity</Typography>
                        <Typography>{selectedNode.bandwidth.capacity} Gbps</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography>Utilization</Typography>
                        <Typography>{calculateBandwidthUtilization(selectedNode).toFixed(1)}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={calculateBandwidthUtilization(selectedNode)}
                        sx={{ height: 10, borderRadius: 5 }}
                        color={
                          calculateBandwidthUtilization(selectedNode) > 80 ? 'error' :
                          calculateBandwidthUtilization(selectedNode) > 60 ? 'warning' : 'success'
                        }
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                      Connected Infrastructure
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Connected Towers ({selectedNode.connectedTowers.length})
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {selectedNode.connectedTowers.map((towerId) => {
                        const tower = towers.find(t => t.id === towerId);
                        return tower ? (
                          <Chip
                            key={towerId}
                            label={tower.name}
                            size="small"
                            icon={
                              tower.status === 'operational' ? <CheckCircle /> :
                              tower.status === 'warning' ? <Warning /> : <Error />
                            }
                            color={
                              tower.status === 'operational' ? 'success' :
                              tower.status === 'warning' ? 'warning' : 'error'
                            }
                          />
                        ) : null;
                      })}
                    </Box>
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

export default NTTNMonitoring;