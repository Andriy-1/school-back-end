import Post from "../Post.js"

class PostService {

	async create(post) {
		const createPost = Post.create(post)
		return createPost
	}
	async getAll() {
		const postAll = await Post.find()
		return postAll
	}
	async getOne(id) {
		if (!id) {
			throw new Error('не указаний ID')
		}
		const postOne = await Post.findById(id)
		return postOne

	}
	async update(post) {
		if (!post._id) {
			throw new Error('не указаний ID')
		}
		const updatePost = await Post.findByIdAndUpdate(post._id, post, { new: true })
		return updatePost

	}
	async delete(id) {
		if (!id) {
			throw new Error('не указаний ID')
		}
		const postDelete = await Post.findByIdAndDelete(id)
		return postDelete
	}
}

export default new PostService();