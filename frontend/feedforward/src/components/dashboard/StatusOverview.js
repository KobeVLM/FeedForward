import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const StatusOverview = ({ data }) => {
    return (
        <Paper sx={{ p: 3, height: '100%', minHeight: 400, width: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Status Overview
            </Typography>
            <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', width: '580px' }}>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={140}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend 
                                verticalAlign="bottom" 
                                height={50} 
                                wrapperStyle={{ paddingTop: '20px' }} 
                            />
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