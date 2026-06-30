import { Router } from 'express';

import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().sort({ activityDate: -1 });

  res.json({
    resource: 'activities',
    data: activities,
  });
});

export default router;