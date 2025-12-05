import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import getTheme from './theme/theme';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { ROUTES, ROLES } from './utils/constants';

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const StaffDashboard = React.lazy(() => import('./pages/dashboard/StaffDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard'));
const FeedbackSubmission = React.lazy(() => import('./pages/feedback/FeedbackSubmission'));
const FeedbackList = React.lazy(() => import('./pages/feedback/FeedbackList'));
const FeedbackDetails = React.lazy(() => import('./pages/feedback/FeedbackDetails'));
const CategoryManagement = React.lazy(() => import('./pages/admin/CategoryManagement'));
const TagManagement = React.lazy(() => import('./pages/admin/TagManagement'));
const ActivityLog = React.lazy(() => import('./pages/admin/ActivityLog'));
const ProfilePage = React.lazy(() => import('./pages/user/ProfilePage'));
const SettingsPage = React.lazy(() => import('./pages/user/SettingsPage'));
const HelpPage = React.lazy(() => import('./pages/user/HelpPage'));

// Layout component
const MainLayout = React.lazy(() => import('./components/layout/MainLayout'));

// Loading fallback
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh' 
  }}>
    Loading...
  </div>
);

function App() {
  // Theme mode state
  const [mode, setMode] = useState('light');

  // Create theme based on current mode
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Toggle theme mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <React.Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route
                path={ROUTES.LOGIN}
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />

              {/* Private Routes - Wrapped in MainLayout */}
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <MainLayout toggleTheme={toggleTheme} mode={mode}>
                      <Routes>
                        {/* Student Routes */}
                        <Route
                          path={ROUTES.STUDENT_DASHBOARD}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.STUDENT]}>
                              <StudentDashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.SUBMIT_FEEDBACK}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.STUDENT]}>
                              <FeedbackSubmission />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.MY_FEEDBACK}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.STUDENT]}>
                              <FeedbackList />
                            </PrivateRoute>
                          }
                        />

                        {/* Staff Routes */}
                        <Route
                          path={ROUTES.STAFF_DASHBOARD}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.STAFF, ROLES.ADMIN]}>
                              <StaffDashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.ASSIGNED_FEEDBACK}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.STAFF, ROLES.ADMIN]}>
                              <FeedbackList />
                            </PrivateRoute>
                          }
                        />

                        {/* Admin Routes */}
                        <Route
                          path={ROUTES.ADMIN_DASHBOARD}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                              <AdminDashboard />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.ALL_FEEDBACK}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                              <FeedbackList />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.CATEGORY_MANAGEMENT}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                              <CategoryManagement />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.TAG_MANAGEMENT}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                              <TagManagement />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.ACTIVITY_LOG}
                          element={
                            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                              <ActivityLog />
                            </PrivateRoute>
                          }
                        />

                        {/* Common Routes - Accessible to all authenticated users */}
                        <Route
                          path={ROUTES.FEEDBACK_DETAILS}
                          element={
                            <PrivateRoute>
                              <FeedbackDetails />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.PROFILE}
                          element={
                            <PrivateRoute>
                              <ProfilePage />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.SETTINGS}
                          element={
                            <PrivateRoute>
                              <SettingsPage toggleTheme={toggleTheme} mode={mode} />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.HELP}
                          element={
                            <PrivateRoute>
                              <HelpPage />
                            </PrivateRoute>
                          }
                        />

                        {/* Root redirect */}
                        <Route path="/" element={<Navigate to={ROUTES.STUDENT_DASHBOARD} replace />} />

                        {/* 404 Not Found */}
                        <Route path="*" element={<div>404 - Page Not Found</div>} />
                      </Routes>
                    </MainLayout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </React.Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
