import React from 'react'
import { IoMdClose } from "react-icons/io";

function DisplayLargeImage({imgUrl,close}) {
  return (
    <div className='bg-blue-100 bg-opacity-10 '>
        
        
           <div className='bg-blue-50 flex w-full h-full max-w-[850px] max-h-[750px] fixed top-20  ml-48'>
        
            <img src={imgUrl} alt='zooming-image' className='w-full h-full'/>

            <div className='cursor-pointer text-5xl mt-5' onClick={close}><IoMdClose/> </div>
           
            </div>
           
        
    </div>
  )
}

export default DisplayLargeImage