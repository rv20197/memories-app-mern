import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts-routes.js';

const CONNECTION_URL =
	'mongodb+srv://vatsal:vatsal2001@nodejslearning.yc4og.mongodb.net/memories?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
	)
	.catch(err => console.error(err.message));
