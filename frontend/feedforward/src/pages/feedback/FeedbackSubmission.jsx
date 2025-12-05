import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add,
  Send,
  AttachFile,
  Delete,
  CloudUpload,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import feedbackService from '../../services/feedbackService';
import categoryService from '../../services/categoryService';
import tagService from '../../services/tagService';
import fileService from '../../services/fileService';
import useAuth from '../../hooks/useAuth';
import { PRIORITY_LEVELS, ROUTES } from '../../utils/constants';

const FeedbackSubmission = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priority: 'MEDIUM',
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const data = await tagService.getAllTags();
      setAvailableTags(data);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFileErrors = [];
    const validFiles = [];

    files.forEach((file) => {
      const validation = fileService.validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        newFileErrors.push(`${file.name}: ${validation.error}`);
      }
    });

    setSelectedFiles([...selectedFiles, ...validFiles]);
    setFileErrors(newFileErrors);

    // Clear file input
    e.target.value = null;
  };

  /**
   * Remove selected file
   */
  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Submit feedback first
      const createdFeedback = await feedbackService.submitFeedback(formData);
      
      // Upload files if any
      if (selectedFiles.length > 0 && createdFeedback.feedbackId && user?.userId) {
        const uploadPromises = selectedFiles.map((file) =>
          fileService.uploadFile(file, createdFeedback.feedbackId, user.userId)
        );
        
        try {
          await Promise.all(uploadPromises);
          setSuccess(`Feedback and ${selectedFiles.length} file(s) uploaded successfully!`);
        } catch (fileErr) {
          setSuccess('Feedback submitted, but some files failed to upload');
          console.error('File upload error:', fileErr);
        }
      } else {
        setSuccess('Feedback submitted successfully!');
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        priority: 'MEDIUM',
        tags: [],
      });
      setSelectedFiles([]);
      setFileErrors([]);

      // Navigate to feedback list after 2 seconds
      setTimeout(() => {
        navigate(ROUTES.MY_FEEDBACK);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Submit Feedback 📝
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Share your concerns and suggestions
        </Typography>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of the issue"
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Priority */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  {Object.values(PRIORITY_LEVELS).map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Provide detailed information about your feedback"
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Tags (Optional)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const tag = availableTags.find((t) => t.id === value);
                          return <Chip key={value} label={tag?.name || value} size="small" />;
                        })}
                      </Box>
                    ),
                  }}
                >
                  {availableTags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* File Attachment */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  component="label"
                >
                  Attach Files
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
                  Max 10MB per file. Allowed: Images, PDF, Word, Excel, Text
                </Typography>
                
                {/* File errors */}
                {fileErrors.length > 0 && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {fileErrors.map((err, idx) => (
                      <div key={idx}>{err}</div>
                    ))}
                  </Alert>
                )}
                
                {/* Selected files list */}
                {selectedFiles.length > 0 && (
                  <List dense sx={{ mt: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                    {selectedFiles.map((file, index) => (
                      <ListItem key={index}>
                        <AttachFile sx={{ mr: 1 }} fontSize="small" />
                        <ListItemText
                          primary={file.name}
                          secondary={fileService.formatFileSize(file.size)}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
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
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FeedbackSubmission;
