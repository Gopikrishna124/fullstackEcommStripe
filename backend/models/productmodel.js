const mongoose=require('mongoose')
const {Schema}=mongoose

const productModel=new Schema({
    productName:{type:String,required:true},
    brandName:{type:String,required:true},
    category:{type:String,required:true},
    productImage:[],
    description:{type:String},
    price:{type:Number},
    sellingPrice:{type:Number}
},{timestamps:true})

const Product=mongoose.model('Product',productModel)
exports.module=Product