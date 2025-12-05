import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '../utils/constants';

/**
 * PrivateRoute component
 * Protects routes that require authentication
 * Optionally restricts access by role
 */
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user, hasRole } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    // Redirect to appropriate dashboard based on user role
    const redirectMap = {
      STUDENT: ROUTES.STUDENT_DASHBOARD,
      STAFF: ROUTES.STAFF_DASHBOARD,
      ADMIN: ROUTES.ADMIN_DASHBOARD,
    };
    
    const redirectTo = redirectMap[user?.role] || ROUTES.STUDENT_DASHBOARD;
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated and has required role
  return children;
};

export default PrivateRoute;
