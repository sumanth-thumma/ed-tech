# EdTech Backend (Node + Express + PostgreSQL + Sequelize + JWT)

This project provides a backend API for an EdTech platform with:

- User registration and login with JWT auth
- Role-based authorization (student, instructor, admin)
- Course creation/listing
- Student enrollments

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT (jsonwebtoken)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL credentials.

4. Run the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

---

## Complete Endpoint List

Base URL: `http://localhost:5000`

### 1) Health Check

- **GET** `/health`
- **Auth required:** No

### 2) Auth Endpoints

- **POST** `/api/auth/register`
- **Auth required:** No

- **POST** `/api/auth/login`
- **Auth required:** No

### 3) Course Endpoints

- **GET** `/api/courses`
- **Auth required:** No

- **POST** `/api/courses`
- **Auth required:** Yes (role: `instructor` or `admin`)

### 4) Enrollment Endpoints

- **POST** `/api/enrollments`
- **Auth required:** Yes (role: `student` or `admin`)

- **GET** `/api/enrollments/me`
- **Auth required:** Yes (role: `student` or `admin`)

---

## Sample Data + Test Requests

> Use these sample payloads directly in Postman/Insomnia or with `curl`.

### A. Health Check

```bash
curl -X GET http://localhost:5000/health
```

Expected response:

```json
{
  "message": "EdTech backend is running"
}
```

---

### B. Register Users (Sample Data)

#### 1) Register Instructor

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Alice Instructor",
    "email": "alice.instructor@example.com",
    "password": "Password123!",
    "role": "instructor"
  }'
```

#### 2) Register Student

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Bob Student",
    "email": "bob.student@example.com",
    "password": "Password123!",
    "role": "student"
  }'
```

#### 3) Register Admin (optional)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Charlie Admin",
    "email": "charlie.admin@example.com",
    "password": "Password123!",
    "role": "admin"
  }'
```

---

### C. Login Users and Save Tokens

#### 1) Instructor Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice.instructor@example.com",
    "password": "Password123!"
  }'
```

Copy the returned `token` as `INSTRUCTOR_TOKEN`.

#### 2) Student Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "bob.student@example.com",
    "password": "Password123!"
  }'
```

Copy the returned `token` as `STUDENT_TOKEN`.

---

### D. Create Course (Instructor/Admin Only)

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer INSTRUCTOR_TOKEN" \
  -d '{
    "title": "Node.js for Beginners",
    "description": "Learn Node.js fundamentals, Express APIs, and project structure."
  }'
```

Copy returned `id` as `COURSE_ID`.

---

### E. List Courses (Public)

```bash
curl -X GET http://localhost:5000/api/courses
```

This response includes created courses and instructor basic info.

---

### F. Enroll Student in a Course

```bash
curl -X POST http://localhost:5000/api/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STUDENT_TOKEN" \
  -d '{
    "courseId": "COURSE_ID"
  }'
```

---

### G. Get My Enrollments

```bash
curl -X GET http://localhost:5000/api/enrollments/me \
  -H "Authorization: Bearer STUDENT_TOKEN"
```

---

## Quick Postman Variables (Optional)

You can set these variables in Postman for easier testing:

- `baseUrl` = `http://localhost:5000`
- `instructorEmail` = `alice.instructor@example.com`
- `studentEmail` = `bob.student@example.com`
- `password` = `Password123!`
- `instructorToken` = `<paste token after login>`
- `studentToken` = `<paste token after login>`
- `courseId` = `<paste course id after course creation>`

---

## Notes

- The app uses `sequelize.sync()` on startup for quick bootstrap.
- For production, prefer Sequelize migrations via `sequelize-cli`.
