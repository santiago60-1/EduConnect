# 🚀 EduConnect - Setup Instructions

## Backend-Frontend Connection Complete ✅

The backend and frontend are now connected with JWT authentication.

### Prerequisites
- Java 17+
- Node.js 18+
- Maven
- npm

### Quick Start

#### Option 1: Windows (PowerShell)
```powershell
# Run setup script
.\setup.bat
```

#### Option 2: Linux/Mac
```bash
# Run setup script
chmod +x setup.sh
./setup.sh
```

#### Option 3: Manual Setup

**Terminal 1 - Backend:**
```bash
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Swagger Documentation:** http://localhost:8080/swagger-ui.html

### Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edu.connect | admin123 |
| Teacher | teacher@edu.connect | teacher123 |
| Student | student@edu.connect | student123 |

### What's Connected

✅ **Frontend (`app/lib/api.ts`)**
- API client with JWT token handling
- Automatic token management in localStorage
- Error handling and response parsing

✅ **Login Page (`app/login/page.tsx`)**
- Calls backend `/api/auth/login` endpoint
- Saves JWT token and user data
- Redirects based on user role

✅ **Auth Hook (`app/hooks/useAuth.ts`)**
- Validates JWT token on protected pages
- Checks user role authorization
- Redirects to login if unauthorized

✅ **Backend Security (`SecurityConfig.java`)**
- CORS configured for localhost:3000
- JWT authentication filter
- Public login endpoint
- Protected API endpoints

✅ **Authentication Flow**
1. User enters credentials on login page
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials and generates JWT token
4. Frontend saves token and user data
5. Frontend redirects based on user role
6. JWT token sent in Authorization header for protected requests

### Troubleshooting

**Port already in use:**
```bash
# Backend (8080)
lsof -i :8080
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

**CORS errors:**
- Ensure backend is running on http://localhost:8080
- Check `.env.local` has correct API URL
- Verify CORS configuration in SecurityConfig.java

**Login fails:**
- Check backend is running
- Verify credentials in test table above
- Check browser console for error messages
- Check backend logs for exceptions

### Next Steps

1. Test login with provided credentials
2. Verify role-based redirects work
3. Check protected endpoints with JWT token
4. Review API documentation at Swagger UI
