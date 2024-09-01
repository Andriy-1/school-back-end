import { Router } from "express";
import { PostCategoriesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCategoriesCreateValidation } from "../validations.js";


const postCategoriesRouter = new Router;

postCategoriesRouter.get('/posts-categories', PostCategoriesController.getAll);
postCategoriesRouter.post('/posts-categories', checkAuth, postCategoriesCreateValidation, handleValidationErrors, PostCategoriesController.create);
postCategoriesRouter.delete('/posts-categories/:id', checkAuth, PostCategoriesController.remove);
postCategoriesRouter.patch('/posts-categories/:id', checkAuth, postCategoriesCreateValidation, handleValidationErrors, PostCategoriesController.update);



export default postCategoriesRouter;