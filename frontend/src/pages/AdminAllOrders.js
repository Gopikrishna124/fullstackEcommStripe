import React, { useEffect, useState } from 'react'
import summaryApi from '../Common'
import DisplayCurrency from '../helpers/DisplayCurrency'
import moment from 'moment'

function AdminAllOrders() {

    const [AllOrders,setAllOrders]=useState([])

    const FetchAllOrders=async()=>{

        const response=await fetch(summaryApi.AdminOrders.url,{
            method:summaryApi.AdminOrders.method
        })

        const data=await response.json()
        console.log('All Orders',data.data)
        setAllOrders(data.data)
    }

    useEffect(()=>{
        FetchAllOrders()
    },[])
  return (
    <div className="mx-auto container p-4  min-h-[calc(100vh-300px)]">
    {
      !AllOrders?.length && <p>No Orders Yet</p>
    }

    {AllOrders?.map((item, index) => {
      return (
        <div key={index}>
          <p className="font-medium text-lg">
            {moment(item.createdAt).format("LL")}
          </p>
          <div className="border border-blue-300 rounded p-2 mb-3" >
       
        <div className="flex  flex-col lg:flex-row lg:justify-between">
          <div className="grid gap-3">
            {item?.productDetails?.map((product, index) => {
              return (
                <div className="flex gap-3 items-center">
                  <img
                    src={product?.image[0]}
                    className="w-28 h-28 bg-white p-2"
                  />

                  <div>
                    <div className="font-medium text-xl text-ellipsis line-clamp-1 max-w-[300px] my-2">
                      {product?.name}
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-xl text-green-600 font-medium">
                        {DisplayCurrency(product?.price)}
                      </div>
                      <p className="text-xl font-medium">
                        Quantity :{" "}
                        <span className="text-red-500 text-xl ">
                          {product?.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          <div className="flex flex-col gap-4 lg:min-w-[250px]">
            <div>
              <div className="text-2xl font-medium my-2 text-black text-opacity-70 bg-red-200 p-1 rounded-lg text-center">Payment Details </div>
              <p className="text-xl font-medium my-2">
                Payment Method :<span className="text-red-500 "> {item?.paymentDetails?.payment_method_type[0]} </span>
              </p>
              <p className="text-xl font-medium my-2 ">Payment Status : <span className="text-xl text-green-500 font-bold">{item?.paymentDetails?.payment_status}</span></p>
            </div>

            <div className="lg:mx-4">
              <div  className='text-2xl font-medium  my-1 bg-green-300 p-1 rounded-lg  text-center text-black text-opacity-60'>Shipping Details  </div>
              {item.shipping_options.map((shipping, index) => {
                return (
                  <div className="text-xl font-medium  my-1">Shipping Amount :<span className="text-red-500"> {shipping?.shipping_amount}</span></div>
                );
              })}
            </div>
          </div>
     </div>
     
   
     <div className="text-xl font-medium  my-2 text-red-500">Email : <span className="text-xl font-medium text-black">{item.email}</span></div>


          <div className="text-xl font-medium my-2 md:ml-auto w-fit mr-10">Total Amount :<span className="text-red-500">{item.totalAmount}</span></div>
        </div>
        </div>
      );
    })}
  </div>
  )
}

export default AdminAllOrders