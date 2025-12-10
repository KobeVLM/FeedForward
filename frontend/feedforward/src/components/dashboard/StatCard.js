import React from 'react';
import { Card, CardContent, Box, Avatar, Typography } from '@mui/material';

const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden', width: '300px' }}>
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                p: 2,
                opacity: 0.1,
                transform: 'scale(1.5) translate(10%, -10%)',
                color: color
            }}
        >
            {icon}
        </Box>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: `${color}15`, color: color, mr: 2 }}>
                    {icon}
                </Avatar>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
            </Box>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

export default StatCard;
