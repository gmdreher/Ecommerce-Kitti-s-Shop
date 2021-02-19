import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import styles from './crudReview.module.scss'
import { useDispatch, useSelector } from 'react-redux';

import { addReview, editReview, getAllReviewsUser, getProductStateComplete, deleteReview } from '../../actions/reviewAction';
import Rate from './Rate';
import { useHistory } from 'react-router-dom';
import {useTranslation} from 'react-i18next';



export function rate(valor){

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
  
  }else{
      return(
          <>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          </>
  
      )
  }

}


export default function CrudReview(props) {
  const {t} = useTranslation();
 
  const dispatch= useDispatch()

  const history = useHistory()
  
  const productsComplete = useSelector((store) => store.product.productsComplete);
  const reviews = useSelector((store) => store.product.reviews);



  const [input, setInput] = useState({
    description: '',
    rate: '1',
    userId: props.id
  });
  const [idProductAdding, setIdProductAdding] = useState()
  const [infoEdit, setInfoEdit] = useState()
  const [deleteRev, setDeleteRev] = useState()

  const [productWithReview, setProductWithReview]= useState([])
  const [productWithoutReview, setProductWithoutReview]= useState([])
  
 //estado errores
 const [errors, setErrors] = useState({description:"true"}); //---------------------------

  //modal agregar reseña
  const [modal, setModal] = useState(false);
  const toggleAdd = () => setModal(!modal);

  //modal2 editar reseña
  const [modal2, setModal2] = useState(false);
  const toggleEdit = () => setModal2(!modal2);

  //modal3 borrar reseña
  const [modal3, setModal3] = useState(false);
  const toggleDelete = () => setModal3(!modal3);

  //get products y usuario
  useEffect(() => {
    // deberia obtener los productos que ya compré
    dispatch(getProductStateComplete(props.id))
    dispatch(getAllReviewsUser(props.id))
  }, [])

  //validacion inputs
  const validate = function (input) {//---------------------------
    let errors = {};
    if (!input.description) {
      errors.description = '**Requiere una descripción';
    }
    return errors;
  }

  //para setear los input
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({//---------------------------------------
      ...input,
      [e.target.name]: e.target.value
    }));

  }
  const resetInput = () => {
    setInput({
      description: '',
      rate: '1',
      userId: props.id
    })
  }

  // añadir un review
  const handleOpenModal = (productId) => {
    // console.log(productId)
    setIdProductAdding(productId)
    toggleAdd()
  }
  const handleAddReview = async (productId) => {
    // console.log(productId,input)
    await dispatch(addReview(productId, input))
    await dispatch(getProductStateComplete(props.id))
    await dispatch(getAllReviewsUser(props.id))
    resetInput()
    toggleAdd()
  }

  //editar un review
  const handleEditReview= (productId, reviewId, data)=>{
//  console.log("entra al handke")
    setErrors({})
    setInfoEdit({productId, reviewId})
    setInput({...input,...data})
    toggleEdit() 
  }
  const handleSendEditReview = async ()=>{
    await dispatch(editReview(infoEdit.productId,infoEdit.reviewId,input))
    await dispatch(getProductStateComplete(props.id))
    await dispatch(getAllReviewsUser(props.id))
    resetInput()
    toggleEdit()
    setErrors({description:"true"})
  }

  //eliminar un review
  const handleDelete = (productId, reviewId) => {
    setDeleteRev({ productId, reviewId })
    toggleDelete()
  }

  const handleDeleteReview = async () => {
    await dispatch(deleteReview(deleteRev.productId, deleteRev.reviewId))
    toggleDelete()
    await dispatch(getProductStateComplete(props.id))
    await dispatch(getAllReviewsUser(props.id))
  }


  useEffect(() => {

    let conRev = [];
    let sinRev = [];
    let productCompletUno = productsComplete;
    let reviewUno = reviews;

    for (let i = 0; i < productCompletUno.length; i++) {

      let bandera = 0;

      for (let j = 0; j < reviewUno.length; j++) {

        if (productCompletUno[i].OrderDetails.productId === reviewUno[j].productId) {

          bandera++
          conRev.push({ ...productCompletUno[i], reviews: reviewUno[j] })

          reviewUno = reviewUno.filter((e) => e.id != reviewUno[j].id)
          break
        }
      }
      if (bandera === 0) sinRev.push(productCompletUno[i])
    }
    // console.log("con", conRev);
    // console.log("sin", sinRev);

    setProductWithReview(conRev);
    setProductWithoutReview(sinRev)

  }, [productsComplete, reviews])

  return (

    <Container className={styles.container}>
        {/* productos sin reseña, solo boton añadir */}
        <button className={styles.button_} onClick={()=>history.push("/users/me")} >{t("checkOut.Back")}</button>
<h1>{t("crud.Review.noReview")}</h1>
{productWithoutReview.length > 0 && <h3>{productWithoutReview.length}</h3>}
      <Table>
        <thead>
          <tr>
            <th>{t("crud.Review.Product")}</th>
            <th>{t("crud.Review.Description")}</th>

            <th>{t("crud.Review.Options")}</th>

          </tr>
        </thead>
        <tbody>

          {productWithoutReview.length > 0 && productWithoutReview.map(((product, index) => (

            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>

              <td>

                <Button className={styles.button_} onClick={() => handleOpenModal(product.OrderDetails.productId)} >{t("crud.Review.Add")}</Button>
              </td>
            </tr>


          )))}


        </tbody>
      </Table>
      {/* productos que ya tienen reseña, y quiero editar o borrar */}

      <h1>{t("crud.Review.myReviews")}</h1>
      {/* {productWithReview.length > 0 && <h3>{productWithReview.length}</h3>} */}
      <Table>
        <thead>
          <tr>
            <th>{t("crud.Review.Product")}</th>
            <th>{t("crud.Review")}</th>
            <th>{t("crud.Review.Score")}</th>
            <th>{t("crud.Review.Options")}</th>

          </tr>
        </thead>
        <tbody>
          {productWithReview.length>0 && productWithReview.map((review, index)=>(
              //  console.log("esto es review del map", review),
              <tr key={index}>
                <td>{review.name}</td>
                <td>{review.reviews.description}</td>
                <td className= {styles.estrellitas}>{rate(review.reviews.rate)}</td>
              <td>

                <Button className={styles.button_} onClick={() => handleEditReview(review.reviews.productId, review.reviews.id, { description: review.reviews.description, rate: review.reviews.rate })} >{t("crud.Review.Edit")}</Button>
                <Button className={styles.button_} onClick={() => handleDelete(review.reviews.productId, review.reviews.id)}>{t("crud.Review.Delete")}</Button>
              </td>
            </tr>
          ))}


        </tbody>
      </Table>


      {/* -------------MODAL POST--------------- */}
      <div>
        <Modal isOpen={modal} toggle={toggleAdd} className={props.className}>
          <Form onSubmit={e => e.preventDefault()}>
            <ModalHeader toggle={toggleAdd}>{t("crud.Review.addReview")}</ModalHeader>
            <ModalBody>

              <FormGroup onSubmit={e => e.preventDefault()}>
                <Label for="description">{t("crud.Review.Description")}</Label>
                <Input type="textarea" className={`${errors.description} && 'danger', "form-group"`} name="description" id='description' placeholder={t("review.leaveComment")} value={input.description} onChange={handleInputChange} />
                {errors.description && (
                  <p className={"danger"}>{errors.description ==="true"?"":errors.description}</p>
                )}
              </FormGroup>
              <FormGroup onSubmit={e => e.preventDefault()}>
                <Label for="rate">{t("crud.Review.Score")} </Label>
               {/*  <select class="form-select" aria-label="Default select example" name="rate" id="rate" rows="1" value={input.rate} onChange={handleInputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> */}
                <Rate handleInputChange={handleInputChange} data={input}/>
              </FormGroup>

            </ModalBody>
            <ModalFooter>


             {errors.description || errors.rate?  <Button className={styles.button_} color="danger" >{t("crud.Review.checkInputs")} </Button>:
             <Button className= {styles.button_} type= 'submit' onClick={()=>{ handleAddReview(idProductAdding)}}
                >{t("crud.Review.addReview")}</Button> }


              <Button className={styles.button_} onClick={toggleAdd}>{t("crud.Review.exit")}</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

      {/* -----------------MODAL PUT------------------- */}

      <div>
        <Modal isOpen={modal2} toggle={toggleEdit} className={props.className}>
          <Form onSubmit={e => e.preventDefault()}>
            <ModalHeader toggle={toggleEdit}>{t("crud.Review.editReview")}</ModalHeader>
            <ModalBody>


              <FormGroup onSubmit={e => e.preventDefault()}>
                <br />
                <Label for="description">{t("crud.Review.Description")}</Label>
                <Input type="textarea" className={`${errors.description} && 'danger', "form-group"`} name="description" id='description' value={input.description} onChange={handleInputChange} />
                {errors.description && (
                  <p className={styles.danger}>{errors.description==="true"?"":errors.description}</p>
                )}

              </FormGroup>
              <FormGroup  onSubmit={e=>e.preventDefault()}>
              <Label for="rate">{t("crud.Review.Score")}</Label>
              {/* <select  class="form-select" aria-label="Default select example"  name="rate" id="rate" rows="1" value={input.rate} onChange={handleInputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> */}
                <Rate handleInputChange={handleInputChange} data={input}/>

              </FormGroup>

            </ModalBody>
            <ModalFooter>
              {errors.description? <Button color="danger" className={styles.button_}>Revisa los campos</Button> : <Button className={styles.button_} onClick={()=> handleSendEditReview()}>{t("crud.Review.editReview")}</Button>}
              <Button className={styles.button_} onClick={toggleEdit}>{t("crud.Review.exit")}</Button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>


      {/* ----------------MODAL DELETE------------------- */}
      <div>
        <Modal isOpen={modal3} toggle={toggleDelete} className={props.className}>
          <Form onSubmit={e => e.preventDefault()}>
            <ModalHeader toggle={toggleDelete}>{t("crud.Review.sure")}</ModalHeader>

            <ModalFooter>
              <Button className={styles.button_} type="submit" onClick={() => handleDeleteReview()}>{t("yes")}</Button>
              <Button className={styles.button_} onClick={toggleDelete}>No</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </Container>
  );

}