import { SET_ADDRESS, SET_CART, SET_PAYMENT, DELETE_CART_ITEM, INCREMENT_PRODUCT_COUNT, DECREMENT_PRODUCT_COUNT, TOGGLE_PRODUCT_CHECKED, CLEAR_CART, SET_ORDERS } from "../types/actionTypes"


const initialState = {
    cart: [],
    payment: {},
    address: {},
    orders: []
}

export const shoppingCartReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CART:
            {
                
                if (!action.payload?.product?.id) return state;

               
                const isProductExist = state.cart.find((item) => item.product?.id === action.payload.product.id);
                let newCart;

                if (isProductExist) {
                    newCart = state.cart.map((item) => {
                        if (item.product?.id === action.payload.product.id) {
                            return { ...item, count: item.count + 1, checked: true }
                        }
                        return item;
                    })
                } else {
                    newCart = [...state.cart, action.payload]
                }
                return { ...state, cart: newCart }
            }

        case DELETE_CART_ITEM: {
            return { ...state, cart: state.cart.filter((item) => item.product.id !== action.payload.product.id) }
        }
        case INCREMENT_PRODUCT_COUNT: {
            const updatedCountCart = state.cart.map((item) => item.product.id === action.payload.product.id ? { ...item, count: item.count + 1 } : item)
            return { ...state, cart: updatedCountCart }
        }
        case DECREMENT_PRODUCT_COUNT: {
            const targetedItem = state.cart.find((item) => item.product.id === action.payload.product.id);

            if (targetedItem && targetedItem.count === 1) {
                return { ...state, cart: state.cart.filter((item) => item.product.id !== action.payload.product.id) }
            }

            const updatedCountCart = state.cart.map((item) => item.product.id === action.payload.product.id ? { ...item, count: item.count - 1 } : item)
            return { ...state, cart: updatedCountCart }
        }

        case TOGGLE_PRODUCT_CHECKED: {
            const updatedCheckCart = state.cart.map((item) => item.product.id === action.payload.product.id ? { ...item, checked: !item.checked } : item)
            return { ...state, cart: updatedCheckCart }
        }


        case CLEAR_CART: {
            return { ...state, cart: [] }
        }

        case SET_PAYMENT:
            return { ...state, payment: action.payload }
        case SET_ADDRESS:
            return { ...state, address: action.payload }
        case SET_ORDERS:
            return { ...state, orders: action.payload }
        default:
            return state
    }
}