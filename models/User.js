import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		imageUrl: String,
	},
	{
		timestamps: true,
		collection: 'users'
	},
);

export default mongoose.model('User', UserSchema);
