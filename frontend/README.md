# FeedForward - Frontend

A modern, responsive School Feedback Management System built with React and Material UI.

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **Material UI v5** - Component library with custom theming
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API communication
- **Recharts** - Chart library for data visualization

## Architecture

The project follows **Clean Architecture** principles:

- **Service Layer** (`/src/services`) - All API calls isolated here
- **Custom Hooks** (`/src/hooks`) - Bridge between services and UI
- **Context API** (`/src/contexts`) - Global state management
- **Components** (`/src/components`) - Reusable UI components
- **Pages** (`/src/pages`) - Route-specific page components

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder organization.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

## Features

### 11 Core Modules

1. ✅ **Authentication** - Login & Registration
2. 📊 **Dashboards** - Role-based (Student/Staff/Admin)
3. 📝 **Feedback Submission** - Rich form with file upload
4. 📋 **Feedback List** - Table with filters and pagination
5. 🔍 **Feedback Details** - Full view with comments
6. 🏷️ **Category Management** - CRUD for categories
7. 🔖 **Tag Management** - CRUD for tags
8. 📜 **Activity Log** - System audit trail
9. 👤 **Profile** - User profile management
10. ⚙️ **Settings** - Theme, password, preferences
11. ❓ **Help/FAQ** - User documentation

## Role-Based Access

- **Students** - Submit and track their feedback
- **Staff** - Review and respond to assigned feedback
- **Admins** - Full system management and oversight

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API URL | `http://localhost:8080/api` |
| `REACT_APP_NAME` | Application name | `FeedForward` |
| `REACT_APP_VERSION` | Application version | `1.0.0` |

## License

Proprietary - School Feedback Management System
