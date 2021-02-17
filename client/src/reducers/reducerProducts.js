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
    UPDATE_COUNT_PRODUCT,
    GET_PRODUCTS_STATE_COMPLETE,
    GET_ALL_REVIEWS_USER,
    ADD_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
    GET_ALL_REVIEW_PRODUCT,
    POST_USER,
    GET_USER,
    UPDATE_USER,
    UPDATE_PROMOTE,
    POST_RESERT_PASSWORD,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_BY_ID,
    POST_USER_FAILED,
    
  
} from '../constants/productConstants.js';

const initialState = {
    product: [],
    filteredProduct: [],
    categories: [],
    products: [],
    user: [],
    cart: [],
    productsComplete: [],
    reviews: [],
    review: [],
    signUpFailed:'',
    error :'',
    loading:''
    
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
            console.log("action", action.payload)
            return {
                ...state,
                products:action.payload
            }
        case POST_USER:
            return {
                ...state,
                signUpFailed:false,
                user: action.payload
            }
            case POST_USER_FAILED:
                console.log('estoy en el reducer y llega esto al failed ', action.payload)
                return {
                    ...state,
                    signUpFailed:action.payload
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
                loading: true,
                error: false,
                user: [...state.user, action.payload]
            }
            case UPDATE_PASSWORD_SUCCESS:
            return { 
                ...state,
                loading:false,
                error:false
                
            }
            case UPDATE_PASSWORD_FAIL:
            return { 
                ...state,
                loading:false,
                error:true
            }
            case FORGOT_PASSWORD:
            return {
                ...state,
                loading:true,
                error:false,
                user: action.payload
            }
            case FORGOT_PASSWORD_FAIL:
            return {
                ...state, 
                loading:false,
                error:true
            }
            case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state, 
                loading:false,
                error:false
            }

            case GET_PRODUCTS_STATE_COMPLETE:
                var estadito= {
                    ...state,
                    productsComplete: action.payload
                }
                // console.log('esto es un estadito:', estadito)
                return estadito;

            case GET_ALL_REVIEWS_USER:
                    //  console.log("reducer payload", action.payload);
                return{
                    ...state,
                    reviews: action.payload
                };
            case ADD_REVIEW:
                return{
                    ...state,
                    reviews:  [...state.reviews, action.payload]
                }

            case EDIT_REVIEW:
                console.log("esto es un reducer ", action.payload);
                return{
                    ...state,
                    review: action.payload
                }

            case DELETE_REVIEW:
                return{
                    ...state,
                    reviews:  state.reviews.filter(review => review.id !== action.payload)
                }

            // case GET_ALL_REVIEW_PRODUCT:
            //     return{
            //         ...state,
            //         reviewsProduct:  [...state.reviewsProduct, action.payload]
            //     }
        default:
            return state;

    }
};


