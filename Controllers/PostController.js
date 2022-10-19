import Post from "../Post.js"
import PostService from "../Services/PostService.js";

class PostController {
	async create(req, res) {
		try {
			const post = PostService.create(req.body)
			res.json(post)
		}
		catch (e) {
			res.json(e.massage)
		}
	}
	async getAll(req, res) {
		try {

			const postAll = await PostService.getAll()
			return res.json(postAll)
		}
		catch (e) {
			res.json(e.massage)
		}

	}
	async getOne(req, res) {
		try {
			const postOne = await PostService.getOne(req.params.id)
			return res.json(postOne)
		}
		catch (e) {
			res.json(e.massage)
		}
	}
	async update(req, res) {
		try {
			const updatePost = await PostService.update(req.body)
			return res.json(updatePost)
		}
		catch (e) {
			res.json(e.massage)
		}
	}
	async delete(req, res) {
		try {
			const postDelete = await Post.findByIdAndDelete(req.params.id)
			return res.json(postDelete)
		}
		catch (e) {
			res.json(e.massage)
		}
	}
}


export default new PostController();