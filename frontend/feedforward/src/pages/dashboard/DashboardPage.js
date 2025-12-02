import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    LinearProgress,
    useTheme
} from '@mui/material';
import {
    Add as AddIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    RateReview as RateReviewIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { feedbackAPI } from '../../api/feedback';
import StatCard from '../../components/dashboard/StatCard';
import RecentActivity from '../../components/dashboard/RecentActivity';
import StatusOverview from '../../components/dashboard/StatusOverview';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inReview: 0,
        resolved: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        try {
            let feedbacks = [];
            if (user?.role === 'Student' || user?.role?.name === 'Student') {
                feedbacks = await feedbackAPI.getByUser(user.userId || user.id);
            } else {
                feedbacks = await feedbackAPI.getAll();
            }

            const total = feedbacks.length;
            const pending = feedbacks.filter(f => f.status === 'PENDING').length;
            const inReview = feedbacks.filter(f => f.status === 'IN_REVIEW').length;
            const resolved = feedbacks.filter(f => f.status === 'RESOLVED' || f.status === 'RESPONDED').length;

            setStats({ total, pending, inReview, resolved });
            setRecentActivity(feedbacks.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const pieData = [
        { name: 'Pending', value: stats.pending, color: theme.palette.warning.main },
        { name: 'In Review', value: stats.inReview, color: theme.palette.info.main },
        { name: 'Resolved', value: stats.resolved, color: theme.palette.success.main },
    ].filter(item => item.value > 0);

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Welcome back, {user?.displayName?.split(' ')[0] || user?.name?.split(' ')[0]}! 👋
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Here's what's happening with your feedback today.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/feedback/new')}
                    sx={{ px: 3, py: 1.5 }}
                >
                    Submit Feedback
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Feedback"
                        value={stats.total}
                        icon={<AssignmentIcon fontSize="large" />}
                        color={theme.palette.primary.main}
                        subtitle="All time submissions"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Pending"
                        value={stats.pending}
                        icon={<PendingIcon fontSize="large" />}
                        color={theme.palette.warning.main}
                        subtitle="Awaiting review"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="In Review"
                        value={stats.inReview}
                        icon={<RateReviewIcon fontSize="large" />}
                        color={theme.palette.info.main}
                        subtitle="Being processed"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Resolved"
                        value={stats.resolved}
                        icon={<CheckCircleIcon fontSize="large" />}
                        color={theme.palette.success.main}
                        subtitle="Successfully closed"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <RecentActivity activities={recentActivity} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatusOverview data={pieData} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;
