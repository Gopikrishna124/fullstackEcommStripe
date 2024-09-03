import summaryApi from '../Common'


const FetchSingleCategory=async(category)=>{

       const response=await fetch(summaryApi.getSingleCategory.url,{
        method:summaryApi.getSingleCategory.method,
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({category:category})
       })
       const data=await response.json()
      
       return data
    
  
  }

  export default FetchSingleCategory