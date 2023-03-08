import { Router } from "express";
import multer from "multer";
import fs from 'fs';

import { AuthController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { loginValidation, registerValidation } from "../validations.js";


const uploadRouter = new Router;

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

uploadRouter.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

export default uploadRouter;