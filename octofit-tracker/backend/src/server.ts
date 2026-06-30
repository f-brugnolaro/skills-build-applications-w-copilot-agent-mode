import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './config/database';
import activitiesRoutes from './routes/activities';
import healthRoutes from './routes/health';
import leaderboardRoutes from './routes/leaderboard';
import teamsRoutes from './routes/teams';
import usersRoutes from './routes/users';
import workoutsRoutes from './routes/workouts';

dotenv.config();

const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set<string>([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
]);

if (codespaceName) {
  allowedOrigins.add(`https://${codespaceName}-5173.app.github.dev`);
  allowedOrigins.add(`https://${codespaceName}-8000.app.github.dev`);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients like curl requests that have no Origin header.
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  }),
);
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

app.get('/', (_req, res) => {
  res.json({
    name: 'OctoFit Tracker API',
    baseUrl: API_BASE_URL,
    apiRoot: '/api',
  });
});

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on port ${PORT} (${API_BASE_URL})`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
