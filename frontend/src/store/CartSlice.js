import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import summaryApi from "../Common";

const initialState={
    status:'idle',
    cartByUser:[]
}
console.log('cartIntilState',initialState.cartByUser)

export const cartByUserDetails=createAsyncThunk(
    'Cart/CartByUser',async()=>{
        const response=await fetch(summaryApi.cartByUserId.url,{
            method:summaryApi.cartByUserId.method,
            credentials:'include'
        })
        const data=await response.json()
        console.log('async',data)
        const asyncData=data.data
        console.log('asyncData',asyncData) 
        return asyncData
    }
)
//////////////////////////////////////////////
 export const UpdatingCartQuantityByUserId=createAsyncThunk(
  'Cart/UpdateCart',async(productData)=>{
    console.log('thunk',productData)
    const response=await fetch(summaryApi.UpdatingCartQuantityByUserId.url,{
      method:'post',
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(productData)
    })
    const data=await response.json()
    console.log('upadatecart',data)
    return data.data
  }
)

//////////////////////////////////////////////////////////

 export const DeleteCartByUserId=createAsyncThunk(
  'Cart/DeleteCart',async(deleteId)=>{
    console.log('async Delteid',deleteId)
    const response=await fetch(summaryApi.DeleteCartItemsByUserId.url,{
      method:summaryApi.DeleteCartItemsByUserId.method,
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({deleteId:deleteId})
    })

    const data=await response.json()
    console.log('deltedData',data)
    return data.data
  }

 )

///////////////////////////////////////////////

export const CartSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
       increment:(state,action)=>{
         state+=1
       }
    },

    extraReducers: (builder) => {
        builder
          .addCase(cartByUserDetails.pending, (state,action) => {
            state.status = 'loading'
          })
          .addCase(cartByUserDetails.fulfilled, (state, action) => {
            state.status = 'idle'
            state.cartByUser=action.payload
           
          })
          .addCase(UpdatingCartQuantityByUserId.pending, (state,action) => {
            state.status = 'loading'
          })
          .addCase(UpdatingCartQuantityByUserId.fulfilled, (state, action) => {
            state.status = 'idle'
          const Index=state.cartByUser.findIndex((item)=>item.productId._id===action.payload.productId._id)
             state.cartByUser[Index]=action.payload           
          })
          .addCase(DeleteCartByUserId.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(DeleteCartByUserId.fulfilled, (state, action) => {
            state.status = 'idle';
            console.log('payylod',action.payload)
            let filteringDeletedItems= state.cartByUser.filter((item)=>{
              return item?.productId?._id!==action.payload.productId
            })
            state.cartByUser=filteringDeletedItems
          })
        
   }
  })

export const { increment }=CartSlice.actions


export const selectCartByUser = (state) => state.Cart.cartByUser


export default CartSlice.reducer