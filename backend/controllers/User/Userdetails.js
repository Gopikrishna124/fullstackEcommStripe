const User=require('../../models/usermodel').module

async function Userdetails(req,res){
    try{
    
    const user=await User.findById(req.user)
    // console.log(user)
    res.status(200).json({
        data:user,
        success:true,
        error:false,
        message:'User details'
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

exports.module=Userdetails