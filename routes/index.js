import express from 'express'
import { weather } from './v1/weather';

const router = express.Router();

router.use('/v1/weather', weather);

export default router;
