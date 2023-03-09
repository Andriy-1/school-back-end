import { Router } from "express";
import { UserController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { userCreateValidation } from "../validations.js";


const userRouter = new Router;

userRouter.get('/about/user', UserController.getAllUsers);
userRouter.post('/about/user', userCreateValidation, handleValidationErrors, UserController.createUser);
userRouter.delete('/about/user/:id', checkAuth, UserController.removeUsers);

export default userRouter;
