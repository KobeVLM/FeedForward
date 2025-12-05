# FeedForward - Frontend Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/                    # Static assets (images, icons)
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/                # Reusable UI components
│   │   ├── common/                # Shared components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── AppBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── feedback/              # Feedback-specific components
│   │   │   ├── FeedbackCard.jsx
│   │   │   ├── FeedbackTable.jsx
│   │   │   ├── FeedbackFilter.jsx
│   │   │   ├── CommentThread.jsx
│   │   │   └── StatusTimeline.jsx
│   │   │
│   │   └── dashboard/             # Dashboard widgets
│   │       ├── StatCard.jsx
│   │       ├── QuickActions.jsx
│   │       ├── RecentActivity.jsx
│   │       └── StatusChart.jsx
│   │
│   ├── pages/                     # Page components (11 modules)
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── feedback/
│   │   │   ├── FeedbackSubmission.jsx
│   │   │   ├── FeedbackList.jsx
│   │   │   └── FeedbackDetails.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── CategoryManagement.jsx
│   │   │   ├── TagManagement.jsx
│   │   │   └── ActivityLog.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── HelpPage.jsx
│   │   │
│   │   └── NotFoundPage.jsx
│   │
│   ├── contexts/                  # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useFeedback.js
│   │   ├── useCategory.js
│   │   ├── useTag.js
│   │   ├── useActivityLog.js
│   │   ├── useNotification.js
│   │   └── useDebounce.js
│   │
│   ├── services/                  # API service layer (Axios)
│   │   ├── api.js                 # Axios instance & interceptors
│   │   ├── authService.js
│   │   ├── feedbackService.js
│   │   ├── categoryService.js
│   │   ├── tagService.js
│   │   ├── activityLogService.js
│   │   ├── userService.js
│   │   └── fileService.js
│   │
│   ├── utils/                     # Utility functions
│   │   ├── constants.js           # App constants
│   │   ├── validators.js          # Form validation
│   │   ├── formatters.js          # Data formatting
│   │   └── helpers.js             # Helper functions
│   │
│   ├── routes/                    # Routing configuration
│   │   ├── AppRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── theme/                     # MUI theme configuration
│   │   ├── theme.js               # createTheme config
│   │   ├── lightTheme.js
│   │   └── darkTheme.js
│   │
│   ├── App.jsx                    # Root component
│   ├── index.js                   # Entry point
│   └── App.css                    # Global styles
│
├── package.json
├── .env.example
├── .env
├── .gitignore
└── README.md
```

## Architecture Principles

### 1. Service Layer
- All HTTP requests isolated in `services/` folder
- No direct Axios calls in components
- Centralized error handling

### 2. Custom Hooks
- Bridge between services and UI
- Encapsulate business logic
- Reusable state management

### 3. Context API
- Global state: Auth, Theme, Notifications
- Avoid prop drilling
- Clean component interfaces

### 4. Layout Pattern
- `MainLayout` wraps private routes
- Consistent navigation structure
- Role-based sidebar rendering

### 5. Responsive Design
- MUI Grid system
- Breakpoint-aware components
- Mobile-first approach
