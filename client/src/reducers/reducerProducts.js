import {
    POST_CATEGORY,
    GET_CATEGORIES,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS,
    SEARCH_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    POST_PRODUCT,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    ADD_TO_CART,
    GET_PRODUCT_CART,
    DELETE_TOTAL_CART,
    DELETE_ITEMS_CART,
    POST_USER,
    GET_USER,
    UPDATE_USER,
    UPDATE_PROMOTE,
    UPDATE_COUNT_PRODUCT,
    GET_USER_BY_ID,
    POST_RESERT_PASSWORD,
    UPDATE_PASSWORD,
    FORGOT_PASSWORD,
} from '../constants/productConstants.js';

const initialState = {
    product: [],
    filteredProduct: [],
    categories: [],
    allOrders: [],
    products: [],
    user: [],
    cart: [],
    order: [],

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
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
        case POST_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.payload.id ? category = action.payload : category)
            }

        case GET_PRODUCTS:
            let estado = { ...state, products: action.payload }
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
                products: state.products.filter(product => product.id !== action.payload)
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        case POST_USER:
            return {
                ...state,
                user: [...state.user, action.payload]
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                user: state.user.map(x => x.id === action.payload.id ? x = action.payload : x)
            }

        case UPDATE_PROMOTE:
            return {
                ...state,
                user: action.payload
            }

        case POST_RESERT_PASSWORD:
            return {
                ...state,
                user: action.payload
            }

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case GET_PRODUCT_CART:
            return {
                ...state,
                cart: action.payload

            }
        case DELETE_ITEMS_CART:
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== action.payload)
            }
        case DELETE_TOTAL_CART:
            return {
                ...state,
                cart: state.cart.filter(order => order.orderId !== action.payload)
            }
        case UPDATE_COUNT_PRODUCT:
            return {
                ...state,
                cart: action.payload
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload
            }
            case UPDATE_PASSWORD:
            return { 
                ...state,
                user: [...state.user, action.payload]
            }
            case FORGOT_PASSWORD:
            return {
                ...state,
                user: action.payload
            };
            
        default:
            return state;

    }
};


