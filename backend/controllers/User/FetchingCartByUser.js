const Cart=require('../../models/cartmodel').module

const fetchUserCart=async(req,res)=>{
    const authUser=req.user
     try{
       const response=await Cart.find({userId:authUser}).populate('productId').exec()
       res.json({
          data:response,
          success:true,
          error:false
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

exports.module=fetchUserCart