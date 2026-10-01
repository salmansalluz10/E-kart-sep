import { configureStore } from "@reduxjs/toolkit";
import prodcutSlice from './slices/productSlice'
import wishlistSlice from './slices/wishlistSlice'
import cartSlice from './slices/cartSlice'

const cartStore = configureStore({
    reducer:{
        productReducer : prodcutSlice,
        wishlistReducer : wishlistSlice,
        cartReducer : cartSlice
    }
})

export default cartStore