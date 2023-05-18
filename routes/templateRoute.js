import { Router } from 'express';
import { beginLogging } from '@sndwrks/lumberjack';

import { checkEmailInQuery } from './validators.js';

const router = new Router();
const logger = beginLogging({ name: 'templateRoute.js' });

router.get('/template', checkEmailInQuery(), async (req, res) => {
  try {
    const { email } = req.query;

    res.status(200).send({ email });
  } catch (e) {
    logger.error(e);
    res.status(500).send(null, [{ message: 'Awe shucks this route failed', detail: e.message }]);
  }
});

// eslint-disable-next-line import/prefer-default-export
export { router as templateRouter };
