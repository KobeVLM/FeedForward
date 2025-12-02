import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/navigation/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import FeedbackList from '../pages/feedback/FeedbackList';
import FeedbackDetails from '../pages/feedback/FeedbackDetails';
import FeedbackForm from '../pages/feedback/FeedbackForm';
import CategoryManagement from '../pages/admin/CategoryManagement';
import TagManagement from '../pages/admin/TagManagement';
import ActivityLog from '../pages/admin/ActivityLog';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import HelpPage from '../pages/help/HelpPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <MainLayout>
                        <Navigate to="/dashboard" replace />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <MainLayout>
                        <DashboardPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/feedback" element={
                <ProtectedRoute>
                    <MainLayout>
                        <FeedbackList />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/feedback/new" element={
                <ProtectedRoute>
                    <MainLayout>
                        <FeedbackForm />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/feedback/:id" element={
                <ProtectedRoute>
                    <MainLayout>
                        <FeedbackDetails />
                    </MainLayout>
                </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/categories" element={
                <ProtectedRoute roles={['Admin']}>
                    <MainLayout>
                        <CategoryManagement />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/admin/tags" element={
                <ProtectedRoute roles={['Admin']}>
                    <MainLayout>
                        <TagManagement />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/admin/activity" element={
                <ProtectedRoute roles={['Admin']}>
                    <MainLayout>
                        <ActivityLog />
                    </MainLayout>
                </ProtectedRoute>
            } />

            {/* New Pages */}
            <Route path="/profile" element={
                <ProtectedRoute>
                    <MainLayout>
                        <ProfilePage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/settings" element={
                <ProtectedRoute>
                    <MainLayout>
                        <SettingsPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/help" element={
                <ProtectedRoute>
                    <MainLayout>
                        <HelpPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

        </Routes>
    );
};

export default AppRoutes;
