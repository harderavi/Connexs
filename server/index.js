import express from "express";
import mongoose from  "mongoose";
import cors  from "cors"
import "dotenv/config";

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB connected ")
}).catch(err=>cansole.error(err))

app.get('/',(req, res)=>{
      res.send({message: "App is working get"})
    });


app.listen('4000', ()=>{
   console.log( 'App is running on port 4000');
})