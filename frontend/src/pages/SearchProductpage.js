import React, { useEffect, useState,useContext } from 'react'
import { json, useLocation } from 'react-router-dom'
import summaryApi from '../Common'
import ChildVerticalProductCard from '../components/ChildVerticalProductCard'
import Context from "../context/index.js";


function SearchProductpage() {
    const query=useLocation()
   
    const [Searchdata,setSearchData]=useState([])
    const [loading,setLoading]=useState(false)
    const {search,setSearch}=useContext(Context) 
    if(!query.search){
        setSearch('')
    }
   
  
    const fetchSearchProduct=async()=>{
        setLoading(true)
        const response=await fetch(summaryApi.SearchProduct.url+query.search,{
            method:summaryApi.SearchProduct.method,
        })
        const data=await response.json()
        console.log('searchProduct',data)
        setSearchData(data.data)
        setLoading(false)
         
    }
    useEffect(()=>{
        fetchSearchProduct()
    },[query])
  return (
    <div className='md:container mx-auto p-4'>
        {
            loading && <p className='text-xl text-center'>Loading ...</p>
        }

     <p className='text-xl my-2 font-bold'>Search Results : <span className='text-red-500'>{Searchdata.length}</span></p>
     {
        Searchdata.length===0 && !loading &&(
            <p className='text-2xl text-center p-4'>No data Found ...</p>
        )
     }

     {
        Searchdata.length!==0 && (
    
        <ChildVerticalProductCard  loading={loading}  HozData={Searchdata} />


                
        )       
     }
    </div>
  )
}

export default SearchProductpage