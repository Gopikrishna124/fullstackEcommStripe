const Cart=require('../../models/cartmodel').module

const UpdatingProductQuantity=async(req,res)=>{
 
     console.log('req.body',req.body)
         
    const cartId=req.body.cartId
    try{
        const result=await Cart.findByIdAndUpdate(cartId,req.body,{new:true}).exec()
       const results=await result.populate('productId')
      
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

exports.module=UpdatingProductQuantity