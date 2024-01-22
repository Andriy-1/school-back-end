import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db/connect.js';
import * as dotenv from 'dotenv';
dotenv.config()

export const register = async (req, res) => {
	try {
		const key = req.body.key;
		if (key === process.env.KEY) {
			const password = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			const { fullName, email } = req.body;
			const newAuthUser = await db.query(`INSERT INTO auth ("fullName", email, "passwordHash") values ($1, $2, $3) RETURNING *`, [fullName, email, hash]);
			const auth = newAuthUser.rows[0];
			console.log(auth);

			const token = jwt.sign(
				{
					_id: auth.id,
				},
				'secret123',
				{
					expiresIn: '5d',
				},
			);
			res.json({ success: true, auth, token });
		} else {
			res.status(406).json({
				message: 'Щось пішло не так. Перевірьте чи всі дані уведені вірно. Можливо якесь поле ненадане.',
			})
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося зарейструватися',
		});
	}
};

export const login = async (req, res) => {
	try {

		const resAuthData = await db.query(`SELECT * FROM auth WHERE email = $1`, [req.body.email]);
		const user = resAuthData.rows[0];

		console.log(user);

		if (!user) {
			return res.status(404).json({
				message: 'Невірний логін або пароль',
			});
		}
		const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Невірний логін або пароль',
			});
		}

		const token = jwt.sign(
			{
				_id: user.id,
			},
			'secret123',
			{
				expiresIn: '5d',
			},
		);

		res.json({
			...user,
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
		const allAuthUser = await db.query(`SELECT * FROM auth WHERE id = $1`, [req.userId]);
		const auth = allAuthUser.rows[0];
		console.log(auth);
		if (!auth) {
			return res.status(404).json({
				message: 'Користувача не знайдено',
			});
		}
		res.json(auth);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Немяє доступу',
		});
	}
};
