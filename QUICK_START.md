# 🚀 EduConnect - Quick Start Guide

## 30-Second Setup

### Windows
```powershell
.\setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

---

## Manual Setup (2 Minutes)

### Terminal 1: Backend
```bash
mvn spring-boot:run
```

### Terminal 2: Frontend
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
npm install
npm run dev
```

---

## Login & Test (1 Minute)

1. Open http://localhost:3000/login
2. Use credentials:
   ```
   Email: admin@edu.connect
   Password: admin123
   ```
3. Click "Iniciar Sesión"
4. Should see admin dashboard

---

## Test All Roles

### Admin
- Email: `admin@edu.connect`
- Password: `admin123`
- Redirects to: `/admin`

### Teacher
- Email: `teacher@edu.connect`
- Password: `teacher123`
- Redirects to: `/profesor/mis-cursos`

### Student
- Email: `student@edu.connect`
- Password: `student123`
- Redirects to: `/estudiante/mis-cursos`

---

## Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080/api |
| API Docs | http://localhost:8080/swagger-ui.html |

---

## Troubleshooting

### Backend won't start
```bash
# Kill process on port 8080
lsof -i :8080
kill -9 <PID>
```

### Frontend won't start
```bash
# Clear and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### CORS errors
- Check `.env.local` has correct API URL
- Verify backend is running
- Check backend logs

### Login fails
- Verify credentials are correct
- Check backend is running
- Check browser console for errors

---

## Documentation

- **Setup Details:** See `SETUP_INSTRUCTIONS.md`
- **Testing Guide:** See `TEST_CONNECTION.md`
- **Architecture:** See `BACKEND_FRONTEND_CONNECTION.md`
- **Verification:** See `VERIFICATION_CHECKLIST.md`
- **Summary:** See `CONNECTION_SUMMARY.md`

---

## What's Connected

✅ Frontend calls backend API for authentication
✅ JWT tokens saved and managed automatically
✅ Protected routes with role-based access
✅ CORS configured for localhost:3000
✅ Error handling and redirects
✅ Logout functionality

---

## Next Steps

1. Test login with all 3 credentials
2. Verify role-based redirects work
3. Check protected routes
4. Review API documentation
5. Deploy when ready

---

**Status:** ✅ Ready to Use

For detailed information, see the documentation files in the root directory.
