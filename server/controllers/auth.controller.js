import AppUser from '../models/appuser.model.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            next(errorHandler(400, "All fields are required"))
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new AppUser({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save()
        res.json('Signup successful')
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        const validUser = await AppUser.findOne({ email });
        if (!validUser) return next(errorHandler(401, 'No user found'))
            
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials"))
            console.log('Valid',validPassword)
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET,  { expiresIn: '1h' });
        const { password: hashedPassword, ...rest } = validUser._doc;
        console.log(rest)
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, { 
            httpOnly: true,
            expires: expiryDate,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            })
            .status(200).json(rest)
    } catch (err) {
        next(err)
    }
}