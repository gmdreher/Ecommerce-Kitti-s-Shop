import { GET_PRODUCT_BY_ID, GET_PRODUCTS, SEARCH_PRODUCT } from '../constants/productContants.js';

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

        case SEARCH_PRODUCT:
            return {
                ...state,
                products: action.payload
            }

        default:
            return state;
    }
}

