import bcrypt from "bcryptjs";
import Role from "../models/role.model.js";
import AppUser from "../models/appuser.model.js";
import Team from "../models/team.model.js";
import { errorHandler } from '../utils/error.js';

export const registerUser = async (req, res, next) => {
    const { username, email, password, roleName, teamName, profilePicture } = req.body;
    if (!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        // Check if the email is already registered
        const existingUser = await AppUser.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, "Email is already registered"));

        }
        const role = await Role.findOne({ name: roleName });
        if (!role) {
            return res.status(400).json({ message: 'Role not found' });
        }
        
        const team = await Team.findOne({ name: teamName });
        if (!team) {
            return res.status(400).json({ message: 'Team not found' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new AppUser({
            username,
            email,
            password: hashedPassword,
            role: role._id,
            team: team._id,
            profilePicture,
        });

        const newUser = await user.save();
        // Add the user to the role's members list
        team.members.push(newUser._id);
        await team.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


}
export const signout = (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

