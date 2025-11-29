import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: 'Student',
        department: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh',
                pt: 4,
                backgroundColor: '#f5f5f5'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '552px',
                    p: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: '34px',
                        fontWeight: 400,
                        lineHeight: '41.99px',
                        color: 'rgba(0,0,0,0.87)',
                        textAlign: 'center',
                        mb: '11.891px',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    FeedForward
                </Typography>

                <Typography
                    component="h2"
                    sx={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: 'rgba(0,0,0,0.6)',
                        textAlign: 'center',
                        mb: '11.891px',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    Create your account
                </Typography>

                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        width: '488px',
                        position: 'relative'
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        value={formData.fullName}
                        onChange={handleChange}
                        sx={{
                            mb: '16px',
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            mb: '16px',
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }
                        }}
                    />

                    <FormControl fullWidth sx={{ mb: '16px' }}>
                        <InputLabel
                            id="role-label"
                            sx={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Role
                        </InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="Role"
                            onChange={handleChange}
                            sx={{
                                height: '56px',
                                '& .MuiSelect-select': {
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,0.87)',
                                    fontFamily: 'Inter, sans-serif'
                                }
                            }}
                        >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Teacher">Teacher</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: '16px' }}>
                        <InputLabel
                            id="department-label"
                            sx={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Department
                        </InputLabel>
                        <Select
                            labelId="department-label"
                            id="department"
                            name="department"
                            value={formData.department}
                            label="Department"
                            onChange={handleChange}
                            sx={{
                                height: '56px',
                                '& .MuiSelect-select': {
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,0.87)',
                                    fontFamily: 'Inter, sans-serif'
                                }
                            }}
                        >
                            <MenuItem value="">
                                <em>Select Department</em>
                            </MenuItem>
                            <MenuItem value="Computer Science">Computer Science</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Arts">Arts</MenuItem>
                            <MenuItem value="Sciences">Sciences</MenuItem>
                        </Select>
                        <FormHelperText
                            sx={{
                                fontSize: '12px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif',
                                mt: '3px'
                            }}
                        >
                            Select your department
                        </FormHelperText>
                    </FormControl>

                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{
                            mb: '16px',
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={{
                            mb: '24px',
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            height: '42.25px',
                            backgroundColor: '#1976d2',
                            fontSize: '15px',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            fontFamily: 'Inter, sans-serif',
                            borderRadius: '4px',
                            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                            mb: '21.375px',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        Register
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.6)',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '20.02px'
                        }}
                    >
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            sx={{
                                color: '#1976d2',
                                textDecoration: 'underline',
                                fontSize: '14px',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Sign in here
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}