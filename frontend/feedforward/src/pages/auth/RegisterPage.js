import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Link,
    Container,
    MenuItem
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Student',
        department: ''
    });
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await api.get('/departments');
                setDepartments(response.data);
            } catch (err) {
                console.error('Failed to fetch departments:', err);
                // Fallback or error handling
            }
        };
        fetchDepartments();
    }, []);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.department) {
            setError('Please select a department');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(formData);
            // Registration successful, navigate to login
            navigate('/login');
        } catch (err) {
            // Handle both string and object error responses
            const errorData = err.response?.data;
            const errorMessage = typeof errorData === 'string' 
                ? errorData 
                : errorData?.message || 'Failed to register. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Card sx={{ width: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            FeedForward
                        </Typography>
                        <Typography color="text.secondary" gutterBottom align="center" sx={{ mb: 3 }}>
                            Create your account
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                required
                                sx={{ mb: 2 }}
                                autoComplete="email"
                            />

                            <TextField
                                fullWidth
                                select
                                label="Role"
                                value={formData.role}
                                onChange={handleChange('role')}
                                required
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Staff">Staff</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                select
                                label="Department"
                                value={formData.department}
                                onChange={handleChange('department')}
                                required
                                sx={{ mb: 2 }}
                                helperText="Select your department"
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept.departmentId} value={dept.name}>
                                        {dept.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange('password')}
                                required
                                sx={{ mb: 2 }}
                                autoComplete="new-password"
                            />

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                required
                                sx={{ mb: 3 }}
                                autoComplete="new-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ mb: 2 }}
                            >
                                {loading ? 'Creating Account...' : 'Register'}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link
                                        component="button"
                                        type="button"
                                        variant="body2"
                                        onClick={() => navigate('/login')}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Sign in here
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default RegisterPage;
