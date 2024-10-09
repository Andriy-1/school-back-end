import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger.js';
import morgan from 'morgan';

import postRouter from './routes/post.routers.js';
import authRouter from './routes/auth.routers.js';
import userRouter from './routes/user.routers.js';
import docRouter from './routes/document.routers.js';
import docTimeTableRouter from './routes/documentTimeTable.routers.js';
import docCircleRouter from './routes/documentCircle.routers.js';
import galleryRouter from './routes/gallery.routers.js';
import docCategoriesRouter from './routes/documentCategories.routers.js';
import postCategoriesRouter from './routes/postCategories.routers.js';


const app = express();
const allowedOrigins = [
	'http://localhost:3000',
	'http://192.168.88.208',
	'https://192.168.88.208',
	'https://kopachyntsi.if.ua',
	'http://kopachyntsi.if.ua',
	'https://api.kopachyntsi.if.ua',
	'http://api.kopachyntsi.if.ua',
];

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({}));
app.use(compression());
app.use(cors({
	origin: function (origin, callback) {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Access denied by CORS'));
		}
	}
}));

app.use(express.static('static/users'));
app.use(express.static('static/posts'));
app.use(express.static('static/doc'));
app.use(express.static('static/doc/timeTable'));
app.use(express.static('static/doc/circle'));
app.use(express.static('static/gallery'));

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', postCategoriesRouter);
app.use('/api', userRouter);
app.use('/api', docRouter);
app.use('/api', docCategoriesRouter);
app.use('/api', docTimeTableRouter);
app.use('/api', docCircleRouter);
app.use('/api', galleryRouter);


app.listen(5000, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
