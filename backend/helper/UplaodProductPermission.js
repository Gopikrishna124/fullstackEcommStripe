const User=require('../models/usermodel').module

const UploadProductPermission=async(userId)=>{
      
     const user=await User.findById(userId)
     if(user?.role==='ADMIN'){
        return false
     }
     else{
        return false
     }
}
exports.module=UploadProductPermission