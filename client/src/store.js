import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ProductById } from './reducers/reducerProducts.js';

const reducer = combineReducers({
    product: ProductById,
})

//REDUX DETVOOLS en google, instalar thunk
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
