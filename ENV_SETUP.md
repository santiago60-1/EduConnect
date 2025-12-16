# Environment Setup for EduConnect

## Frontend Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Environment Variables Explained

- **NEXT_PUBLIC_API_URL**: The base URL for the backend API
  - Development: `http://localhost:8080/api`
  - Production: `https://your-api-domain.com/api`

## Backend Configuration

The backend uses Spring Boot and reads configuration from `application.properties` or `application.yml`.

### Default Backend Settings

- **Server Port**: 8080
- **API Base Path**: `/api`
- **Database**: PostgreSQL (configured in application.properties)
- **JWT Secret**: Configured in `JwtProvider.java`

## Quick Setup

### Windows (PowerShell)
```powershell
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

### Linux/Mac
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

## Verification

After setup, verify the connection:

1. **Backend Running**: http://localhost:8080/swagger-ui.html
2. **Frontend Running**: http://localhost:3000
3. **Login Page**: http://localhost:3000/login
4. **Test Login**: Use credentials from SETUP_INSTRUCTIONS.md

## Troubleshooting

### CORS Errors
- Ensure `.env.local` has correct API URL
- Check backend CORS configuration in `CorsConfig.java`
- Verify backend is running on port 8080

### Connection Refused
- Backend not running: `mvn spring-boot:run`
- Check if port 8080 is in use: `lsof -i :8080`

### Module Not Found Errors
- Run `npm install` to install dependencies
- Clear node_modules: `rm -rf node_modules && npm install`
