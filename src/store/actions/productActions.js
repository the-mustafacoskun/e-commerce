import { api } from "../../api";
import { DECREMENT_PRODUCT_STOCK,INCREMENT_PRODUCT_STOCK, SET_CATEGORIES, SET_RATING, SET_FETCH_STATE, SET_FILTER, SET_LIMIT, SET_OFFSET, SET_PRODUCT_LIST, SET_TOTAL } from "../types/actionTypes";


export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });

export const decrementProductStock = (productId, count = 1) => {
    return {
        type: DECREMENT_PRODUCT_STOCK,
        payload: {
            product_id: Number(productId),
            count: Number(count)
        }
    };
};
export const incrementProductStock = (productId, count) => {
  return {
    type: INCREMENT_PRODUCT_STOCK,
     payload: {
            product_id: Number(productId),
            count: Number(count)
        }
  };
};
export const setFetchState = (fetch) => ({ type: SET_FETCH_STATE, payload: fetch });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })
export const setRating = (productId, userRating) => ({
    type: SET_RATING, payload: {
        productId: Number(productId),
        rating: Number(userRating)
    }
})



export const fetchCategories = () => {
    return (dispatch) => {

        api.get('/categories').then((response) => {
            dispatch(setCategories(response.data))

        }).catch((error) => {
            console.error('Kategoriler çekilirken hata oluştu', error)
        })
    }
}

export const fetchProductLists = (categoryId, sort) => {
    return (dispatch, getState) => {

        const { filter, offset, limit } = getState().product;
        const params = new URLSearchParams();
        if (categoryId) {
            params.append('category', categoryId)
        }
        if (sort) {
            params.append('sort', sort)
        }
        if (filter) {
            params.append('filter', filter)

        }
        if (limit) {
            params.append('limit', limit)
        }
        if (offset) {
            params.append('offset', offset)
        }
        const queryString = params.toString();

        dispatch(setFetchState('FETCHING'))

        const url = queryString ? `/products?${queryString}` : '/products'

        api.get(url).then((response) => {

            dispatch(setProductList(response.data))
            dispatch(setFetchState('FETCHED'))
            dispatch(setTotal(response.data.total))


        }).catch((error) => {
            dispatch(setFetchState('FAILED'));
            console.error('Ürünleri Çekerken Hata Oluştu', error)
        })
    }
}
