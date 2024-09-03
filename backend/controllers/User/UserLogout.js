const UserLogout=async(req,res)=>{
    try{
      res.clearCookie('token')
      res.json({
        data:[],
        success:true,
        error:false,
        message:'Logged out Successfull'
      })
    }
    catch(err){
        res.json({
            message:err.message || err,
            success:false,
            error:true,

        })
    }
}

exports.module=UserLogout