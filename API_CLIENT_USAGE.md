# 📚 API Client Usage Guide

## Overview

The frontend API client (`app/lib/api.ts`) provides a centralized way to communicate with the backend. All functions handle JWT authentication automatically.

---

## Authentication Functions

### Login
```typescript
import { login } from '@/app/lib/api';

const response = await login('admin@edu.connect', 'admin123');

if (response.error) {
  console.error('Login failed:', response.error);
} else {
  console.log('Token:', response.token);
  console.log('Role:', response.role);
}
```

### Logout
```typescript
import { logout } from '@/app/lib/api';

logout(); // Clears token and redirects to login
```

---

## User Functions

### Register User
```typescript
import { registerUser } from '@/app/lib/api';

const response = await registerUser(
  'newuser@edu.connect',
  'password123',
  'John Doe',
  'STUDENT'
);

if (!response.error) {
  console.log('User registered:', response);
}
```

### Get User
```typescript
import { getUser } from '@/app/lib/api';

const response = await getUser(1);

if (!response.error) {
  console.log('User:', response);
}
```

### Update User
```typescript
import { updateUser } from '@/app/lib/api';

const response = await updateUser(
  1,
  'newemail@edu.connect',
  'newpassword123'
);

if (!response.error) {
  console.log('User updated:', response);
}
```

---

## Course Functions

### Create Course
```typescript
import { createCourse } from '@/app/lib/api';

const response = await createCourse(
  'Advanced Java',
  'Learn advanced Java concepts',
  1 // teacherId
);

if (!response.error) {
  console.log('Course created:', response);
}
```

### Get My Courses (Teacher)
```typescript
import { getMyCourses } from '@/app/lib/api';

const response = await getMyCourses(1); // userId

if (!response.error) {
  console.log('My courses:', response);
}
```

### Update Course
```typescript
import { updateCourse } from '@/app/lib/api';

const response = await updateCourse(
  1, // courseId
  'Updated Course Name',
  'Updated description'
);

if (!response.error) {
  console.log('Course updated:', response);
}
```

### Delete Course
```typescript
import { deleteCourse } from '@/app/lib/api';

const response = await deleteCourse(1); // courseId

if (!response.error) {
  console.log('Course deleted');
}
```

---

## Student Functions

### Get Student Info
```typescript
import { getStudent } from '@/app/lib/api';

const response = await getStudent(1); // studentId

if (!response.error) {
  console.log('Student:', response);
}
```

---

## Teacher Functions

### Get Teacher Info
```typescript
import { getTeacher } from '@/app/lib/api';

const response = await getTeacher(1); // teacherId

if (!response.error) {
  console.log('Teacher:', response);
}
```

---

## Enrollment Functions

### Enroll in Course
```typescript
import { enrollInCourse } from '@/app/lib/api';

const response = await enrollInCourse(
  1, // studentId
  1  // courseId
);

if (!response.error) {
  console.log('Enrolled:', response);
}
```

---

## Grade Functions

### Create Grade
```typescript
import { createGrade } from '@/app/lib/api';

const response = await createGrade(
  1,    // studentId
  1,    // courseId
  95.5  // grade
);

if (!response.error) {
  console.log('Grade created:', response);
}
```

### Get Grades
```typescript
import { getGrades } from '@/app/lib/api';

// Get all grades
const allGrades = await getGrades();

// Get grades for specific student
const studentGrades = await getGrades(1);

// Get grades for specific course
const courseGrades = await getGrades(undefined, 1);

// Get grades for specific student and course
const specificGrades = await getGrades(1, 1);

if (!allGrades.error) {
  console.log('Grades:', allGrades);
}
```

---

## Task Functions

### Create Task
```typescript
import { createTask } from '@/app/lib/api';

const response = await createTask(
  1,                          // courseId
  'Assignment 1',             // title
  'Complete the assignment',  // description
  '2024-12-25T23:59:59Z'     // dueDate (ISO format)
);

if (!response.error) {
  console.log('Task created:', response);
}
```

### Get Tasks
```typescript
import { getTasks } from '@/app/lib/api';

// Get all tasks
const allTasks = await getTasks();

// Get tasks for specific course
const courseTasks = await getTasks(1); // courseId

if (!allTasks.error) {
  console.log('Tasks:', allTasks);
}
```

---

## Skill Functions

### Create Skill (Admin only)
```typescript
import { createSkill } from '@/app/lib/api';

const response = await createSkill(
  'Java Programming',
  'Core Java programming skills'
);

if (!response.error) {
  console.log('Skill created:', response);
}
```

### Get Skills
```typescript
import { getSkills } from '@/app/lib/api';

const response = await getSkills();

if (!response.error) {
  console.log('Skills:', response);
}
```

---

## Vacancy Functions

### Create Vacancy (Admin only)
```typescript
import { createVacancy } from '@/app/lib/api';

const response = await createVacancy(
  'Senior Java Developer',
  'Looking for experienced Java developers',
  'Tech Corp',
  120000 // salary
);

if (!response.error) {
  console.log('Vacancy created:', response);
}
```

### Get Vacancies
```typescript
import { getVacancies } from '@/app/lib/api';

const response = await getVacancies();

if (!response.error) {
  console.log('Vacancies:', response);
}
```

---

## Error Handling

All API functions return an object with either data or an error:

```typescript
const response = await getUser(1);

if (response.error) {
  // Handle error
  console.error('Error:', response.error);
  // Automatically redirects to login on 401
} else {
  // Handle success
  console.log('Data:', response);
}
```

### Common Errors

- **Network Error**: Backend is not running
- **Invalid email or password**: Wrong credentials
- **Access denied**: Insufficient permissions
- **Resource not found**: ID doesn't exist
- **Unauthorized (401)**: Token expired or invalid (auto-redirects to login)

---

## Authentication

### Automatic JWT Handling

The API client automatically:
- Adds JWT token to all requests (except login)
- Stores token in localStorage
- Removes token on logout
- Redirects to login on 401 Unauthorized

### Manual Token Management

```typescript
// Get token
const token = localStorage.getItem('token');

// Get user data
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Clear token (logout)
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## Usage in Components

### Example: Login Component
```typescript
import { login } from '@/app/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginComponent() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    
    if (response.error) {
      alert('Login failed: ' + response.error);
    } else {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.email,
        role: response.role
      }));
      router.push('/dashboard');
    }
  };

  return (
    // Login form JSX
  );
}
```

### Example: Course List Component
```typescript
import { getMyCourses } from '@/app/lib/api';
import { useEffect, useState } from 'react';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await getMyCourses(user.id);
      
      if (!response.error) {
        setCourses(response);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

---

## Best Practices

1. **Always check for errors**
   ```typescript
   if (response.error) {
     // Handle error
   }
   ```

2. **Use async/await**
   ```typescript
   const response = await getUser(1);
   ```

3. **Store user data in localStorage**
   ```typescript
   localStorage.setItem('user', JSON.stringify(userData));
   ```

4. **Use useAuth hook for protected routes**
   ```typescript
   const { user, loading, authorized } = useAuth('admin');
   ```

5. **Handle loading states**
   ```typescript
   const [loading, setLoading] = useState(true);
   ```

6. **Validate input before sending**
   ```typescript
   if (!email || !password) {
     setError('Email and password are required');
     return;
   }
   ```

---

## API Response Format

All API functions return:

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  token?: string;      // For login
  email?: string;      // For login
  role?: string;       // For login
}
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Change this for different environments:
- Development: `http://localhost:8080/api`
- Production: `https://api.yourdomain.com`

---

## Troubleshooting

### Token not being sent
- Check if token exists in localStorage
- Check if endpoint requires authentication
- Check browser DevTools Network tab

### 401 Unauthorized
- Token may be expired
- User will be redirected to login automatically
- Login again to get new token

### CORS errors
- Check if backend is running
- Check if CORS is configured correctly
- Check API_URL in .env.local

### Network errors
- Check if backend is running on port 8080
- Check if API_URL is correct
- Check browser console for errors

---

## Summary

The API client provides a simple, centralized way to communicate with the backend. All functions handle JWT authentication automatically and provide consistent error handling.

For more information, see:
- API_ENDPOINTS.md - All available endpoints
- BACKEND_FRONTEND_CONNECTION.md - Architecture details
- TEST_CONNECTION.md - Testing procedures
