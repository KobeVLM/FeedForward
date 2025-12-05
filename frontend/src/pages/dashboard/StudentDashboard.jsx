import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import {
  Assessment,
  HourglassEmpty,
  RateReview,
  CheckCircle,
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity';
import StatusChart from '../../components/dashboard/StatusChart';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inReview: 0,
    resolved: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      // For now, using mock data
      setStats({
        total: 12,
        pending: 3,
        inReview: 5,
        resolved: 4,
      });

      setRecentActivities([
        {
          id: 1,
          title: 'Library AC not working',
          status: 'PENDING',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Cafeteria food quality issue',
          status: 'IN_REVIEW',
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: 3,
          title: 'Classroom projector malfunction',
          status: 'RESOLVED',
          createdAt: new Date(Date.now() - 172800000),
        },
      ]);

      setChartData([
        { name: 'Pending', value: 3 },
        { name: 'In Review', value: 5 },
        { name: 'In Progress', value: 0 },
        { name: 'Resolved', value: 4 },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your feedback today.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Feedback"
            value={stats.total}
            icon={Assessment}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={HourglassEmpty}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Review"
            value={stats.inReview}
            icon={RateReview}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </Grid>
      </Grid>

      {/* Quick Actions & Status Chart */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <QuickActions />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusChart data={chartData} />
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RecentActivity activities={recentActivities} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
