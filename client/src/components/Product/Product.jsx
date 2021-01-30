import React, { useEffect } from 'react';
import './Product.scss';
import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/productActions.js';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

function Product(props) {

    useEffect(() => {
        props.getProductById(props.id);
    }, [])
    let imageUrl;
    if (props.product.images) {
        imageUrl = props.product.images[0].url;
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
                        <select name="quanty" id="quanty">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        {props.product.stock < 1 ? <label className='agotado'>Producto Agotado</label> : <label className='stock'>Stock: {props.product.stock}</label>}
                    </form>
                    <div className="butt">

                        {props.product.stock > 0 ? <button className="btn btn-outline-dark">Agregar a Carrito</button> : null}
                        {props.product.stock > 0 ? <button className="btn btn-outline-dark">Comprar</button> : null}

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
        product: state.product.product
    }
}

export default connect(mapStateToProps, { getProductById })(Product);
