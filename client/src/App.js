import React from 'react';
import Navbar from './components/navBar/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Catalogue from './components/catalogue/Catalogue.js';
import Product from './components/Product/Product.jsx';
import NavCategories from "./components/Categories/NavCategories";
import CrudProduct from './components/CrudProduct/CrudProduct.jsx'
import NewCategoryForm from './components/NewCategoryForm/NewCategoryForm'
import SignUp from './components/User/SignUp'
import Main from './components/Main/Main'
import ProductsByCategory from "./components/Categories/ProductsByCategory";
import Footer from "./components/Footer/Footer"
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderTable from "./components/OrderTable/OrderTable";
import ViewOrder from './components/ViewOrder/ViewOrder';
import './Styles/App.scss'




function App() {
  return (
    <BrowserRouter>
      <div className='body'>
        <div className="App">
          <header>
            <Navbar />
            <NavCategories />
            <Route
              path="/products/category/:categoryName"
              render={({ match }) => <ProductsByCategory key={match.params.categoryName} categoryName={match.params.categoryName} />}
            />
          </header>
          <main>
      
      
            <Route exact path="/" component={Main} />
            <Route exact path='/products' component={Catalogue} />
            <Route exact path="/products/detalle/:id" render={({ match }) => <Product key={match.params.id} id={match.params.id} />} />
      
            <Route exact path="/orders/:id" render={({ match }) => <OrderDetails key={match.params.id} id={match.params.id} />} />
      
      
            <Route exact path='/admin/products' component={CrudProduct} />
            <Route exact path='/admin/categories' component={NewCategoryForm} />
            <Route exact path="/admin/orders" component={OrderTable} />
      
            <Route exact path='/user/signup' component={SignUp} />
            <Route exact path="/user/order" component={ViewOrder} />
    
    
          </main>
    
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;