import mongoose from 'mongoose';
const appUserSchema = new  mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,

        },
        email:{ 
            type: String,
            required: true,
            unique: true
        }, 
        password:{
            type: String
        },
        gender:{
            type: String, 
            required: true
        },
        role:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Role',
            required: true
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
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