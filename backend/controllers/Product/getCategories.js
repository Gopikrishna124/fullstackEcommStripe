const Product=require('../../models/productmodel').module

const getAllCategories=async(req,res)=>{
    
    try{
       
        const productCategory=await Product.distinct('category')
        // console.log('productCategory',productCategory)

        const productCategoryArray=[]

         for(const category of productCategory){
            const product=await Product.findOne({category:category})
            if(product){
                productCategoryArray.push(product)
            }
         }
       res.json({
          data:productCategoryArray,
          success:true,
          error:false,
          message:'All Categories fetched'
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

exports.module=getAllCategories