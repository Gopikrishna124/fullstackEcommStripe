import React, { useEffect, useState } from 'react'
import image1 from '../Asset/banner/img1.webp'
import imageMobile1 from '../Asset/banner/img1_mobile.jpg'
import image2 from '../Asset/banner/img2.webp'
import imageMobile2 from '../Asset/banner/img2_mobile.webp'
import image3 from '../Asset/banner/img3.jpg'
import imageMobile3 from '../Asset/banner/img3_mobile.jpg'
import image4 from '../Asset/banner/img4.jpg'
import imageMobile4 from '../Asset/banner/img4_mobile.jpg'
import image5 from '../Asset/banner/img5.webp'
import imageMobile5 from '../Asset/banner/img5_mobile.png'


function SlidingBannerProduct() {

    const desktopImages=[
        image1,image2,image3,image4,image5
    ]

    const mobileImages=[
        imageMobile1,imageMobile2,imageMobile3,imageMobile4,imageMobile5
    ]
  

const [currentindex,setcurrentIndex]=useState(0)
// console.log('index', currentindex)
useEffect(() => {
    const timer = setInterval(() => {
   
        setcurrentIndex((prevIndex) =>{

             return prevIndex===desktopImages.length-1 ? 0 : prevIndex + 1
         
            })

      
    }, 2000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);
  
 
  return (
    <div  className='container mx-auto  rounded'>
        <div className=' h-48 md:h-[340px] w-full bg-blue-50 overflow-hidden'>
            {/* <div>
                <button></button>
                <button></button>
            </div> */}
          <div className='hidden md:block w-full h-full overflow-hidden'>
             {
                desktopImages.map((img)=>{
                    return (
                        <div className='w-full h-full'>
                            {/* <img src={img} className='w-full h-full' style={{transform:`translateX(-${currentindex * 100}%)`}}/> */}
                          <img src={desktopImages[currentindex]} className=' overflow-scroll scrollbar-none w-full h-full rounded'/>
                          </div>
                    )
                })
             }
          </div>

          <div className='w-full h-full overflow-hidden md:hidden'>
             {
                mobileImages.map((img)=>{
                    return (
                        <div className='w-full h-full'>
                            {/* <img src={img} className='w-full h-full' style={{transform:`translateX(-${currentindex * 100}%)`}}/> */}
                          <img src={mobileImages[currentindex]} className=' overflow-scroll scrollbar-none w-full h-full rounded object-cover'/>
                          </div>
                    )
                })
             }
          </div>
        </div>
    </div>
  )
}

export default SlidingBannerProduct