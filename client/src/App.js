import React from 'react';
import '../src/Styles/App.scss';
import Product from './components/Product.jsx';
import { BrowserRouter, Route } from 'react-router-dom'
import ProductCard from './components/productCard/ProductCard';
import NavBar from './components/navBar/NavBar.js'
import Catalogue from './components/catalogue/Catalogue.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header> </header>

        <main>

          <NavBar />

          <Catalogue />

          <Route
            exact
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />

        </main>

        <footer> </footer>
      </div>

    </BrowserRouter >
  );
}

export default App;
