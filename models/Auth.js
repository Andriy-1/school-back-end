import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'auth'
	},
);

export default mongoose.model('Auth', AuthSchema);
