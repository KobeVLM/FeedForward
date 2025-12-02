import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Feedback as FeedbackIcon,
    Add as AddIcon,
    Category as CategoryIcon,
    Label as LabelIcon,
    History as HistoryIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Help as HelpIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose, user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getMenuItems = () => {
        const baseItems = [
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
            { text: 'All Feedback', icon: <FeedbackIcon />, path: '/feedback' },
            { text: 'Submit Feedback', icon: <AddIcon />, path: '/feedback/new' }
        ];

        if (user?.role?.name === 'Admin' || user?.role === 'Admin') {
            baseItems.push(
                { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
                { text: 'Tags', icon: <LabelIcon />, path: '/admin/tags' },
                { text: 'Activity Log', icon: <HistoryIcon />, path: '/admin/activity' }
            );
        }

        baseItems.push(
            { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
            { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
            { text: 'Help', icon: <HelpIcon />, path: '/help' }
        );

        return baseItems;
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 250 }} role="presentation">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Menu</Typography>
                </Box>
                <Divider />
                <List>
                    {getMenuItems().map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
