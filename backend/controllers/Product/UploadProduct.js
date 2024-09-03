const Product=require('../../models/productmodel').module
const UploadProductPermission=require('../../helper/UplaodProductPermission').module
const UploadProduct=async(req,res)=>{
    try{
        const sessionId=req.user._id
          if(!UploadProductPermission(sessionId)){
            throw new Error('permission denied -- you should be admin')
          }
          
        const  product= new Product(req.body)
        const result=await product.save()
        res.json({
            data:result,
            success:true,
            error:false,
            message:'Product Uploaded Successfully'
        })
    }
    catch(err){
        res.json({
            message:err.message ||err,
            success:false,
            error:true
        })
    }
}

exports.module=UploadProduct