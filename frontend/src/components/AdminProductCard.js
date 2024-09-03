import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProductCard from './AdminEditProductCard';
import displayCurrency from "../helpers/DisplayCurrency";

function AdminProductCard({data}) {
  const[openEditProductCard,setEditProductCard]=useState(false)
  return (
    <div className='bg-blue-50 p-4 rounded-2xl max-h-[300px]'>
         <div className='w-40 '>
          <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} alt='product image'
             width={130} height={130} className='h-full object-fill mx-auto'/>
          </div>
             <div className='w-32 h-11 flex justify-center items-center mt-3'>
             <h1 className='text-ellipsis line-clamp-2 h-full w-full font-bold'>{data.productName}</h1>
             </div>

             <div className='mt-5'>
               <p className='font-bold text-red-600'>
                  {
                    displayCurrency(data.sellingPrice)
                  }
               </p>
             <div className='w-fit ml-auto bg-black
              text-white p-1 rounded-full cursor-pointer'
              onClick={()=>setEditProductCard(!openEditProductCard)}>
                <MdEdit/>
             </div>
            {
              openEditProductCard &&
             <AdminEditProductCard data={data} onClose={()=>setEditProductCard(false)}/> 
            }
            </div>
          </div>
    </div>
  )
}

export default AdminProductCard