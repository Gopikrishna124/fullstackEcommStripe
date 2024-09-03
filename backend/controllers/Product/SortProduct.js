const Product=require('../../models/productmodel').module

const handleSort=async(req,res)=>{
   
    console.log(req.query)
    const productCategory=req.body.category
    console.log('category',productCategory)
    let fitlered=[]
  for(let key in productCategory){
    if(productCategory[key]===true){
      fitlered.push(key)
    }
  }
  console.log('fitlered',fitlered)

    try{
       const result=await Product.find({category:{$in:fitlered}}).sort({sellingPrice:req.query.order})
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

exports.module=handleSort