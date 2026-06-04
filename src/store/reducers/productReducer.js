import { DECREMENT_PRODUCT_STOCK, SET_CATEGORIES, SET_FETCH_STATE, SET_FILTER, SET_LIMIT, SET_OFFSET, SET_PRODUCT_LIST, SET_TOTAL } from "../types/actionTypes"


const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: "",
    fetchState: 'NOT_FETCHED'
}



export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload }
        case SET_PRODUCT_LIST:
            return { ...state, productList: action.payload }
        case SET_TOTAL:
            return { ...state, total: action.payload }
        case SET_FETCH_STATE:
            return { ...state, fetchState: action.payload }
        case SET_LIMIT:
            return { ...state, limit: action.payload }
        case SET_OFFSET:
            return { ...state, offset: action.payload }
        case SET_FILTER:
            return { ...state, filter: action.payload }
        case DECREMENT_PRODUCT_STOCK: {
            console.log("Mevcut liste:", state.productList);
            console.log("Dizi mi:", Array.isArray(state.productList));
            const updatedProductList = state.productList.products.map((product) => {
                console.log("idler eşleşiyor mu?", product.id, action.payload.product_id);
                if (product.id === action.payload.product_id) {
                    return {
                        ...product, stock: Math.max(0, product.stock - action.payload.count)
                    };
                }
                return product;
            })
            return {
                ...state,
                productList: updatedProductList
            };
        }
        default:
            return state
    }
}