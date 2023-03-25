import { Router } from "express";
import {DocCircleController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docCircleRouter = new Router;

docCircleRouter.get('/circle', DocCircleController.getAllDoc);
docCircleRouter.post('/circle', checkAuth, handleValidationErrors, DocCircleController.createDoc);
docCircleRouter.delete('/circle/:id', checkAuth, DocCircleController.removeDoc);

export default docCircleRouter;
