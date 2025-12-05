import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import {
  Add,
  List,
  Help,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

/**
 * QuickActions Component
 * Provides quick action buttons for common tasks
 */
const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Submit Feedback',
      icon: <Add />,
      route: ROUTES.SUBMIT_FEEDBACK,
      color: 'primary',
    },
    {
      label: 'My Feedback',
      icon: <List />,
      route: ROUTES.MY_FEEDBACK,
      color: 'secondary',
    },
    {
      label: 'Help & FAQ',
      icon: <Help />,
      route: ROUTES.HELP,
      color: 'info',
    },
    {
      label: 'Settings',
      icon: <Settings />,
      route: ROUTES.SETTINGS,
      color: 'default',
    },
  ];

  return (
    <Card elevation={2}>
      <CardHeader
        title="Quick Actions"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid item xs={12} sm={6} key={action.label}>
              <Button
                fullWidth
                variant="outlined"
                color={action.color}
                startIcon={action.icon}
                onClick={() => navigate(action.route)}
                sx={{
                  py: 1.5,
                  justifyContent: 'flex-start',
                  fontWeight: 500,
                  '&:hover': {
                    transform: 'translateX(4px)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
