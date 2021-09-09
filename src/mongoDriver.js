import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
	const url = process.env.MONGO_DB_URL || 'mongodb://10.0.0.148:27017/';
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	try {
		await client.connect();
		console.log('connected to cluster');
		return client;
	} catch (err) {
		console.log(err);
	}
};

export const mongoDBGetAddress = async ({targetDB, targetCollection, query}) => {
	console.log('Here I go getting the address again:', query);
	try {
		const client = await dbConnect();
		const db = client.db(targetDB);
		console.log(`connected to db: ${db.namespace}`);
		const result = await db.collection(targetCollection);
		await client.close();
		console.log('disconnected from db');
		return result;
	} catch (err) {
		console.log(err);
	}
};
