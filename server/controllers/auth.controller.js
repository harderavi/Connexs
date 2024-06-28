import AppUser from '../models/appuser.model.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signin = async (req, res, next) => {
    try {
        res.json('working')

    } catch (err) {
        next(err)
    }
}