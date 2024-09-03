const Product=require('../../models/productmodel').module

const FetchProductsByCategory=async(req,res)=>{
      const productCategory=req.body.category
   
      let fitlered=[]
    for(let key in productCategory){
      if(productCategory[key]===true){
        fitlered.push(key)
      }
    }

   
    try{ 
       
        const result=await Product.find({
            category:{ $in: fitlered}
        })
        // console.log('filtered Products',result)
          res.json({
            data:result,
            success:true,
            error:false,
            message:'products Filtered Successfully'
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
exports.module=FetchProductsByCategory