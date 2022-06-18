import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts-routes.js';
import userRoutes from './routes/user-routes.js';

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Welcome to Memories API');
});

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
	)
	.catch(err => console.error(err.message));
