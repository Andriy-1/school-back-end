import { Router } from "express";
import {DocTimeTableController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docTimeTableRouter = new Router;

docTimeTableRouter.get('/timetable', DocTimeTableController.getAllDoc);
docTimeTableRouter.post('/timetable', checkAuth, handleValidationErrors, DocTimeTableController.createDoc);
docTimeTableRouter.delete('/timetable/:id', checkAuth, DocTimeTableController.removeDoc);

export default docTimeTableRouter;
