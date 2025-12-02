import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Alert,
    CircularProgress,
    IconButton,
    Grid
} from '@mui/material';
import {
    Send as SendIcon,
    AttachFile as AttachFileIcon,
    Close as CloseIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const FeedbackForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
        priority: 'MEDIUM',
        selectedTags: [],
        attachments: []
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loadMetadata();
    }, []);

    const loadMetadata = async () => {
        try {
            const [categoriesRes, tagsRes] = await Promise.all([
                api.get('/categories'),
                api.get('/tags')
            ]);
            setCategories(categoriesRes.data);
            setTags(tagsRes.data);
        } catch (err) {
            console.error('Failed to load metadata:', err);
            setError('Failed to load form data. Please refresh.');
        }
    };

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleTagToggle = (tagId) => {
        const currentTags = formData.selectedTags;
        const newTags = currentTags.includes(tagId)
            ? currentTags.filter(id => id !== tagId)
            : [...currentTags, tagId];
        setFormData({ ...formData, selectedTags: newTags });
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFormData({
                ...formData,
                attachments: [...formData.attachments, ...newFiles]
            });
        }
    };

    const removeFile = (index) => {
        const newAttachments = formData.attachments.filter((_, i) => i !== index);
        setFormData({ ...formData, attachments: newAttachments });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.categoryId) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Create Feedback
            // Backend expects: title, description, category (CategoryEntity), priority, tags (List<TagEntity>), createdBy (UserEntity)
            // We send IDs and backend should handle it, or we construct objects.
            // Let's assume backend accepts DTO with IDs.
            // If not, we might need to adjust.
            // Based on Entity, it has relationships.
            // Let's try sending IDs.

            const feedbackPayload = {
                title: formData.title,
                description: formData.description,
                category: { categoryId: formData.categoryId }, // Assuming backend handles this mapping
                priority: formData.priority,
                tags: formData.selectedTags.map(id => ({ tagId: id })),
                createdBy: { userId: user.userId || user.id }
            };

            const res = await api.post('/feedback', feedbackPayload);
            const feedbackId = res.data.feedbackId || res.data.id;

            // 2. Upload Attachments if any
            if (formData.attachments.length > 0) {
                const uploadPromises = formData.attachments.map(file => {
                    const formData = new FormData();
                    formData.append('file', file);
                    return api.post(`/feedback/${feedbackId}/attachments`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                });
                await Promise.all(uploadPromises);
            }

            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to submit feedback:', err);
            setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth="md" sx={{ mx: 'auto' }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back
            </Button>

            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Submit New Feedback
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Share your thoughts, suggestions, or report issues to help us improve.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={formData.title}
                        onChange={handleChange('title')}
                        required
                        placeholder="Brief summary of your feedback"
                        sx={{ mb: 3 }}
                    />

                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                value={formData.categoryId}
                                onChange={handleChange('categoryId')}
                                required
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Priority"
                                value={formData.priority}
                                onChange={handleChange('priority')}
                                required
                            >
                                <MenuItem value="LOW">Low</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Description"
                        value={formData.description}
                        onChange={handleChange('description')}
                        required
                        placeholder="Detailed explanation..."
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Tags
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {tags.map(tag => (
                                <Chip
                                    key={tag.tagId || tag.id}
                                    label={tag.name}
                                    onClick={() => handleTagToggle(tag.tagId || tag.id)}
                                    color={formData.selectedTags.includes(tag.tagId || tag.id) ? 'primary' : 'default'}
                                    variant={formData.selectedTags.includes(tag.tagId || tag.id) ? 'filled' : 'outlined'}
                                    clickable
                                />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <input
                            accept="image/*,.pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<AttachFileIcon />}
                                sx={{ mb: 2 }}
                            >
                                Attach Files
                            </Button>
                        </label>

                        {formData.attachments.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {formData.attachments.map((file, index) => (
                                    <Chip
                                        key={index}
                                        label={file.name}
                                        onDelete={() => removeFile(index)}
                                        deleteIcon={<CloseIcon />}
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default FeedbackForm;
