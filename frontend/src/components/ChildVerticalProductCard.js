import React, { useEffect, useRef, useState,useContext } from 'react'
import FetchSingleCategory from '../helpers/getSingleCategoryProduct'
import DisplayCurrency from '../helpers/DisplayCurrency'
import { FaStar } from "react-icons/fa6"
import facebookImage from '../Asset/facebook-6338507_1280.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { cartByUserDetails } from '../store/CartSlice';
import { selectCartByUser } from '../store/CartSlice';
import { UpdatingCartQuantityByUserId } from '../store/CartSlice'
import Context from '../context'
import { toast} from 'react-toastify'
import addToCart from '../helpers/addToCart';
import { useDispatch,useSelector} from 'react-redux';

function ChildVerticalProductCard({loading,HozData}) {
    const loadingList = new Array(13).fill(null)
    const dispatch=useDispatch()
    let  cartDataByUserId=useSelector(selectCartByUser)
    const {click,setClick,checkAdded}=useContext(Context)
    //////////////////////////////////////////////////
    async function handleSearchCart(e,productId){
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
////////////////////////////////
useEffect(()=>{
  
   dispatch(cartByUserDetails())
 },[dispatch])


  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(110px 110px))] md:grid-cols-[repeat(auto-fit,minmax(420px,420px))] justify-center md:justify-between'>
        
    {
      loading ? 
         
    loadingList.map((product)=>{
      return(
          <div className='w-full min-w-[280px] md:min-w-[500px]  max-w-[280px] md:max-w-[500px]  rounded shadow bg-blue-50  md:rounded '>
           <div className='bg-blue-200 bg-opacity-85 h-64 p-4 min-w-[120px] md:min-w-[250px] mx-auto flex justify-center'>
             
          </div> 
          <div className='bg-blue-50 p-3 min-w-[250px]'> 
                
                <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
              <span className='text-yellow-400'></span>
              <p className='capitalize p-1 rounded-full text-md font-bold'></p>
              </div>
              <div className='flex items-center'>
                <img src='' className='w-5 rounded-full mt-1 m'/>
                  <p className='capitalize text-green-600 mt-2 bg-blue-100 w-[80px] p-1 flex justify-center rounded-full text-sm -mr-4'></p>
              </div>
              </div>
              
              <h2 className='font-bold text-base md:text-xl text-eclipsis line-clamp-1'></h2> 
               <p className='capitalize text-slate-500 mt-2 bg-blue-100 w-[70px] p-1 flex justify-center rounded-full text-sm'></p>
               <div className='flex gap-3 mt-3 items-center'>
                  <p className='text-green-600 font-bold text-xl'></p>
                  <p className='text-slate-500 line-through text-md'></p>
              </div>
              <hr className='bg-slate-300 w-[400px] h-[2px] mt-2 mb-2'/>
             
              <button className='bg-black  bg-opacity-80 p-4 w-full mt-2 text-white rounded-l-xl rounded-r-xl text-xl'></button>
          </div> 
       </div>
      )
  })
     :

    HozData.map((product)=>{
        return(
            <Link   to={`/product-details/${product._id}`}  className='w-full min-w-[280px] md:min-w-[500px]  max-w-[280px] md:max-w-[500px]  rounded shadow bg-blue-50 
             md:rounded  mb-5' onClick={()=>window.scrollTo({top:0 ,behavior:'smooth'})}>
             <div className='bg-blue-200 bg-opacity-85 h-48 md:h-64 p-4 min-w-[120px] md:min-w-[250px] mx-auto flex justify-center'>
               <img src={product.productImage[0]} className='object-scale-down h-full  hover:scale-110 transition-all mix-blend-multiply'/>
            </div> 
            <div className='bg-blue-50 p-3 min-w-[250px]'> 
                  
                  <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center'>
                <span className='text-yellow-400'><FaStar/></span>
                <p className='capitalize p-1 rounded-full text-md font-bold'>4.8</p>
                </div>
                <div className='flex items-center'>
                  <img src={facebookImage} className='w-5 rounded-full mt-1 m'/>
                    <p className='capitalize text-green-600 mt-2 bg-blue-100 w-[80px] p-1 flex justify-center rounded-full text-sm -mr-4'>Best Seller</p>
                </div>
                </div>
                
                <h2 className='font-bold text-base md:text-xl text-eclipsis line-clamp-1'>{product.productName}</h2> 
                 <p className='capitalize text-slate-500 mt-2 bg-blue-100 w-[70px] p-1 flex justify-center rounded-full text-sm'>{product.category}</p>
                 <div className='flex gap-3 mt-3 items-center'>
                    <p className='text-green-600 font-bold text-xl'>{DisplayCurrency(product.sellingPrice)}</p>
                    <p className='text-slate-500 line-through text-md'>{DisplayCurrency(product.price)}</p>
                </div>
                <hr className='bg-slate-300 w-[200px] md:w-[400px] h-[2px] mt-2 mb-2'/>
               
                <button className='bg-black  bg-opacity-80 p-4 w-full mt-2 text-white rounded-l-xl rounded-r-xl text-xl' onClick={(e)=>handleSearchCart(e,product._id)}>Add To Cart</button>
            </div> 
         </Link>
        )
    })
  }

 </div>
  )
}

export default ChildVerticalProductCard