import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCart } from "../../actions/cartAction";
import { updateStateOrder } from "../../actions/orderActions";
import style from "./checkOut.module.scss";
import pago from '../../img/mp.jpeg';


export default function CheckOut() {

    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.userInfo);

    const order = useSelector((store) => store.orderStore.order)
    console.log("esto es order en checkput", order);

    let cartProduct = useSelector(user ? (store => store.product.cart) : (store => store.cart.cartItems));

    useEffect(function () {
        dispatch(getProductsCart(user ? { userId: user.id, state: "carrito" } : null));
    }, [])

    function cambio() {

        if (order && order !== undefined) {
            let state = "procesando";
            let num = order.id;
            dispatch(updateStateOrder(num, state))
        }
    }

    function sumaTotal() {
        if (cartProduct) {
            let suma = 0

            for (let i = 0; i < cartProduct.length; i++) {
                suma = suma + (parseInt(cartProduct[i].price) * cartProduct[i].quantity)
            }
            return suma

        }
    }


    return (
        <div >
            <form class="row g-3 needs-validation" >
                <div className={style.contenedorGrande}>
                    <section>
                        <h3>Datos de Facturación</h3>
                        <br />
                        <div >
                            <label for="validationCustom01" class="form-label">Nombre Completo</label>
                            <input type="text" class="form-control" id="validationCustom01" required />
                            <div class="valid-feedback">
                                Bien !
                    </div>
                        </div>

                        <div >
                            <label for="validationCustomUsername" class="form-label">Email</label>
                            <div class="input-group has-validation">

                                <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                <div class="invalid-feedback">

                                </div>
                            </div>
                        </div>
                        <div >
                            <label for="validationCustom01" class="form-label">Telefono</label>
                            <input type="text" class="form-control" id="validationCustom01" required />
                            <div class="valid-feedback">
                                Bien !
                        </div>
                        </div>

                        <div >
                            <label for="validationCustom01" class="form-label">Dni</label>
                            <input type="text" class="form-control" id="validationCustom01" required />
                            <div class="valid-feedback">
                                Bien !
                        </div>
                        </div>

                        <br />
                    </section>
                    <section>
                        <h3>Datos de Envio</h3>
                        <br />

                        <div >
                            <label for="validationCustom03" class="form-label">Provincia</label>
                            <input type="text" class="form-control" id="validationCustom03" required />
                            <div class="invalid-feedback">
                                Provincia Válida
                            </div>
                        </div>

                        <div >
                            <label for="validationCustom05" class="form-label">Ciudad / Localidad</label>
                            <input type="text" class="form-control" id="validationCustom05" required placeholder="Calle y número de la casa" />
                            <div class="invalid-feedback">
                                Ciudad Válida !
                            </div>
                        </div>
                        <div >
                            <label for="validationCustom05" class="form-label">Direccion de la Calle</label>
                            <input type="text" class="form-control" id="validationCustom05" required placeholder="Calle y número de la casa" />
                            <div class="invalid-feedback">
                                Direccion válida !
                            </div>
                        </div>
                        <div >
                            <label for="validationCustom05" class="form-label">Piso y Depto</label>
                            <input type="text" class="form-control" id="validationCustom05" required placeholder="N° de planta y N° de depto" />
                            <div class="invalid-feedback">
                                Bien!
                        </div>
                        </div>
                        <br />
                    </section>
                    {/* <div class="col-12">
                <button class="btn btn-primary" type="submit"></button>
            </div> */}
                    <section>
                        <div>
                            <h3> Detalle de Compra</h3>
                            <br />
                            <div>
                                {
                                    cartProduct && cartProduct.map((producto) => {
                                        return (
                                            <div className={style.contenedor}>
                                                <div className={style.nombre}>
                                                    <h6> {producto.name + " x " + producto.quantity}</h6>
                                                </div>
                                                <div className={style.precio}>
                                                    <label> $ {producto.price * producto.quantity}</label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <div className={style.contenedor}>
                                    <div className={style.nombre}>
                                        <h6>TOTAL</h6>
                                    </div>
                                    <div className={style.precio}>
                                        <label> $ {sumaTotal()}</label>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div>
                                <button onClick={() => cambio()}>FINALIZAR PAGO</button>
                            </div>
                            <div class="img-responsive">
                                <img src={pago} alt="Cargando imagen..." />
                            </div>
                        </div>

                    </section>

                </div>
            </form>
        </div>
    )
}