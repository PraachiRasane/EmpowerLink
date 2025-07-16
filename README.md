# ICECD Faculty Portal

A complete chat and community web application with FastAPI backend and React frontend.

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn sqlmodel python-jose[cryptography] python-multipart
   ```

3. **Run the FastAPI server:**
   ```bash
   python main.py
   ```
   
   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   echo "VITE_BASE_URL=http://localhost:8000" > .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## 🔐 Authentication

The application uses JWT authentication. Demo credentials:

- **Username:** `dr_nisha`
- **Password:** `password`

## 📋 Features

### Backend (FastAPI + SQLModel + SQLite)
- ✅ JWT Authentication
- ✅ User Management
- ✅ Community Management (join/leave)
- ✅ Real-time Messaging (direct & community)
- ✅ Beneficiaries Management
- ✅ Ventures Tracking
- ✅ Success Stories
- ✅ Follow-up Management
- ✅ Dashboard Statistics
- ✅ CORS Support
- ✅ SQLite Database with seeded data

### Frontend (React + Vite)
- ✅ Authentication with login/logout
- ✅ Protected routes
- ✅ Real-time chat interface
- ✅ Community exploration and joining
- ✅ Data tables with filtering
- ✅ Dashboard with statistics
- ✅ Excel export functionality
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling and loading states

## 🗄️ Database Schema

The application includes the following models:
- **Users** - Faculty and beneficiary accounts
- **Communities** - Discussion groups
- **UserCommunity** - Many-to-many relationship for community membership
- **Messages** - Chat messages (direct and community)
- **Beneficiaries** - Training participants
- **Ventures** - Entrepreneurial activities
- **Stories** - Success stories
- **FollowUps** - Progress tracking

## 🔧 API Endpoints

### Authentication
- `POST /login` - User login
- `GET /users/me` - Get current user

### Users
- `GET /users` - Get all users

### Communities
- `GET /communities` - Get all communities
- `POST /communities/{id}/join` - Join community
- `DELETE /communities/{id}/leave` - Leave community

### Messages
- `GET /messages` - Get messages (with receiver_id or community_id)
- `POST /messages` - Send message

### Data Management
- `GET /beneficiaries` - Get beneficiaries with filtering
- `GET /ventures` - Get ventures with filtering
- `GET /stories` - Get stories with filtering
- `GET /follow-ups` - Get follow-ups with filtering
- `POST /stories/{id}/like` - Like a story

### Dashboard
- `GET /dashboard` - Get dashboard statistics

## 🛠️ Development

### Backend Development
- The backend uses SQLModel for type-safe database operations
- JWT tokens are used for authentication
- All endpoints require authentication except `/login`
- Database is automatically created and seeded on startup

### Frontend Development
- Uses Vite for fast development
- Axios for HTTP requests with interceptors for auth
- Environment variables for API configuration
- Error handling and loading states throughout

## 📦 Project Structure

```
├── backend/
│   └── main.py              # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Deployment

### Backend Deployment
1. Install production dependencies
2. Set environment variables for production
3. Use a production ASGI server like Gunicorn

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set the `VITE_BASE_URL` environment variable

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_BASE_URL=http://localhost:8000
```

### Backend
```python
SECRET_KEY = "your-secret-key-change-in-production"
DATABASE_URL = "sqlite:///database.db"
```

## 📝 Notes

- The backend includes seeded data for testing
- All API calls include JWT authentication
- The frontend handles authentication state automatically
- Error handling is implemented throughout the application
- The database is SQLite for simplicity but can be changed to PostgreSQL/MySQL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.