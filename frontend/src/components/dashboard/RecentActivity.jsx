import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Typography,
  Divider,
} from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { STATUS_COLORS } from '../../utils/constants';
import { format } from 'date-fns';

/**
 * RecentActivity Component
 * Displays a list of recent feedback activities
 */
const RecentActivity = ({ activities = [], maxItems = 5 }) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card elevation={2}>
      <CardHeader
        title="Recent Activity"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        {displayActivities.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 4 }}
          >
            No recent activity
          </Typography>
        ) : (
          <List>
            {displayActivities.map((activity, index) => (
              <React.Fragment key={activity.id || index}>
                <ListItem
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    <FiberManualRecord
                      sx={{
                        fontSize: 12,
                        color: `${STATUS_COLORS[activity.status] || 'default'}.main`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      activity.createdAt
                        ? format(new Date(activity.createdAt), 'MMM dd, yyyy hh:mm a')
                        : 'Just now'
                    }
                    primaryTypographyProps={{
                      fontWeight: 500,
                      noWrap: true,
                    }}
                  />
                  <Chip
                    label={activity.status}
                    size="small"
                    color={STATUS_COLORS[activity.status] || 'default'}
                    sx={{ ml: 1 }}
                  />
                </ListItem>
                {index < displayActivities.length - 1 && <Divider variant="inset" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
