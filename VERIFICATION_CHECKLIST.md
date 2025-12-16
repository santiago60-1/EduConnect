# ✅ Backend-Frontend Connection Verification Checklist

## Pre-Setup Verification

- [ ] Java 17+ installed: `java -version`
- [ ] Maven installed: `mvn -version`
- [ ] Node.js 18+ installed: `node -v`
- [ ] npm installed: `npm -v`
- [ ] PostgreSQL running (if using database)
- [ ] Port 8080 available (backend)
- [ ] Port 3000 available (frontend)

## Setup Verification

### Backend Setup

- [ ] Navigate to project root
- [ ] Run `mvn spring-boot:run`
- [ ] Backend starts without errors
- [ ] No port conflicts
- [ ] Database connection successful
- [ ] Swagger UI loads at http://localhost:8080/swagger-ui.html

### Frontend Setup

- [ ] Navigate to project root
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Frontend starts without errors
- [ ] No module not found errors
- [ ] Dev server running on http://localhost:3000

## File Verification

### Frontend Files Created/Modified

- [ ] `app/lib/api.ts` exists and contains:
  - [ ] `apiCall()` function
  - [ ] `login()` function
  - [ ] `logout()` function
  - [ ] JWT token injection
  - [ ] Error handling

- [ ] `app/login/page.tsx` modified to:
  - [ ] Import from `app/lib/api`
  - [ ] Call `login()` function
  - [ ] Save token to localStorage
  - [ ] Redirect based on role

- [ ] `app/hooks/useAuth.ts` modified to:
  - [ ] Check for JWT token
  - [ ] Validate user role
  - [ ] Redirect to login if unauthorized

- [ ] `app/components/LogoutButton.tsx` exists with:
  - [ ] Logout button
  - [ ] Calls `logout()` function
  - [ ] Proper styling

- [ ] `middleware.ts` modified to:
  - [ ] Protect routes
  - [ ] Allow login page
  - [ ] Redirect to login if no token

### Backend Files Created/Modified

- [ ] `SecurityConfig.java` created with:
  - [ ] Spring Security configuration
  - [ ] JWT filter integration
  - [ ] Public `/api/auth/login` endpoint
  - [ ] Protected other endpoints

- [ ] `AuthController.java` modified to:
  - [ ] Return `LoginResponse` record
  - [ ] Include token, email, role
  - [ ] Proper response format

- [ ] `CorsConfig.java` exists with:
  - [ ] localhost:3000 allowed
  - [ ] Authorization header exposed
  - [ ] Credentials allowed

- [ ] `JwtAuthenticationFilter.java` exists with:
  - [ ] Token validation
  - [ ] Security context setting

- [ ] `JwtProvider.java` exists with:
  - [ ] Token generation
  - [ ] Token validation
  - [ ] Role extraction

### Documentation Files

- [ ] `SETUP_INSTRUCTIONS.md` created
- [ ] `ENV_SETUP.md` created
- [ ] `TEST_CONNECTION.md` created
- [ ] `BACKEND_FRONTEND_CONNECTION.md` created
- [ ] `CONNECTION_SUMMARY.md` created
- [ ] `setup.sh` created
- [ ] `setup.bat` created

## Functionality Verification

### Login Flow

- [ ] Navigate to http://localhost:3000/login
- [ ] Login page loads without errors
- [ ] Form displays correctly
- [ ] Enter valid credentials (admin@edu.connect / admin123)
- [ ] Click "Iniciar Sesión"
- [ ] Request sent to backend
- [ ] Response received with token
- [ ] Token saved to localStorage
- [ ] User data saved to localStorage
- [ ] Redirected to `/admin` dashboard
- [ ] No console errors

### Token Management

- [ ] Open browser DevTools (F12)
- [ ] Go to Application → LocalStorage
- [ ] Check `token` key exists
- [ ] Check `user` key exists
- [ ] Token is valid JWT format
- [ ] User data is valid JSON

### Protected Routes

- [ ] Logout (clear localStorage)
- [ ] Try to access `/admin` directly
- [ ] Should redirect to `/login`
- [ ] Try to access `/profesor/mis-cursos` without token
- [ ] Should redirect to `/login`
- [ ] Try to access `/estudiante/mis-cursos` without token
- [ ] Should redirect to `/login`

### Role-Based Redirects

- [ ] Login as admin (admin@edu.connect)
- [ ] Should redirect to `/admin`
- [ ] Logout
- [ ] Login as teacher (teacher@edu.connect)
- [ ] Should redirect to `/profesor/mis-cursos`
- [ ] Logout
- [ ] Login as student (student@edu.connect)
- [ ] Should redirect to `/estudiante/mis-cursos`

### API Requests

- [ ] Make authenticated API request
- [ ] Authorization header includes Bearer token
- [ ] Request succeeds with 200 status
- [ ] Response contains expected data
- [ ] Make request with invalid token
- [ ] Should return 401 Unauthorized
- [ ] Frontend redirects to login

### Error Handling

- [ ] Enter invalid credentials
- [ ] Should show error message
- [ ] Error message is user-friendly
- [ ] Backend not running
- [ ] Should show network error
- [ ] Invalid token
- [ ] Should redirect to login

### Logout Functionality

- [ ] Click logout button
- [ ] Token removed from localStorage
- [ ] User data removed from localStorage
- [ ] Redirected to `/login`
- [ ] Cannot access protected routes

## CORS Verification

- [ ] No CORS errors in console
- [ ] Authorization header sent in requests
- [ ] Credentials allowed in requests
- [ ] Preflight requests successful

## Security Verification

- [ ] JWT token not exposed in URL
- [ ] Token stored in localStorage (not cookies for now)
- [ ] Token not logged in console
- [ ] Password not stored in localStorage
- [ ] HTTPS ready for production
- [ ] CORS restricted to allowed origins

## Performance Verification

- [ ] Login completes in < 2 seconds
- [ ] API requests complete in < 1 second
- [ ] No memory leaks in browser
- [ ] No unnecessary re-renders
- [ ] No console warnings

## Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Database Verification

- [ ] Test user exists in database
- [ ] User password hash matches
- [ ] User role is correct
- [ ] Database connection successful

## Deployment Readiness

- [ ] All files committed to git
- [ ] No hardcoded secrets
- [ ] Environment variables documented
- [ ] Setup instructions complete
- [ ] Testing procedures documented
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Ready for production deployment

## Final Checks

- [ ] All tests pass
- [ ] No console errors
- [ ] No console warnings
- [ ] Documentation complete
- [ ] Setup scripts work
- [ ] All credentials tested
- [ ] All roles tested
- [ ] All routes tested
- [ ] All error cases tested
- [ ] Performance acceptable

---

## Sign-Off

**Verified By:** ________________  
**Date:** ________________  
**Status:** ✅ READY FOR PRODUCTION

---

## Notes

Use this checklist to verify the backend-frontend connection is working correctly before deploying to production.

If any item fails, refer to:
- SETUP_INSTRUCTIONS.md for setup issues
- TEST_CONNECTION.md for testing procedures
- BACKEND_FRONTEND_CONNECTION.md for architecture details
