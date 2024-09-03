const Product=require('../../models/productmodel').module

const ProductDetails=async(req,res)=>{
    const id=req.body.id
    try{
         const result=await Product.findOne({_id:id})
         res.json({
            data:result,
            success:true,
            error:false,
            message:'details fetched successsully'
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
exports.module=ProductDetails




