import { deleteFile, saveFile } from "../services/fileService.js";
import db from '../db/connect.js';

export const getAll = async (req, res) => {
	try {
		const newFile = await db.query(`SELECT * FROM gallery;`);
		console.log('PHOTOS', Math.ceil(newFile.rowCount / 9));
		
		res.json({file: newFile.rows.reverse(), paginationCount:  Math.ceil(newFile.rowCount / 9)});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати файл',
		});
	}
}

export const create = async (req, res) => {
	try {
		let file = [];
		if (Array.isArray(req.files.file)) {
			req.files.file.map(async (item, index) => {
				const fileName = await saveFile(item, 'static/gallery');
				const newFile = await db.query(`INSERT INTO gallery ("file") values ($1) RETURNING *`, [fileName]);
				console.log(newFile.rows[0]);
				file.push(newFile.rows[0]);
			})
		} else {
			const fileName = await saveFile(req.files.file, 'static/gallery');
			const newFile = await db.query(`INSERT INTO gallery ("file") values ($1) RETURNING *`, [fileName]);
			file = newFile.rows[0];
		}
		const newFile = await db.query(`SELECT * FROM gallery;`);
		console.log('<-----Photo saved----->');
		return res.json({file: newFile.rows.reverse(), paginationCount:  Math.ceil(newFile.rowCount / 9),message: 'Фото завантажено до галереї'});
		
	} catch (err) {
		console.log('<-----',err,'----->');
		res.status(500).json({
			message: 'Не вдалося створити файл',
		});
	}
}

export const remove = async (req, res) => {
	try {
		const userId = req.params.id;
		const newFile = await db.query(`DELETE FROM gallery WHERE id = $1 RETURNING *`, [userId]);
		const gallery = newFile.rows[0];

		const valid = (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Не вдалося видалити Файл',
				});
			}

			if (!doc) {
				return res.status(404).json({
					message: 'Файл не знайдено',
				});
			}
		}
		if (gallery.file) {
			deleteFile(gallery.file, 'static/gallery')
		}
		return [valid, res.json({
			success: true,
			message: 'Файл видалений',
		})]
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати Файл',
		});
	}
}