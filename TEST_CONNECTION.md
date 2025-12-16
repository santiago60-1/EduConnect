# Testing Backend-Frontend Connection

## Prerequisites

- Backend running on `http://localhost:8080`
- Frontend running on `http://localhost:3000`
- `.env.local` configured with `NEXT_PUBLIC_API_URL=http://localhost:8080/api`

## Test Steps

### 1. Verify Backend is Running

```bash
curl http://localhost:8080/swagger-ui.html
```

Expected: Swagger UI page loads

### 2. Test Login Endpoint Directly

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@edu.connect",
    "password": "admin123"
  }'
```

Expected Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@edu.connect",
  "role": "ADMIN"
}
```

### 3. Test Frontend Login Page

1. Open http://localhost:3000/login
2. Enter credentials:
   - Email: `admin@edu.connect`
   - Password: `admin123`
3. Click "Iniciar Sesión"

Expected: Redirects to `/admin` dashboard

### 4. Test Protected Routes

After logging in:

1. Check browser console (F12) for errors
2. Verify JWT token in localStorage:
   ```javascript
   localStorage.getItem('token')
   localStorage.getItem('user')
   ```
3. Navigate to protected routes (e.g., `/admin`)

### 5. Test Token Validation

Make a request with the token:

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@edu.connect","password":"admin123"}' | jq -r '.token')

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/users
```

Expected: Returns user data (if endpoint exists)

### 6. Test Logout

1. Click logout button in dashboard
2. Verify redirected to `/login`
3. Check localStorage is cleared:
   ```javascript
   localStorage.getItem('token') // Should be null
   localStorage.getItem('user')  // Should be null
   ```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edu.connect | admin123 |
| Teacher | teacher@edu.connect | teacher123 |
| Student | student@edu.connect | student123 |

## Common Issues

### CORS Error
```
Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
- Check `CorsConfig.java` allows `http://localhost:3000`
- Restart backend after changes

### 401 Unauthorized
```
{
  "error": "Invalid email or password"
}
```

**Solution:**
- Verify credentials are correct
- Check database has user data
- Check password encoding matches

### Network Error
```
Error: Failed to fetch
```

**Solution:**
- Verify backend is running: `mvn spring-boot:run`
- Check port 8080 is not in use
- Verify `.env.local` has correct API URL

### Token Expired
```
{
  "error": "Token expired"
}
```

**Solution:**
- Token expires after 24 hours
- Login again to get new token
- Check JWT expiration in `JwtProvider.java`

## Browser DevTools Debugging

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Perform login
4. Check request/response:
   - URL: `http://localhost:8080/api/auth/login`
   - Method: POST
   - Status: 200
   - Response: Contains token

### Check LocalStorage
1. Open DevTools (F12)
2. Go to Application tab
3. Check LocalStorage:
   - `token`: JWT token value
   - `user`: User data JSON

### Check Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors or warnings
4. Check API response logs

## Automated Testing

### Using Postman

1. Create new request
2. Method: POST
3. URL: `http://localhost:8080/api/auth/login`
4. Headers: `Content-Type: application/json`
5. Body (raw):
```json
{
  "email": "admin@edu.connect",
  "password": "admin123"
}
```
6. Send and verify response

### Using curl Script

Create `test-connection.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:8080/api"
EMAIL="admin@edu.connect"
PASSWORD="admin123"

echo "Testing EduConnect Backend-Frontend Connection"
echo "=============================================="

echo ""
echo "1. Testing Backend Health..."
curl -s http://localhost:8080/swagger-ui.html > /dev/null && echo "✅ Backend is running" || echo "❌ Backend is not running"

echo ""
echo "2. Testing Login Endpoint..."
RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $RESPONSE | jq -r '.token')
ROLE=$(echo $RESPONSE | jq -r '.role')

if [ "$TOKEN" != "null" ]; then
  echo "✅ Login successful"
  echo "   Token: ${TOKEN:0:20}..."
  echo "   Role: $ROLE"
else
  echo "❌ Login failed"
  echo "   Response: $RESPONSE"
fi

echo ""
echo "3. Testing Protected Endpoint..."
if [ "$TOKEN" != "null" ]; then
  curl -s -H "Authorization: Bearer $TOKEN" \
    $API_URL/users > /dev/null && echo "✅ Protected endpoint accessible" || echo "❌ Protected endpoint failed"
fi

echo ""
echo "=============================================="
echo "Connection test completed!"
```

Run with: `bash test-connection.sh`

## Success Criteria

✅ All of the following should be true:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Login page loads at http://localhost:3000/login
- [ ] Login with valid credentials succeeds
- [ ] JWT token is saved in localStorage
- [ ] User is redirected to correct dashboard
- [ ] Protected routes require authentication
- [ ] Logout clears token and redirects to login
- [ ] Invalid credentials show error message
- [ ] Token is sent in Authorization header for API requests
