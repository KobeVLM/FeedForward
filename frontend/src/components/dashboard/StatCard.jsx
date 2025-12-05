import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

/**
 * StatCard Component
 * Displays a statistic with icon, title, value, and optional color gradient
 */
const StatCard = ({ title, value, icon: Icon, color, gradient }) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              fontWeight={500}
            >
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={color || 'primary.main'}>
              {value}
            </Typography>
          </Box>
          
          {Icon && (
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: gradient || `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
                boxShadow: 2,
              }}
            >
              <Icon sx={{ fontSize: 32, color: 'white' }} />
            </Avatar>
          )}
        </Box>
      </CardContent>

      {/* Decorative Circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: gradient || color,
          opacity: 0.1,
        }}
      />
    </Card>
  );
};

export default StatCard;
