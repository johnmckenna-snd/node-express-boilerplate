import { Router } from 'express';

import { templateRouter } from './templateRoute.js';

const router = new Router();

router.use('/v1', templateRouter);

export default router;
