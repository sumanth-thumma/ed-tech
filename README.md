# EdTech Backend API (Production-Ready)

Node.js + Express + TypeScript + PostgreSQL + Sequelize backend for an EdTech platform.

## Features
- JWT auth with role-based access (`student`, `instructor`, `admin`)
- Controller → service → model → route architecture
- Course, section, lesson management
- Enrollments and lesson progress tracking
- Instructor dashboard analytics
- Reviews and ratings
- Search/filter/pagination for courses
- File uploads via Multer
- Security stack: Helmet, CORS, rate limiting, validation, centralized error handling

## Tech Stack
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT + bcryptjs
- Zod

## Project Structure
```
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  validations/
```

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Required Database Tables
Implemented with Sequelize models + associations:
- users
- courses
- sections
- lessons
- enrollments
- lesson_progress
- reviews

## Authentication
JWT payload includes:
- `sub` (user id)
- `role`

Pass token as:
`Authorization: Bearer <token>`

---

## Complete Endpoints + Sample Data

Base URL: `http://localhost:5000`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

Register sample:
```json
{
  "fullName": "Alice Instructor",
  "email": "alice@example.com",
  "password": "Password123",
  "role": "instructor"
}
```

Login sample:
```json
{
  "email": "alice@example.com",
  "password": "Password123"
}
```

### Users
- `GET /users/me`
- `PUT /users/me`
- `PUT /users/change-password`
- `GET /users/me/courses`
- `GET /users` (admin)
- `DELETE /users/:id` (admin)

Update profile sample:
```json
{
  "fullName": "Alice Updated",
  "bio": "Senior instructor",
  "avatar": "https://example.com/avatar.png"
}
```

Change password sample:
```json
{
  "currentPassword": "Password123",
  "newPassword": "NewStrongPass123"
}
```

### Courses
- `POST /courses` (instructor/admin)
- `GET /courses`
- `GET /courses/:id`
- `PUT /courses/:id` (owner/admin)
- `DELETE /courses/:id` (owner/admin)
- `GET /instructor/courses` (instructor/admin)
- `GET /instructor/dashboard` (instructor/admin)
- `GET /courses/:id/reviews`

Create course sample:
```json
{
  "title": "Mastering TypeScript",
  "description": "Build production-grade APIs with TS and Node.",
  "category": "programming",
  "price": 59.99,
  "thumbnail": "https://example.com/ts-course.png"
}
```

Course search examples:
- `GET /courses?search=react`
- `GET /courses?category=programming&page=2&limit=10`
- `GET /courses?sort=newest`

### Sections
- `POST /sections`
- `PUT /sections/:id`
- `DELETE /sections/:id`

Create section sample:
```json
{
  "courseId": "<courseId>",
  "title": "Getting Started",
  "order": 1
}
```

### Lessons
- `POST /lessons`
- `PUT /lessons/:id`
- `DELETE /lessons/:id`
- `GET /lessons/:id`

Create lesson sample:
```json
{
  "sectionId": "<sectionId>",
  "title": "Intro to TypeScript",
  "videoUrl": "https://example.com/video.mp4",
  "content": "Lesson notes",
  "order": 1,
  "isPreview": true
}
```

### Enrollments
- `POST /enrollments`
- `GET /enrollments/my-courses`

Enroll sample:
```json
{
  "courseId": "<courseId>"
}
```

### Progress
- `POST /progress/complete`
- `GET /progress/course/:courseId`

Complete lesson sample:
```json
{
  "lessonId": "<lessonId>"
}
```

Progress response:
```json
{
  "totalLessons": 10,
  "completedLessons": 6,
  "progress": 60
}
```

### Reviews
- `POST /reviews`
- `DELETE /reviews/:id`
- `GET /courses/:id/reviews`

Review sample:
```json
{
  "courseId": "<courseId>",
  "rating": 5,
  "comment": "Excellent course"
}
```

### Upload
- `POST /upload` (multipart/form-data)
- Field name: `file`

---

## Status Codes
- `200` OK
- `201` Created
- `204` No Content
- `400` Validation error
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `500` Internal Server Error

## Next.js + TanStack Query Readiness
- JSON-first predictable responses
- pagination-ready course listing endpoint
- JWT Bearer auth compatible with client interceptors
- modular route layout for feature-based query keys
