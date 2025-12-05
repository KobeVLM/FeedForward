// API Base URL
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// User Roles
export const ROLES = {
  STUDENT: 'Student',
  STAFF: 'Staff',
  ADMIN: 'Admin',
};

// Feedback Categories
export const FEEDBACK_CATEGORIES = [
  'Academic',
  'Infrastructure',
  'Administration',
  'Facilities',
  'Library',
  'Canteen',
  'Sports',
  'Events',
  'Other',
];

// Feedback Status
export const FEEDBACK_STATUS = {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  REJECTED: 'REJECTED',
};

// Status Colors for badges
export const STATUS_COLORS = {
  PENDING: 'warning',
  IN_REVIEW: 'info',
  IN_PROGRESS: 'primary',
  RESOLVED: 'success',
  CLOSED: 'default',
  REJECTED: 'error',
};

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

// Priority Colors
export const PRIORITY_COLORS = {
  LOW: 'success',
  MEDIUM: 'info',
  HIGH: 'warning',
  CRITICAL: 'error',
};

// Departments/Colleges
export const DEPARTMENTS = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Natural Sciences',
  'Arts and Humanities',
  'Medicine',
  'Law',
  'Education',
  'Social Sciences',
  'Mathematics',
];

// Routes
export const ROUTES = {
  // Public
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Student
  STUDENT_DASHBOARD: '/dashboard',
  SUBMIT_FEEDBACK: '/feedback/submit',
  MY_FEEDBACK: '/feedback/my-feedback',
  FEEDBACK_DETAILS: '/feedback/:id',
  
  // Staff
  STAFF_DASHBOARD: '/staff/dashboard',
  ASSIGNED_FEEDBACK: '/staff/feedback',
  
  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ALL_FEEDBACK: '/admin/feedback',
  CATEGORY_MANAGEMENT: '/admin/categories',
  TAG_MANAGEMENT: '/admin/tags',
  ACTIVITY_LOG: '/admin/activity-log',
  USER_MANAGEMENT: '/admin/users',
  
  // Common
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  NOT_FOUND: '*',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'feedforward_token',
  USER: 'feedforward_user',
  THEME: 'feedforward_theme',
  REMEMBER_ME: 'feedforward_remember_me',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

// Date Formats
export const DATE_FORMAT = 'MMM DD, YYYY';
export const DATE_TIME_FORMAT = 'MMM DD, YYYY hh:mm A';

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
