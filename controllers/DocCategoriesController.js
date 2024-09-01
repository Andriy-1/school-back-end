import db from '../db/connect.js';

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
