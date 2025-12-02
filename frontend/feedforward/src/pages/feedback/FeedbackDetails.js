import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Divider,
    Button,
    TextField,
    Avatar,
    Grid,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Send as SendIcon,
    AttachFile as AttachFileIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const FeedbackDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadFeedback();
    }, [id]);

    const loadFeedback = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/feedback/${id}`);
            setFeedback(res.data);
        } catch (err) {
            setError('Failed to load feedback details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await api.patch(`/feedback/${id}/status`, null, { params: { status: newStatus } });
            setFeedback({ ...feedback, status: newStatus });
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleSubmitResponse = async (e) => {
        e.preventDefault();
        if (!response.trim()) return;

        try {
            setSubmitting(true);
            const res = await api.post('/responses', {
                feedback: { feedbackId: id },
                message: response,
                user: { userId: user.userId || user.id }
            });

            await loadFeedback();
            setResponse('');
        } catch (err) {
            console.error('Failed to submit response:', err);
            setError('Failed to submit response');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'IN_REVIEW': return 'info';
            case 'RESPONDED': return 'primary';
            case 'RESOLVED': return 'success';
            default: return 'default';
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (!feedback) return <Box sx={{ p: 4 }}><Alert severity="error">Feedback not found</Alert></Box>;

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back to List
            </Button>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    {feedback.title}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip
                                        label={feedback.status.replace('_', ' ')}
                                        color={getStatusColor(feedback.status)}
                                    />
                                    <Chip
                                        label={feedback.category?.name || 'Uncategorized'}
                                        variant="outlined"
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                            {(user?.role === 'Admin' || user?.role?.name === 'Admin' || user?.role === 'Staff' || user?.role?.name === 'Staff') && (
                                <Box>
                                    <TextField
                                        select
                                        size="small"
                                        value={feedback.status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        SelectProps={{ native: true }}
                                        sx={{ width: 150 }}
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_REVIEW">In Review</option>
                                        <option value="RESPONDED">Responded</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </TextField>
                                </Box>
                            )}
                        </Box>

                        <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                            {feedback.description}
                        </Typography>

                        {feedback.tags && feedback.tags.length > 0 && (
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                {feedback.tags.map(tag => (
                                    <Chip
                                        key={tag.tagId || tag.id}
                                        label={tag.name}
                                        size="small"
                                        sx={{ bgcolor: 'action.selected' }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Responses
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        {feedback.responses && feedback.responses.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {feedback.responses.map((res) => (
                                    <Box key={res.responseId || res.id} sx={{ display: 'flex', gap: 2 }}>
                                        <Avatar>
                                            {res.responder?.displayName?.charAt(0) || res.responder?.name?.charAt(0) || 'U'}
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                <Typography variant="subtitle2">
                                                    {res.responder?.displayName || res.responder?.name || 'Unknown'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(res.createdAt).toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                                <Typography variant="body2">{res.message}</Typography>
                                            </Paper>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                                No responses yet
                            </Typography>
                        )}

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Add Response
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Type your response here..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                onClick={handleSubmitResponse}
                                disabled={submitting || !response.trim()}
                            >
                                Post Response
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Details
                        </Typography>
                        <List>
                            <ListItem disablePadding sx={{ py: 1 }}>
                                <ListItemText
                                    primary="Submitted By"
                                    secondary={feedback.createdBy?.displayName || feedback.createdBy?.name || 'Anonymous'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding sx={{ py: 1 }}>
                                <ListItemText
                                    primary="Department"
                                    secondary={feedback.createdBy?.department?.name || feedback.createdBy?.department || 'N/A'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding sx={{ py: 1 }}>
                                <ListItemText
                                    primary="Priority"
                                    secondary={
                                        <Chip
                                            label={feedback.priority || 'MEDIUM'}
                                            size="small"
                                            color={feedback.priority === 'HIGH' ? 'error' : feedback.priority === 'LOW' ? 'success' : 'warning'}
                                            variant="outlined"
                                        />
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FeedbackDetails;
