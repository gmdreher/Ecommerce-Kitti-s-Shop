import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCart } from "../../actions/cartAction"
import style from "./checkOut.module.scss"
import ML from "../../img/MLva.jpeg"
import { meliPost, updateStateOrder } from '../../actions/orderActions';
import { useHistory } from 'react-router';

export default function CheckOut() {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.userInfo);
    let cartProduct = useSelector(user ? (store => store.product.cart) : (store => store.cart.cartItems));
    const state = useSelector((store) => store.orderStore.order.state)
    const orderId = useSelector((store) => store.orderStore.order.id)
    const order = useSelector((store) => store.orderStore.order)

    const datos = order.products;
    //  console.log("datos", datos)


    const [input, setInput] = useState({
        nombreCompleto: "",
        email: "",
        telefono: "",
        dni: "",
        provincia: "",
        ciudad: "",
        direccion: "",
        piso: ""
    })

    const [pasos, setPasos] = useState(1)
    const handlePasos = () => {
        setPasos(pasos + 1)
    }

    const handlePasosVolver = () => {
        setPasos(pasos - 1)
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }



    useEffect(function () {
        dispatch(getProductsCart(user ? { userId: user.id, state: "carrito" } : null));

    }, [])



    let carrito = datos && datos.map(product => {
        return { name: product.name, price: product.price, quantity: product.OrderDetails.quantity }
    })


    function Meli() {
        console.log("entra a meli");
        dispatch(meliPost(carrito))
        console.log("sale de meli")
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

    function cambio() {

        if (orderId && orderId !== undefined) {

            let state = "procesando";
            let num = orderId;

            dispatch(updateStateOrder(num, state))

        }
    }


    function handleCosa() {
        cambio()
        Meli()
    }



    return (
        <div >
            <form class="row g-3 needs-validation" >
                <div className={style.contenedorGrande}>
                    <>
                        {pasos == 1 && (
                            <div className={style.grupo}>
                                <h3>Información Personal</h3>
                                <br />
                                <div >
                                    <label for="validationCustom01" class="form-label">Nombre Completo</label>
                                    <input name="nombreCompleto" value={input.nombreCompleto} type="text" class="form-control" id="validationCustom01" required onChange={handleInputChange} />
                                    <div class="valid-feedback">
                                        Bien !
                                </div>
                                </div>

                                <div >
                                    <label for="validationCustomUsername" class="form-label">Email</label>
                                    <div class="input-group has-validation">

                                        <input name="email" value={input.email} type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required onChange={handleInputChange} />
                                        <div class="invalid-feedback">

                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <label for="validationCustom01" class="form-label">Telefono</label>
                                    <input name="telefono" value={input.telefono} type="text" class="form-control" id="validationCustom01" required onChange={handleInputChange} />
                                    <div class="valid-feedback">
                                        Bien !
                                </div>
                                </div>

                                <div >
                                    <label for="validationCustom01" class="form-label">Dni</label>
                                    <input name="dni" value={input.dni} type="text" class="form-control" id="validationCustom01" required onChange={handleInputChange} />
                                    <div class="valid-feedback">
                                        Bien !
                                </div>
                                </div>
                                <br />
                                <div className={style.botones}>
                                    <button className={style.next} onClick={() => history.push("/user/order")}>Volver</button>
                                    <button className={style.next} onClick={handlePasos}>Continuar</button>
                                </div>
                            </div>
                        )}
                    </>
                    <>
                        {pasos == 2 && (
                            <div className={style.grupo}>
                                <h3>Datos de Envio</h3>
                                <br />
                                <div >
                                    <label for="validationCustom03" class="form-label">Provincia</label>
                                    <input name="provincia" value={input.provincia} type="text" class="form-control" id="validationCustom03" required onChange={handleInputChange} />
                                    <div class="invalid-feedback">
                                        Provincia Válida
                            </div>
                                </div>
                                <div >
                                    <label for="validationCustom05" class="form-label">Ciudad / Localidad</label>
                                    <input name="ciudad" value={input.ciudad} type="text" class="form-control" id="validationCustom05" required placeholder="Calle y número de la casa" onChange={handleInputChange} />
                                    <div class="invalid-feedback">
                                        Ciudad Válida !
                            </div>
                                </div>
                                <div >
                                    <label for="validationCustom05" class="form-label">Direccion de la Calle</label>
                                    <input name="direccion" value={input.direccion} type="text" class="form-control" id="validationCustom05" required placeholder="Calle y número de la casa" onChange={handleInputChange} />
                                    <div class="invalid-feedback">
                                        Direccion válida !
                            </div>
                                </div>
                                <div >
                                    <label for="validationCustom05" class="form-label">Piso y Depto</label>
                                    <input name="piso" value={input.piso} type="text" class="form-control" id="validationCustom05" required placeholder="N° de planta y N° de depto" onChange={handleInputChange} />
                                    <div class="invalid-feedback">
                                        Bien!
                            </div>
                                </div>
                                <br />
                                <div className={style.botones}>
                                    <button className={style.volver} onClick={handlePasosVolver}>Volver</button>
                                </div>
                            </div>
                        )}
                    </>
                    <div>
                        <div className={style.grupo}>
                            <h3> Detalle de Compra</h3>
                            <br />
                            <div className={style.total}>
                                {
                                    cartProduct && cartProduct.map((producto) => {
                                        // console.log("cartproduct",cartProduct)
                                        return (
                                            <div className={style.productTotal}>
                                                <h6 className={style.nombreCantidad}> {producto.name + " x " + producto.quantity}</h6>
                                                <h6 className={style.precio}> $ {producto.price * producto.quantity}</h6>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <div className={style.sumatotal}>
                                    <h4>Total: </h4>
                                    <h4>$ {sumaTotal()}</h4>
                                </div>
                                <br />
                            </div>
                            <div >
                                <button className={style.botonML} onClick={handleCosa}>Comprar ahora</button>
                            </div>
                            <br />
                            <div>
                                <img src={ML} />
                            </div>

                        </div>

                    </div>

                </div>
            </form>
        </div>
    )
}