import { Router } from "express";
import { DocController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docRouter = new Router;

docRouter.get('/document', DocController.getAllDoc);

docRouter.post('/document', checkAuth, handleValidationErrors, DocController.createDoc);
docRouter.patch('/document/:id', checkAuth, handleValidationErrors, DocController.updateDoc);
docRouter.delete('/document/:id', checkAuth, DocController.removeDoc);
docRouter.post('/document-categories', checkAuth, handleValidationErrors, DocController.createDocumentCategories);
docRouter.delete('/document-categories/:id', checkAuth, DocController.removeDocumentCategories);
docRouter.get('/document-categories', DocController.getDocumentCategories);

export default docRouter;
