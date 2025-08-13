import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  InputBase,
  Paper,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Rocket as RocketIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  EventNote as EventNoteIcon,
  AccountBalanceWallet as WalletIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import Logo from '@/assets/fnph.png';
import { useState, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // track open menu
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const today = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    []
  );

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Employee', icon: <PeopleIcon />, path: '/employee/nominal-roll' },
    {
      text: 'Career Advancement',
      icon: <RocketIcon />,
      children: [
        { text: 'Promotion List', path: '/career-advancement/promotion-list' },
        { text: 'Promotion Eligibility', path: '/career-advancement/promotion-eligibility' },
        { text: 'Educational Qualification', path: '/career-advancement/educational-qualification' },
        { text: 'Professional Qualification', path: '/career-advancement/professional-qualification' },
      ],
    },
    { text: 'Fiscal', icon: <AccountBalanceIcon />, path: '/employee/nominal-roll' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/employee/nominal-roll' },
    { text: 'Leave', icon: <EventNoteIcon />, path: '/leave' },
    { text: 'Budget', icon: <WalletIcon />, path: '/budget' },
    { text: 'Profile', icon: <PersonIcon />, path: '/employee/nominal-roll' },
  ];

  const handleMenuClick = (item) => {
    if (item.children) {
      setOpenDropdown(openDropdown === item.text ? null : item.text);
    } else {
      navigate(item.path);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'primary.main',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen((o) => !o)} sx={{ mr: 2 }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Box component="img" src={Logo} alt="My App Logo" sx={{ height: 32, mr: 1 }} />
          <Typography variant="h6" noWrap component="div">
            FNPHY
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Paper
            component="form"
            sx={{
              p: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              width: 200,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              mr: 2,
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: '#FFF' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '10px', color: '#FFF' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Typography sx={{ mr: 3 }}>{today}</Typography>

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 56,
            bgcolor: 'primary.main',
            color: '#FFF',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: open ? 'flex-end' : 'center' }} />
        <List>
          {menuItems.map((item) => (
            <Box key={item.text}>
              <ListItemButton
                onClick={() => handleMenuClick(item)}
                sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}
              >
                <ListItemIcon sx={{ color: '#FFF', minWidth: 0, mr: open ? 3 : 'auto' }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
                {item.children && open && (openDropdown === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {item.children && (
                <Collapse in={openDropdown === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.text}
                        sx={{ pl: open ? 4 : 2 }}
                        selected={pathname === child.path}
                        onClick={() => navigate(child.path)}
                      >
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
        }}

      >
        {/* push content below AppBar*/}

        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

