import {GET_CATEGORIES, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_PRODUCTS, SEARCH_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, POST_PRODUCT} from '../constants/productConstants.js';

const initialState = {
    product: [],
    filteredProduct: [],
    categories: [],
    products: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            console.log('esta es la accion', action)
            return {
                ...state,
                product: action.payload
            }
            
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                filteredProduct: action.payload,
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
        case POST_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload )
                }
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map( product => product.id === action.payload.id ? product = action.payload : product )
                    }

        default:
            return state;
        
    }
};


