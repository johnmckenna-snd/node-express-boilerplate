import { beginLogging } from '@sndwrks/lumberjack';

const logger = beginLogging({ name: 'logErrors.js' });

function logErrors () {
  return (err, req, res, next) => {
    if (err instanceof Error) logger.error(err.stack);
    if (res.headersSent) {
      next();
    } else {
      res.status(500).send(null, [{ message: 'Unhandled Server Error', detail: err.stack }]);
      next();
    }
  };
}

export default logErrors;
