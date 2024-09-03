const Product=require('../../models/productmodel').module

const EditProduct=async(req,res)=>{
    const id=req.body.productId
    try{
       const result=await Product.findByIdAndUpdate(id,req.body,{new:true}).exec()
       res.json({
        data:result,
        success:true,
        error:false,
        message:'Product updated successfully'
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

exports.module=EditProduct