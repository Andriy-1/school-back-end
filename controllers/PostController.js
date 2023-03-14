import PostModel from '../models/Post.js';
import db from '../db/connect.js';

export const getAll = async (req, res) => {
	try {
		const resPosts = await db.query(`SELECT * FROM posts`);
		res.json(resPosts.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

export const getThree = async (req, res) => {
	try {
		const posts = await db.query(`SELECT * FROM posts ORDER BY id LIMIT 3`);
		res.json(posts.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};
// export const getOne = async (req, res) => {
// 	try {
// 		const postId = req.params.id;

// 		PostModel.findOneAndUpdate(
// 			{
// 				_id: postId,
// 			},
// 			{
// 				$inc: { viewsCount: 1 },
// 			},
// 			{
// 				returnDocument: 'after',
// 			},
// 			(err, doc) => {
// 				if (err) {
// 					console.log(err);
// 					return res.status(500).json({
// 						message: 'Не вдалося вернути статті',
// 					});
// 				}

// 				if (!doc) {
// 					return res.status(404).json({
// 						message: 'Стаття не знайдена',
// 					});
// 				}

// 				res.json(doc);
// 			},
// 		).populate('user');
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Не вдалося отримати статті',
// 		});
// 	}
// };

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;
		const resPost = await db.query(`DELETE FROM posts WHERE id = $1 `, [postId]);

		const valid = (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Не вдалося видалити статтю',
				});
			}

			if (!doc) {
				return res.status(404).json({
					message: 'Статті не знайдено',
				});
			}
		}
		return [valid, res.json({
			success: true,
		})]
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

export const create = async (req, res) => {
	try {
		const { title, text, imageUrl } = req.body;
		const newPost = await db.query(`INSERT INTO posts (title, text, "imageUrl", user_id) values ($1, $2, $3, $4) RETURNING *`, [title, text, imageUrl, req.userId]);
		const post = newPost.rows[0];
		console.log(post);

		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити статтю',
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;
		const { title, text, imageUrl } = req.body;
		const upadatePost =
		await db.query(`UPDATE posts 
		SET title = $1, text = $2, "imageUrl" = $3, user_id = $4
		WHERE id =$5
		RETURNING *`, [title, text, imageUrl, req.userId, postId]);
		const post = upadatePost.rows[0];
		console.log(post);

		res.json({
			success: true,
			post
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити статтю',
		});
	}
};
