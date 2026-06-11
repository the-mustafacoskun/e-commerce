import { DECREMENT_PRODUCT_COUNT, DELETE_CART_ITEM, SET_ORDERS, INCREMENT_PRODUCT_COUNT, SET_ADDRESS, SET_CART, SET_PAYMENT, TOGGLE_PRODUCT_CHECKED, CLEAR_CART } from "../types/actionTypes"
import { api } from '../../api'
import { decrementProductStock } from "./productActions"
import { toast } from "react-toastify"


export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders })
export const clearCart=()=>({ type: CLEAR_CART })

export const deleteCartItem = (product) => ({ type: DELETE_CART_ITEM, payload: product })
export const decrementProductCount = (product) => ({ type: DECREMENT_PRODUCT_COUNT, payload: product })
export const incrementProductCount = (product) => ({ type: INCREMENT_PRODUCT_COUNT, payload: product })
export const toggleProductChecked = (product) => ({ type: TOGGLE_PRODUCT_CHECKED, payload: product })

export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })


export const submitOrder = (orderPayload, onSuccess) => (dispatch) => {

    api.post('/order', orderPayload)
        .then((response) => {
            
            toast.success('Sipariş başarıyla oluşturuldu! ✓');
            
            
            orderPayload.products.forEach((product)=>{
                console.log('Sipariş edilen ürün:', product);
                dispatch(decrementProductStock({product_id:product.product_id,count:product.count}))
            })
            dispatch(clearCart());
            onSuccess(response.data);

        })
        .catch((err) => {

            const errorMessage = err.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu!';
            toast.error(errorMessage);
            console.error('Sipariş hatası:', err);
        });
};
export const fetchOrders = () => (dispatch) => {
    api.get('/order').then((response) => {
        dispatch(setOrders(response.data));
    }).catch((err) => {
        console.error("Siparişler çekilemedi:", err);
    })
}

