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

## API Endpoints

### Health
- `GET /health`

### Auth
- `POST /api/auth/register`
  - body: `{ "fullName": "...", "email": "...", "password": "...", "role": "student|instructor|admin" }`
- `POST /api/auth/login`
  - body: `{ "email": "...", "password": "..." }`

### Courses
- `GET /api/courses`
- `POST /api/courses` (instructor/admin)
  - Authorization: `Bearer <token>`
  - body: `{ "title": "...", "description": "..." }`

### Enrollments
- `POST /api/enrollments` (student/admin)
  - Authorization: `Bearer <token>`
  - body: `{ "courseId": "..." }`
- `GET /api/enrollments/me` (student/admin)

## Notes

- The app uses `sequelize.sync()` on startup for quick bootstrap.
- For production, prefer Sequelize migrations via `sequelize-cli`.
