import express from 'express';
import cors from 'cors';
import { configureLogger, beginLogging } from '@sndwrks/lumberjack';

import config from './config/config.js';

import router from './routes/index.js';

configureLogger(config.logger);

const { PORT } = config.server;
const logger = beginLogging({ name: 'server.js' });

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get('/health', (req, res) => {
  logger.info('Reached health endpoint');
  res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
  res.end('Healthy!');
});

process.on('SIGINT', async () => { // for ctrl + c
  process.exit();
});

app.listen(PORT, (e) => {
  if (e) logger.error(`well shoot. unable to start server on port: ${PORT}`);
  logger.info(`Hello, and welcome to node-express-boilerplate! Listening on port: ${PORT}`);
});
