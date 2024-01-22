import { deleteFileDoc, saveFileDoc } from '../services/fileService.js';
import db from '../db/connect.js';

export const createDoc = async (req, res) => {
	try {
		const fileName = await saveFileDoc(req.files.file, 'static/doc/timeTable')
		const { title, seniors } = req.body;
		console.log('fileName', fileName, seniors);

		const newFile = await db.query(`INSERT INTO document_timetable ("title", "file","seniors") values ($1, $2, $3) RETURNING *`, [title, fileName, seniors]);
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
		const resDoc = await db.query(`SELECT * FROM document_timetable`);
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
		const resDoc = await db.query(`DELETE FROM document_timetable WHERE id = $1 RETURNING *`, [userId]);
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
			document.file.map(item => deleteFileDoc(item, 'static/doc/timeTable'))

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
