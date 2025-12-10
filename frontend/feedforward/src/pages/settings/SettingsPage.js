import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Palette as PaletteIcon,
    Lock as LockIcon,
    Business as BusinessIcon,
    Delete as DeleteIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth';
import { userAPI } from '../../api/user';
import client from '../../api/client';

const SettingsPage = () => {
    const { user, logout, setUser } = useAuth();

    // Appearance
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [themeSuccess, setThemeSuccess] = useState('');

    // Department
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState(user?.department?.name || user?.department || '');
    const [loadingDepts, setLoadingDepts] = useState(false);
    const [deptSuccess, setDeptSuccess] = useState('');
    const [deptError, setDeptError] = useState('');

    // Password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    // Delete Account
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            setLoadingDepts(true);
            const res = await authAPI.getDepartments();
            setDepartments(res.data);
        } catch (error) {
            console.error('Failed to load departments', error);
        } finally {
            setLoadingDepts(false);
        }
    };

    const handleUpdateDepartment = async () => {
        setDeptError('');
        setDeptSuccess('');
        setLoadingDepts(true);

        try {
            // Find the department object that matches the selected name
            const selectedDept = departments.find(d => d.name === department);
            
            if (!selectedDept) {
                setDeptError('Invalid department selected');
                setLoadingDepts(false);
                return;
            }
            
            // Send complete user object with all required fields
            // Role must be sent as object with roleId to avoid deserialization errors
            const roleObj = user.role && typeof user.role === 'object' 
                ? user.role 
                : { roleId: user.roleId || 1 }; // Default to roleId 1 if not available
                
            const response = await client.put(`/users/${user.userId || user.id}`, {
                userId: user.userId || user.id,
                displayName: user.displayName || user.name,
                universityEmail: user.universityEmail || user.email,
                passwordHash: user.passwordHash || '',
                role: roleObj,
                department: {
                    departmentId: selectedDept.departmentId || selectedDept.id
                },
                avatarUrl: user.avatarUrl || null
            });
            
            setLoadingDepts(false);
            setDeptSuccess('Department updated successfully');
            // Update user context and localStorage
            const updatedUser = { ...user, department: selectedDept };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            // Clear success message after 3 seconds
            setTimeout(() => setDeptSuccess(''), 3000);
        } catch (error) {
            console.error('Failed to update department:', error);
            setLoadingDepts(false);
            setDeptError(error.response?.data?.message || 'Failed to update department');
        }
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setThemeSuccess('Theme updated successfully');
        // Apply theme globally
        document.documentElement.setAttribute('data-theme', newTheme);
        setTimeout(() => setThemeSuccess(''), 3000);
    };

    const handleChangePassword = async () => {
        setPasswordError('');
        setPasswordSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all password fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        try {
            await userAPI.changePassword(user.userId || user.id, {
                currentPassword,
                newPassword
            });
            setPasswordSuccess('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
            setPasswordError('Failed to change password. Please check your current password.');
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') {
            setDeleteError('Please type DELETE to confirm');
            return;
        }

        try {
            await userAPI.deleteAccount(user.userId || user.id);
            logout();
        } catch (error) {
            console.error('Failed to delete account:', error);
            setDeleteError('Failed to delete account. Please try again.');
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Manage your account preferences and settings
            </Typography>

            {/* Appearance */}
            <Paper sx={{ mb: 3, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <PaletteIcon color="primary" />
                    <Typography variant="h6">Appearance</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Theme</InputLabel>
                    <Select
                        value={theme}
                        label="Theme"
                        onChange={(e) => handleThemeChange(e.target.value)}
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </FormControl>
                {themeSuccess && <Alert severity="success" sx={{ mt: 2 }}>{themeSuccess}</Alert>}
            </Paper>

            {/* Department */}
            <Paper sx={{ mb: 3, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <BusinessIcon color="primary" />
                    <Typography variant="h6">Department</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Department</InputLabel>
                    <Select
                        value={department}
                        label="Department"
                        onChange={(e) => setDepartment(e.target.value)}
                        disabled={loadingDepts}
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept.departmentId || dept.id} value={dept.name}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {deptError && <Alert severity="error" sx={{ mb: 2 }}>{deptError}</Alert>}
                {deptSuccess && <Alert severity="success" sx={{ mb: 2 }}>{deptSuccess}</Alert>}
                <Button variant="contained" onClick={handleUpdateDepartment} disabled={loadingDepts}>
                    {loadingDepts ? 'Updating...' : 'Update Department'}
                </Button>
            </Paper>

            {/* Password */}
            <Paper sx={{ mb: 3, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <LockIcon color="primary" />
                    <Typography variant="h6">Change Password</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
                {passwordSuccess && <Alert severity="success" sx={{ mb: 2 }}>{passwordSuccess}</Alert>}

                <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <Button variant="contained" onClick={handleChangePassword}>
                    Change Password
                </Button>
            </Paper>

            {/* Delete Account */}
            <Paper sx={{ mb: 3, border: '1px solid', borderColor: 'error.main' }}>
                <Box sx={{ p: 2, bgcolor: 'error.light', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WarningIcon color="error" />
                    <Typography variant="h6" color="error.dark">Danger Zone</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Delete Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Once you delete your account, there is no going back. Please be certain.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete My Account
                    </Button>
                </Box>
            </Paper>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon /> Delete Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        This action cannot be undone. This will permanently delete your account and all your data.
                    </DialogContentText>
                    {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Type DELETE to confirm:
                    </Typography>
                    <TextField
                        fullWidth
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        placeholder="DELETE"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleDeleteAccount}
                        color="error"
                        variant="contained"
                        disabled={deleteConfirmText !== 'DELETE'}
                    >
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SettingsPage;
