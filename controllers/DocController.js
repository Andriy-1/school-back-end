import { deleteFileDoc, saveFileDoc } from '../services/fileService.js';
import db from '../db/connect.js';

export const createDoc = async (req, res) => {

	try {
		const fileName = await saveFileDoc(req.files.file, 'static/doc')
		const { title, categories_id } = req.body;
		let queryResult;

		switch (categories_id) {
			case '0':
				await db.query(`INSERT INTO document ("title", "file", "categories_id") values ($1, $2, $3) RETURNING * `, [title, fileName, null]);
				queryResult = await db.query(`SELECT * FROM document`);
				res.json({
					document: queryResult.rows.reverse(),
					message: 'Документ додано',
					success: true,
				});
				break;
			default:
				await db.query(`INSERT INTO document ("title", "file","categories_id") values ($1, $2, $3) RETURNING * `, [title, fileName, categories_id]);
				if (categories_id > 0) {
					queryResult = await db.query(`SELECT * FROM document WHERE categories_id = $1 `, [+categories_id]);
					res.json({
						document: queryResult.rows.reverse(),
						message: 'Документ додано',
						success: true,
					});
				} else {
					const resDoc = await db.query(`SELECT * FROM document ORDER BY id ASC`);
					res.json({
						document: resDoc.rows.reverse(),
						message: 'Документ додано',
						success: true,
					});
				}
				break;
		}

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити файл',
		});
	}
};

export const getAllDoc = async (req, res) => {
	try {
		const categories_id = req.query.categories_id;

		let queryResult;
		switch (categories_id) {
			case 0:
				queryResult = await db.query(`SELECT * FROM document ORDER BY id ASC`);
				res.json({ document: queryResult.rows });
				break;
			default:
				if (categories_id > 0) {
					queryResult = await db.query(`SELECT * FROM document WHERE categories_id = $1 ORDER BY id ASC`, [+categories_id]);
					res.json({ document: queryResult.rows.reverse() });
				} else {
					const resDoc = await db.query(`SELECT * FROM document ORDER BY id ASC`);
					res.json({
						document: resDoc.rows.reverse(),
					});
				}
				break;
		}

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося оновити дані',
		});
	}
};

export const removeDoc = async (req, res) => {
	try {
		const docId = req.params.id;
		const resDoc = await db.query(`DELETE FROM document WHERE id = $1 RETURNING *`, [docId]);
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
			document.file.map(item => deleteFileDoc(item, 'static/doc'))

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

export const updateDoc = async (req, res) => {
	try {
		const docId = req.params.id;
		const { categories_id } = req.body;
		console.log('docId', docId, categories_id);

		const upadateDocCategoriesId = await db.query(`UPDATE document 
		SET categories_id = $1
		WHERE id = $2
		RETURNING *`, [+categories_id, docId]);
		const categoriesId = upadateDocCategoriesId.rows[0];

		res.json({
			success: true,
			message: 'Документ занесено в категорію',
			categoriesId
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити вподобання',
		});
	}
};

export const getDocumentCategories = async (req, res) => {
	try {
		const resDocumentCategories = await db.query(`SELECT * FROM document_categories`);
		res.json({
			document_categories: resDocumentCategories.rows,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося оновити дані',
		});
	}
};

export const removeDocumentCategories = async (req, res) => {
	try {
		const id = req.params.id;
		const resDocumentCategories = await db.query(`DELETE FROM document_categories WHERE id = $1 RETURNING *`, [id]);
		const categories = resDocumentCategories.rows[0];

		console.log('resDocumentCategories', categories);

		return res.json({
			success: true,
			message: 'Категорія видалена',
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Не можливо видалити категорію! У категорії знаходиться файл',
		});
	}
};
export const createDocumentCategories = async (req, res) => {

	try {
		const { title } = req.body;
		const newCategories = await db.query(`INSERT INTO document_categories ("title") values ($1) RETURNING *`, [title]);
		res.json({
			document_categories: newCategories.rows,
			message: 'Категорію додано',
			success: true,
		});

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити файл',
		});
	}
};
