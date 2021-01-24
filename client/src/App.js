import React from 'react';
import '../src/Styles/App.scss';
import Navbar from './components/navBar/NavBar';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Catalogue from './components/catalogue/Catalogue.js';
import Product from './components/Product.jsx';
import CrudProduct from './components/CrudProduct.jsx'


import Main from './components/Main'

import ProductsByCategory from "./components/Categories/ProductsByCategory";
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar />
        </header>



        <main>

          <Route exact path="/" component={Main} />
          <Route exact path='/products' component={Catalogue} />
          <Route exact path="/products/detalle/:id" render={({ match }) => <Product id={match.params.id} />} />


          <Route exact path='/products/admin' component={CrudProduct} />

          <Route
            path="/products/category/:categoryName"
            render={({ match }) => <ProductsByCategory key={match.params.categoryName} categoryName={match.params.categoryName} />}
          />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;