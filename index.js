import express from "express"
import mongoose from "mongoose"
import config from './config/default.json' assert {type: 'json'};
import postRouter from "./Router/post.routers.js";

const app = express();

const PORT = config.PORT;
app.use(express.json());
app.use('/api', postRouter)

const startApp = async () => {
	try {
		await mongoose.connect(config.dburl, {
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