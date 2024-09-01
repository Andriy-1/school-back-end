import { Router } from "express";
import { DocCategoriesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";

const docCategoriesRouter = new Router;

docCategoriesRouter.get('/document-categories', DocCategoriesController.getDocumentCategories);
docCategoriesRouter.post('/document-categories', checkAuth, handleValidationErrors, DocCategoriesController.createDocumentCategories);
docCategoriesRouter.delete('/document-categories/:id', checkAuth, DocCategoriesController.removeDocumentCategories);

export default docCategoriesRouter;