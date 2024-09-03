const jwt=require('jsonwebtoken')
const env=require('dotenv').config()

async function authToken(req,res,next){
    try{
        const token=req.cookies?.token

       if(!token){
        return  res.json({
            message:'please Login ...!',
            success:false,
            error:true
        })
       }
        
       jwt.verify(token,process.env.TOKEN_SECRET,function(err,decoded){
        
        if(err){
            throw new Error(err)
        }
      
        
        req.user=decoded._id
        next()
       })
    
    } 
    catch(err){
        console.log('token err',err)
        res.status(400).json({
            message:err.message ||err,
            data:[],
            success:false,
            error:true
        })
    }
}

exports.module=authToken