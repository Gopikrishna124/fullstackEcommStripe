const Product=require('../../models/productmodel').module

const SingleCategoryProduct=async(req,res)=>{
    const {category}=req.body || req?.query
   console.log('body',req.body)
    try{
         const result=await Product.find({category}).exec()
         res.json({
            data:result,
            success:true,
            error:false,
            message:'category fetched successfully'
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

exports.module=SingleCategoryProduct