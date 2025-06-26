import { AppBar, Avatar, Box, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ArchiveIcon, BookmarksIcon, DashboardIcon, MenuIcon, NoteIcon, SettingsIcon } from "../../ui/icons";
const DRAWER_WIDTH = 280;
const AppLaout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/',
            badge: null,
        },
        {
            text: 'Bookmarks',
            icon: <BookmarksIcon />,
            path: '/bookmarks',
            badge: null,
        },
        {
            text: 'Archive',
            icon: <ArchiveIcon />,
            path: '/archive',
            badge: null,
        }

    ]
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { md: `${DRAWER_WIDTH}px` },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    borderBottomColor: 'divider',
                }}
            >
                <Toolbar>
                    <IconButton sx={{ mr: 2, display: { md: 'none' } }} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <Tooltip title="User Profile" arrow>
                        <IconButton sx={{ p: 0 }} >
                            <Avatar sx={{ width: 32, height: 32 }}>K</Avatar>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                <Drawer sx={
                    {
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            borderRight: '1px solid',
                            borderRightColor: 'divider',
                        },
                    }
                } open variant="permanent" >
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                <NoteIcon sx={{ fontSize: 20 }} />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                AI Note Manager
                            </Typography>
                        </Box>
                        <Divider />
                        <List sx={{ flex: 1, px: 1 }}>
                            {
                                navigateItems.map((item) => (
                                    <ListItemButton
                                        selected={location.pathname === item.path}
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 0.5,
                                            '&.Mui-selected': {
                                                backgroundColor: 'primary.light',
                                                color: 'primary.contrastText',
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                },
                                            },

                                        }}
                                    >

                                        <ListItem key={item.text} disablePadding>
                                            <ListItemIcon sx={{
                                                color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                                                minWidth: 40,
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    </ListItemButton>
                                ))
                            }
                        </List>
                        <Divider />
                        <List sx={{ px: 1, pb: 2 }}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => navigate('/settings')}
                                    sx={{
                                        borderRadius: 2,
                                    }}
                                >
                                    <ListItemIcon sx={{minWidth:40}}>
                                        <SettingsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>
                </Drawer>
            </Box>
            <Outlet />
        </Box>
    );
}

export default AppLaout;
