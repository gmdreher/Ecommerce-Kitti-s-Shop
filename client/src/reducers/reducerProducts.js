import { GET_PRODUCT_BY_ID } from '../constants/productContants.js';
import {GET_PRODUCTS} from '../constants/products.js';

const initialState = {
    product: [],
    products: []
};

export const productById = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
            
        case GET_PRODUCTS:
            let estado= {...state, products: action.payload }
            return estado;

        default:
            return state;
    }
}

