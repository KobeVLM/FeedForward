import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { STATUS_COLORS } from '../../utils/constants';

/**
 * StatusChart Component
 * Displays a pie chart of feedback status distribution
 */
const StatusChart = ({ data = [] }) => {
  // Define colors for each status
  const COLORS = {
    PENDING: '#ff9800',
    IN_REVIEW: '#03a9f4',
    IN_PROGRESS: '#1976d2',
    RESOLVED: '#4caf50',
    CLOSED: '#9e9e9e',
    REJECTED: '#f44336',
  };

  // Transform data for chart if needed
  const chartData = data.length > 0 
    ? data 
    : [
        { name: 'Pending', value: 0 },
        { name: 'In Review', value: 0 },
        { name: 'In Progress', value: 0 },
        { name: 'Resolved', value: 0 },
      ];

  const totalFeedback = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardHeader
        title="Status Distribution"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent>
        {totalFeedback === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={300}
          >
            <Typography variant="body2" color="text.secondary">
              No feedback data available
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : null
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name.toUpperCase().replace(' ', '_')] || '#8884d8'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusChart;
