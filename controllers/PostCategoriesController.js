import db from '../db/connect.js';

export const getAll = async (req, res) => {
	try {
		const resPosts = await db.query(`SELECT * FROM post_categories ORDER BY id ASC`);
		res.json(resPosts.rows.reverse());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postCategoriesId = req.params.id;
		const resPostCategories = await db.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [postCategoriesId]);
		// const categories = resPostCategories.rows[0];

		return res.json({
			message: 'Категорію видалено',
			success: true,
		})
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати категорії',
		});
	}
};

export const create = async (req, res) => {
	try {
		const { title } = req.body;

		const newPostCategories = await db.query(`INSERT INTO post_categories (title) values ($1) RETURNING *`, [title]);
		const categories = newPostCategories.rows[0];
		console.log(categories);

		res.json({
			postCategories: categories,
			message: 'Категорію створено'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити категорію',
		});
	}
};

export const update = async (req, res) => {
	try {
		const postCategoriesId = req.params.id;
		const { title } = req.body;
		const upadatePostCategoires =
			await db.query(`UPDATE post_categories 
		SET title = $1,WHERE id =$2 RETURNING *`, [title, postCategoriesId]);
		const postCategories = upadatePostCategoires.rows[0];
		console.log(postCategoriesId);

		res.json({
			success: true,
			postCategories,
			message: 'Категорію оновлено',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити категорію',
		});
	}
};