import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    CircularProgress,
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import api from '../../api/axios';

const TagManagement = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingTag, setEditingTag] = useState(null);
    const [formData, setFormData] = useState({
        name: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        try {
            setLoading(true);
            const res = await api.get('/tags');
            setTags(res.data);
        } catch (err) {
            console.error('Failed to load tags:', err);
            setError('Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (tag = null) => {
        if (tag) {
            setEditingTag(tag);
            setFormData({
                name: tag.name
            });
        } else {
            setEditingTag(null);
            setFormData({
                name: ''
            });
        }
        setOpenDialog(true);
        setError('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingTag(null);
        setFormData({ name: '' });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setError('Tag name is required');
            return;
        }

        try {
            if (editingTag) {
                await api.put(`/tags/${editingTag.tagId || editingTag.id}`, formData);
            } else {
                await api.post('/tags', formData);
            }
            handleCloseDialog();
            loadTags();
        } catch (err) {
            console.error('Failed to save tag:', err);
            setError('Failed to save tag');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            try {
                await api.delete(`/tags/${id}`);
                loadTags();
            } catch (err) {
                console.error('Failed to delete tag:', err);
                setError('Failed to delete tag. It may be in use.');
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Tag Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add Tag
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Preview</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tags.map((tag) => (
                            <TableRow key={tag.tagId || tag.id}>
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>
                                    <Chip label={tag.name} size="small" />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenDialog(tag)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(tag.tagId || tag.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingTag ? 'Edit Tag' : 'Add Tag'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TagManagement;
