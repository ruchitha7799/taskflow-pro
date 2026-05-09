# 🚀 TaskFlow API

A scalable task management backend system built with Node.js, Express, PostgreSQL, Prisma ORM, JWT Authentication, and Role-Based Access Control (RBAC).

This project demonstrates production-style backend engineering practices including authentication, authorization, validation, Swagger API documentation, and scalable architecture.

---

# 🌐 Live API

## Backend URL
https://YOUR_RENDER_URL.onrender.com

## Swagger Documentation
https://taskflow-api-i4n9.onrender.com/api-docs/#/Auth/post_api_v1_auth_register

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes

## 🛡 Authorization
- Role-Based Access Control (USER / ADMIN)
- Admin-only Routes
- Middleware-based Authorization

## 📋 Task Management
- Create Task
- Get User Tasks
- Update Task
- Delete Task

## ✅ Validation & Security
- Zod Validation
- JWT Token Verification
- Input Sanitization
- Error Handling Middleware

## 📄 Documentation
- Swagger API Documentation
- RESTful API Design

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- Zod

## Documentation
- Swagger UI

## Frontend
- React.js
- Axios

## Deployment
- Render
- Neon PostgreSQL

---

# 📁 Project Structure

```txt
taskflow-pro/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── validations/
│   │   ├── utils/
│   │   └── docs/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
🔐 Authentication Flow
User registers or logs in
Password is hashed using bcrypt
JWT token is generated
Token is sent in Authorization header
Middleware verifies token
Protected routes become accessible
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/YOUR_GITHUB_USERNAME/taskflow-pro.git
🔧 Backend Setup
Move into backend folder
cd backend
Install dependencies
npm install
🗄 Configure Environment Variables

Create .env file inside backend folder:

DATABASE_URL=
JWT_SECRET=
PORT=5000
🧱 Run Prisma Migration
npx prisma migrate dev --name init
▶️ Run Backend Server
npm run dev

Backend runs on:

http://localhost:5000
💻 Frontend Setup
Move into frontend folder
cd frontend
Install dependencies
npm install
Run frontend
npm run dev

Frontend runs on:

http://localhost:5173
📌 API Endpoints
🔐 Authentication APIs
Method	Endpoint	Description
POST	/api/v1/auth/register	Register new user
POST	/api/v1/auth/login	Login user
GET	/api/v1/auth/profile	Get logged-in user profile
📋 Task APIs
Method	Endpoint	Description
POST	/api/v1/tasks	Create task
GET	/api/v1/tasks	Get all user tasks
PUT	/api/v1/tasks/:id	Update task
DELETE	/api/v1/tasks/:id	Delete task
🔑 Authentication Header

Protected routes require JWT token:

Authorization: Bearer YOUR_TOKEN
📄 Swagger API Documentation

Swagger Docs available at:

https://YOUR_RENDER_URL.onrender.com/api-docs

Swagger provides:

Interactive API testing
Request body schemas
Endpoint documentation
JWT authorization testing
🗃 Database Schema
User Model
Field	Type
id	Int
name	String
email	String
password	String
role	USER / ADMIN
createdAt	DateTime
Task Model
Field	Type
id	Int
title	String
description	String
status	PENDING / COMPLETED
userId	Int
createdAt	DateTime
🔒 Security Features
JWT Authentication
Password Hashing
Protected Routes
Role-Based Authorization
Input Validation
Error Handling Middleware
Ownership-based Resource Access
📈 Scalability Notes

This project follows scalable backend architecture principles:

Modular folder structure
Middleware-based authentication
Stateless JWT authentication
Prisma ORM abstraction layer
Centralized validation middleware
Centralized error handling
PostgreSQL relational database
API versioning support
Easily extensible for microservices
Deployment-ready architecture
🚀 Future Improvements

Possible future enhancements:

Redis caching
Refresh Tokens
Docker support
Rate Limiting
CI/CD pipelines
Load balancing
Email verification
Pagination & filtering
Unit & integration testing



👨‍💻 Author
Puru Ruchitha

Backend Developer Intern Assignment Project
