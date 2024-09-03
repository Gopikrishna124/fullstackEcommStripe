import React, { useState ,useEffect, useContext} from 'react'
import UploadProduct from '../components/UploadProduct'
import Context from '../context'
import AdminProductCard from '../components/AdminProductCard'


function AllProducts() { // console.log(allProducts)
  const [openUploadProduct,setUploadProduct]=useState(false)
  // const [allProducts,setallProducts]=useState([])
 
///////////////////////////////////////////////////////////////////
//  const getallProducts=async()=>{
//      try{
//         const response=await fetch(summaryApi.getallProducts.url,{
//           method:summaryApi.getallProducts.method,
//           credentials:'include'
//         })
//         const data=await response.json()
//         console.log(data)
//         setallProducts(data.data)
//      }
//      catch(err){
//         console.log(err)
//      }
//   }
          
  const {getallProducts,allProducts}=useContext(Context) //coming from contextProvider in App.js
 
  useEffect(()=>{
    getallProducts()
 },[])
  return (
    <div>
      <div className=' py-2 px-4 flex justify-between items-center font-bold'>
         <h2 className='font-bold text-3xl  underline'>All Products</h2> 
         <button className='py-2 px-4 bg-red-600 text-white rounded-full border-2 mr-44' onClick={()=>setUploadProduct(!openUploadProduct)}>Upload Product</button>
      </div>
      {
        openUploadProduct &&  <UploadProduct onClose={()=>setUploadProduct(false)}/>
      }

     <div className='flex gap-8  px-2 py-4 flex-wrap h-[calc(100vh-250px)] overflow-y-scroll max-h-[100%]'>
       {
        allProducts?.map((product)=>{
        return (
         <AdminProductCard data={product}/>
            
          )
        
         })
       }
     </div>
     
      
    </div>
  )
}

export default AllProducts