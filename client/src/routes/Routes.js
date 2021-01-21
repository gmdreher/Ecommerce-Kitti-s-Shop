import React from "react";
import { Route } from "react-router-dom";
import Catalogue from "../components/catalogue/Catalogue";
import Product from "../components/Product";

const Routes = () => {
    
    return(
        <div>
         <Route exact path= '/products' component={Catalogue}></Route>
         <Route exact path="/products/:id" component={Product}></Route>
        </div>
    )
}

export default Routes;