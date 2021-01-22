import { PRODUCT_CREATED, PRODUCT_DELETE, PRODUCT_UPDATE, PRODUCTS_READ , CATEGORIES_READ} from '../constants/constantsCRUD';

const initialState = {
    products: [],
    categories:[]
};

export default function rootReducer(state = initialState, action) {
   
    switch(action.type){

        case PRODUCTS_READ :
            
            return{
                ...state,
                products : action.payload
            }
        case CATEGORIES_READ:
            return{
                ...state,
                categories: action.payload
            }
        case PRODUCT_CREATED:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case PRODUCT_DELETE:
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload )
                }
        case PRODUCT_UPDATE:
            return {
                ...state,
                products: state.products.map( product => product.id === action.payload.id ? product = action.payload : product )
            }

        default:
            return state;
    }
}