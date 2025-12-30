import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  Badge,
  Divider,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Router as RouterIcon,
  Settings as SettingsIcon,
  Notifications,
  AccountCircle,
  FilterList,
  FilterListOff,
  NetworkCheck,
  SupportAgent,
  AppRegistration,
  CloudUpload,
  Share,
  Security,
  NotificationsActive,
  Warning
} from '@mui/icons-material';
import { RegionFilterProvider } from './contexts/RegionFilterContext';
import RegionFilter from './components/RegionFilter/RegionFilter';
import {
  IspRegistration,
  IspDashboard,
  IntegrationProvisioning,
  SupportTickets,
  BgpRouting,
  SecurityCenter,
  AlertsNotifications
} from './components/IspPortal';
import Settings from './components/Settings/Settings';

const drawerWidth = 220;
const rightDrawerWidth = 260;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A5F',
    },
    secondary: {
      main: '#667eea',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  badge?: number;
}

function NavItem({ to, icon, text, badge }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={to}
        selected={isActive}
        sx={{
          borderRadius: 2,
          mx: 1,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '& .MuiListItemIcon-root': {
              color: 'white',
            },
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {badge ? (
            <Badge badgeContent={badge} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText primary={text} primaryTypographyProps={{ fontSize: '0.9rem' }} />
      </ListItemButton>
    </ListItem>
  );
}

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const location = useLocation();

  // Only show region filter on dashboard/home page
  const showRegionFilter = location.pathname === '/';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mock data
  const openTickets = 2;
  const pendingDevices = 2;
  const activeAlerts = 4;
  const securityThreats = 1;
  const bgpAlerts = 3;

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', py: 2, minHeight: 64 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <NetworkCheck sx={{ fontSize: 28, color: 'primary.main' }} />
          <Box>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              ISP Portal
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
              BTRC Self-Care
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 0.5, py: 1 }}>
        <NavItem to="/" icon={<DashboardIcon />} text="Dashboard" />
        <NavItem
          to="/provisioning"
          icon={<RouterIcon />}
          text="Provisioning"
          badge={pendingDevices > 0 ? pendingDevices : undefined}
        />
        <NavItem
          to="/bgp"
          icon={<Share />}
          text="BGP Routing"
          badge={bgpAlerts > 0 ? bgpAlerts : undefined}
        />
        <NavItem
          to="/security"
          icon={<Security />}
          text="Security Center"
          badge={securityThreats > 0 ? securityThreats : undefined}
        />
        <NavItem
          to="/alerts"
          icon={<NotificationsActive />}
          text="Alerts"
          badge={activeAlerts > 0 ? activeAlerts : undefined}
        />
        <NavItem
          to="/tickets"
          icon={<SupportAgent />}
          text="Support Tickets"
          badge={openTickets > 0 ? openTickets : undefined}
        />
        <NavItem to="/documents" icon={<CloudUpload />} text="Documents" />
      </List>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" color="textSecondary" sx={{ px: 2, fontSize: '0.65rem' }}>
        ACCOUNT
      </Typography>
      <List sx={{ px: 0.5 }}>
        <NavItem to="/register" icon={<AppRegistration />} text="Registration" />
        <NavItem to="/settings" icon={<SettingsIcon />} text="Settings" />
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 1.5 }}>
        <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 2 }}>
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
            Connection Status
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5} sx={{ mt: 0.5 }}>
            <Chip
              label="CONNECTED"
              size="small"
              color="success"
              sx={{ height: 20, fontSize: '0.65rem' }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              8/10 devices
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: '1.1rem', color: 'primary.main' }}>
            BTRC ISP Self-Care Portal
          </Typography>
          {securityThreats > 0 && (
            <Tooltip title="Active Security Threat!">
              <Chip
                icon={<Warning />}
                label="THREAT"
                color="error"
                size="small"
                sx={{ mr: 1, animation: 'pulse 1.5s infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.6 } } }}
              />
            </Tooltip>
          )}
          {showRegionFilter && (
            <Tooltip title={rightDrawerOpen ? "Hide Region Filter" : "Show Region Filter"}>
              <IconButton
                color="inherit"
                onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
                sx={{ display: { xs: 'none', sm: 'inline-flex' }, mr: 1 }}
              >
                {rightDrawerOpen ? <FilterListOff /> : <FilterList />}
              </IconButton>
            </Tooltip>
          )}
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={activeAlerts} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Chip
            avatar={<AccountCircle />}
            label="Link3 Technologies"
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          />
        </Toolbar>
      </AppBar>

      {/* Left Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: {
            xs: '100%',
            sm: `calc(100% - ${drawerWidth + (showRegionFilter && rightDrawerOpen ? rightDrawerWidth : 0)}px)`
          },
          mt: 8,
          transition: 'all 0.3s ease',
          overflow: 'auto'
        }}
      >
        <Routes>
          <Route path="/" element={<IspDashboard />} />
          <Route path="/provisioning" element={<IntegrationProvisioning />} />
          <Route path="/bgp" element={<BgpRouting />} />
          <Route path="/security" element={<SecurityCenter />} />
          <Route path="/alerts" element={<AlertsNotifications />} />
          <Route path="/tickets" element={<SupportTickets />} />
          <Route path="/documents" element={<IspRegistration />} />
          <Route path="/register" element={<IspRegistration />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>

      {/* Right Drawer - Region Filter (only on Dashboard) */}
      {showRegionFilter && (
        <Drawer
          variant="persistent"
          anchor="right"
          open={rightDrawerOpen}
          sx={{
            width: rightDrawerOpen ? rightDrawerWidth : 0,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: rightDrawerWidth,
              boxSizing: 'border-box',
              mt: 8,
              height: 'calc(100% - 64px)',
              borderLeft: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease'
            },
          }}
        >
          <RegionFilter />
        </Drawer>
      )}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RegionFilterProvider>
        <Router>
          <AppContent />
        </Router>
      </RegionFilterProvider>
    </ThemeProvider>
  );
}

export default App;
