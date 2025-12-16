#!/bin/bash

echo "🚀 EduConnect Setup"
echo "=================="

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
npm install

echo ""
echo " Setup Complete!"
echo ""
echo " To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd apps/backend (if reorganized) or stay in root"
echo "  ./mvnw spring-boot:run"
echo ""
echo "Terminal 2 - Frontend:"
echo "  npm run dev"
echo ""
echo " Test Credentials:"
echo "  Admin: admin@edu.connect / admin123"
echo "  Teacher: teacher@edu.connect / teacher123"
echo "  Student: student@edu.connect / student123"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "📚 Backend API: http://localhost:8080/api"
echo "📖 Swagger: http://localhost:8080/swagger-ui.html"
