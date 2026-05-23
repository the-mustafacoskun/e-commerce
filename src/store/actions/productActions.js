import { api } from "../../api";
import { SET_CATEGORIES, SET_FETCH_STATE, SET_FILTER, SET_LIMIT, SET_OFFSET, SET_PRODUCT_LIST, SET_TOTAL } from "../types/actionTypes";


export const setCategories =(categories)=>({type:SET_CATEGORIES,payload:categories});
export const setProductList =(productList)=>({type:SET_PRODUCT_LIST,payload:productList});
export const setTotal =(total)=>({type:SET_TOTAL,payload:total});
export const setFetchState =(fetch)=>({type:SET_FETCH_STATE,payload:fetch});
export const setLimit =(limit)=>({type:SET_LIMIT,payload:limit});
export const setOffset =(offset)=>({type:SET_OFFSET,payload:offset});
export const setFilter = (filter)=>({type:SET_FILTER,payload:filter})



export const fetchCategories =()=>{
    return (dispatch,getState)=>{
        const state=getState();

       
        
        api.get('/categories').then((response)=>{
            dispatch(setCategories(response.data))
            
        }).catch((error)=>{
            console.log('Categoriler çekilirken hata oluştu',error)
           
        })
    }
}

export const fetchProductLists=(categoryId)=>{
    return (dispatch,getState)=>{
        const state=getState();
        if(!categoryId && state.product.productList && state.product.productList.products?.length>0){
            return
        }
            dispatch(setFetchState('FETCHING'))
        api.get(categoryId?`/products?category=${categoryId}`:`/products`).then((response)=>{
            dispatch(setProductList(response.data))
            dispatch(setFetchState('FETCHED'))
            dispatch(setTotal(response.data.total))
            
        }).catch((error)=>{
            dispatch(setFetchState('FAILED'));
            console.error('Ürünleri Çekerken Hata Oluştu',error)
        })
    }
}