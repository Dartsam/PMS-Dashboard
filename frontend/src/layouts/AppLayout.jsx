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
  Collapse,
  Typography,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Rocket as RocketIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  Wallet as WalletIcon,
  EventNote as EventNoteIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import Logo from '@/assets/fnph.png'
import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom';

const drawerWidth = 240;

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggleSubMenu = (menuText) => {
    setOpenSubMenu((prev) => (prev === menuText ? null : menuText));
  };

  const today = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
    []
  );

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    {
      text: 'Employee', icon: <PeopleIcon />, children: [
        {
          text: 'Nominal Roll',
          path: '/employee/nominalRoll',
        },
        {
          text: 'New Employee',
          path: '/employee/newEmployee',
        },
        {
          text: 'Archive',
          path: '/employee/archive',
        },
      ],
    },
    {
      text: 'Career Advancement', icon: <RocketIcon />, children: [
        {
          text: 'Educational Qualifications',
          path: '/employee/nominalRoll',
        },
        {
          text: 'Professional Qualifications',
          path: '/employee/newEmployee',
        },
        {
          text: 'Promotion Eligibility',
          path: '/employee/archive',
        },
        {
          text: 'Promotion List',
          path: '/employee/archive',
        },
      ], path: '/careeradvancement'
    },
    { text: 'Budget', icon: <WalletIcon />, path: '/budget' },
    { text: 'Fiscal', icon: <AccountBalanceIcon />, path: '/fiscal' },
    { text: 'ePMS', icon: <AssignmentIcon />, path: '/epms' },
    { text: 'Leave', icon: <EventNoteIcon />, path: '/leave' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },

  ];

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
          {/* Sidebar toggle */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen((o) => !o)}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* App title */}
          <Box
            component="img"
            src={Logo}
            alt="My App Logo"
            sx={{ height: 32, mr: 1 }}
          />
          <Typography variant="h6" noWrap component="div">
            FNPHY
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search box */}
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

          {/* Date */}
          <Typography sx={{ mr: 3 }}>
            {today}
          </Typography>

          {/* Notifications */}
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
          {menuItems.map((item, index) => {
            if (item.children) {
              const isOpen = openSubMenu === item.text;
              return (
                <Box key={index}>
                  <ListItemButton
                    onClick={() => handleToggleSubMenu(item.text)}
                    sx={{
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', color: '#FFF' }}>
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <>
                        <ListItemText primary={item.text} />
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </>
                    )}
                  </ListItemButton>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child, cIndex) => (
                        <ListItemButton
                          key={cIndex}
                          component={NavLink}
                          to={child.path}
                          sx={{
                            pl: open ? 8 : 2,
                            '&.active': {
                              backgroundColor: theme.palette.primary.dark,
                              color: '#fff',
                            },
                          }}
                        >
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            return (
              <ListItemButton
                key={index}
                component={NavLink}
                to={item.path}
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.active': {
                    backgroundColor: theme.palette.primary.dark,
                    color: '#fff',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', color: '#FFF' }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          paddingTop: '64px',
          width: '100%',
          display: 'grid', marginLeft: '0', marginRight: '0',
          //   flexDirection: 'column',
          //   p: 0,
          //   ml: open ? `${drawerWidth}px` : '56px', // aligns with drawer state
          //   paddingTop: (theme) => theme.mixins.toolbar.minHeight, // ✅ correct placement
          //   transition: (theme) =>
          //     theme.transitions.create('margin', {
          //       easing: theme.transitions.easing.sharp,
          //       duration: theme.transitions.duration.leavingScreen,
          //     }),
        }} lg={{ width: '100%', marginLeft: '0', marginRight: '0', }}
      >
        {/* page content */}
        <Outlet />
      </Box>
    </Box>
  );
}