import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postRouter from './router/post.routers.js';
import authRouter from './router/auth.routers.js';
import uploadRouter from './router/upload.routers.js';
import userRouter from './router/user.routers.js';
import fileUpload from 'express-fileupload';
mongoose
	.set("strictQuery", false)
	.connect("mongodb+srv://school-admin:school@cluster0.nl2vlfz.mongodb.net/school?retryWrites=true&w=majority")
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(express.static('static/users'));
app.use(fileUpload({}));
app.use(cors());
// app.use('/uploads', express.static('uploads'));

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', userRouter);
// app.use('/api', uploadRouter);

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});
