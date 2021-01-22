import React from 'react';
import '../src/Styles/App.scss';
import CrudProductForm from './components/CrudProduct';
import Product from './components/Product.jsx';

const product = {
  name: "Collar Premium Trixie",
  description: "Nuestros collares para gatos vienen en diferentes versiones, tamaños y colores, con o sin cascabel. Todos los collares son ajustables y vienen con un broche fácil y rápido de abrir para poner a tu gato en un lugar fijo. Tenemos collares reflectantes o fosforescentes que permiten a tu gato ser visible en la oscuridad. Esto previene accidentes y protege y tu gato. Las placas identificativas en el collar de tu gato podrán ayudar a encontrar al dueño del mismo.",
  price: 1305,
  quantity: 5,
}


function App() {
  return (
    <div className="App">
      <header>

      </header>

      <main>
        {/* <Product data={product} /> */}
        <CrudProductForm/>
      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;
