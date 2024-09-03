const Cart=require('../../models/cartmodel').module

const CountCartItems=async(req,res)=>{
    try{
      const userId=req.user
  
       
      const count=await Cart.countDocuments({userId:userId})

      res.json({
        data:{
            count:count,
        },
        message:'ok',
        success:true,
        error:false
      })


    }
    catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

exports.module=CountCartItems