import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeedbackItem = ({ item }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'IN_REVIEW': return 'info';
            case 'RESPONDED': return 'primary';
            case 'RESOLVED': return 'success';
            default: return 'default';
        }
    };

    return (
        <Card
            sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                }
            }}
            onClick={() => navigate(`/feedback/${item.feedbackId || item.id}`)}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            {item.title}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: 2
                            }}
                        >
                            {item.description}
                        </Typography>
                    </Box>
                    <Chip
                        label={item.status.replace('_', ' ')}
                        color={getStatusColor(item.status)}
                        sx={{ ml: 2 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Chip
                        label={item.category?.name || 'Uncategorized'}
                        size="small"
                        variant="outlined"
                    />
                    {item.tags && item.tags.map(tag => (
                        <Chip
                            key={tag.tagId || tag.id}
                            label={tag.name}
                            size="small"
                            sx={{
                                bgcolor: 'primary.light',
                                color: 'white'
                            }}
                        />
                    ))}
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                            By {item.createdBy?.displayName || item.createdBy?.name || 'Unknown'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FeedbackItem;
