import { MongoClient } from 'mongodb';
import { beginLogging } from '@sndwrks/lumberjack';

import config from '../config/config.js';

const logger = beginLogging({ name: 'mongoDriver.js' });

const {
  MONGO_CONNECTION_STRING,
  MONGO_DATABASE,
} = config.db;

let client = '';

async function dbConnect () {
  const newClient = new MongoClient(MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
  });

  try {
    await newClient.connect();
    logger.info('Connected to Database');

    const collections = await newClient.db().listCollections().toArray();

    logger.debug({ collections });

    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes('document-updates')) {
      await newClient.db().createCollection('document-updates');
      await newClient.db().collection('document-updates').createIndexes([
        {
          key: { clock: 1 },
          name: 'clock',
        },
      ]);
    }

    logger.debug('Collections Created');
  } catch (e) {
    logger.error(e);
  } finally {
    client = newClient;
  }
}

await dbConnect();

const db = client.db(MONGO_DATABASE);

process.on('SIGINT', () => {
  client.close();
});

export async function mongoFind ({ collection, query, options }) {
  logger.debug('mongoDriver mongoFind called');
  try {
    const result = await db.collection(collection).find(query, options).toArray();

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export async function mongoFindDistinct ({
  collection, distinctKey, query, options,
}) {
  try {
    logger.debug({
      collection, distinctKey, query, options,
    });
    const result = await db.collection(collection).distinct(distinctKey, query, options);

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export async function mongoInsert ({ collection, objToInsert }) {
  try {
    logger.debug('mongoDriver mongoInsert called');
    const result = await db.collection(collection).insertOne(objToInsert);

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export async function mongoFindOneAndUpdate ({
  collection, query, objToUpdate, options,
}) {
  logger.debug('mongoDriver mongoFindOneAndUpdate called', {
    collection, query, objToUpdate, options,
  });
  try {
    const result = await db.collection(collection).findOneAndUpdate(query, objToUpdate, options);

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export async function mongoDeleteMany ({ collection, query, options }) {
  logger.debug('mongoDriver mongoDeleteMany Called');
  try {
    const result = await db.collection(collection).deleteMany(query, options);

    return result;
  } catch (e) {
    logger.error(e);
    return null;
  }
}
