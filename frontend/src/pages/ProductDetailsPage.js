import React, {useContext, useEffect, useState } from 'react'
import summaryApi from '../Common'
import {Outlet, useNavigate, useParams} from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6"
import DisplayCurrency from '../helpers/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import RecommendedProducts from '../components/RecommendedProducts';
import addToCart from '../helpers/addToCart';
import { useDispatch,useSelector} from 'react-redux';
import { cartByUserDetails } from '../store/CartSlice';
import { selectCartByUser } from '../store/CartSlice';
import { UpdatingCartQuantityByUserId } from '../store/CartSlice'
import { toast} from 'react-toastify'
import Context from '../context'

function ProductDetailsPage() {
  const [detailsData,setDetailsData]=useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:[],
    description:'',
    price:'',
    sellingPrice:''
  })

   let params=useParams()
   const [loading,setloading]=useState(true)
   const ProductImageArray=new Array(4).fill(null)
   const [currentIndex,setCurrentIndex]=useState(0)
   const dispatch=useDispatch()
   let  cartDataByUserId=useSelector(selectCartByUser)
   console.log('cartDataByUserId',cartDataByUserId)

   const {click,setClick,checkAdded}=useContext(Context)
   const navigate=useNavigate()

    
   if(params.childid){
    params=params.childid
    console.log('check',params)
   }
   else{
    params=params.id
   }
  //  console.log('params',params)
  console.log('detailsdata',detailsData)
  //////////////////////////////////////////////////////
  function ChangeImageOnHover(index){
      setCurrentIndex(index)
  }
  ////////////////////////////////////////////////////////////////
  function moveLeft(){
    if(currentIndex===0){
        setCurrentIndex(detailsData.productImage.length-1)
    }
    else{
      setCurrentIndex((prev)=>prev-1)
    }
  }

  function moveRight(){
    if(currentIndex===detailsData.productImage.length-1){
        setCurrentIndex(0)
    }
    else{
      setCurrentIndex((prev)=>prev+1)
    }
  }
  ///////////////////////////////////////////////////////////////

   const FetchProductDetailsData=async()=>{
    try{
      setloading(true)
      const response=await fetch(summaryApi.getProductDetails.url,{
        method:summaryApi.getProductDetails.method,
        headers:{
           'content-type':'application/json'
        },
        body:JSON.stringify({id:params})
      })
      const data=await response.json()
      setDetailsData(data.data)
      console.log('params data',data)
      setloading(false)

    }
    catch(err){
          setloading(false)
    }
   }
//////////////////////////////////////////////////////////////////////////
const handleCart=async(e,productId)=>{

    e.preventDefault()     
   
  if(cartDataByUserId?.findIndex((item)=>item.productId._id===productId)<0){
    const response=await addToCart(productId)
    console.log('responseData',response)
    toast.success('product added')
    cartDataByUserId=response.data
    dispatch(cartByUserDetails())

    setClick((prev)=>{
             return {
               ...prev,
               [productId]:productId,
               [`product${productId}`]:response.data.quantity
             }
            })
   
 }
 else{
   const filter=cartDataByUserId.filter((item)=>(
               item.productId._id===productId
             ))
             console.log('filter',filter)
                 const product={...filter[0]}
                 console.log('productsss',product)
                product.quantity=product.quantity+1
         
                 const productData={
                   cartId:product._id,
                   quantity:product.quantity
                 }
                  
                  dispatch(UpdatingCartQuantityByUserId(productData))
                  dispatch(cartByUserDetails())
                  
                  setClick((prev)=>{
                   return {
                     ...prev,
                     [productId]:productId,
                     [`product${productId}`]:productData.quantity
                   }
                  })

                  toast.success('quantity increased')
 }
  

}
///////////////////////////////////////////////////////

const handleBuy=async(e,productId)=>{

  e.preventDefault()     
 
if(cartDataByUserId?.findIndex((item)=>item.productId._id===productId)<0){
  const response=await addToCart(productId)
  console.log('responseData',response)
  toast.success('product added')
  cartDataByUserId=response.data
  dispatch(cartByUserDetails())

  setClick((prev)=>{
           return {
             ...prev,
             [productId]:productId,
             [`product${productId}`]:response.data.quantity
           }
          })

        navigate('/cart')
 
}
else{
 const filter=cartDataByUserId.filter((item)=>(
             item.productId._id===productId
           ))
           console.log('filter',filter)
               const product={...filter[0]}
               console.log('productsss',product)
              product.quantity=product.quantity+1
       
               const productData={
                 cartId:product._id,
                 quantity:product.quantity
               }

                dispatch(UpdatingCartQuantityByUserId(productData))
                dispatch(cartByUserDetails())
                
                setClick((prev)=>{
                 return {
                   ...prev,
                   [productId]:productId,
                   [`product${productId}`]:productData.quantity
                 }
                })


                toast.success('quantity increased')
                navigate('/cart')
              
}


}
//////////////////////////////////////////////////////////////////
   useEffect(()=>{
     FetchProductDetailsData()
     dispatch(cartByUserDetails())
   },[params])
  return (
    // md:h-[calc(100vh-280px)]
    <>
        <div className='md:container mx-auto p-4  mt-5 md:w-full'>
    
      <div className='md:h-full flex flex-col lg:flex-row md:gap-4'> 
      {/*  product-image  */}
      <div className='flex flex-col lg:flex-row-reverse gap-4'>
        <div className='sm:w-[240px] sm:h-[240px] max-h-[240px] bg-blue-50  md:min-w-[600px]  md:min-h-[600px] p-1'>

          
          <div className='scrollbar-none relative sm:max-h-[240px] md:min-w-[600px] md:min-h-[600px] '>
           {
            loading ?( 
              <div className='md:w-full md:h-full bg-blue-50 animate-pulse'>
                </div>
            )
            :(
              <div className='object-scale-down  min-w-[240px] max-h-[240px] md:h-full md:min-w-[600px] md:max-h-[600px] flex overflow-hidden mix-blend-multiply'>
                {
              detailsData.productImage.map((img)=>{
                
                return (
                   
                    
                     <img src={img} className='object-scale-down mix-blend-multiply transition-all rounded-r-xl rounded-l-xl  min-w-full md:min-w-full' 
                      style={{transform : `translateX(-${currentIndex * 100}%)`}} />
                      
          
                )

              })
            }
              </div>
            )
           }
          </div>
           
            {
              !loading && 
               <div className='hidden md:flex justify-center text-2xl absolute top-[400px]'>
               <button  onClick={moveLeft} className='rounded-full bg-red-500 text-white p-1 md:-ml-3 md:mr-[560px]'><FaAngleLeft/></button>
               <button   onClick={moveRight} className='rounded-full bg-red-500 text-white p-1'><FaAngleRight/></button> 
           </div>
            }
               
           
         

        </div>
        <div className=' h-[230px] w-[230px] md:h-[600px]  md:w-36 '>
         {
          loading ?(
              <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none w-full h-full'>
                {
                    ProductImageArray.map((product,index)=>{
                      return (
                        <div className='h-24 w-24 bg-blue-50 rounded animate-pulse' key={index}>
                                  
                        </div>
                      )
                    })
                }
              </div>
          )
           :(
            <div className='flex  sm:flex gap-9 md:gap-6 flex-wrap lg:flex-col overflow-scroll scrollbar-none'>
            {
             
              detailsData?.productImage.map((img,index)=>{
                return (
                        <div className='h-24 w-24 md:h-32 md:w-32 bg-slate-300 rounded p-1 cursor-pointer' onMouseEnter={()=>ChangeImageOnHover(index)} key={`product${index}`}>
                              <img src={img} className='w-full h-full object-scale-down mix-blend-multiply'/>
                        </div>
                      )
              })
            }
          </div>
           )
         }
        </div>
      </div>

      {/* product-details */}
        {
          loading ?(
            
      <div className='p-5 ml-4'>
      <div className='flex gap-3'>
          <div className='flex items-center gap-3'>
          <span className='bg-blue-50 w-6 h-5 rounded animate-pulse'></span>
           <p className='bg-blue-50 w-10 h-5 rounded animate-pulse'></p>
           <p className='text-slate-400 -mt-1'></p>
          </div>

          <div>
            <p className='bg-blue-50 w-14 h-5 rounded animate-pulse'></p>
          </div>
      </div>
      
      <div>
      <h2 className='bg-blue-50 w-48 h-6 rounded animate-pulse mt-4'></h2>
      </div>

      <div className='flex gap-3 mt-3 items-center'>
          <p className='bg-blue-50 w-20 h-6 rounded animate-pulse mt-4'></p>
          <p className='bg-blue-50 w-20 h-6 rounded animate-pulse mt-4'></p>
      </div>

      <div className='mt-4 mb-4 text-xl  overflow-hidden'>
        <p className='bg-blue-50 w-[700px] min-h-[350px] rounded animate-pulse mt'><span className='bg-blue-50 w-40 h-6 rounded animate-pulse'></span></p>
      </div>

      <div>
      <button className=' bg-blue-50 p-4 h-16 rounded-l-xl rounded-r-xl text-xl min-w-[150px] md:mr-3 mt-2 animate-pulse'></button>
      <button className='bg-blue-50 p-4 h-16 rounded-l-xl rounded-r-xl text-xl min-w-[150px] md:mr-3 mt-2 animate-pulse'></button> 
      </div>
      
      
  </div>
          )
          :(
            
      <div className='p-5 md:ml-4 sm:min-w[220px]'>
      <div className='flex gap-3'>
          <div className='flex items-center gap-3'>
          <span><FaStar className='text-yellow-400'/></span>
           <p>4.8</p>
           <p className='text-slate-400 -mt-1'>|</p>
          </div>

          <div>
            <p className='font-medium'>172 reviews</p>
          </div>
      </div>
      
      <div>
      <h2 className=' text-2xl md:text-4xl font-semibold mt-2 capitalize eclipsis line-clamp-1 text-slate-700'>{detailsData.productName}</h2>
      </div>

      <div className='flex gap-3 mt-3 items-center'>
          <p className='text-red-600 font-bold md:text-2xl'>{DisplayCurrency(detailsData.sellingPrice)}</p>
          <p className='text-slate-500 line-through md:text-xl'>{DisplayCurrency(detailsData.price)}</p>
      </div>

      <div className=' hidden md:block mt-4 mb-4 text-xl'>
        <p className='hidden md:block font-medium text-slate-600 md:text-justify'><span className='font-bold md:mr-2 text-2xl text-slate-700'>Description :</span>{detailsData.description}</p>
      </div>

      <div>
      <button className='bg-red-500  bg-opacity-90  p-4  mt-2 text-white  rounded-l-xl rounded-r-xl md:text-xl min-w-[100px] md:min-w-[150px] mr-3' onClick={(e)=>handleBuy(e,detailsData._id)}>Buy</button>
      <button className='bg-black  bg-opacity-80 p-4  mt-2 text-white rounded-l-xl rounded-r-xl md:text-xl min-w-[100px] md:min-w-[150px]'onClick={(e)=>handleCart(e,detailsData._id)}>Add To Cart</button> 
      </div>
         
      
  </div>
          )
        }
    </div>

    <div className='md:container md:w-full'>
      {
      
      detailsData?.category && 
       <RecommendedProducts category={detailsData.category} heading={'Recommended Products'}/>

    }
    </div>
    
  </div>
  {/* <Outlet/> */}
  </>



  )
}

export default ProductDetailsPage