import  { configureStore }from '@reduxjs/toolkit'
import userDetailsSliceReducer from './userDetailsSlice'
import CartSliceReducer from './CartSlice'

export const store=configureStore({
    reducer:{
        userDetails:userDetailsSliceReducer,
        Cart:CartSliceReducer
    }
})