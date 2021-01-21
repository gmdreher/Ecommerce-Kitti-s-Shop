import { GET_PRODUCT_BY_ID } from '../constants/productContants.js';


const initialState = {
    product: [],
};


export const productById = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state;
    }
}

