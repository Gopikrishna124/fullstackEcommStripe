import React, { useState } from 'react'
import ROLE from '../Common/role'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../Common';
import { toast } from 'react-toastify';



function ChangeUserRole({name,email,role,onClose,userid,callFunc}) {
   console.log(name,email,role,userid)
  const [userrole,setuserRole]=useState(role)

  const payload={
    userid:userid,
    role:userrole
  }

  console.log(payload)
 

  function handleUserRole(e){
    setuserRole(e.target.value)
   
  }
  /////////////////////////////////////////
 async function updateUser(){

   try{
         const response=await fetch('http://localhost:5400/api/update-user',{
      method:summaryApi.updateUser.method,
      credentials:'include',    
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
   
    
     })
     const data=await response.json()
     console.log(data)
     if(data.success){
      toast.success(data.message)
      onClose()
      callFunc()
     }
     else{
      throw new Error(data.message)
     }

    }
    catch(err){
    toast.error(err)
    }
 }

  return (
    <div className=' fixed  top-0 bottom-0  left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-blue-100 bg-opacity-40'>
      <div className='max-w-md h-[350px] mx-auto bg-blue-50 p-4 w-full'>
        <button className='block ml-auto' onClick={onClose }>
                 <IoMdClose/> 
        </button>
         <h1 className=' font-medium pb-4  text-2xl underline'>Change User Role</h1>
          
          <p className='text-red-500 font-bold p-3 text-xl'>Name : <span className='text-black font-semibold ml-2'>{name}</span></p>
          <p className='text-red-500 font-bold p-3 text-xl'>Email :<span className='text-black font-semibold ml-4'>{email}</span></p>
          <div  className='flex items-center justify-between my-3 mr-7'>
          <p className='text-red-500 font-bold p-3 text-xl'>Role :</p>
         <select className='border px-4 py-1' vlaue={userrole} onChange={handleUserRole}>
            {
               Object.values(ROLE).map((el)=>(
                    <>
                     <option value={el} key={el}>{el}</option>
                    </>
               ))
            }
         </select>
         </div>

         <button className='bg-black text-white mx-auto  block px-6 py-2 mt-6 rounded-full' onClick={updateUser}>Change Role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole