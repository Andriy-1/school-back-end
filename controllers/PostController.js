import db from '../db/connect.js';
import { deleteFilePost, saveFilePost } from '../services/fileService.js';

export const getFromCategoryAll = async (req, res) => {
	try {
		const categories_id = req.query.categories_id;
		const queryResult = await db.query(`SELECT * FROM posts WHERE "postCategories_id" = $1 ORDER BY id ASC`, [+categories_id]);
		if (queryResult.rowCount) {
			res.json({ posts: queryResult.rows.reverse() });
		}
		res.json({
			posts: queryResult.rows.reverse(),
			message: 'У даній категорії немає новин',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};
export const getAll = async (req, res) => {
	try {

		const resPosts = await db.query(`SELECT * FROM posts ORDER BY id ASC`);
		res.json(resPosts.rows.reverse());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
}
export const getThree = async (req, res) => {
	try {
		const posts = await db.query(`SELECT * FROM posts ORDER BY id DESC LIMIT 3`);
		res.json(posts.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;
		const resPost = await db.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
		const post = resPost.rows[0];
		if (post) {
			return res.json({
				post: post,
				success: true,
			})
		}
		return res.status(404).json({
			message: 'Статті не знайдено',
		});

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;
		const resPost = await db.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [postId]);
		const post = resPost.rows[0];

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
		if (post.imageUrl) {
			deleteFilePost(post.imageUrl)
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
		const { title, text, postCategories_id, published = false } = req.body;


		const fileName = await saveFilePost(req.files.imageUrl);
		console.log(fileName);

		const newPost = await db.query(`INSERT INTO posts (title, text, "imageUrl", user_id, "postCategories_id", published) values ($1, $2, $3, $4, $5, $6) RETURNING *`, [title, text, [fileName], req.userId, postCategories_id, published]);
		const post = newPost.rows[0];
		console.log(post);

		res.json({
			post: post,
			message: 'Карточку новин створено'
		});
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

export const updateLikeCount = async (req, res) => {
	try {
		const postId = req.params.id;
		const { isLiked } = req.body;
		const likePost = await db.query(`SELECT likecount FROM posts WHERE id = $1`, [postId]);
		let currentLikes = 0;
		let like = likePost.rows[0].likecount;
		if (!isLiked) {
			currentLikes = like + 1;
		} else {
			currentLikes = like - 1;
		}
		const upadateLikePost =
			await db.query(`UPDATE posts 
		SET likecount = $1
		WHERE id = $2
		RETURNING likecount`, [currentLikes, postId]);
		const likecount = upadateLikePost.rows[0].likecount;

		res.json({
			success: true,
			likecount
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити вподобання',
		});
	}
};

export const updateViewsCount = async (req, res) => {
	try {
		const postId = req.params.id;
		const { isViews } = req.body;
		const viewsPost = await db.query(`SELECT viewscount FROM posts WHERE id = $1`, [postId]);
		let currentViews = 0;
		let views = viewsPost.rows[0].viewscount;
		if (!isViews) {
			currentViews = views + 1;
		}
		const upadateViewsPost =
			await db.query(`UPDATE posts 
		SET viewscount = $1
		WHERE id = $2
		RETURNING viewscount`, [currentViews, postId]);
		const viewscount = upadateViewsPost.rows[0].viewscount;

		res.json({
			success: true,
			viewscount
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити вподобання',
		});
	}
};