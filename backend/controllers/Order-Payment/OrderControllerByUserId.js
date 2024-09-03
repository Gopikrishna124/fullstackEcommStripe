const Order=require('../../models/ordermodel').module

const OrderController=async(req,res)=>{
      const  userId=req.user
    try{
       const result=await Order.find({userId:userId}).sort({createdAt :-1})
       res.json({
        data:result,
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

exports.module=OrderController