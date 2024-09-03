import React, { useEffect, useState } from 'react'
import summaryApi from '../Common'
import { Link } from 'react-router-dom'

function CategoriesList() {
    const[categories,setCategories]=useState([])
    const[loading,setloading]=useState(false)

    const categoryArray=new Array(13).fill(null)

    ////////////////////////////////////////////////
    const getAllCategories=async(req,res)=>{
          try{
            setloading(true)
        const response=await fetch(summaryApi.getAllCategories.url,{
            method:summaryApi.getAllCategories.method
        })
        const data=await response.json()
       
        setCategories(data.data)
        setloading(false)
       }
       catch(err){
        setloading(false)
          console.log(err)
       }
    }

    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <div className='container mx-auto p-4'>
                  
         <div className='flex gap-2 justify-between items-center overflow-scroll scrollbar-none'>
         { 
          
            loading ?(
                categoryArray.map((category,index)=>(
                    <div className='w-20 h-20 md:w-20 md:h-30 rounded-full bg-blue-50 animate-pulse' key={index}></div>
                ))            
            ):(
            categories.map((product,index)=>{
                return (
                    <Link  to={'categories-product?category='+product?.category} className='cursor-pointer' key={index}>
                      <div className=' w-16 h-16 md:w-20 md:h-24 rounded-full overflow-hidden p-4 bg-blue-50 flex justify-center items-center'>
                            <img src={product?.productImage[0]} alt='productImage' className='h-full mix-blend-multiply object-scale-down hover:scale-125 transition-all'/>
                        </div>
                        <div className='mt-2 flex justify-center items-center'>
                        <p className='text-sm md:text-base capitalize font-semibold'>{product?.category}</p>
                        </div>
                    </Link>
                )  
            })
        )
          }
         </div>
    </div>
  )
}

export default CategoriesList