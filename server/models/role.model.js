import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission'
    }],

}, {timestamps: true});

const Role =  mongoose.model('Role', roleSchema);
export default Role