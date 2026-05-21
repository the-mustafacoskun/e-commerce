import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";
import { productReducer } from "./productReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";




export const reducers =combineReducers({
    client:clientReducer,
    product:productReducer,
    shoppingCart:shoppingCartReducer
});