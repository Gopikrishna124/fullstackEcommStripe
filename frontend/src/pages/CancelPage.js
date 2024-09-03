import React from 'react'
import cancelImage from '../Asset/Red-cross-mark-icon-on-transparent-background-PNG.png'
import { Link } from 'react-router-dom'

function CancelPage() {
  return (
    <div className=' min-h-[calc(100vh-250px)] md:min-h-[calc(100vh-300px)]'>
    <div className='bg-blue-50 w-[250px] h-[340px] md:h-[430px] md:w-full max-w-md mx-auto flex flex-col justify-center items-center mt-5 rounded-md'>
        <img src={cancelImage} className='mix-blend-multiply' width={300} height={300}/>
       <p className='text-red-500 text-2xl font-serif mb-5'>Payment cancelled</p>
       <Link  to={'/cart'} className='p-2 my-4 border-2 border-red-600 text-xl rounded hover:bg-red-500 hover:text-white'>Back To Cart</Link>
    </div>
    </div>
  )
}

export default CancelPage