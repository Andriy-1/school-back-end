import express from "express"
import mongoose from "mongoose"
//import config from './config.json';
import Post from './Post.js'

const DB_URl = "mongodb+srv://School:School1223@textbooks.phq64kn.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const PORT = 5001;
app.use(express.json());


app.post('/', async (req, res) => {
	const { classNumber, title, author } = req.body;
	const post = await Post.create({ classNumber, title, author })
	res.json(post)
})

const startApp = async () => {
	try {
		await mongoose.connect(DB_URl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT));
	}
	catch (e) {
		console.log(e);

	}
}
startApp()