import { beginLogging } from '@sndwrks/lumberjack';
import { v4 as uuidv4 } from 'uuid';

const logger = beginLogging({ name: 'contextAndLog.js' });

function contextAndLog () {
  return (req, res, next) => {
    const requestId = uuidv4();
    const endpoint = req.originalUrl;
    req.context = {
      requestId,
      endpoint,
    };

    logger.verbose({ body: req.body, headers: req.headers });
    logger.http({ context: { requestId, endpoint } });

    next();
  };
}

export default contextAndLog;
