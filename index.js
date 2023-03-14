import express from 'express';
import cors from 'cors';

import postRouter from './router/post.routers.js';
import authRouter from './router/auth.routers.js';

import userRouter from './router/user.routers.js';
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use(express.static('static/users'));

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', userRouter);


app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
