import React, { useEffect } from 'react';
import '../Styles/App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../actions/productActions.js';
import { Link } from 'react-router-dom';


export default function Product({ id }) {

    const dispatch = useDispatch();
    const data = useSelector((store) => store.product.product);

    console.log("mostrar data", data.images);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch])

    return (
        <div className="containe" >
            <Link to={`/`}>
                <button className="arrow">Volver</button>
            </Link>
            <div className="detail">
                <div className="imagen">
                    <img src={data.images} alt="img" />
                </div>
                <div className="data">
                    <h2>{data.name}</h2>
                    <div className="start">
                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                        <i class="fa fa-star fa-lg" />
                    </div>
                    <p><strong>Precio: </strong> ${data.price}</p>
                    <form>
                        <label for="quanty"><strong>Cantidad: </strong></label>
                        <select name="quanty" id="quanty">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </form>
                    <div className="butt">
                        <button className="btn btn-outline-dark">Agregar a Carrito</button>
                        <button className="btn btn-outline-dark">Comprar</button>
                    </div>
                    <p><strong>Descripción: </strong> {data.description}</p>
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

