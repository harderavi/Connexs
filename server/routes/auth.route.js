import express from "express";

const router = express.Router()
router.post('/signin', (req, res)=>{
    res.json('Signin workin')
}) 

export default router