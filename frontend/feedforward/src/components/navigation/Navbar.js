import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Divider,
    ListItemIcon,
    Tooltip,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Help as HelpIcon,
    Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, logout, onDrawerToggle, notifications = [] }) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [notifAnchor, setNotifAnchor] = useState(null);

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleNotificationClick = (event) => setNotifAnchor(event.currentTarget);
    const handleNotificationClose = () => setNotifAnchor(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/dashboard')}
                    >
                        FeedForward
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Notifications">
                            <IconButton color="inherit" onClick={handleNotificationClick}>
                                <Badge badgeContent={unreadCount} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Account settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    {user?.displayName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* User Menu */}
                    <Menu
                        sx={{ mt: '45px' }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem disabled>
                            <Box>
                                <Typography>{user?.displayName || user?.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user?.role?.name || user?.role}
                                </Typography>
                            </Box>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                            <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/settings'); handleCloseUserMenu(); }}>
                            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/help'); handleCloseUserMenu(); }}>
                            <ListItemIcon><HelpIcon fontSize="small" /></ListItemIcon>
                            Help
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                    {/* Notifications Menu */}
                    <Menu
                        anchorEl={notifAnchor}
                        open={Boolean(notifAnchor)}
                        onClose={handleNotificationClose}
                        PaperProps={{ sx: { width: 360, maxHeight: 400 } }}
                    >
                        <MenuItem disabled>
                            <Typography variant="subtitle2">Notifications</Typography>
                        </MenuItem>
                        <Divider />
                        {notifications.length === 0 ? (
                            <MenuItem disabled>
                                <Typography variant="body2" color="text.secondary">No notifications</Typography>
                            </MenuItem>
                        ) : (
                            notifications.map((notif) => (
                                <MenuItem key={notif.id} onClick={handleNotificationClose}>
                                    <Typography variant="body2">{notif.message}</Typography>
                                </MenuItem>
                            ))
                        )}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
