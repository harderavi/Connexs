import Role from "../models/role.model.js"

export const getRoles = async (req, res, next)=>{
    try{

        const roles = await Role.find();
        res.status(200).json(roles)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}