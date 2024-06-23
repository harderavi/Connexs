import express from "express";
import mongoose from  "mongoose";
import cors  from "cors"
import "dotenv/config";

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB connected ")
}).catch(err=>cansole.error(err)) 

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('AppUser', userSchema);

app.get('/',(req, res)=>{
      res.send({message: "App is working get"})
    });
// Endpoint to get all user data
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users   )
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
app.listen('4000', ()=>{
   console.log( 'App is running on port 4000');
})