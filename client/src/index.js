import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ProductCard from './components/productCard/ProductCard';
import NavBar from './components/navBar/NavBar.js'
import Catalogue from './components/catalogue/Catalogue';

ReactDOM.render(
  <React.StrictMode>
    <NavBar/>
    <Catalogue/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
