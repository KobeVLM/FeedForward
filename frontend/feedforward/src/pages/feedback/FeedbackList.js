import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { feedbackAPI } from '../../api/feedback';
import { adminAPI } from '../../api/admin'; // For categories
import FeedbackItem from '../../components/feedback/FeedbackItem';
import FeedbackFilters from '../../components/feedback/FeedbackFilters';

const FeedbackList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        status: 'all',
        showMyFeedback: false
    });

    useEffect(() => {
        loadData();
    }, [user]);

    useEffect(() => {
        applyFilters();
    }, [feedback, filters]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [feedbackData, categoriesData] = await Promise.all([
                feedbackAPI.getAll(),
                adminAPI.getCategories()
            ]);
            setFeedback(feedbackData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...feedback];

        if (filters.search) {
            filtered = filtered.filter(f =>
                f.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                f.description.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category !== 'all') {
            filtered = filtered.filter(f => f.category?.categoryId === parseInt(filters.category) || f.category?.id === parseInt(filters.category));
        }

        if (filters.status !== 'all') {
            filtered = filtered.filter(f => f.status === filters.status);
        }

        if (filters.showMyFeedback && user) {
            filtered = filtered.filter(f => f.createdBy?.userId === user.userId || f.createdBy?.id === user.id);
        }

        setFilteredFeedback(filtered);
    };

    const handleFilterChange = (field) => (e) => {
        // Special handling for showMyFeedback which is boolean but passed as event from Select
        if (field === 'showMyFeedback') {
            setFilters({ ...filters, showMyFeedback: e.target.value });
        } else {
            setFilters({ ...filters, [field]: e.target.value });
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Feedback
                    </Typography>
                    <Typography color="text.secondary">
                        {filteredFeedback.length} {filteredFeedback.length === 1 ? 'item' : 'items'}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/feedback/new')}
                >
                    New Feedback
                </Button>
            </Box>

            <FeedbackFilters
                filters={filters}
                categories={categories}
                onFilterChange={handleFilterChange}
                onClearFilters={() => setFilters({
                    search: '',
                    category: 'all',
                    status: 'all',
                    showMyFeedback: false
                })}
            />

            {filteredFeedback.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Typography color="text.secondary" variant="h6">
                        No feedback found
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Try adjusting your filters or submit new feedback
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    {filteredFeedback.map(item => (
                        <Grid item xs={12} key={item.feedbackId || item.id}>
                            <FeedbackItem item={item} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default FeedbackList;
