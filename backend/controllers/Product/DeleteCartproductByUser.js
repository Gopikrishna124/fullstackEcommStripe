const Cart=require('../../models/cartmodel').module

const DeleteProductByUserId=async(req,res)=>{
     const cartId=req.body.deleteId
     console.log('coming deleteId',req.body)
    try{
        const result=await Cart.findByIdAndDelete({_id:cartId}).exec()
        console.log('deleted',result)
        res.json({
            data:result,
            message:'deleted successfully',
            success:true,
            error:false
        })
    }
    catch(err){
              res.json({
                data:err.message || err,
                success:false,
                error:true
              })
    }
}
exports.module=DeleteProductByUserId