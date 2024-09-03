
import summaryApi from "../Common"


const addToCart=async(id)=>{

    const payload={
        productId:id,
        Added:true
    }

    const response=await fetch(summaryApi.cartDetails.url,{
        method:summaryApi.cartDetails.method,
        credentials:'include',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(payload)
    })

    const data=await response.json()
 
    return data
}

export default addToCart