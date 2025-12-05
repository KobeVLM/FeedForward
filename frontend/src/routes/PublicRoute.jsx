import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

/**
 * PublicRoute component
 * Redirects authenticated users away from public pages (e.g., login, register)
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated && user) {
    const redirectMap = {
      STUDENT: ROUTES.STUDENT_DASHBOARD,
      STAFF: ROUTES.STAFF_DASHBOARD,
      ADMIN: ROUTES.ADMIN_DASHBOARD,
    };
    
    const redirectTo = redirectMap[user.role] || ROUTES.STUDENT_DASHBOARD;
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, show public page
  return children;
};

export default PublicRoute;
