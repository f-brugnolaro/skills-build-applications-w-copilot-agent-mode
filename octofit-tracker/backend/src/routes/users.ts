import { Router } from 'express';

import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ name: 1 });

  res.json({
    resource: 'users',
    data: users,
  });
});

export default router;