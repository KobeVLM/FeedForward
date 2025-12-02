import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Load notifications if needed
        // setNotifications([]);
    }, [user]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
                user={user}
                logout={logout}
                onDrawerToggle={() => setDrawerOpen(true)}
                notifications={notifications}
            />

            <Sidebar
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                user={user}
            />

            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'grey.50', py: 4 }}>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
