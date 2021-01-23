import {GET_CATEGORIES, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_PRODUCTS, SEARCH_PRODUCT } from '../constants/productConstants.js';

const initialState = {
    product: [],
    categories: [],
    products: []
};

export const ProductById = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
            
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                products: action.payload,
            }
            
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
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
};


