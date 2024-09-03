const User=require('../../models/usermodel').module


const UdpateUser=async(req,res)=>{
 
   
    const id=req.body.userid

    try{
    const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true}).exec()
     res.json({
        data:updatedUser,
        success:true,
        error:false,
        message:'User updated Successfully'
     })
    }
    catch(err){
         res.json({
            success:false,
            error:true,
            message:err.message || err
         })
    }

}

exports.module=UdpateUser