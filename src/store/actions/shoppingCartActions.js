import { DECREMENT_PRODUCT_COUNT, DELETE_CART_ITEM, INCREMENT_PRODUCT_COUNT, SET_ADDRESS, SET_CART, SET_PAYMENT, TOGGLE_PRODUCT_CHECKED, CLEAR_CART } from "../types/actionTypes"
import { api } from '../../api'


export const setCart =(cart)=> ({type:SET_CART,payload:cart})
export const deleteCartItem =(product) => ({type:DELETE_CART_ITEM,payload:product})
export const decrementProductCount =(product) => ({type:DECREMENT_PRODUCT_COUNT,payload:product})
export const incrementProductCount =(product) => ({type:INCREMENT_PRODUCT_COUNT,payload:product})
export const toggleProductChecked =(product)=>({type:TOGGLE_PRODUCT_CHECKED,payload:product})

export const setPayment =(payment)=> ({type:SET_PAYMENT,payload:payment})
export const setAddress =(address)=> ({type:SET_ADDRESS,payload:address})


export const submitOrder = (orderPayload) => (dispatch) => {
    
    api.post('/order', orderPayload)
        .then(() => {
           
            alert('Sipariş başarıyla oluşturuldu! ✓');
            
            
            dispatch({ type: CLEAR_CART });
            
        })
        .catch((err) => {
           
            const errorMessage = err.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu!';
            alert(errorMessage);
            console.error('Sipariş hatası:', err);
        });
};

