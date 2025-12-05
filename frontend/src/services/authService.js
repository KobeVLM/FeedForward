import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

const authService = {
  /**
   * Login user with email and password
   * @param {Object} credentials - { email, password, rememberMe }
   * @returns {Promise<Object>} User data and token
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    
    const { token, user } = response.data;
    
    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    // Store remember me preference
    if (credentials.rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    }
    
    return { token, user };
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, department, role }
   * @returns {Promise<Object>} User data and token
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    const { token, user } = response.data;
    
    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return { token, user };
  },

  /**
   * Logout current user
   */
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return !!token;
  },

  /**
   * Get current auth token
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  /**
   * Refresh user data from server
   * @returns {Promise<Object>} Updated user data
   */
  refreshUser: async () => {
    const response = await api.get('/auth/me');
    const user = response.data;
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  /**
   * Update password
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @returns {Promise<Object>}
   */
  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise<Object>}
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password with token
   * @param {Object} resetData - { token, newPassword }
   * @returns {Promise<Object>}
   */
  resetPassword: async (resetData) => {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  },
};

export default authService;
