import React from 'react';
import Navbar from './components/navBar/NavBar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
import UserTable from "./components/UserTable/UserTable";
import ViewOrder from './components/ViewOrder/ViewOrder';
import ResetPass from './components/ResetPass/ResetPass';
import GetEmail from './components/ResetPass/GetEmail';
import Login from './components/User/Login'
import UserProfile from "./components/User/UserProfile";
import './Styles/App.scss'
import PrivateRoute from './components/PrivateRoutes.js'


import './App.scss';

import decode from 'jwt-decode';
import { useSelector } from "react-redux";
import CrudReview from './components/CrudReview/CrudReview';
import CheckOut from './components/CheckOut/CheckOut';



function App() {

  const user = useSelector(store => store.auth.userInfo);
  return (
    <BrowserRouter>
      <div className='body'>
        <div className="App">
          <header>
            <Navbar />
            <NavCategories />
          </header>
          <main>
            <div className="transparencia">
              <Route exact path="/users/me" component={UserProfile} />
              <Route exact path="/" component={Main} />
              <Route exact path='/products' component={Catalogue} />
              <Route exact path="/products/category/:categoryName" render={({ match }) => <ProductsByCategory key={match.params.categoryName} categoryName={match.params.categoryName} />} />
              <Route exact path="/products/detalle/:id" render={({ match }) => <Product key={match.params.id} id={match.params.id} />} />
              <Route exact path='/user/signup' component={SignUp} />
              <Route exact path='/auth/login' component={Login} />
              <Route exact path="/user/order" component={ViewOrder} />

              <Route exact path='/user/getEmail' component={GetEmail} />
              {/* {!user ? <Route exact path='/user/resetPass/:id' render={({ match }) => <ResetPass key={match.params.id} id={match.params.id} />} /> : <Redirect to='/' />}
              <Route exact path="/user/review/:id" render={({ match }) => (user && user.id == match.params.id ? <CrudReview key={match.params.id} id={match.params.id} /> : <Redirect to='/' />)} /> */}

              <PrivateRoute exact path='/admin/products' component={CrudProduct} />
              <PrivateRoute exact path='/admin/categories' component={NewCategoryForm} />
              <PrivateRoute exact path="/admin/orders" component={OrderTable} />
              <PrivateRoute exact path="/admin/users" component={UserTable} />
              <Route exact path="/orders/:id" render={({ match }) => (user && user.rol == 'admin' ? <OrderDetails key={match.params.id} id={match.params.id} /> : <Redirect to='/' />)} />
              <Route exact path= "/checkOut" component= {CheckOut} ></Route>
            </div>

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