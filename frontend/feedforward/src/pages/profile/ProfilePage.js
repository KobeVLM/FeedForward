import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Avatar,
    Grid,
    LinearProgress,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    CircularProgress
} from '@mui/material';
import {
    Email as EmailIcon,
    Badge as BadgeIcon,
    School as SchoolIcon,
    CalendarToday as CalendarIcon,
    CameraAlt as CameraIcon,
    Assessment as AssessmentIcon,
    TrendingUp as TrendingIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { feedbackAPI } from '../../api/feedback';

const ProfilePage = () => {
    const { user } = useAuth();
    const [userFeedback, setUserFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (user) {
            loadUserData();
        }
    }, [user]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const feedback = await feedbackAPI.getByUser(user.userId || user.id);
            setUserFeedback(feedback);
        } catch (error) {
            console.error('Failed to load user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStats = () => {
        const total = userFeedback.length;
        const pending = userFeedback.filter(f => f.status === 'PENDING').length;
        const inReview = userFeedback.filter(f => f.status === 'IN_REVIEW').length;
        const responded = userFeedback.filter(f => f.status === 'RESPONDED').length;
        const resolved = userFeedback.filter(f => f.status === 'RESOLVED').length;

        return { total, pending, inReview, responded, resolved };
    };

    const stats = getStats();
    // Removed unused memberSince

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin': return 'error';
            case 'Staff': return 'warning';
            case 'Student': return 'primary';
            default: return 'default';
        }
    };

    const handleImageUpload = () => {
        // Mock upload
        alert('Profile image updated!');
        setImageDialogOpen(false);
        setSelectedImage(null);
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 1000 }}>
                My Profile
            </Typography>

            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', position: 'relative', height: '655px' }}>
                        <Box sx={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 80,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '4px 4px 0 0'
                        }} />
                        <Box sx={{ position: 'relative', display: 'inline-block', mt: 3, mb: 2 }}>
                            <Avatar
                                sx={{
                                    width: 100, height: 100, border: '4px solid white',
                                    fontSize: '2.5rem', bgcolor: 'primary.main'
                                }}
                            >
                                {user?.displayName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                            </Avatar>
                            <IconButton
                                sx={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    bgcolor: 'primary.main', color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                                onClick={() => setImageDialogOpen(true)}
                            >
                                <CameraIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Typography variant="h5" fontWeight="bold">
                            {user?.displayName || user?.name}
                        </Typography>
                        <Chip
                            label={user?.role?.name || user?.role}
                            color={getRoleColor(user?.role?.name || user?.role)}
                            size="small"
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {user?.email}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <EmailIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Email</Typography>
                                    <Typography>{user?.email}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <BadgeIcon color="action" />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Role</Typography>
                                    <Typography>{user?.role?.name || user?.role}</Typography>
                                </Box>
                            </Box>
                            {user?.department && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <SchoolIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Department</Typography>
                                        <Typography>{user.department.name || user.department}</Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Stats & Activity */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, mb: 3, width: '1100px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '2.0rem' }}>Feedback Statistics</Typography>
                            <AssessmentIcon color="primary" />
                        </Box>

                        <Grid container spacing={9}>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="h4" color="primary" fontWeight="bold">{stats.total}</Typography>
                                <Typography variant="body2" color="text.secondary">Total</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="h4" color="warning.main" fontWeight="bold">{stats.pending}</Typography>
                                <Typography variant="body2" color="text.secondary">Pending</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="h4" color="info.main" fontWeight="bold">{stats.inReview}</Typography>
                                <Typography variant="body2" color="text.secondary">In Review</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="h4" color="success.main" fontWeight="bold">{stats.resolved}</Typography>
                                <Typography variant="body2" color="text.secondary">Resolved</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Recent Activity</Typography>
                        {userFeedback.length === 0 ? (
                            <Typography color="text.secondary" align="center" py={4}>No activity yet</Typography>
                        ) : (
                            <List>
                                {userFeedback.slice(0, 5).map((feedback) => (
                                    <ListItem key={feedback.feedbackId || feedback.id} divider>
                                        <Box sx={{ mr: 2, color: 'primary.main' }}>
                                            <TrendingIcon />
                                        </Box>
                                        <ListItemText
                                            primary={feedback.title}
                                            secondary={new Date(feedback.createdAt).toLocaleDateString()}
                                        />
                                        <Chip
                                            label={feedback.status.replace('_', ' ')}
                                            size="small"
                                            color={
                                                feedback.status === 'RESOLVED' ? 'success' :
                                                    feedback.status === 'PENDING' ? 'warning' : 'info'
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Image Dialog */}
            <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
                <DialogTitle>Change Profile Image</DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}>
                            {user?.displayName?.charAt(0) || 'U'}
                        </Avatar>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={() => setSelectedImage(true)} />
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleImageUpload} disabled={!selectedImage}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
