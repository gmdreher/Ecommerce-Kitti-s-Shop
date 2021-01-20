import React from 'react';
import '../Styles/App.scss';
import image from '../01.jpg';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Product(props) {

    return (
        <div className="containe" >
            <button className="arrow">Volver</button>
            <div className="detail">
                <div className="imagen">
                    <img src={image} alt="img" />
                </div>
                <div className="data">
                    <h2>{props.data.name}</h2>
                    <div className="start">
                        <i class="fa fa-star fa-lg"/>
                        <i class="fa fa-star fa-lg"/>
                        <i class="fa fa-star fa-lg"/>
                        <i class="fa fa-star fa-lg"/>
                    </div>
                    <p><strong>Precio: </strong> ${props.data.price}</p>
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
                    <p><strong>Descripción: </strong> {props.data.description}</p>
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

