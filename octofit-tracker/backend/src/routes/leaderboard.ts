import { Router } from 'express';

import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });

  res.json({
    resource: 'leaderboard',
    data: leaderboard,
  });
});

export default router;