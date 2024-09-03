const User=require('../../models/usermodel').module
var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

const ForgotPassword=async(req,res)=>{
 
    const email=req.body.email
    const password=req.body.password
  


    try{
    const requiredEmail=await User.findOne({email:email}).exec()
     
    if(!requiredEmail){
        throw new Error('No such email exists')   
      }
  
      if(requiredEmail){
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);

         const payload={
             email:req.body.email,
             password:hashPassword
         }

         const result=await User.findOneAndUpdate({email:email},payload,{new:true}).exec()
         res.json({
            data:result,
             success:true,
             error:false,
             message:'password upadated'
         })
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

exports.module=ForgotPassword