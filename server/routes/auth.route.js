import express from "express";
import { signin } from "../controllers/auth.controller.js";

const router = express.Router()
router.post('/signin', signin) 
router.get('/signin', (req,     res)=>{
    res.json("signin get working")
}) 

export default router