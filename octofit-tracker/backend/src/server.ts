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
const PORT = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

app.get('/', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    apiRoot: '/api',
  });
});

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
