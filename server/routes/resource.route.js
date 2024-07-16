import express from "express";
import { deleteResource, getResourceById, getResources, markAsImportant, uploadResource } from "../controllers/resource.controller.js";

const router = express.Router();
// get all roles
router.get('/getResources', getResources);
router.get('/:id', getResourceById);
router.delete('/:id', deleteResource);
router.post('/upload', uploadResource);
router.post('/markImportant', markAsImportant);

export default router;