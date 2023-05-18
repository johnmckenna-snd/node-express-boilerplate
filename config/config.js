import 'dotenv/config';

const { NODE_ENV, PORT, SERVICE_NAME } = process.env;

const config = {
  global: {
    NODE_ENV,
  },
  logger: {
    logToConsole: NODE_ENV !== 'production',
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

export default config;
