import mongoose from "mongoose";
import AppUser  from "../models/appuser.model.js" 

export const createAppUser = async (req, res)=>{
    const {username, email, role, gender} = req.body
    if(!username || !email || !gender || !role){
        return res.status(400).json({message:"Please provide all required fields"})
    }
    try{

        const newAppUser = new AppUser({username, email, gender, role});
        const saveAppUser = await newAppUser.save();
        return res.status(200).json({saveAppUser}) 
    }catch(err){
        console.log(err)
    }


    // res.json({message:"get user Controller"})
}
const ITEM_PER_PAGE =2;

export const getAppUsers = async (req, res)=>{
   
    try{
        const sortDirection =  req.query.order === 'asc' ? 1 : -1;
        const currentPage = req.query.page || 1;
        const itemsPerPage = req.query.itemsPerPage < 20 ? req.query.itemsPerPage : 20;
        const skip = (currentPage-1)*itemsPerPage;
        const searchQuery =  req.query.search || '';
                // Create the search condition based on the searchQuery length
        const searchCondition = {
            $or: [
                {username: {$regex: searchQuery, $options: 'i'}},
                {email: { $regex: searchQuery, $options:'i'}}
            ]
        }
       

            const appUsers = await AppUser.find(searchCondition)
            .sort({username: sortDirection}).limit(itemsPerPage).skip(skip)
            const totalAppUsers = await AppUser.countDocuments(searchCondition)
            res.status(200).json({appUsers, totalAppUsers})

    }catch(err){
        console.log(err)
    }
}
export const appUser = async(req, res)=>{
    const {userId} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({error: 'Invalid user ID'})
        }
        const user = await AppUser.findById(userId)
        if(!user){
            return res.status(400).json({error: 'User not found'})
        }
         const {password, ...rest } = user._doc;
        res.status(200).json(rest);  
    }catch(err){
        console.log(err)  
    }
}
export const updateAppUser = async(req, res)=>{
    const {userId} = req.params
    const {username, email, gender, role, profilePicture} = req.body
    console.log(profilePicture)
    try{
    const updatedUser = await AppUser.findByIdAndUpdate(userId,{username,email, gender, role, profilePicture},
        { new: true }  // Return the updated document
    )
    if(!updatedUser){
        res.status(404).json({message: "User not found"})
    }
    const {password, ...rest } = updatedUser._doc; //To access the raw document data, you use the _doc property.

    res.status(200).json(rest);
}catch(err){

}
}
export const deleteAppUser = async (req, res)=>{
     try{   
        await AppUser.findByIdAndDelete(req.params.userId)
         res.status(200).json({message:"user deleted successfully"})
     }catch(err){
        console.log(err)
     }
}
export const signout = async(req, res,next)=>{
    try{
        res.clearCookie('access_token').status(200).json('User has been logedout');
    }catch(err){
        next(err)
    }
}