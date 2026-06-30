import { Router } from 'express';

import { Team } from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().sort({ weeklyPoints: -1 });

  res.json({
    resource: 'teams',
    data: teams,
  });
});

export default router;