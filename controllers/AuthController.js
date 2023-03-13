import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import AuthModel from '../models/Auth.js';
// import db from '../db/connect.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		console.log(res.body);
		const { fullName, email } = req.body;
		
		// const newAuthUser = await db.query(`INSERT INTO auth (fullName, email, passwordHash) values ($1, $2, $3) RETURNING *`, [fullName, email, hash]);
		// const auth = newAuthUser.rows[0];
		// const doc = new AuthModel({
		// 	email: req.body.email,
		// 	fullName: req.body.fullName,
		// 	avatarUrl: req.body.avatarUrl,
		// 	passwordHash: hash,
		// });
		// console.log(doc);

		// const user = await doc.save();

		// const token = jwt.sign(
		// 	{
		// 		_id: auth._id,
		// 	},
		// 	'secret123',
		// 	{
		// 		expiresIn: '30d',
		// 	},
		// );

		// const { passwordHash, ...userData } = user._doc;

		res.json({
			success: true,
			auth,
			// token
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося зарейструватися',
		});
	}
};

export const login = async (req, res) => {
	try {
		// console.log('login back', req.body);

		const user = await AuthModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({
				message: 'Невірний логін або пароль',
			});
		}
		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Невірний логін або пароль',
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			},
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося авторизуваться',
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await AuthModel.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				message: 'Користувача не знайдено',
			});
		}

		const { passwordHash, ...userData } = user._doc;

		res.json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Немяє доступу',
		});
	}
};
