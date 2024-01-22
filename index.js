import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import compression from 'compression';

import postRouter from './router/post.routers.js';
import authRouter from './router/auth.routers.js';
import userRouter from './router/user.routers.js';
import docRouter from './router/document.routers.js';
import docTimeTableRouter from './router/documentTimeTable.routers.js';
import docCircleRouter from './router/documentCircle.routers.js';
import galleryRouter from './router/gallery.routers.js';


const app = express();
const allowedOrigins = [
	'http://192.168.88.208',
	'https://192.168.88.208',
	'https://kopachyntsi.if.ua',
	'http://kopachyntsi.if.ua',
	'https://api.kopachyntsi.if.ua',
	'http://api.kopachyntsi.if.ua',
  ];

app.use(express.json());
app.use(fileUpload({}));
app.use(compression());
app.use(cors());
// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Access denied by CORS'));
//     }
//   }
// }));

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


app.listen(5000, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
