import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const StatusOverview = ({ data }) => {
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Status Overview
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography color="text.secondary">No data to display</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default StatusOverview;
