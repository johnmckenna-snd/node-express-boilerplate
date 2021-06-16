import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { log } from './src/logThemes';
import regeneratorRuntime from 'regenerator-runtime';
// import router from './routes/index';

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(router);

app.get('/health', (req, res) => {
	log.status('Reached health endpoint');
	res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	res.end('Healthy!');
});

process.on('SIGINT', async () => { // for ctrl + c
	process.exit();
});

app.listen(port, (e) => {
	if (e) log.error(`well shoot. unable to start server on port: ${port}`);
	log.status(`Hello, and welcome to node-express-boilerplate! Listening on port: ${port}`);
});
