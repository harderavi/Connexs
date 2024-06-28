import mongoose from 'mongoose';
const appUserSchema = new  mongoose.Schema(
    {
        username:{
            type: String,
            require: true,
            unique: true,

        },
        email:{
            type: String,
            require: true,
            unique: true
        }, 
        password:{
            type: String
        },
        gender:{
            type: String, 
            require: true
        },
        role:{
            type: String,
            require: true
        },
        profilePicture:{
            type: String,
            default:''

        }
},
{ timestamps: true }
)

const AppUser = mongoose.model('AppUser', appUserSchema)

export  default AppUser