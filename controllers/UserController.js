import { deleteFile, saveFile } from '../services/fileService.js';
import db from '../db/connect.js';

export const createUser = async (req, res) => {
	try {
		const fileName = saveFile(req.files.image)
		const { fullName, position, description } = req.body;
		const newUser = await db.query(`INSERT INTO users ("fullName", "position", "description", "imageUrl") values ($1, $2, $3, $4) RETURNING *`, [fullName, position, description, fileName]);
		const user = newUser.rows[0];

		res.json({ success: true, ...user });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити статтю',
		});
	}
};
export const getAllUsers = async (req, res) => {
	try {
		const resUsers = await db.query(`SELECT * FROM users`);
		res.json(resUsers.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};
export const removeUsers = async (req, res) => {
	try {
		console.log('req.params.id',req.params);
		console.log('req.body',req.body);
		
		const userId = req.params.id;
		const resUser = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [userId]);
		const user = resUser.rows[0];

		if (user.imageUrl) {
			deleteFile(user.imageUrl)
		}

		const valid = (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Не вдалося видалити користувача',
				});
			}

			if (!doc) {
				return res.status(404).json({
					message: 'Користувач не знайдена',
				});
			}
		}
		return [valid, res.json({
			success: true,
			message: 'Користувач видалений',
		})]
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};
