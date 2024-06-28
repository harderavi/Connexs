import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import "dotenv/config";
import authRouter from "./routes/auth.route.js"
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB connected ")
}).catch(err => cansole.error(err))



app.get('/', (req, res) => {
    res.send({ message: "App is working get" })
});
app.use('/api/auth', authRouter)
// Endpoint to get all user data
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users)
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
app.listen('4000', () => {
    console.log('App is running on port 4000');
})