import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import healthRoutes from './routes/health';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);

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
    await mongoose.connect(MONGODB_URI, {
      dbName: 'octofit_db',
    });

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
