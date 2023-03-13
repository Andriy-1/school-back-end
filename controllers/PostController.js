import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
	try {
		const resPosts= await db.query(`SELECT * FROM posts`);
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
		// const postId = req.params.id;
		const posts = await PostModel.find().limit(3).populate('user').exec();

		res.json(posts);
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

		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						message: 'Не вдалося вернути статті',
					});
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Стаття не знайдена',
					});
				}

				res.json(doc);
			},
		).populate('user');
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
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});

		const post = await doc.save();
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

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId,
			},
		);

		res.json({
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити статтю',
		});
	}
};
