import express from "express";
import { signin } from "../controllers/auth.controller.js";

const router = express.Router()
router.post('/signin', (req, res)=>{
    res.json('Signin workin')
}) 

export default router