import { Router } from "express";
import { PostController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCreateValidation } from "../validations.js";


const postRouter = new Router;

postRouter.get('/posts', PostController.getAll);
postRouter.get('/posts/three', PostController.getThree);
postRouter.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
postRouter.delete('/posts/:id', checkAuth, PostController.remove);
postRouter.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
postRouter.patch('/posts/likes/:id', PostController.updateLikeCount)
postRouter.patch('/posts/views/:id', PostController.updateViewsCount)


export default postRouter;