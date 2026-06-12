import { DECREMENT_PRODUCT_STOCK, SET_RATING, SET_CATEGORIES, SET_FETCH_STATE, SET_FILTER, SET_LIMIT, SET_OFFSET, SET_PRODUCT_LIST, SET_TOTAL } from "../types/actionTypes"


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
        case SET_RATING: {
            if (!action.payload?.productId) return state;

            
            const currentProducts = Array.isArray(state.productList)
                ? state.productList
                : (state.productList?.products || []);
             const savedReviews =JSON.parse(localStorage.getItem('product_reviews')) ||[];
         
            const updatedProducts = currentProducts.map((product) => {
               
                if (product.id === action.payload.productId) {
                     const savedReview =savedReviews.find((p)=>p.id===product.id)
                    const currentProductRating = Number(savedReview?.rating) || Number(product.rating) || 0;
                    const newRating = (Number(action.payload.rating) + currentProductRating) / 2;

                    return {
                        ...product,
                        rating: Number(newRating.toFixed(2)) 
                    };
                }
                return product;
            });

           
            return {
                ...state,
                productList: Array.isArray(state.productList)
                    ? updatedProducts
                    : { ...state.productList, products: updatedProducts }
            };
        }

        case DECREMENT_PRODUCT_STOCK: {
            if (!action.payload?.product_id) return state;

            const currentProducts = Array.isArray(state.productList)
                ? state.productList
                : (state.productList?.products || []);

            const updatedStockList = currentProducts.map((product) => {
                if (product.id === action.payload.product_id) {
                    return {
                        ...product,
                        stock: Math.max(0, product.stock - (action.payload.count || 1))
                    };
                }
                return product;
            });

            return {
                ...state,
                productList: Array.isArray(state.productList)
                    ? updatedStockList
                    : { ...state.productList, products: updatedStockList }
            };
        }

        default:
            return state
    }
}