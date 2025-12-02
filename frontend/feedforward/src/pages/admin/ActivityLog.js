import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TextField,
    MenuItem,
    CircularProgress,
    TablePagination
} from '@mui/material';
import api from '../../api/axios';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        action: 'all',
        role: 'all'
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        loadLogs();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [logs, filter]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            const res = await api.get('/activity-logs');
            setLogs(res.data);
        } catch (error) {
            console.error('Failed to load activity logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...logs];

        if (filter.action !== 'all') {
            filtered = filtered.filter(log => log.actionType === filter.action);
        }

        if (filter.role !== 'all') {
            filtered = filtered.filter(log => log.user?.role?.name === filter.role || log.user?.role === filter.role);
        }

        setFilteredLogs(filtered);
        setPage(0);
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'CREATE_FEEDBACK': return 'primary';
            case 'ADD_RESPONSE': return 'success';
            case 'UPDATE_STATUS': return 'info';
            case 'CREATE_CATEGORY': return 'secondary';
            default: return 'default';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin': return 'error';
            case 'Staff': return 'warning';
            case 'Student': return 'info';
            default: return 'default';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    const paginatedLogs = filteredLogs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Activity Log
                </Typography>
                <Typography color="text.secondary">
                    Monitor all user activities and system events
                </Typography>
            </Box>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            select
                            label="Filter by Action"
                            value={filter.action}
                            onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="all">All Actions</MenuItem>
                            <MenuItem value="CREATE_FEEDBACK">Create Feedback</MenuItem>
                            <MenuItem value="ADD_RESPONSE">Add Response</MenuItem>
                            <MenuItem value="UPDATE_STATUS">Update Status</MenuItem>
                            <MenuItem value="CREATE_CATEGORY">Create Category</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Filter by Role"
                            value={filter.role}
                            onChange={(e) => setFilter({ ...filter, role: e.target.value })}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="all">All Roles</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Student">Student</MenuItem>
                        </TextField>
                    </Box>
                </CardContent>
            </Card>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedLogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography color="text.secondary" sx={{ py: 4 }}>
                                        No activity logs found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedLogs.map((log) => (
                                <TableRow key={log.logId || log.id} hover>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{log.user?.displayName || log.user?.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={log.user?.role?.name || log.user?.role}
                                            size="small"
                                            color={getRoleColor(log.user?.role?.name || log.user?.role)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={log.actionType}
                                            size="small"
                                            color={getActionColor(log.actionType)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {log.details}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredLogs.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </TableContainer>
        </Box>
    );
};

export default ActivityLog;
