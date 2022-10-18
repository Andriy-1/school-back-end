import mongoose from 'mongoose';

const Post = new mongoose.Schema({
	classNumber: { type: Number, requaired: true },
	title: { type: String, requaired: true },
	author: { type: String, requaired: true },
})

export default mongoose.model('Post', Post)