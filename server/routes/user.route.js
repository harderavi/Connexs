import   express from "express";
import { deleteUser, getUserById, registerUser, signout, updateUser } from "../controllers/user.controller.js";
const router = express.Router();


router.post('/signout', signout)
router.post('/signup', registerUser)
router.get('/:id', getUserById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router