const mongoose=require('mongoose')
require('dotenv').config()
const Connection=async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL)
      console.log('database connected')
    }
    catch(err){
       console.log(err)
    }
}
exports.module=Connection