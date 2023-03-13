import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from "multer";

import postRouter from './router/post.routers.js';
import authRouter from './router/auth.routers.js';
// import uploadRouter from './router/upload.routers.js';
import userRouter from './router/user.routers.js';
import fileUpload from 'express-fileupload';

 mongoose
 	.set("strictQuery", false)
 	.connect("mongodb+srv://school-admin:school@cluster0.nl2vlfz.mongodb.net/school?retryWrites=true&w=majority")
 	.then(() => console.log('DB ok'))
 	.catch((err) => console.log('DB error', err));
const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use(express.static('static/users'));

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', userRouter);


// const storage = multer.diskStorage({
// 	destination: (_, __, cb) => {
// 		if (!fs.existsSync('uploads')) {
// 			fs.mkdirSync('uploads');
// 		}
// 		cb(null, 'uploads');
// 	},
// 	filename: (_, file, cb) => {
// 		cb(null, file.originalname);
// 	},
// });

// const upload = multer({ storage });
// app.use('/uploads', express.static('uploads'));
// app.use('/api', uploadRouter);
// app.post('/upload', upload.single('image'), (req, res) => {
// 	res.json({
// 		url: `/uploads/${req.file.originalname}`,
// 	});
// });


app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});
