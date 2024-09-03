import React, { useEffect, useReducer, useState } from 'react'
import summaryApi from '../Common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';
import { Link } from 'react-router-dom';

function AllUsers() {
    const [allusers,setallusers]=useState([])
    const [openChangeRole,setOpenChangeRole]=useState(false)
    const [roleDetails,setroleDetails]=useState({
      name:'',
      email:'',
      role:'',
      userid:''
    })



 ////////////////////////////////////////////////////////////////////
  

     function handleEdit(user){
      // console.log(user)
       setOpenChangeRole(!openChangeRole);
       setroleDetails((prev)=>{
         return {
            ...prev,
            name:user.name,
            email:user.email,
            role:user.role,
            userid:user._id
         }
       })
         
     }
///////////////////////////////////////////////////////////////////
   const fetchAllUsers=async()=>{
        try{
         const response=await fetch(summaryApi.allusers.url,{
            method:'get',
            credentials:'include'
         })
         const data=await response.json()
         // console.log(data)
         if(data.success){

            setallusers(data.data)
            // console.log(allusers)
         }
         else{
            throw new Error(data.message)
         }
        }
        catch(err){
         toast.error(err)
        }
    }
    useEffect(()=>{
            fetchAllUsers()
    },[])

  return (
    <div className='mt-4'>
      {/* usertable from app.css */}
       <Link className='bg-black  text-white p-3 rounded-full ' to={'/'}>Back Home</Link>
      <table className='w-full max-w-[1100px] mx-auto mt-11 usertable font-semibold'>     
         <thead>
            <tr className='text-xl bg-black bg-opacity-70 text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
            </tr>
         </thead>
         <tbody>
            {
               allusers.map((user,index)=>(
                  <tr>
                     <td className='text-red-700'>{index+1}.</td>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.role}</td>
                     <td>{moment(user.createdAt).format('ll')}</td>
                     <td>
                        <button>
                           <FaEdit className='text-center' onClick={()=>handleEdit(user)}/>
                        </button>
                       
                     </td>
                  </tr>
                  
               ))
            }
         </tbody>
      </table>
      {
         openChangeRole && <ChangeUserRole name={roleDetails.name}
          email={roleDetails.email} 
          role={roleDetails.role}
          userid={roleDetails.userid}
          onClose={()=>setOpenChangeRole(false)}
          callFunc={fetchAllUsers}
         />
     }
     
    </div>
  )
}

export default AllUsers