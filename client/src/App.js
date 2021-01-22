import React from 'react';
import '../src/Styles/App.scss';
import Navbar from './components/navBar/NavBar';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Catalogue from './components/catalogue/Catalogue.js';
import Product from './components/Product.jsx';
import CrudProduct from './components/CrudProduct.jsx'

// const product = {
//   name: "Collar Premium Trixie",
//   description: "Nuestros collares para gatos vienen en diferentes versiones, tamaños y colores, con o sin cascabel. Todos los collares son ajustables y vienen con un broche fácil y rápido de abrir para poner a tu gato en un lugar fijo. Tenemos collares reflectantes o fosforescentes que permiten a tu gato ser visible en la oscuridad. Esto previene accidentes y protege y tu gato. Las placas identificativas en el collar de tu gato podrán ayudar a encontrar al dueño del mismo.",
//   price: 1305,
//   quantity: 5,
// }
import ProductsByCategory from "./components/Categories/ProductsByCategory";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Navbar />
        </header>

        <main>
          <Route exact path='/products' component={Catalogue}/>
          <Route exact path="/products/detalle/:id" render={({ match }) => <Product id={match.params.id} />} />
          <Route exact path='/products/admin' component={CrudProduct}/>
          <Route
            path="/products/category/:categoryName"
            render={({ match }) => <ProductsByCategory key={match.params.categoryName} categoryName={match.params.categoryName} />}
          />
        </main>

        <footer>

        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;