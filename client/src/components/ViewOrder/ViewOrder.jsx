import React, { useEffect, useState } from 'react';
import './ViewOrder.scss';
import OrderCard from '../OrderCart/OrderCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCart } from '../../actions/cartAction.js';
import PayCart from '../PayCart/PayCart.jsx';
import Catalogue from '../catalogue/Catalogue';

export default function ViewOrder(props) {

    const dispatch = useDispatch();

    const cartProduct = useSelector(store => store.cart.cartItems); 
    const usersData = useSelector(store => store.product.user);
       //modificamos para que traiga el store de cart
   console.log("user");
   console.log(usersData[usersData.length-1]);
   const user = usersData[usersData.length-1];
    //  useEffect(function () {
    //      if(user!== []){
    //         dispatch(getProductsCart({ userId: user.id, state: "carrito" }));
    //      }
    //      else{
    //         dispatch(getProductsCart({state: "carrito" }));
    //      }
         
    //  }, [])

    let priceList = [];
    function totalHandler() {
        if (priceList.length > 0) {
            var total = 0;
            for (let i = 0; i < priceList.length; i++) {
                total += priceList[i]
            }
            return total
        }
    }

    return (

        <div className="containe" >
            <div className="titulo">
                <h2>Pedidos de tu carrito</h2>
                <div className="parte-uno">
                    {cartProduct && cartProduct.map((info) => {
                        console.log("esto es info")
                        console.log(info)
                            var subTot = 0;
                            subTot = info.price * info.quantity;
                            priceList.push(subTot);

                            return <OrderCard data={info} />
                        
                    })}
                </div>
            </div>
            <div className="parte-dos">
                
                <PayCart dato={totalHandler()} />
            </div>
        </div>
    )

};





// export default function ViewOrder(props) {

//     const dispatch = useDispatch();

//     const cartProduct = useSelector(store => store.product.cart);

//     // const [suma, setSuma] = React.useState(0);

//     useEffect(function () {
//         dispatch(getProductsCart({ userId: 1, state: "carrito" }));
//     }, [])

//     let [suma, setSuma] = React.useState(0);

//     // function suma(a, b) {
//     //     var total;
//     //     total = total + (a * b);
//     //     return total;
//     // }

//     return (

//         <div className="containe" >
//             <div className="titulo">
//                 <h2>Pedidos de tu carrito</h2>
//                 <div className="parte-uno">
//                     {cartProduct && cartProduct.map((info) => {
//                         // setSuma({ ...suma + (info.price * info.quantity) })
//                         setSuma = suma + (info.price * info.quantity);
//                         console.log("el valor de la suma es", setSuma);
//                         return <OrderCard data={info} />
//                     })}
//                 </div>
//             </div>
//             <div className="parte-dos">
//                 <PayCart dato={setSuma} />
//             </div>
//         </div>
//     )

// };

