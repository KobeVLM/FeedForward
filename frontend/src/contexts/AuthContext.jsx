import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

// Create Auth Context
export const AuthContext = createContext(null);

/**
 * AuthProvider component
 * Manages authentication state and provides auth methods to children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication state from localStorage
   */
  const initializeAuth = () => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear potentially corrupted data
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - { email, password, rememberMe }
   */
  const login = useCallback(async (credentials) => {
    try {
      const { user: userData, token } = await authService.login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.',
      };
    }
  }, []);

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, department, role }
   */
  const register = useCallback(async (userData) => {
    try {
      const { user: newUser, token } = await authService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.',
      };
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Refresh user data from server
   */
  const refreshUser = useCallback(async () => {
    try {
      const updatedUser = await authService.refreshUser();
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error refreshing user:', error);
      return {
        success: false,
        message: error.message || 'Failed to refresh user data.',
      };
    }
  }, []);

  /**
   * Update password
   * @param {Object} passwordData - { currentPassword, newPassword }
   */
  const updatePassword = useCallback(async (passwordData) => {
    try {
      await authService.updatePassword(passwordData);
      return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
      console.error('Error updating password:', error);
      return {
        success: false,
        message: error.message || 'Failed to update password.',
      };
    }
  }, []);

  /**
   * Check if user has a specific role
   * @param {string|string[]} roles - Role or array of roles
   * @returns {boolean}
   */
  const hasRole = useCallback(
    (roles) => {
      if (!user) return false;
      
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    },
    [user]
  );

  /**
   * Check if user is admin
   * @returns {boolean}
   */
  const isAdmin = useCallback(() => {
    return user?.role === 'ADMIN';
  }, [user]);

  /**
   * Check if user is staff
   * @returns {boolean}
   */
  const isStaff = useCallback(() => {
    return user?.role === 'STAFF';
  }, [user]);

  /**
   * Check if user is student
   * @returns {boolean}
   */
  const isStudent = useCallback(() => {
    return user?.role === 'STUDENT';
  }, [user]);

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updatePassword,
    hasRole,
    isAdmin,
    isStaff,
    isStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
