const { mongoose, mongo } = require("mongoose");
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email is already taken']
    },
    username:{
        type:String,
        required:[true,'username is required'],
    },
    image:{
        type:String
    }
}) 
const User = mongoose.models.users || mongoose.model('users',UserSchema)
module.exports = User;  
