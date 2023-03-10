import UserModel from '../models/User.js';
import { deleteFile, saveFile } from '../services/fileService.js';


export const createUser = async (req, res) => {
	try {
		const fileName = saveFile(req.files.image)
		const doc = new UserModel({
			fullName: req.body.fullName,
			position: req.body.position,
			description: req.body.description,
			imageUrl: fileName,
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
		const users = await UserModel.findById(userId).exec();
		if (users.imageUrl) {
			deleteFile(users.imageUrl)
		}
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
