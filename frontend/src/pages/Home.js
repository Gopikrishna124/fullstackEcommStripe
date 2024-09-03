import React, { useEffect } from 'react'
import CategoriesList from '../components/CategoriesList'
import SlidingBannerProduct from '../components/SlidingBannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


function Home() {
  
  return (
    <div>
      <CategoriesList/>
      <SlidingBannerProduct/>
      <HorizontalCardProduct category={'watches'} heading={'Top Watches'}/>
      <HorizontalCardProduct category={'earphones'} heading={'Top Earphones'}/>
      <VerticalCardProduct category={'mobile'} heading={'Mobiles'}/>
      <VerticalCardProduct category={'mouse'} heading={'Mouses'}/>
      <VerticalCardProduct category={'tv'} heading={'Televisions'}/>
      <VerticalCardProduct category={'camera'} heading={'Camera & Photography'}/>
      <VerticalCardProduct category={'airpodes'} heading={'Airpodes'}/>
      <VerticalCardProduct category={'speakers'} heading={'Bluetooth Speakers'}/>
      <VerticalCardProduct category={'refrigerator'} heading={'Fridges'}/>
      <VerticalCardProduct category={'trimmers'} heading={'Trimmers'}/>
      {/* <VerticalCardProduct category={'printers'} heading={'Printers'}/>
      <VerticalCardProduct category={'processor'} heading={'Processors'}/> */}
     
    </div>
  )
}

export default Home