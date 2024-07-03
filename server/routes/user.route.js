import   express from "express";
import { registerUser, signout } from "../controllers/user.controller.js";
const router = express.Router();


router.post('/signout', signout)
router.post('/signup', registerUser)

export default router