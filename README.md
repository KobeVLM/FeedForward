# FeedForward

**A Comprehensive Feedback Management System for Academic Institutions**

FeedForward is a platform designed to collect, categorize, and manage feedback from students and staff. The system efficiently organizes feedback into various entities and relationships to ensure smooth communication and accountability between users and departments.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [GitHub Best Practices](#github-best-practices)
- [Entity Relationship](#entity-relationship)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality

- **User Management**: Students, staff, and administrators with role-based access
- **Feedback Submission**: Comprehensive feedback collection with categorization
- **Department Routing**: Automatic assignment based on organizational structure
- **Status Tracking**: Real-time feedback progress monitoring (Pending → InReview → Responded → Resolved)
- **File Attachments**: Support for document and image uploads
- **Tagging System**: Flexible labeling (Urgent, Suggestion, Complaint)
- **Response Management**: Staff and admin communication tools

### Planned Features

- Authentication and authorization system
- Email notifications for feedback updates
- Auto-assignment based on department rules
- Advanced reporting and analytics
- Mobile-responsive design

## 🛠 Tech Stack

### Backend

- **Framework**: Spring Boot (Java)
- **Dependencies**:
  - Spring Data JPA
  - Spring Web
  - Spring Boot DevTools
  - MySQL Driver
- **Database**: MySQL
- **Build Tool**: Maven

### Frontend

- **Framework**: React (ES6+)
- **UI Library**: Material UI
- **HTTP Client**: Axios
- **Component Style**: Functional components with hooks

## 📁 Project Structure

```
FeedForward/
├── backend/feedforward/          # Spring Boot application
│   ├── src/main/java/com/bibit/feedforward/feedforward/
│   │   ├── entity/              # JPA entities
│   │   ├── repository/          # Data access layer
│   │   ├── service/             # Business logic
│   │   └── controller/          # REST API endpoints
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/feedforward/         # React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service calls
│   │   └── assets/             # Static assets
│   ├── public/
│   └── package.json
├── docs/                        # Documentation
├── .github/
│   └── .copilot-instructions.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/KobeVLM/FeedForward.git
   cd FeedForward/backend/feedforward
   ```

2. **Configure database**

   ```properties
   # Update src/main/resources/application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/feedforward_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend/feedforward
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/v1

## 🔄 Development Workflow

### Branch Strategy

- **main**: Stable, production-ready code
- **feature/[feature-name]**: New feature development
- **fix/[bug-description]**: Bug fixes
- **docs/[doc-update]**: Documentation updates

### Example Branch Names

```bash
feature/login-ui
feature/feedback-api
feature/user-management
fix/login-bug
fix/validation-error
docs/api-documentation
```

### Development Process

1. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Develop and test locally**

   ```bash
   # Make your changes
   git add .
   git commit -m "feat(backend): add feedback submission endpoint"
   ```

3. **Pull latest main before merging**

   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-feature-name
   git rebase main
   ```

4. **Push and create pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 GitHub Best Practices

### Commit Message Format

Follow conventional commit format:

```
<type>(<scope>): <description>

Examples:
feat(backend): add user authentication
fix(frontend): resolve Material UI styling issue
docs: update API documentation
style(ui): improve feedback form layout
refactor(entity): rename database fields
```

### Pull Request Guidelines

- Write clear, descriptive PR titles
- Include summary of changes in PR description
- Test all changes locally before submitting
- Request code review from team members
- Ensure all CI checks pass
- Delete branch after successful merge

### File Naming Conventions

#### Backend (Java)

```
EntityName + Layer + .java
Examples:
- UserEntity.java
- FeedbackRepository.java
- FeedbackService.java
- UserController.java
```

#### Frontend (React)

```
PascalCase for components: LoginPage.jsx
lowercase for folders: components/, pages/, services/
```

## 🗃 Entity Relationship

### Core Entities

- **User**: System users (students, staff, administrators)
- **Role**: Access permissions (Student, Staff, Admin)
- **Department**: Organizational units
- **Feedback**: Central feedback entity with status tracking
- **Category**: Feedback classification (Facilities, Academics, Services)
- **Tag**: Flexible labeling system
- **Response**: Staff/admin replies to feedback
- **Attachment**: File uploads related to feedback

### Key Relationships

- User ↔ Role (many-to-one)
- User ↔ Department (many-to-one)
- Feedback ↔ User (many-to-one for creator)
- Feedback ↔ Category (many-to-one)
- Feedback ↔ Tag (many-to-many)
- Feedback ↔ Response (one-to-many)
- Feedback ↔ Attachment (one-to-many)

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

### Response Format

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Operation completed successfully"
}
```

### Example Endpoints

```bash
GET    /api/v1/feedbacks          # Get all feedback
POST   /api/v1/feedbacks          # Create new feedback
GET    /api/v1/feedbacks/{id}     # Get specific feedback
PUT    /api/v1/feedbacks/{id}     # Update feedback
DELETE /api/v1/feedbacks/{id}     # Delete feedback

GET    /api/v1/users              # Get all users
POST   /api/v1/users              # Create new user
GET    /api/v1/categories         # Get all categories
POST   /api/v1/responses          # Add response to feedback
```

## 🤝 Contributing

### Code Style Guidelines

- **Java**: Follow standard Java naming conventions
- **JavaScript**: Use ES6+ features, camelCase for variables, PascalCase for components
- **Indentation**: 2 spaces for JavaScript, 4 spaces for Java
- **Comments**: Document complex business logic and public methods

### Testing

- Write unit tests for service layer methods
- Test API endpoints with integration tests
- Ensure frontend components render correctly

### Documentation

- Update README for new features
- Document API changes
- Include inline comments for complex logic
- Update Copilot instructions when adding new patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Project Status

**Current Phase**: Development

- ✅ Project structure setup
- ✅ Entity design completion
- 🔄 Backend API development
- 🔄 Frontend UI implementation
- ⏳ Authentication system
- ⏳ Testing implementation
- ⏳ Deployment configuration

---

**Developed with ❤️ by the FeedForward Team**
