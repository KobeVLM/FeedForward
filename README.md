# FeedForward - Feedback Management System

A full-stack feedback management application with React frontend and Spring Boot backend.

## System Architecture

- **Frontend**: React (Material UI) - `http://localhost:3000`
- **Backend**: Spring Boot (REST API) - `http://localhost:8080`
- **Database**: H2 (in-memory for development)

## Prerequisites

- **Java 17+** (for backend)
- **Maven 3.6+** (for backend)
- **Node.js 16+** and **npm** (for frontend)

## Quick Start Guide for Teammates

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd FeedForward
```

### 2️⃣ Start Backend (Run First)

Navigate to the backend directory and start the Spring Boot server:

```bash
cd backend/feedforward
mvn spring-boot:run
```

✅ **Backend will run on:** `http://localhost:8080`

**Wait for this message:**
```
Started FeedforwardApplication in X.XXX seconds
```

### 3️⃣ Start Frontend (Run Second)

Open a **new terminal**, navigate to the frontend directory, and start the React app:

```bash
cd frontend/feedforward
npm install    # First time only
npm start
```

✅ **Frontend will run on:** `http://localhost:3000`

Your browser should automatically open to `http://localhost:3000`

---

## Default Ports & URLs

| Service  | URL                              | Port |
|----------|----------------------------------|------|
| Frontend | http://localhost:3000            | 3000 |
| Backend  | http://localhost:8080            | 8080 |
| API Base | http://localhost:8080/api        | 8080 |
| H2 Console | http://localhost:8080/h2-console | 8080 |

---

## User Roles & Testing

The system has **3 user roles** pre-seeded in the database:

1. **Student** - Can submit and view their own feedback
2. **Staff** - Can review and respond to feedback
3. **Admin** - Full system access

### Test Accounts

Register new users through the registration page at `http://localhost:3000/register`

**Available Departments:**
- Computer Science
- Engineering
- Business
- Arts & Sciences

**Available Roles:**
- Student
- Staff
- Admin

---

## Development Notes

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.x
- **Database**: H2 (in-memory) - data resets on restart
- **Data Seeding**: Automatic on startup (roles, departments, categories, tags)
- **CORS**: Configured to allow `http://localhost:3000`

### Frontend (React)

- **Framework**: React 18
- **UI Library**: Material UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API

### API Endpoints

**Authentication:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

**Resources:**
- `GET/POST /api/users` - User management
- `GET/POST /api/feedback` - Feedback operations
- `GET/POST /api/categories` - Category management
- `GET/POST /api/tags` - Tag management
- `GET /api/departments` - Department list
- `GET /api/roles` - Role list

---

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Find and kill the process using port 8080
netstat -ano | findstr :8080
taskkill /PID <process_id> /F
```

**Maven build errors:**
```bash
mvn clean install
```

### Frontend Issues

**Port 3000 already in use:**
- Choose a different port when prompted, or
- Kill the process using port 3000

**Dependencies not installed:**
```bash
cd frontend/feedforward
npm install
```

**CORS errors:**
- Ensure backend is running first
- Check that backend URL in frontend matches: `http://localhost:8080/api`

---

## Project Structure

```
FeedForward/
├── backend/
│   └── feedforward/
│       ├── src/main/java/.../
│       │   ├── controller/     # REST API endpoints
│       │   ├── service/        # Business logic
│       │   ├── repository/     # Database access
│       │   ├── entity/         # Database models
│       │   └── dto/            # Data transfer objects
│       └── pom.xml
│
└── frontend/
    └── feedforward/
        ├── src/
        │   ├── components/     # Reusable UI components
        │   ├── pages/          # Page components
        │   ├── context/        # React Context (Auth)
        │   ├── api/            # Axios configuration
        │   └── utils/          # Constants and helpers
        └── package.json
```

---

## Important Notes

⚠️ **Dev Mode Authentication**: Currently using simple authentication without JWT tokens or password hashing. **DO NOT use in production!**

⚠️ **Database**: H2 in-memory database means all data is lost when backend restarts. For persistence, configure a different database in `application.properties`.

---

## Need Help?

- Check if both backend and frontend are running
- Verify ports are not blocked by firewall
- Check browser console for frontend errors
- Check terminal/console for backend errors
- Ensure you're accessing `http://localhost:3000` (not a different URL)
