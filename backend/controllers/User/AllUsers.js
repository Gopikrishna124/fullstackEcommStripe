const User=require('../../models/usermodel').module
const allUsers=async(req,res)=>{
    try{
    const user=await User.find({})
    res.json({
        data:user,
        success:true,
        error:false,
        message:"All users fecthed successfully"
    })
    }
    catch(err){
        res.json({
            message:err.message || err,
            success:false,
            error:true
        })
    }

}

exports.module=allUsers