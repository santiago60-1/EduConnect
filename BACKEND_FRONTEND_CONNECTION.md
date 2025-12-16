# Backend-Frontend Connection Documentation

## Overview

EduConnect now has a fully integrated backend-frontend connection using JWT authentication. The frontend communicates with the Spring Boot backend API for user authentication and data operations.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Login Page (app/login/page.tsx)                     │   │
│  │  - Calls POST /api/auth/login                        │   │
│  │  - Saves JWT token to localStorage                   │   │
│  │  - Redirects based on user role                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Client (app/lib/api.ts)                         │   │
│  │  - Centralized HTTP requests                         │   │
│  │  - Automatic JWT token injection                     │   │
│  │  - Error handling & 401 redirect                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Auth Hook (app/hooks/useAuth.ts)                    │   │
│  │  - Validates JWT token on protected pages            │   │
│  │  - Checks user role authorization                    │   │
│  │  - Redirects to login if unauthorized                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Spring Boot)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AuthController (infrastructure/api/user/)           │   │
│  │  - POST /api/auth/login                              │   │
│  │  - Returns JWT token + user data                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AuthService (application/service/user/)             │   │
│  │  - Validates credentials                             │   │
│  │  - Generates JWT token                               │   │
│  │  - Returns user information                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  JwtProvider (infrastructure/security/)              │   │
│  │  - Generates JWT tokens                              │   │
│  │  - Validates tokens                                  │   │
│  │  - Extracts user role from token                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  JwtAuthenticationFilter (infrastructure/config/)    │   │
│  │  - Intercepts requests                               │   │
│  │  - Validates JWT token                               │   │
│  │  - Sets security context                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  SecurityConfig (infrastructure/config/)             │   │
│  │  - Configures Spring Security                        │   │
│  │  - Allows public /api/auth/login                     │   │
│  │  - Protects other endpoints                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CorsConfig (infrastructure/config/)                 │   │
│  │  - Allows requests from localhost:3000               │   │
│  │  - Exposes Authorization header                      │   │
│  │  - Allows credentials                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (PostgreSQL)                               │   │
│  │  - Stores user credentials                           │   │
│  │  - Stores user roles                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Files Created/Modified

### Frontend Files

#### 1. **app/lib/api.ts** (NEW)
- Centralized API client
- JWT token management
- Automatic token injection in headers
- Error handling with 401 redirect
- Functions: `apiCall()`, `login()`, `logout()`

#### 2. **app/login/page.tsx** (MODIFIED)
- Updated to use backend API
- Calls `login()` from api.ts
- Saves JWT token and user data
- Role-based redirects

#### 3. **app/hooks/useAuth.ts** (MODIFIED)
- Validates JWT token on protected pages
- Checks user role authorization
- Redirects to login if unauthorized

#### 4. **app/components/LogoutButton.tsx** (NEW)
- Logout button component
- Clears token and redirects to login

#### 5. **middleware.ts** (MODIFIED)
- Protects routes with authentication
- Allows login page without token
- Redirects to login if no token

### Backend Files

#### 1. **src/main/java/com/edu/connect/infrastructure/config/SecurityConfig.java** (NEW)
- Spring Security configuration
- Allows public /api/auth/login endpoint
- Protects other endpoints with JWT
- Integrates JwtAuthenticationFilter

#### 2. **src/main/java/com/edu/connect/infrastructure/api/user/AuthController.java** (MODIFIED)
- Updated login response format
- Returns token, email, and role
- LoginResponse record for type safety

#### 3. **src/main/java/com/edu/connect/infrastructure/config/CorsConfig.java** (EXISTING)
- Already configured for localhost:3000
- Allows all HTTP methods
- Exposes Authorization header

#### 4. **src/main/java/com/edu/connect/infrastructure/config/jwt/JwtAuthenticationFilter.java** (EXISTING)
- Validates JWT tokens
- Sets security context
- Handles token validation errors

#### 5. **src/main/java/com/edu/connect/infrastructure/security/JwtProvider.java** (EXISTING)
- Generates JWT tokens
- Validates tokens
- Extracts user role

### Configuration Files

#### 1. **setup.sh** (NEW)
- Bash setup script for Linux/Mac
- Creates .env.local
- Installs dependencies

#### 2. **setup.bat** (NEW)
- Batch setup script for Windows
- Creates .env.local
- Installs dependencies

#### 3. **SETUP_INSTRUCTIONS.md** (NEW)
- Complete setup guide
- Quick start instructions
- Test credentials
- Troubleshooting

#### 4. **ENV_SETUP.md** (NEW)
- Environment variables documentation
- Configuration guide
- Verification steps

#### 5. **TEST_CONNECTION.md** (NEW)
- Testing procedures
- curl examples
- Postman guide
- Automated testing scripts

## Authentication Flow

### 1. User Login

```
User enters credentials
        ↓
Frontend calls POST /api/auth/login
        ↓
Backend validates credentials
        ↓
Backend generates JWT token
        ↓
Backend returns token + user data
        ↓
Frontend saves token to localStorage
        ↓
Frontend redirects based on role
```

### 2. Protected Request

```
Frontend makes API request
        ↓
API client adds Authorization header with JWT
        ↓
Backend receives request
        ↓
JwtAuthenticationFilter validates token
        ↓
Request processed with user context
        ↓
Response returned to frontend
```

### 3. Token Expiration

```
Token expires (24 hours)
        ↓
Frontend makes request with expired token
        ↓
Backend returns 401 Unauthorized
        ↓
API client detects 401
        ↓
Clears token and redirects to login
```

## Key Features

✅ **JWT Authentication**
- Stateless authentication
- Token-based authorization
- 24-hour expiration

✅ **Automatic Token Management**
- Token saved in localStorage
- Automatically injected in requests
- Cleared on logout

✅ **Role-Based Access**
- Admin, Teacher, Student roles
- Role-based redirects
- Protected routes by role

✅ **Error Handling**
- Network error handling
- 401 unauthorized handling
- User-friendly error messages

✅ **CORS Configuration**
- Allows localhost:3000
- Exposes Authorization header
- Allows credentials

✅ **Security**
- JWT validation
- Spring Security integration
- Protected endpoints

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend (application.properties)

```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/educonnect
spring.datasource.username=postgres
spring.datasource.password=password
```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edu.connect | admin123 |
| Teacher | teacher@edu.connect | teacher123 |
| Student | student@edu.connect | student123 |

## Running the Application

### Terminal 1 - Backend
```bash
mvn spring-boot:run
```

### Terminal 2 - Frontend
```bash
# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html

## Troubleshooting

### CORS Errors
- Check CorsConfig.java allows localhost:3000
- Verify backend is running
- Check .env.local has correct API URL

### Login Fails
- Verify credentials are correct
- Check backend is running
- Check database has user data
- Review backend logs

### Token Issues
- Token expired: Login again
- Invalid token: Clear localStorage and login
- Missing token: Check .env.local configuration

### Network Errors
- Backend not running: `mvn spring-boot:run`
- Port in use: Kill process on port 8080
- CORS blocked: Check CorsConfig.java

## Next Steps

1. ✅ Test login with provided credentials
2. ✅ Verify role-based redirects work
3. ✅ Check protected endpoints with JWT token
4. ✅ Review API documentation at Swagger UI
5. ⏳ Implement additional API endpoints
6. ⏳ Add more role-based features
7. ⏳ Deploy to production

## Support

For issues or questions:
1. Check TEST_CONNECTION.md for testing procedures
2. Review browser console for errors
3. Check backend logs for exceptions
4. Verify environment configuration
