import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productById } from './reducers/reducerProducts.js';

// const initialState = {
//     product: [],
// };

const reducer = combineReducers({
    product: productById
})
    ;
//REDUX DETVOOLS en google, instalar thunk
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;