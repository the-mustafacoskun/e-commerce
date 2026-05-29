import { DECREMENT_PRODUCT_COUNT, DELETE_CART_ITEM, INCREMENT_PRODUCT_COUNT, SET_ADDRESS, SET_CART, SET_PAYMENT, TOGGLE_PRODUCT_CHECKED } from "../types/actionTypes"


export const setCart =(cart)=> ({type:SET_CART,payload:cart})
export const deleteCartItem =(product) => ({type:DELETE_CART_ITEM,payload:product})
export const decrementProductCount =(product) => ({type:DECREMENT_PRODUCT_COUNT,payload:product})
export const incrementProductCount =(product) => ({type:INCREMENT_PRODUCT_COUNT,payload:product})
export const toggleProductChecked =(product)=>({type:TOGGLE_PRODUCT_CHECKED,payload:product})

export const setPayment =(payment)=> ({type:SET_PAYMENT,payload:payment})
export const setAddress =(address)=> ({type:SET_ADDRESS,payload:address})
