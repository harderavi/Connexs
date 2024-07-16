import express from "express";
import { getRoles } from "../controllers/role.controller.js";

const router = express.Router();
// get all roles
router.get('/getRoles', getRoles);

export default router;