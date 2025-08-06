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
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Rocket as RocketIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  EventNote as EventNoteIcon,
  AccountBalanceWallet as WalletIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import Logo from '@/assets/fnph.png';
import { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);

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

  const profile = {
    image: '',
    name: 'John Doe',
    position: 'HR Manager',
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      label: 'Employee',
      icon: <PeopleIcon />,
      children: [
        {
          label: 'Nominal Roll',
          path: '/employee/nominalRoll',
        },
        {
          label: 'New Employee',
          path: '/employee/newEmployee',
        },
        {
          label: 'Archive',
          path: '/employee/archive',
        },
      ],
    },
    {
      label: 'Career Advancement',
      icon: <RocketIcon />,
      path: '/career',
    },
    {
      label: 'Fiscal',
      icon: <AccountBalanceIcon />,
      path: '/fiscal',
    },
    {
      label: 'Tasks',
      icon: <AssignmentIcon />,
      path: '/tasks',
    },
    {
      label: 'Leave',
      icon: <EventNoteIcon />,
      path: '/leave',
    },
    {
      label: 'Budget',
      icon: <WalletIcon />,
      path: '/budget',
    },
  ];

  useEffect(() => {
    const parent = menuItems.find((item) =>
      item.children?.some((child) => child.path === pathname)
    );
    if (parent) {
      setOpenSubMenu(parent.label);
    }
  }, [pathname]);

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
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen((o) => !o)}
            sx={{ mr: 2 }}
          >
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
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const hasChildren = !!item.children;
            const isOpen = openSubMenu === item.label || item.children?.some((child) => child.path === pathname);

            return (
              <Box key={index}>
                <ListItemButton
                  onClick={() => {
                    if (hasChildren) {
                      setOpenSubMenu((prev) => (prev === item.label ? null : item.label));
                    } else {
                      navigate(item.path);
                    }
                  }}
                  selected={isActive}
                  sx={{ px: 2.5 }}
                >
                  <ListItemIcon sx={{ color: '#FFF', minWidth: 0, mr: open ? 3 : 'auto' }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <>
                      <ListItemText primary={item.label} />
                      {hasChildren && (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                    </>
                  )}
                </ListItemButton>

                {hasChildren && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child, cIndex) => (
                        <ListItemButton
                          key={cIndex}
                          selected={pathname === child.path}
                          onClick={() => navigate(child.path)}
                          sx={{ pl: open ? 8 : 2 }}
                        >
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #333', textAlign: open ? 'left' : 'center' }}>
          <Avatar
            src={profile.image || ''}
            alt="Profile"
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#888',
              mb: 1,
              mx: open ? 0 : 'auto',
            }}
          >
            {profile.name ? profile.name.charAt(0) : '?'}
          </Avatar>
          {open && (
            <>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {profile.name || 'Not Registered'}
              </Typography>
              <Typography variant="caption" color="gray" noWrap>
                {profile.position || 'No Position'}
              </Typography>
            </>
          )}
        </Box>
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
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
