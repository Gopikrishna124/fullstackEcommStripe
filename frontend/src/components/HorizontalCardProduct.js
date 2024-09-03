import React, { useContext, useEffect,useRef, useState } from 'react'
import FetchSingleCategory from '../helpers/getSingleCategoryProduct'
import DisplayCurrency from '../helpers/DisplayCurrency'
import { FaStar } from "react-icons/fa6"
import facebookImage from '../Asset/facebook-6338507_1280.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import {Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import { useDispatch, useSelector } from 'react-redux'
import { toast} from 'react-toastify'
import Context from '../context'
import { cartByUserDetails } from '../store/CartSlice';
import { selectCartByUser } from '../store/CartSlice';
import { UpdatingCartQuantityByUserId } from '../store/CartSlice'


function HorizontalCardProduct({category,heading}) {
  const dispatch=useDispatch()
    const [HozData,setHozData]=useState([])
    const [loading,setloading]=useState(false)
    const loadingList = new Array(13).fill(null)
    const [scroll,setscroll]=useState(0)
    const scrollElement=useRef()
    const userInfo=useSelector((state)=>state.userDetails.user)
    let  cartDataByUserId=useSelector(selectCartByUser)
    // console.log('cartDataByUserId',cartDataByUserId)

    const {click,setClick,checkAdded}=useContext(Context)
  
  const scrollRight = () =>{
        scrollElement.current.scrollTo({
            left: scrollElement.current.scrollLeft + 500,
            behavior: 'smooth'
        });
    }

    const scrollLeft = () =>{    
        scrollElement.current.scrollTo({
            left: scrollElement.current.scrollLeft - 500,
            behavior: 'smooth'
        });
    }
        ////////////////////////////////////////////////
    const fetchData=async(req,res)=>{
        setloading(true)
        const response=await FetchSingleCategory(category)
       
         setloading(false)
         setHozData(response.data)
         
    }
  

    //////////////////////////////////////////////////
    
    const addingToCart=async(e,productId)=>{
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
   
     //////////////////////////////////////////////
    useEffect(()=>{
       fetchData()
       dispatch(cartByUserDetails())
       checkAdded()
    },[dispatch])
  return (
    <div className='container mx-auto px-4 py-2 my-6 relative'>
          <h1 className='text-4xl font-semibold py-4'>{heading}</h1>
         <div className='flex items-center gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
         <button  className='bg-black text-white shadow-md rounded-full p-1 absolute left-0 text-2xl hidden md:block' onClick={scrollLeft} ><FaAngleLeft/></button>
         <button  className='bg-black text-white shadow-md rounded-full p-1 absolute right-0 text-2xl hidden md:block' onClick={scrollRight}  ><FaAngleRight/></button> 
            {
              loading ? (
                loadingList.map((product)=>{
                  return(
                      <div className='w-full min-w-[400px] md:min-w-[500px]  max-w-[280px] md:max-w-[500px] h-64 rounded shadow bg-blue-50 flex md:rounded'>
                       <div className='bg-blue-200 bg-opacity-85 h-full p-4 min-w-[200px] md:min-w-[200px]'>
                         {/* <img src={product.productImage[0]} className='object-scale-down h-full  hover:scale-110 transition-all mix-blend-multiply'/> */}
                      </div> 
                      <div className='bg-blue-50 p-3 min-w-[200px] md:min-w-[200px]'> 
                            
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
                          <hr className='bg-slate-300 w-[200px] h-[2px] mt-2 mb-2'/>
                         
                          <button className='bg-black  bg-opacity-80 p-4 w-full mt-2 text-white rounded-l-xl rounded-r-xl text-xl'></button>
                      </div> 
                   </div>
                  )
              })
              )
             
              :

            HozData.map((product,index)=>{     
              // 400 imag-200 min-w-200   
                return(
                    <Link  to={`product-details/${product._id}`} className='w-full min-w-[400px] md:min-w-[500px]   md:max-w-[500px] h-40 max-h-40  overflow-hidden md:h-64 md:max-h-64 rounded shadow bg-blue-50 flex md:rounded'>
                     <div className='bg-blue-200 bg-opacity-85 h-full p-4 min-w-[200px] md:min-w-[200px]'>
                       <img src={product.productImage[0]} className='object-scale-down h-full  hover:scale-110 transition-all mix-blend-multiply'/>
                    </div> 
                    <div className='bg-blue-50 p-3 min-w-[200px] md:min-w-[200px]'> 
                          
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
                        <hr className='bg-slate-300 w-[200px] h-[2px] mt-2 mb-2'/>
                       
                       {click[product._id]===product._id ?
                        <button className='bg-green-500  bg-opacity-80 p-4 w-full mt-2 text-white rounded-l-xl rounded-r-xl text-xl max-h-[100px]' onClick={(e)=>addingToCart(e,product._id)}>
                          Added  <span className='text-black'>Qt : {cartDataByUserId?.length===Number(0) ?'0':click[`product${product._id}`]}</span>
                        </button>
                        :
                        <button className='bg-black  bg-opacity-80 p-4 w-full mt-2 text-white rounded-l-xl rounded-r-xl text-xl max-h-16' onClick={(e)=>addingToCart(e,product._id)}>
                        Add To Cart   Qt : {cartDataByUserId?.length===Number(0) ?'0':click[`product${product._id}`]}
                        </button>
                    }
                    </div> 
                 </Link>
                )
            })
          }
       
         </div>
        
    </div>
  )
}
  export default HorizontalCardProduct