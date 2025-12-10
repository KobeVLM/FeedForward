import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    Chip,
    Divider
} from '@mui/material';
import {
    ArrowForward as ArrowForwardIcon,
    CheckCircle as CheckCircleIcon,
    RateReview as RateReviewIcon,
    Pending as PendingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const RecentActivity = ({ activities }) => {
    const navigate = useNavigate();

    return (
        <Paper sx={{ p: 3, height: '100%', width: '620px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Recent Activity
                </Typography>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/feedback')}
                >
                    View All
                </Button>
            </Box>
            <List>
                {activities.length > 0 ? (
                    activities.map((feedback, index) => (
                        <React.Fragment key={feedback.feedbackId || feedback.id}>
                            <ListItem
                                alignItems="flex-start"
                                sx={{
                                    px: 0,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' },
                                    borderRadius: 1
                                }}
                                onClick={() => navigate(`/feedback/${feedback.feedbackId || feedback.id}`)}
                            >
                                <ListItemIcon>
                                    <Avatar sx={{
                                        bgcolor:
                                            feedback.status === 'RESOLVED' ? 'success.light' :
                                                feedback.status === 'IN_REVIEW' ? 'info.light' :
                                                    'warning.light',
                                        color: 'white'
                                    }}>
                                        {feedback.status === 'RESOLVED' ? <CheckCircleIcon /> :
                                            feedback.status === 'IN_REVIEW' ? <RateReviewIcon /> :
                                                <PendingIcon />}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            {feedback.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {feedback.category?.name || feedback.category}
                                            </Typography>
                                            {` — ${format(new Date(feedback.createdAt), 'MMM d, yyyy')}`}
                                        </React.Fragment>
                                    }
                                />
                                <Chip
                                    label={feedback.status.replace('_', ' ')}
                                    size="small"
                                    color={
                                        feedback.status === 'RESOLVED' ? 'success' :
                                            feedback.status === 'IN_REVIEW' ? 'info' :
                                                'warning'
                                    }
                                    sx={{ ml: 2 }}
                                />
                            </ListItem>
                            {index < activities.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                ) : (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            No recent activity found.
                        </Typography>
                    </Box>
                )}
            </List>
        </Paper>
    );
};

export default RecentActivity;
