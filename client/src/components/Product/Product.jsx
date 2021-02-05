import React, { useEffect } from 'react';
import './Product.scss';
import "bootstrap/dist/css/bootstrap.min.css";
 import { useDispatch, useSelector } from 'react-redux';
import { getProductById} from '../../actions/productActions.js';
import { addProductCart} from '../../actions/cartAction';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

function Product(props) {
    const [quantity,setQuantity] =React.useState('')

    useEffect(() => {
        props.getProductById(props.id);
    }, [])
    
    let imageUrl;
    if (props.product.images) {
        imageUrl = props.product.images[0].url;
    }
    
  
    const user = props.userData[props.userData.length-1];
    console.log('este es el user registrado')
    console.log(user)
    console.log(props.userData)
    function handleClick (data){
        props.addProductCart(user ?{ userId:user.id, productId: data.id, price: data.price, quantity:quantity.quantity}:{productId: data.id, price: data.price, uantity:quantity.quantity});
    };
    function change(e){
        setQuantity({
            ...quantity,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container" >
            <Link to={`/`}>
                <button className="arrow">Volver</button>
            </Link>
            <div className="detail">
                <div className="imagen">
                    <img src={imageUrl} alt="Cargando imagen..." />
                </div>
                <div className="data">
                    <h2>{props.product.name}</h2>
                    <div className="start">

                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                    </div>
                    <p><strong>Precio: </strong> ${props.product.price}</p>
                    <form>
                        <label for="quanty"><strong>Cantidad: </strong></label>
                        <select name="quantity" id="quantity" onChange={change}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        {props.product.stock < 1 ? <label className='agotado'>Producto Agotado</label> : <label className='stock'>Stock: {props.product.stock}</label>}
                    </form>
                    <div className="butt">
                 
                     {props.product.stock>0||props.prodCart.find(x=>x.id==props.id)?<button className="btn btn-outline-dark" onClick={() => handleClick(props.product)}>Agregar a Carrito</button>:null}
                    
                    </div>
                    <p><strong>Descripción: </strong> {props.product.description}</p>
                </div>
            </div>
            <div className="reviews">
                <h3>Comentarios</h3>
                <div className="detail">
                    <div className="usuario">
                        <h5>Usuario 1 </h5>
                    </div>
                </div>
                <div className="review">
                    <h5>Óptimo</h5>
                    <p>Cumple perfectamente con su función. Me gusta porque cede fácilmente, como así también que se pueda poner el nro de teléfono donde dice muy home.</p>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    console.log('este el el state:', state)
    return {
        product: state.product.product,
        userData:state.product.user,
        prodCart :state.product.cart
    }
}

export default connect(mapStateToProps, { getProductById,addProductCart })(Product);
