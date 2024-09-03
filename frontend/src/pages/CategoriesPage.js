import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import summaryApi from '../Common'
import productCategory from '../helpers/ProductCategory'
import ChildVerticalProductCard from '../components/ChildVerticalProductCard'


function CategoriesPage() {
    // const params=useParams()
    // console.log(params.CategoryName)
    const navigate=useNavigate()
    const location=useLocation()
    const urlSearch=new URLSearchParams(location.search)
    
    const urlCategoryListinArray=urlSearch.getAll('category')
   
   const urlCategoryListObject={}
   urlCategoryListinArray.forEach(el=>{
    urlCategoryListObject[el]=true
 })
     
 const [categoryData,setCategoryData]=useState([])
    const [loading,setloading]=useState(false)
    const [categoryArray,setcategoryArray]=useState(urlCategoryListObject)
    const [sorting,setSorting]=useState('asc')
    
   
  

///////////////////////////////////////////
const handleMultipleCategory=async(e,categoryValue)=>{

  const {value,checked,name}=e.target
  setcategoryArray((prev)=>{
    return {
      ...prev,
       [value]:checked
    }
  })
  console.log('categoryArray',name,checked,value) 
}

  const fetchMultipleCategory=async()=>{
  const resposne=await fetch(summaryApi.MutlitpleCategoryByUserId.url,{
    method:summaryApi.MutlitpleCategoryByUserId.method,
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({category:categoryArray})
  })
  const data=await resposne.json()
  console.log('multiple',data)
  setCategoryData(data.data)
  
}

//////////////////////////////////////////////////////

  const handleSort=async(order)=>{
  
    console.log('order',order)
    const query=`?sort=sellingPrice&order=${order}`

    const response=await fetch(summaryApi.Sorting.url+ query,{
      method:summaryApi.Sorting.method,
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({category:categoryArray})
    })
    const data=await response.json()
    console.log('categoryData',data)
    setCategoryData(data.data)

     setSorting(order)
  }

//////////////////////////////////////////////////////
useEffect(()=>{
  fetchMultipleCategory()
  //format for changing url when user clicks on checkbox
  let urlformat=''
  for(let key in categoryArray){
      urlformat=urlformat +`category=${key}&&`
    
    }
    navigate(`/categories-product?${urlformat}`)
   handleSort(sorting)
 
   
  
},[categoryArray])

////////////////////////////////////////////////////
  return (
    <div className='md:container mx-auto p-4'>
         {/* desktop version */}
         <div className='hidden lg:grid grid-cols-[400px,1fr]'>
               {/* left side */}
                <div className='bg-blue-50 p-2 min-h-[calc(100vh-320px)] overflow-y-scroll scrollbar-none mr-5 max-h-[300px]  rounded'>
                  {/* sort  by */}
                   <div className=''>
                      <h3 className='text-2xl uppercase font-semibold border-b border-red-500 pb-1 text-red-500'>Sort By</h3>
                   
                   <form className='text-2xl flex flex-col gap-2 my-4 font-sans'>
                         <div>
                           <input type='radio' name='sort' className='mr-2 w-4 h-4' onClick={()=>handleSort('asc')}/>
                           <label>Price - Low to High</label>
                         </div>

                         <div>
                           <input type='radio' name='sort'className='mr-2 w-4 h-4' onClick={()=>handleSort('desc')}/>
                           <label>Price - High to Low</label>
                         </div>

                      </form>
                  </div>

                   {/* Filter */}
                   <div className=''>
                      <h3 className='text-2xl uppercase font-semibold border-b border-red-500 pb-1 text-red-500'>Category</h3>
                   
                   <form className='text-2xl flex flex-col gap-2 my-4 font-sans'>
                     {
                      productCategory.map((categoryName,index)=>{
                        return(
                          <div className='flex items-center gap-3'>
                            <input type='checkbox' name='category'  checked={categoryArray[categoryArray?.value]} value={categoryName?.value} id={categoryName?.value} className='w-6 h-5' onClick={(e)=>handleMultipleCategory(e,categoryName?.value,index)}/>
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                        )
                      })
                     }

                      </form>
                  </div>

                </div>
               {/* right side */}
               <div>
               <p className='text-xl my-2 font-bold'>Search Results : <span className='text-red-500'>{categoryData?.length}</span></p>
                <div>
                 {
                   categoryData.length!==0 && !loading && (
                     <ChildVerticalProductCard  HozData={categoryData} loading={loading} />
                   )
                 }
                 </div>
               </div>
         </div>

         {/* mobile */}
         <div className='md:hidden lg:grid grid-cols-[400px,1fr]'>
               

               {/* right side */}
               <div>
               <p className='text-xl my-2 font-bold'>Search Results : <span className='text-red-500'>{categoryData?.length}</span></p>
               
                 <div className='my-4'>
                  <span className='text-black font-bold text-xl'>Price : </span>
                  <select className='bg-white' onClick={(e)=>handleSort(e.target.value)}>
                    <option className='text-sm' value='asc'>Low to High</option>
                    <option className='text-sm' value='desc'>High to Low</option>
                  </select>
                 </div>
                <div>
                 {
                   categoryData.length!==0 && !loading && (
                     <ChildVerticalProductCard  HozData={categoryData} loading={loading} />
                   )
                 }
                 </div>
               </div>
         </div>

         
    </div>
  )
}

export default CategoriesPage