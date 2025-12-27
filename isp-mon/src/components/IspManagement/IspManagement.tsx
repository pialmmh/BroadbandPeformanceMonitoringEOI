import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  LinearProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search,
  Business,
  CheckCircle,
  Cancel,
  Pending,
  Visibility,
  Edit,
  MoreVert,
  Add,
  FileDownload,
  People
} from '@mui/icons-material';
import { mockIsps, getAggregateMetrics } from '../../data/mockIsps';
import { getQosColor } from '../../data/mockQosData';

const IspManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const metrics = getAggregateMetrics(mockIsps);

  const filteredIsps = mockIsps.filter(isp =>
    isp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    isp.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />;
      case 'suspended': return <Cancel sx={{ color: 'error.main', fontSize: 18 }} />;
      case 'pending': return <Pending sx={{ color: 'warning.main', fontSize: 18 }} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            ISP Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage and monitor registered Internet Service Providers
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<FileDownload />} size="small">
            Export
          </Button>
          <Button variant="contained" startIcon={<Add />} size="small">
            Add ISP
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', height: 100 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Total ISPs</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{metrics.totalIsps}</Typography>
                </Box>
                <Business sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white', height: 100 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Active ISPs</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{metrics.activeIsps}</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)', color: 'white', height: 100 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Suspended</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{metrics.suspendedIsps}</Typography>
                </Box>
                <Cancel sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', height: 100 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Total Subscribers</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{(metrics.totalSubscribers / 1000000).toFixed(1)}M</Typography>
                </Box>
                <People sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ISP Table */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <TextField
                size="small"
                placeholder="Search ISPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <Typography variant="body2" color="textSecondary">
                Showing {filteredIsps.length} ISPs
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ISP</TableCell>
                    <TableCell>License No.</TableCell>
                    <TableCell align="center">Subscribers</TableCell>
                    <TableCell align="center">Regions</TableCell>
                    <TableCell align="center">QoS Score</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredIsps
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((isp) => (
                      <TableRow key={isp.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
                              {isp.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {isp.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {isp.licenseNumber}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {isp.subscribers.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" gap={0.5} justifyContent="center" flexWrap="wrap">
                            {isp.regions.slice(0, 2).map((region) => (
                              <Chip
                                key={region}
                                label={region}
                                size="small"
                                sx={{ height: 18, fontSize: '0.6rem', textTransform: 'capitalize' }}
                              />
                            ))}
                            {isp.regions.length > 2 && (
                              <Chip
                                label={`+${isp.regions.length - 2}`}
                                size="small"
                                sx={{ height: 18, fontSize: '0.6rem' }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                            <LinearProgress
                              variant="determinate"
                              value={isp.qosScore}
                              sx={{
                                width: 50,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: getQosColor(isp.qosScore),
                                  borderRadius: 3
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ fontWeight: 500, minWidth: 30 }}>
                              {isp.qosScore.toFixed(0)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{ color: isp.serviceAvailability >= 98 ? 'success.main' : isp.serviceAvailability >= 95 ? 'warning.main' : 'error.main' }}
                          >
                            {isp.serviceAvailability}%
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            {getStatusIcon(isp.status)}
                            <Chip
                              label={isp.status}
                              size="small"
                              color={isp.status === 'active' ? 'success' : isp.status === 'suspended' ? 'error' : 'warning'}
                              sx={{ height: 20, fontSize: '0.65rem', textTransform: 'capitalize' }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" justifyContent="center">
                            <Tooltip title="View Details">
                              <IconButton size="small">
                                <Visibility sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small">
                                <Edit sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More">
                              <IconButton size="small">
                                <MoreVert sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredIsps.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IspManagement;
