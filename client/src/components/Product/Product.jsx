import React, { useEffect } from 'react';
import './product.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/productActions.js';
import { addProductCart } from '../../actions/cartAction';
import { getUsers } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Review from '../Review/Review';
import { useTranslation } from 'react-i18next';

function Product(props) {
    const [quantity, setQuantity] = React.useState(1)
    // const usersData = useSelector(store => store.product.user);
    const { t } = useTranslation();
    useEffect(() => {
        props.getProductById(props.id);
        // props.getUsers()
    }, [])

    let imageUrl;
    if (props.product.images) {
        imageUrl = props.product.images[0].url;
    }

    function Promedio() {
        if (props.product.Reviews) {

            let suma = 0
            let promedio = 0;
            for (var i = 0; i < props.product.Reviews.length; i++) {
                suma = (suma + parseInt(props.product.Reviews[i].rate))
                promedio = suma / props.product.Reviews.length
            }
            let promedioGral = Math.round(promedio)

            return promedioGral;
        }
    }

    let valor = Promedio();

    function ratePromedio(valor) {


        if (valor == 1) {
            return (
                <>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>

                </>

            )
        } else if (valor == 2) {
            return (
                <>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </>

            )
        } else if (valor == 3) {
            return (
                <>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </>

            )
        } else if (valor == 4) {
            return (
                <>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </>)

        } else if (valor == 5) {
            return (
                <>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </>

            )
        } else {
            return (
                <>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </>
            )
        }

    }

    const user = props.user;

    function addedToCart() {

    }

    function handleClick(data) {
        props.addProductCart(
            user ? {
                userId: user.id,
                productId: data.id,
                price: data.price,
                quantity: quantity
            }
                : {
                    productId: data.id,
                    price: data.price,
                    quantity: quantity
                }
        )


    };

    function change(e) {
        setQuantity(e.target.value)
    }
    return (
        <div className="containerProduct">
            <Link to={`/`}>
                <button className="arrowp">{t("checkOut.Back")}</button>
            </Link>
            <div className="detailp">
                <div className="imagenp">
                    <img src={imageUrl} alt="Cargando imagen..." />
                </div>
                <div className="datap">
                    <h2>{props.product.name}</h2>
                    <div className="startp">
                        <h3 className="estrellitasp">{ratePromedio(valor)}</h3>

                    </div>
                    <p><strong>{t("product.price.dots")} </strong> ${props.product.price}</p>
                    <form>
                        <label for="quanty"><strong>{t("product.quantity.dots")} </strong></label>
                        <select name="quantity" id="quantity" onChange={change}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        {props.product.stock < 1 ? <label className='agotado'>{t("product.noStock")}</label> : <label className='stock'>Stock: {props.product.stock}</label>}
                    </form>
                    <div className="butt">
                        <br />
                        {props.product.stock > 0 || props.prodCart.find(x => x.id == props.id) ? <button className="btn btn-outline-dark" onClick={() => handleClick(props.product)}>{t("product.addToCart")}</button> : null}

                    </div>
                    <p><strong>{t("product.description.dots")} </strong> {props.product.description}</p>
                </div>
            </div>
            <section className="sectionPrincipalp">
                <h2>{props.product.Reviews && props.product.Reviews.length > 0 ? <h2 className="reseñas">{t("product.reviews")}</h2> : <h3 className="reseñas">{t("product.noReviews")}</h3>}</h2>
                <div className="divReviewp">

                    {props.product.Reviews && props.product.Reviews.map((review) => {

                        return <Review key={review.id} data={review} />

                    })}
                </div>

            </section>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        product: state.product.product,
        user: state.auth.userInfo,
        prodCart: state.product.cart
    }
}

export default connect(mapStateToProps, { getProductById, addProductCart, getUsers })(Product);
