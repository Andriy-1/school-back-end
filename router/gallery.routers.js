import { Router } from "express";
import { GalleryController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const galleryRouter = new Router;

galleryRouter.get('/gallery', GalleryController.getAll);
galleryRouter.post('/gallery', checkAuth, handleValidationErrors, GalleryController.create);
galleryRouter.delete('/gallery/:id', checkAuth, GalleryController.remove);

export default galleryRouter;
