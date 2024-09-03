const User=require('../../models/usermodel').module
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);




const userSignupController=async(req,res)=>{
  try{
    const {email,password,name}=req.body
    let existingEmail=await User.findOne({email})
    if(existingEmail){
       throw new Error('Email already exists!')
    }
    if(!email){
        throw new Error('please provide email')
    }
    if(!password){
        throw new Error('please provide password')
    }
    if(!name){
        throw new Error('please provide username')
    }
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

  if(!hashPassword){
    throw new Error('something went wrong while hashing password')
  }
   const payload={
    ...req.body,
    role:'GENERAL',
    password:hashPassword
   }
    const user=new User(payload)
    const userdata=await user.save()
    res.status(201).json({
        data:userdata,
        success:true,
        error:false,
        message:'user created successfully'
    
    })
  }
  catch(err){
    console.log('err',err.message)
    res.json({
        message: err.message || err,
        error:true,
        success:false,
        status:400
    })
  }
}

exports.module=userSignupController