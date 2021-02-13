import React from 'react';
import './footer.scss';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Footer(props) {

    return (
        <div className="main-Footer">
            <div className="contenedor-secciones">
                <div className="content">
                    <div className="categorias-footer">
                        <h4 className="titulos-footer">CONTACTANOS</h4>
                        <i className="fas fa-envelope desplegable"/>

                    </div>
                    <ul>

                        <li>Link de contacto 1</li>
                        <li> Envíanos un mail</li>
                        <li>Libro de sugerencias</li>
                    </ul>

                </div>

                <div className="content">
                    <div className="categorias-footer">
                        <h4>SOBRE NOSOTROS</h4>
                        <i className="fas fa-shopping-bag desplegable"/>

                    </div>
                    <p>Grupo 7 del E-Commerce. Kitty's Shop. Tienda con artículos para gato</p>
                </div>

                <div className="content">
                    <div className="categorias-footer ayuda">
                        <h4>AYUDA</h4>
                        <i className="fas fa-hands-helping desplegable"/>

                    </div>
                    <ul>
                        <li>Preguntas frecuentes</li>
                        <li> Hablar con nosotros</li>
                        <li>Reclamos</li>
                    </ul>
                </div>

            </div>
            <div className="contenedor-redes">
                <div className="contenedor-iconos">
                    <i className="fab fa-instagram"/>
                    <i className="fab fa-twitter"/>
                    <i className="fab fa-whatsapp"/>
                </div>
                <p>2021 KITTY'S SHOP Argentina. Todos los derechos reservados</p>
            </div>
        </div>
    )
};
