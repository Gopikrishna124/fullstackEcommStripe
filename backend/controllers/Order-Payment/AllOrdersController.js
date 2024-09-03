const Order=require('../../models/ordermodel').module


const AllOrders=async(req,res)=>{
   try{ 
    const result=await Order.find({}).exec()
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

exports.module=AllOrders