const Product=require('../../models/productmodel').module

const SearchProduct=async(req,res)=>{
     const query=req.query.q

     const regex= new RegExp(query,'i') 
     //to get search value even if first letter typed is capital or smaller in products
    
     if(req.query.q){
    try{    
      const result=await Product.find({
        "$or":[
            {
               productName:regex
            },
            {
              category:regex
            }
        ]
      })
      res.json({
        data:result,
        success:true,
        error:false,
        message:'product fetched successfully'
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
}

exports.module=SearchProduct