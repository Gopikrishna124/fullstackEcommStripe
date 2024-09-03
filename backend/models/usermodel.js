const mongoose=require('mongoose')
const {Schema}=mongoose


const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:String,
    profilePic:String,
    role:String
},{timestamps:true})

const User=mongoose.model('User',userSchema)

exports.module=User