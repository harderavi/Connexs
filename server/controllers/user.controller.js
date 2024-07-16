import bcrypt from "bcryptjs";
import Role from "../models/role.model.js";
import AppUser from "../models/appuser.model.js";
import Team from "../models/team.model.js";
import { errorHandler } from '../utils/error.js';
import mongoose from "mongoose";

export const registerUser = async (req, res, next) => {
    const { username, email, password, role: roleName, team: teamName, profilePicture, gender } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        // Check if the email is already registered
        const existingUser = await AppUser.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, "Email is already registered"));
        }

        const foundRole = await Role.findById( roleName );
        if (!foundRole) {
            return res.status(400).json({ message: 'Role not found' });
        }

        const foundTeam = await Team.findById(teamName);
        if (!foundTeam) {
            return res.status(400).json({ message: 'Team not found' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new AppUser({
            username,
            email,
            password: hashedPassword,
            role: foundRole._id,
            team: foundTeam._id,
            profilePicture,
            gender,
        });

        const newUser = await user.save();

        // Add the user to the team's members list
        foundTeam.members.push(newUser._id);
        await foundTeam.save();

        res.status(201).json(newUser);
    } catch (error) {
        next(errorHandler(500, error.message));
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

export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    console.log("user")
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user id format' })
    }
    try {
        const user = await AppUser.findById(userId).select('-password');
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        } 
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const user = await AppUser.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the team is being updated
      if (updates.team && updates.team !== user.team.toString()) {
        // Remove user from old team's members array
        if (user.team) {
          const oldTeam = await Team.findById(user.team);
          if (oldTeam) {
            oldTeam.members.pull(user._id);
            await oldTeam.save();
          }
        }
  
        // Add user to new team's members array
        const newTeam = await Team.findById(updates.team);
        if (newTeam) {
          newTeam.members.addToSet(user._id);
          await newTeam.save();
        }
      }
  
      // Update user fields
      Object.keys(updates).forEach(key => {
        user[key] = updates[key];
      });
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: 'Error updating user', error: err.message });
    }
  };

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await AppUser.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove user from associated team if exists
      if (user.team) {
        const team = await Team.findById(user.team);
        if (team) {
          team.members.pull(user._id);
          await team.save();
        }
      }
  
      await AppUser.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error deleting user', error: err.message });
    }
  };

