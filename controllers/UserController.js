import UserModel from '../models/User.js';


export const createUser = async (req, res) => {
	try {
		const doc = new UserModel({
			fullName: req.body.fullName,
			position: req.body.position,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		});

		const user = await doc.save();
		console.log(user);

		res.json({ success: true, user });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити статтю',
		});
	}
};

export const getAllUsers = async (req, res) => {
	try {

		const users = await UserModel.find().populate('fullName').exec();
		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};


export const removeUsers = async (req, res) => {
	try {
		const userId = req.params.id;

		UserModel.findOneAndDelete(
			{
				_id: userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						message: 'Не вдалося видалити статті',
					});
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Стаття не знайдена',
					});
				}

				res.json({
					success: true,
				});
			},
		);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати статті',
		});
	}
};

// export const update = async (req, res) => {
// 	try {
// 		const postId = req.params.id;

// 		await PostModel.updateOne(
// 			{
// 				_id: postId,
// 			},
// 			{
// 				title: req.body.title,
// 				text: req.body.text,
// 				imageUrl: req.body.imageUrl,
// 				user: req.userId,
// 			},
// 		);

// 		res.json({
// 			success: true,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Не вдалося обновити статтю',
// 		});
// 	}
// };
