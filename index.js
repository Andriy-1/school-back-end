import express from 'express';
import cors from 'cors';

import postRouter from './router/post.routers.js';
import authRouter from './router/auth.routers.js';

import userRouter from './router/user.routers.js';
import fileUpload from 'express-fileupload';
import docRouter from './router/document.routers.js';
import docTimeTableRouter from './router/documentTimeTable.routers.js';
import docCircleRouter from './router/documentCircle.routers.js';
import galleryRouter from './router/gallery.routers.js';

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use(express.static('static/users'));
app.use(express.static('static/posts'));
app.use(express.static('static/doc'));
app.use(express.static('static/doc/timeTable'));
app.use(express.static('static/doc/circle'));
app.use(express.static('static/gallery'));

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', userRouter);
app.use('/api', docRouter);
app.use('/api', docTimeTableRouter);
app.use('/api', docCircleRouter);
app.use('/api', galleryRouter);


app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
