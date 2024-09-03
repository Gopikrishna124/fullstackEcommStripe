import React from 'react'
import successImage from '../Asset/7efs.gif'
import { Link } from 'react-router-dom'

function SuccessPage() {
  return (
    <div className=' min-h-[calc(100vh-250px)] md:min-h-[calc(100vh-300px)]'>
    <div className='bg-blue-50 w-[250px] h-[320px] md:h-[400px] md:w-full max-w-md mx-auto flex flex-col justify-center items-center mt-5 rounded-md'>
        <img src={successImage} className='mix-blend-multiply' width={300} height={300}/>
       <p className='text-green-500 text-2xl font-serif mb-5'>Payment Successfull</p>
       <Link  to={'/order'} className='p-2 my-4 border-2 border-green-600 text-xl rounded hover:bg-green-500 hover:text-white'>Check Your Order</Link>
    </div>
    </div>

  )
}

export default SuccessPage