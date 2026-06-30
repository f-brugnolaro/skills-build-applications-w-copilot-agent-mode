import { Router } from 'express';

import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ focus: 1, title: 1 });

  res.json({
    resource: 'workouts',
    data: workouts,
  });
});

export default router;