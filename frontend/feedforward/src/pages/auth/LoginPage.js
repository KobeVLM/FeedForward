import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Link,
    Container
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to login. Please check your credentials.');
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
                            Sign in to your account
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                                autoComplete="email"
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ mb: 2 }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?{' '}
                                    <Link
                                        component="button"
                                        type="button"
                                        variant="body2"
                                        onClick={() => navigate('/register')}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Register here
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="caption" display="block" gutterBottom>
                                <strong>Demo Credentials:</strong>
                            </Typography>
                            <Typography variant="caption" display="block">
                                Admin: admin@feedforward.com / password123
                            </Typography>
                            <Typography variant="caption" display="block">
                                Student: student@university.edu / password123
                            </Typography>
                            <Typography variant="caption" display="block">
                                Staff: staff@university.edu / password123
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default LoginPage;
