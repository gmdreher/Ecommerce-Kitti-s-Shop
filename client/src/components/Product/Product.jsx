import React, { useEffect } from 'react';
import './Product.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductById} from '../../actions/productActions.js';
import { addProductCart} from '../../actions/cartAction';
import { getUsers} from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Review from '../Review/Review';

function Product(props) {
    const [quantity,setQuantity] =React.useState('')
    // const usersData = useSelector(store => store.product.user);

    useEffect(() => {
        props.getProductById(props.id);
        // props.getUsers()
    }, [])
    
    let imageUrl;
    if (props.product.images) {
        imageUrl = props.product.images[0].url;
    }

    function Promedio(){
        if(props.product.Reviews){

        let suma= 0
        let promedio=0;
        for(var i=0; i< props.product.Reviews.length; i++){
            suma= (suma + parseInt(props.product.Reviews[i].rate))
            promedio= suma / props.product.Reviews.length
        }
        let promedioGral=Math.round(promedio)

           return promedioGral;
        }
    }

    let valor= Promedio();

    function ratePromedio(valor){
    
    
        if( valor == 1){
           return(
            <>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>

            </>
        
           )
        }else if(valor ==2){
            return(
            <>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            </>
        
            )
        }else if(valor ==3){
            return(
            <>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            </>
        
            )
        }else if(valor ==4 ){
            return(
            <>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            </>)
        
        }else if(valor ==5 ){
            return(
                <>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </>
        
            )
        }else{
            return(
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

    function handleClick (data){
        props.addProductCart(user ?{ userId:user.id, productId: data.id, price: data.price, quantity:quantity.quantity}:{productId: data.id, price: data.price, quantity:quantity.quantity});
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
                        <h3 className="estrellitas">{ratePromedio(valor)}</h3>

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
            <section className= "sectionPrincipal">
                <h2>{props.product.Reviews && props.product.Reviews.length >0? <h2>Reseñas</h2>: <h3>Este producto aún no tiene reseñas</h3>}</h2>
                    <div className="divReview">

                {props.product.Reviews && props.product.Reviews.map((review)=>{
                
                        return <Review key={review.id}  data={review}/>
                
                })}
                    </div>
                
            </section>
        </div>
    )
};

function mapStateToProps(state) {
    // console.log('este el el state:', state)
    return {
        product: state.product.product,
        user:state.auth.userInfo,
        prodCart :state.product.cart
    }
}

export default connect(mapStateToProps, { getProductById,addProductCart, getUsers })(Product);
