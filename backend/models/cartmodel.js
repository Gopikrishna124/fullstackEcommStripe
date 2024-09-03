const mongoose=require('mongoose')
const {Schema}=mongoose

const cartModel=new Schema({
   productId:{type:Schema.Types.ObjectId,ref:'Product',required:true},
   quantity:Number,
   userId:String,
   Added:Boolean
})

const Cart=mongoose.model('Cart',cartModel)
exports.module=Cart