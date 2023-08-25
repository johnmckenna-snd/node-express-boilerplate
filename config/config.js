import 'dotenv/config';
import { configureLogger } from '@sndwrks/lumberjack';

const { NODE_ENV, PORT, SERVICE_NAME } = process.env;

const config = {
  global: {
    NODE_ENV,
  },
  logger: {
    logToConsole: {
      enabled: NODE_ENV !== 'production',
      type: 'pretty',
    },
    logToFiles: false,
    logLevel: NODE_ENV === 'production' ? 'http' : 'silly',
    service: SERVICE_NAME || 'node-express-boilerplate',
    lokiConfig: {
      sendLogs: false,
      apiKey: null,
      host: null,
      username: null,
      logCacheLimit: 10,
    },
  },
  server: {
    PORT: PORT || 4000,
  },
};

configureLogger(config.logger);

export default config;
