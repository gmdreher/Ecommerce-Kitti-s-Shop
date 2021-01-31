import React from 'react';
import '../ViewOrder/ViewOrder.scss';
import {useDispatch} from 'react-redux';
import {deleteItem,editQuantity, getProductsCart} from '../../actions/cartAction'
export default function OrderCard(props) {
    const [quantity , setQuantity] = React.useState(props.data.quantity)
    console.log('este esl uantity antes de cambiarrrrrrrrrrrrrrrrrrrrrrr')
    console.log(quantity)
    const dispatch = useDispatch();
    let imagenes;
   
    if (props.data.images) {
        imagenes = props.data.images[0].url;
    }
    function deleteItems(id){
        
            dispatch(deleteItem(props.data)) 
    }
    function sumar() {
        setQuantity(quantity+1)
        console.log("DISPATCH EDITQUANTI");
        console.log(props.data);
       // return quantity
       // if (cartProduct.length > 0) {
            var idProd = props.data.id;
            var idUser = props.data.userId;
            var orderId = props.data.orderId;
           // var qty = props.data.quantity + 1
            
            dispatch(editQuantity({ idUser, productId: idProd, quantity: quantity, orderId }))
            dispatch(getProductsCart({idUser,state:'carrito'}))
            
        //}
       console.log('quantityyyyyyyyyyyyyyyyyyyyy');
        console.log(quantity)
    }
  
    return (
        <div>
            <div className="abc" >
                <div className="foto" >
                    <img className="img-responsive" src={imagenes} alt="Cargando imagen..." />
                </div>
                <div className="datoName" >
                    <div className="datoName2">
                        <h5>{props.data.name}</h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button><i class="fas fa-minus"></i></button>
                    </div>
                </div>
                <div className="dataQuanty" >
                    <div className="dataQuanty2">
                        <h5>{quantity} </h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button onClick={() => {sumar()}}><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="dataPrice" >
                    <div>
                        <h5>$ {props.data.price}</h5>
                    </div>
                </div>
                <div className="dataPrice" >
                    <div>
                        <h5>$ {(props.data.price * quantity).toFixed(2)}  </h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button onClick={()=>deleteItems(props.data.id)}><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div >
        </div>
    )


};
