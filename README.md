# FounderFocus

FounderFocus is a full-stack productivity app for founders to track coding consistency, execution quality, and startup tasks.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (register/login)
- **AI:** OpenAI API summary for daily logs
- **Testing:** Jest + Supertest
- **Containerization:** Docker + Docker Compose

## Architecture Notes
- The backend is split by module responsibility (`controllers`, `models`, `routes`, `middleware`, `utils`) to keep each layer single-purpose.
- Score calculation is in a pure utility (`utils/score.js`) for deterministic unit testing.
- `app.js` composes middleware and feature routes; `server.js` handles only process/bootstrap concerns.

## Project Structure
```
founderfocus/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── Dockerfile
│   └── package.json
├── .env.example
├── docker-compose.yml
└── README.md
```

## Environment Variables
1. Copy `.env.example` to `.env`.
2. Fill in required values (especially `JWT_SECRET` and `OPENAI_API_KEY`).

## Local Setup
### 1) Backend
```bash
cd backend
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) Run tests
```bash
cd backend
npm test
```

## Docker Setup
```bash
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`
- MongoDB: `mongodb://localhost:27017`

## Deployment (Render / Railway)
### Render
- Create **Web Service** for backend (`backend/`) and another for frontend (`frontend/`).
- Set environment variables from `.env.example`.
- Backend start command: `npm start`
- Frontend build command: `npm run build`
- Frontend publish directory: `dist`

### Railway
- Create one project with 3 services: backend, frontend, mongodb.
- Add all environment variables.
- Backend command: `npm start`
- Frontend command: `npm run build && npm run preview -- --host 0.0.0.0 --port $PORT`

## Feature Checklist
- ✅ JWT login/register
- ✅ Role-based access (`admin`, `user`)
- ✅ Rate limiting middleware
- ✅ Dashboard (tasks + coding logs + weekly score)
- ✅ 7-day productivity chart
- ✅ OpenAI daily log summarization API
- ✅ Unit tests
- ✅ Docker setup
