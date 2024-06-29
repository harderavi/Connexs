import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import "dotenv/config";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
const app = express();
// Configure CORS
const corsOptions = {
    origin: ['https://connexs.vercel.app',  'http://localhost:5173'], // Your frontend URL
    credentials: true, // Enable the cookie-based authentication
  };
  app.use(cors(corsOptions));
  
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB connected ")
}).catch(err => cansole.error(err))




app.get('/', (req, res) => {
    res.send({ message: "App is working get" })
});
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen('4000', () => {
    console.log('App is running on port 4000');
})