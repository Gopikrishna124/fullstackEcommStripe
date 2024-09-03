const Cart=require('../../models/cartmodel').module


const AddToCartController=async(req,res)=>{
    
    try{
      
       const productId=req.body.productId
       const Added=req.body.Added
       const currentUser=req.user
       console.log('cuurentUser',currentUser)
        
       
        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser,
            Added:Added
           }
    
           const addCart=new Cart(payload)
           const result=await addCart.save()
         const pop=await  result.populate('productId')
 
    
           res.json({
              message:'product added to cart',
               data:pop,
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

exports.module=AddToCartController