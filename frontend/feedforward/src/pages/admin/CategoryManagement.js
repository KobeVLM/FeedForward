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
    Switch,
    FormControlLabel,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import api from '../../api/axios';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        active: true
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error('Failed to load categories:', err);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description,
                active: category.active
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                description: '',
                active: true
            });
        }
        setOpenDialog(true);
        setError('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '', active: true });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setError('Category name is required');
            return;
        }

        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.categoryId || editingCategory.id}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            handleCloseDialog();
            loadCategories();
        } catch (err) {
            console.error('Failed to save category:', err);
            setError('Failed to save category');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                loadCategories();
            } catch (err) {
                console.error('Failed to delete category:', err);
                setError('Failed to delete category. It may be in use.');
            }
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Category Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Add Category
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.categoryId || category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <FormControlLabel
                                        control={<Switch checked={category.active} disabled size="small" />}
                                        label={category.active ? 'Active' : 'Inactive'}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenDialog(category)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(category.categoryId || category.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                />
                            }
                            label="Active"
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

export default CategoryManagement;
