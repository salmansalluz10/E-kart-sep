import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name : "cartItems",
    initialState:[],
    reducers:{
        addToCart : (state,actionByComponent)=>{
            const existingProduct = state.find(item=>item.id==actionByComponent.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
                const remainingProdcuts = state.filter(item=>item.id!=existingProduct.id)
                state = [...remainingProdcuts,existingProduct]
            }else{
                state.push({...actionByComponent.payload,quantity:1,totalPrice : actionByComponent.payload.price})
            }
        },
        incrementQantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
            const remainingProdcuts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProdcuts,existingProduct]
        },
        removeCartItem : (state,actionByCart)=>{
            return state.filter(item=>item.id!=actionByCart.payload)
        },
        DecrementQantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity--
            existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
            const remainingProdcuts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProdcuts,existingProduct]
        },
        emptyCart : (state)=>{
            return state = []
        }
    }  
})


export const {addToCart,removeCartItem,incrementQantity,DecrementQantity,emptyCart} = cartSlice.actions
export default cartSlice.reducer