import logo from './logo.svg';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './Common';
import { useEffect } from 'react';
import Context from './context';
import {useDispatch, useSelector} from 'react-redux'
import { setUserDetails } from './store/userDetailsSlice';
import { useState } from 'react';
import { cartByUserDetails } from './store/CartSlice';
import { selectCartByUser } from './store/CartSlice';
import { DeleteCartByUserId } from './store/CartSlice';

function App() {
  const dispatch=useDispatch()
  const [allProducts,setallProducts]=useState([])
const userInfo=useSelector((state)=>state.userDetails.user)
console.log('userINfo',userInfo)
const [search,setSearch]=useState('')
 const[click,setClick]=useState({})
 const query=useLocation()

  const cartByUserData=useSelector(selectCartByUser)
console.log('cartByUserData',cartByUserData)

//...........................................
 const  fetchUserdetails=async()=>{
    const response=await fetch(summaryApi.userDetails.url,{
     method:summaryApi.userDetails.method,
     credentials:'include' 
   })
   const userdata=await response.json()
   if(userdata?.success){
    dispatch(setUserDetails(userdata.data))
   }
  }
  ////////////////////////////////////////////////////////////
  const getallProducts=async()=>{
    try{
       const response=await fetch(summaryApi.getallProducts.url,{
         method:summaryApi.getallProducts.method,
         credentials:'include'
       })
       const data=await response.json()
    
       setallProducts(data.data)

      
     
    }
    catch(err){
       console.log(err)
    }
 }

//  rendering added button on refreshing
  

    function checkAdded(){
   if(cartByUserData?.length>Number(0)){

    cartByUserData[0]?.userId===userInfo?._id && cartByUserData.map((item)=>{
      setClick((prev)=>{
        return {
          ...prev,
          [item.productId._id]:item.productId._id,
          [`product${item.productId._id}`]:item.quantity
        }
      }) 
    })
   }
  }

 

  // function checkCart(){
  //   if(cartByUserData?.length>0){
  //   cartByUserData?.map((item)=>{
  //       return (
  //         setCartData([
  //                     ...cartData,
  //                {[`productId`]:item.productId._id,[`quantity`]:item.quantity,[`cartId`]:item._id}
  //        ])
            
  //       )
  //       })
      
  //     }
  //   }
  //////////////////////////////////////////////////////////////

/////////////////////////////////////////
  useEffect(()=>{
    
    fetchUserdetails()
  
  
},[dispatch])

useEffect(()=>{
  dispatch(cartByUserDetails())
  checkAdded()
  setSearch('')


 
},[dispatch,userInfo?._id,cartByUserData?.length])




  return (
   <div>
   <Context.Provider value={{
        fetchUserdetails, //fetching user detailss,
        getallProducts,
        allProducts,
        checkAdded,
        click,
        setClick,
        search,
        setSearch
    
   }}>
    <ToastContainer position='top-center'/>
   <Header/>
   <main className='md:min-h-[calc(100vh-190px)] md:p-28'>
     <Outlet/>
   </main>
 
   <Footer/>
   </Context.Provider>
   </div>
  );
}

export default App
