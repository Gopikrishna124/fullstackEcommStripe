const stripe=require('../../config/Stripe').module
const usermodel=require('../../models/usermodel').module

const PaymentController=async(req,res)=>{
    console.log('cartItems',req.body.cartItems)
    try{
       const {cartItems}=req.body

       const user=await usermodel.findOne({_id:req.user})
       
       const params={
          submit_type:'pay',
          mode:'payment',
          payment_method_types:['card'],
          billing_address_collection:'auto',
          shipping_options:[
            {
                shipping_rate:'shr_1PtofMIRVuc5gmD3Y68ikTOm'
            }
          ],
          customer_email:user.email,
          metadata:{
            userId:req.user
          },
          line_items:cartItems.map((item,index)=>{
            return{
                 price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.productId.productName,
                        images:item.productId.productImage,
                        metadata:{
                            productId:item.productId._id
                        }
                    },
                    unit_amount:item.productId.sellingPrice * 100
                   
                 },
                 adjustable_quantity:{
                    enabled:true,
                    minimum:1
                 },
                 quantity:item.quantity
            }
          }),
          success_url:`${process.env.FRONTEND_URL}/success`,
          cancel_url:`${process.env.FRONTEND_URL}/cancel`

       }

       const session=await stripe.checkout.sessions.create(params)
       res.json({
        data:session,
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

exports.module=PaymentController