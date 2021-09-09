import express from 'express';
import { log } from '../../src/logThemes';

const currentWeatherExample = require('./oneCall.json');

const router = express.Router();

const NODE_ENV = process.env.NODE_ENV || 'development'

router.get('/current', async (req, res) => {
	log.status(`GET weather/current`);
	try {
		let result;
		if (NODE_ENV === 'development') {
			const current = currentWeatherExample.current;
			const future = currentWeatherExample.hourly[0];
			const time = currentWeatherExample.current.dt;
			const currentTime = new Date(time * 1000);
			console.log(`Request Time: ${currentTime.toLocaleTimeString('en-US')}`);
			result = {
				requestTime: currentTime,
				current: current,
				future: future
			};
		}
		if (NODE_ENV === 'production') {
			
		}


		res.status(200).send(result);
	} catch (e) {
		log.error(e);
		res.status(500).send({error: e});
	}
});

export { router as weather };
