# 🔌 EduConnect API Endpoints

## Base URL
```
http://localhost:8080/api
```

## Authentication Endpoints

### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "admin@edu.connect",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@edu.connect",
  "role": "ADMIN"
}
```

**Status:** ✅ Public - No authentication required

---

## User Endpoints

### Register User
```
POST /api/users
Content-Type: application/json

Request:
{
  "email": "newuser@edu.connect",
  "password": "password123",
  "name": "New User",
  "role": "STUDENT"
}

Response:
{
  "id": 1,
  "email": "newuser@edu.connect",
  "name": "New User",
  "role": "STUDENT"
}
```

**Status:** ✅ Public - No authentication required

### Get User by ID
```
GET /api/users/{id}
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "email": "user@edu.connect",
  "name": "User Name",
  "role": "STUDENT"
}
```

**Status:** 🔒 Protected - Requires JWT token

### Update User
```
PUT /api/users/{id}
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "email": "updated@edu.connect",
  "password": "newpassword123"
}

Response:
{
  "id": 1,
  "email": "updated@edu.connect",
  "name": "User Name",
  "role": "STUDENT"
}
```

**Status:** 🔒 Protected - Requires JWT token

---

## Course Endpoints

### Create Course
```
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "name": "Advanced Java",
  "description": "Learn advanced Java concepts",
  "teacherId": 1
}

Response:
{
  "id": 1,
  "name": "Advanced Java",
  "description": "Learn advanced Java concepts",
  "teacherId": 1
}
```

**Status:** 🔒 Protected - Requires TEACHER role

### Get My Courses
```
GET /api/courses/my?userId=1
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "name": "Advanced Java",
    "description": "Learn advanced Java concepts",
    "teacherId": 1
  }
]
```

**Status:** 🔒 Protected - Requires TEACHER role

### Update Course
```
PUT /api/courses/{id}
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "name": "Updated Course Name",
  "description": "Updated description"
}

Response:
{
  "id": 1,
  "name": "Updated Course Name",
  "description": "Updated description",
  "teacherId": 1
}
```

**Status:** 🔒 Protected - Requires TEACHER role

### Delete Course
```
DELETE /api/courses/{id}
Authorization: Bearer <token>

Response: 204 No Content
```

**Status:** 🔒 Protected - Requires TEACHER role

---

## Student Endpoints

### Get Student Info
```
GET /api/students/{id}
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "userId": 1,
  "enrolledCourses": 5,
  "completedCourses": 2
}
```

**Status:** 🔒 Protected - Requires JWT token

---

## Teacher Endpoints

### Get Teacher Info
```
GET /api/teachers/{id}
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "userId": 1,
  "totalCourses": 3,
  "totalStudents": 45
}
```

**Status:** 🔒 Protected - Requires JWT token

---

## Enrollment Endpoints

### Enroll in Course
```
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "studentId": 1,
  "courseId": 1
}

Response:
{
  "id": 1,
  "studentId": 1,
  "courseId": 1,
  "enrollmentDate": "2024-12-16T10:00:00Z"
}
```

**Status:** 🔒 Protected - Requires JWT token

---

## Grade Endpoints

### Create Grade
```
POST /api/grades
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "studentId": 1,
  "courseId": 1,
  "grade": 95.5
}

Response:
{
  "id": 1,
  "studentId": 1,
  "courseId": 1,
  "grade": 95.5
}
```

**Status:** 🔒 Protected - Requires TEACHER role

### Get Grades
```
GET /api/grades?studentId=1&courseId=1
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "studentId": 1,
    "courseId": 1,
    "grade": 95.5
  }
]
```

**Status:** 🔒 Protected - Requires JWT token

---

## Task Endpoints

### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "courseId": 1,
  "title": "Assignment 1",
  "description": "Complete the assignment",
  "dueDate": "2024-12-25T23:59:59Z"
}

Response:
{
  "id": 1,
  "courseId": 1,
  "title": "Assignment 1",
  "description": "Complete the assignment",
  "dueDate": "2024-12-25T23:59:59Z"
}
```

**Status:** 🔒 Protected - Requires TEACHER role

### Get Tasks
```
GET /api/tasks?courseId=1
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "courseId": 1,
    "title": "Assignment 1",
    "description": "Complete the assignment",
    "dueDate": "2024-12-25T23:59:59Z"
  }
]
```

**Status:** 🔒 Protected - Requires JWT token

---

## Skill Endpoints

### Create Skill
```
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "name": "Java Programming",
  "description": "Core Java programming skills"
}

Response:
{
  "id": 1,
  "name": "Java Programming",
  "description": "Core Java programming skills"
}
```

**Status:** 🔒 Protected - Requires ADMIN role

### Get Skills
```
GET /api/skills
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "name": "Java Programming",
    "description": "Core Java programming skills"
  }
]
```

**Status:** 🔒 Protected - Requires JWT token

---

## Vacancy Endpoints

### Create Vacancy
```
POST /api/vacancies
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "title": "Senior Java Developer",
  "description": "Looking for experienced Java developers",
  "company": "Tech Corp",
  "salary": 120000
}

Response:
{
  "id": 1,
  "title": "Senior Java Developer",
  "description": "Looking for experienced Java developers",
  "company": "Tech Corp",
  "salary": 120000
}
```

**Status:** 🔒 Protected - Requires ADMIN role

### Get Vacancies
```
GET /api/vacancies
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "title": "Senior Java Developer",
    "description": "Looking for experienced Java developers",
    "company": "Tech Corp",
    "salary": 120000
  }
]
```

**Status:** 🔒 Protected - Requires JWT token

---

## Documentation

### Swagger UI
```
GET http://localhost:8080/swagger-ui.html
```

Access interactive API documentation

### OpenAPI JSON
```
GET http://localhost:8080/v3/api-docs
```

Get OpenAPI specification

---

## Authentication

### JWT Token Format
```
Authorization: Bearer <token>
```

### Token Expiration
- 24 hours from generation
- After expiration, user must login again

### Token Validation
- Token is validated on every protected request
- Invalid or expired tokens return 401 Unauthorized
- Frontend automatically redirects to login on 401

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "message": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found",
  "message": "User with id 999 not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## Testing Endpoints with curl

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@edu.connect","password":"admin123"}'
```

### Get User (with token)
```bash
TOKEN="your_jwt_token_here"
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Create Course (with token)
```bash
TOKEN="your_jwt_token_here"
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "New Course",
    "description": "Course description",
    "teacherId": 1
  }'
```

---

## Role-Based Access Control

### ADMIN
- Create/Update/Delete vacancies
- Create/Update/Delete skills
- Manage all users
- View all data

### TEACHER
- Create/Update/Delete courses
- Create/Update/Delete tasks
- View student enrollments
- Create/Update grades

### STUDENT
- View enrolled courses
- View tasks
- View grades
- Update own profile

---

## Status Legend

- ✅ **Public** - No authentication required
- 🔒 **Protected** - Requires JWT token
- 👤 **Role-based** - Requires specific role

---

**Last Updated:** December 16, 2024  
**API Version:** 1.0
