import React from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper
} from '@mui/material';

export default function LoginForm() {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
                    FeedForward
                </Typography>
                <Typography component="h2" variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to your account
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Don't have an account? "}
                        <Link href="/register" variant="body2">
                            {"Register here"}
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}