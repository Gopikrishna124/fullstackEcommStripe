const User=require('../../models/usermodel').module
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const env=require('dotenv').config()

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    try{
        if(!(email || password)){
              throw new Error('email or password is  missing');
        }
        let requiredEmail=await User.findOne({email})
       
        if(!requiredEmail){
          throw new Error('No such email exists')   
        }
        if(requiredEmail){
              if(bcrypt.compareSync(password,requiredEmail.password)){  
                
                const tokendata={
                  _id:requiredEmail._id,
                  email:requiredEmail.email
                }
                const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET,{expiresIn:'1h'})
                const tokenOption={
                  httpOnly:true,
                  secure:true
                }
                res.cookie('token',token,tokenOption).json({
                    data:token,
                    success:true,
                    error:false,
                    message:'login successful'
                })
            }
             
             else{
                throw new Error('email or password is incorrect')
             }
        }
    }
    catch(err){
          res.json({
            message:err.message,
            success:false,
            error:true
          })
     }
}

exports.module=userLogin