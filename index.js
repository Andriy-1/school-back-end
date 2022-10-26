import express from "express"
import mongoose from "mongoose"
import config from './config/default.json' assert {type: 'json'};
import postRouter from "./Router/post.routers.js";
import cors from "cors"
const app = express();
const { PORT, dburl } = config;
app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true
}))

app.use(express.json());
app.use('/api', postRouter)

const startApp = async () => {
	try {
		await mongoose.connect(dburl, {
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