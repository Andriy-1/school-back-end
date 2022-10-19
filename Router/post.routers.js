import { Router } from "express";
import PostController from "../Controllers/PostController.js";


const postRouter = new Router;

postRouter.get('/posts/:id',PostController.getOne)
 postRouter.get('/posts',PostController.getAll)
 postRouter.post('/posts', PostController.create)
 postRouter.put('/posts', PostController.update)
 postRouter.delete('/posts/:id', PostController.delete)


export default postRouter;