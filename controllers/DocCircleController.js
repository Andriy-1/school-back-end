import { deleteFileDoc, saveFileDoc } from '../services/fileService.js';
import db from '../db/connect.js';

export const createDoc = async (req, res) => {
	try {
		const fileName = await saveFileDoc(req.files.file, 'static/doc/circle')
		const { title, seniors } = req.body;
		const newFile = await db.query(`INSERT INTO document_circle ("title", "file") values ($1, $2) RETURNING *`, [title, fileName]);
		const file = newFile.rows[0];
		res.json({ success: true, ...file });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити файл',
		});
	}
};
export const getAllDoc = async (req, res) => {
	try {
		const resDoc = await db.query(`SELECT * FROM document_circle`);
		res.json(resDoc.rows.reverse());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати файл',
		});
	}
};
export const removeDoc = async (req, res) => {
	try {
		const userId = req.params.id;
		const resDoc = await db.query(`DELETE FROM document_circle WHERE id = $1 RETURNING *`, [userId]);
		const document = resDoc.rows[0];

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
		if (document.file.length) {
			document.file.map(item => deleteFileDoc(item, 'static/doc/circle'))

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
};
