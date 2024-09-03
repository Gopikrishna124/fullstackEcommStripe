const stripe=require('../../config/Stripe').module
//to save webhook data in orders in mongoose we created ordermodel and imported
const Order=require('../../models/ordermodel').module

const Cart=require('../../models/cartmodel').module

const endpoint=process.env.WEBHOOK_SECRET_KEY
//function to get lineItems image price and all which we cant get in webhooks


async function getLineItems(lineItems){
    let productItems=[]

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product=await stripe.products.retrieve(item.price.product)
            const productId=product.metadata.productId

           const productData={
                productId:productId,
                name:product.name,
                price:item.price.unit_amount/100,
               quantity:item.quantity,
               image:product.images
           }
           productItems.push(productData)
          
        }
    }

    return productItems
}

const webhooks=async(req,res)=>{
    const sig=req.headers['stripe-signature']

    const payloadString=JSON.stringify(req.body)
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret:endpoint,
      });
    let event;

    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpoint);
    }
    catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return
    }
    switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('session',session)
           const lineItems=await stripe.checkout.sessions.listLineItems(session.id)
             const productDetails=await getLineItems(lineItems)
             const orderDetails={
              productDetails:productDetails,
              email:session.customer_email,
              userId:session.metadata.userId,
              paymentDetails:{
                paymentId:session.payment_intent,
                payment_method_type:session.payment_method_types,
                payment_status:session.payment_status
               },
               shipping_options:session.shipping_options.map(s=>{
                return {
                  ...s,shipping_amount:s.shipping_amount / 100
                }
               }),
               totalAmount:session.amount_total/100
             }
  
             const order=new Order(orderDetails)
             const saveOrder=await order.save()
             if(saveOrder._id){
              const deleteCartItem=await Cart.deleteMany({userId:session.metadata.userId})
             }
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
  res.status(200).send()

}

exports.module=webhooks

