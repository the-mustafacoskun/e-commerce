import { SET_ADDRESS_LIST, SET_CREDIT_CARDS, SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../types/actionTypes";


const initialState = {
    user: {},
    isAuthLoading:true,
    addressList:[],
    creditCards:[],
    roles: [],
    theme: "light",
    language: "tr"
};
export const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload,isAuthLoading:false };
        case SET_ROLES:
            return { ...state, roles: action.payload };
        case SET_THEME:
            return { ...state, theme: action.payload };
        case SET_LANGUAGE:
            return { ...state, language: action.payload };
        case SET_ADDRESS_LIST: 
            return { ...state, addressList: action.payload };
        case SET_CREDIT_CARDS:
            return {...state,creditCards:action.payload}
        default:
            return state;
    }
};