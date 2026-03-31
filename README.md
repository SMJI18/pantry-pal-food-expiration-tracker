# Pantry Pal - Fixed Version

## Issues Fixed:
1. ✅ Missing authentication functions in API service
2. ✅ Backend not loading environment variables properly
3. ✅ Mock login replaced with real authentication
4. ✅ Added missing registerUser function
5. ✅ Fixed API endpoint consistency
6. ✅ Added JWT_SECRET to environment variables
7. ✅ Added JWT authentication middleware
8. ✅ Made items user-specific (each user sees only their items)
9. ✅ Fixed PORT configuration from environment variables
10. ✅ Added proper authorization headers to frontend API calls

## Quick Start

### Option 1: Use the Batch Script (Recommended)
```bash
# Double-click start.bat or run in command prompt:
start.bat
```

### Option 2: Manual Setup

#### Backend Setup:
```bash
cd backend
npm install
node setup_db.js  # Initialize database
npm run dev       # Start backend server
```

#### Frontend Setup:
```bash
cd frontend
npm install
npm run dev       # Start frontend server
```

## Prerequisites
- Node.js (v16+)
- MySQL Server running on localhost:3306
- MySQL credentials: root/7979816917

## URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Database Configuration
The app uses MySQL with these settings (in backend/.env):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=7979816917
DB_NAME=pantry_pal_db
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

## Troubleshooting

### 1. Database Connection Issues
```bash
# Run database setup
cd backend
node setup_db.js
```

### 2. Port Already in Use
- Backend (5000): Change PORT in backend/.env
- Frontend (5173): Vite will auto-assign next available port

### 3. Authentication Not Working
- Clear browser localStorage
- Check if backend server is running on port 5000
- Verify JWT_SECRET is set in .env

### 4. Items Not Loading
- Check browser console for API errors
- Verify backend is running and accessible
- Run database setup script

### 5. CORS Issues
- Backend already has CORS enabled
- If issues persist, check if both servers are running

## Features Working:
- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Add/Edit/Delete Items
- ✅ Search & Filter Items
- ✅ Expiry Date Tracking
- ✅ Dark Mode Support
- ✅ Responsive Design

## Test the Application:
1. Register a new user
2. Login with credentials
3. Add some pantry items
4. Test search and filtering
5. Edit/delete items
6. Check expiry warnings

If you encounter any issues, check the browser console and backend terminal for error messages.