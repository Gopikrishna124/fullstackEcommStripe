const Product=require('../../models/productmodel').module

const getProduct=async(req,res)=>{
    
    try{
    let allProducts=await Product.find({})
    
    res.json({
        data:allProducts,
        success:true,
        error:false,
        message:'fetched all products'
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

exports.module=getProduct