import React, { useEffect, useState,useContext } from 'react'
import { selectCartByUser } from '../store/CartSlice'
import { useDispatch,useSelector } from 'react-redux'
import DisplayCurrency from '../helpers/DisplayCurrency'
import { UpdatingCartQuantityByUserId } from '../store/CartSlice'
import { cartByUserDetails } from '../store/CartSlice'
import Context from '../context'
import { MdDelete } from "react-icons/md";
import { DeleteCartByUserId } from '../store/CartSlice'
import summaryApi from '../Common'
import {loadStripe} from '@stripe/stripe-js'

function Cart() {
    let  cartUser=useSelector(selectCartByUser)
    // console.log('cart-',cartUser)
    const [loading,setloading]=useState(false)
    const dispatch=useDispatch()
    let cartDataByUserId=useSelector(selectCartByUser)
    // console.log('cartData',cartDataByUserId)
    const {click,setClick,checkAdded}=useContext(Context)
  
    /////////////////////////////
    const updateQuantity=(productId)=>{
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

    }
    ///////////////////////////////////////////////
    const handleDelete=async(deleteId)=>{

      dispatch(DeleteCartByUserId(deleteId))
      setClick({})
    }

    /////////////////////////////////////////////////////
   const decreaseQuantity=async(productId,deleteId)=>{
  
    console.log('deleteId',productId)

    const filter=cartDataByUserId.filter((item)=>(
      item.productId._id===productId
    ))
console.log('filter',filter)

    if(filter[0].quantity===1){
      dispatch(DeleteCartByUserId(deleteId))
      setClick({})
    }
    else{
        const product={...filter[0]}
        console.log('productsss',product)
       product.quantity=product.quantity-1

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
        }
    }

    //////////////////////////////////////////

    const handlePayment=async()=>{
      const stripePromise=await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
      const response=await fetch(summaryApi.Payment.url,{
        method:summaryApi.Payment.method,
        credentials:'include',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({cartItems:cartUser})
      })

      const data=await response.json()
      console.log('paymentData',data)

      if(data.data?.id){
        stripePromise.redirectToCheckout({sessionId:data.data.id})
      }
    }

    ////////////////////////////////////////////////////

    useEffect(()=>{
        dispatch(cartByUserDetails())
        
    },[dispatch,cartDataByUserId.length])

    const totalQuantity=cartUser.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
   const totalPrice=cartUser.reduce((previousValue,currentValue)=>previousValue + currentValue.productId?.sellingPrice * currentValue.quantity,0)
    return (
    <div className='md:container mx-auto'>
        <div className='text-center text-lg my-3'>
        {
         cartUser.length===0 &&  !loading && (
            <p className='bg-blue-50 text-black py-5'>No data</p>
         )
        }
        </div>
         
        <div className='flex flex-col lg:flex-row justify-between p-4  md:min-h-[calc(100vh-300px)]'>
             {/* view Product */}
             <div className='w-full max-w-5xl'>
             {cartUser?.map((item)=>{
              return ( 
              <div  className=' md:w-[750px] h-40 bg-blue-50 md:h-40 my-2 rounded-md grid  grid-cols-[90px,1fr] md:grid-cols-[130px,1fr] '>
                <div className='w-32 h-32'>
                  <img src={item?.productId?.productImage[0]} className='w-24 md:w-full h-28 object-scale-down py-2 mix-blend-multiply'/>
                </div>
                <div className='px-4 py-2 relative'>
                  <div className='absolute right-0 top-24 md:absolute md:right-0  md:top-0 rounded-full text-red-600 text-2xl  md:p-4 md:py-2 md:hover:bg-red-600 md:hover:text-white cursor-pointer ' onClick={()=>handleDelete(item?._id)}>
                    <MdDelete/>
                    </div>
                  <h2 className='text-lg text-ellipsis line-clamp-1 font-bold'>{item?.productId?.productName}</h2>
               
                 <div className='flex justify-between md:my-2'>
                 <p className='text-red-500 font-medium text-lg p-1'>{DisplayCurrency(item?.productId?.sellingPrice)}</p>
                 <p className='text-red-500 font-medium text-lg p-1'>TQ :{DisplayCurrency(item?.productId?.sellingPrice * item?.quantity)}</p>
                  </div>
                  <div className='flex gap-2 items-center mt-1'> 
                    <button className='border border-white bg-black text-white w-9 h-9 flex justify-center items-center rounded-md'
                    onClick={()=>decreaseQuantity(item?.productId?._id,item?._id)}>-</button>
                    <span>{item?.quantity}</span>
                    <button className='border border-white bg-black text-white w-9 h-9 flex justify-center items-center rounded-md'
                     onClick={()=>updateQuantity(item?.productId?._id)}
                    >+
                    </button>
                  </div>
                  </div>
               </div>
              )
              })
             }
           
           </div>
             {/* total products */}

             {
              cartUser[0] &&
              <div className='h-[220px] bg-blue-50 my-2 border w-full md:max-w-[500px]'>
              <div className='h-16 bg-slate-200'>
                 <h2 className='bg-black text-white h-full  px-4 py-3 text-2xl'>Summary</h2>
                 <div>

                   <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg mt-2'>
                   <p className='text-red-600 text-2xl'>Total Quantity</p>
                   <p className='mr-14 text-2xl'>{totalQuantity}</p>
                   </div>

                   <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg mt-3'>
                   <p className='text-red-600 text-2xl'>Total Price</p>
                   <p className='mr-14 text-2xl'>{DisplayCurrency(totalPrice)}</p>
                   </div>

                   <button className='bg-green-500 text-white w-full px-4 py-2 text-2xl  h-full mt-4 rounded-md' onClick={handlePayment}>Payment</button>

                 </div>
              </div>
              </div>
             }
           
          
        
         
       </div>

       
    </div>
  )
}

export default Cart