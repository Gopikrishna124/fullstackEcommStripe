

const url=`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`

const UploadImage = async(image) => {
    const formData=new FormData()
    formData.append('file',image)
    formData.append('upload_preset','mern_product')

   const response=await fetch(url,{
    method:'post',
    body:formData
   })
   return response.json()
}

export default UploadImage