import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import styles from './crudReview.module.scss'
import { useDispatch, useSelector } from 'react-redux';

import { addReview, editReview, getAllReviewsUser, getProductStateComplete, deleteReview } from '../../actions/reviewAction';



export default function CrudReview(props) {
 
  const dispatch= useDispatch()
  
  const productsComplete = useSelector((store) => store.product.productsComplete);
  const reviews = useSelector((store) => store.product.reviews);



  const [input, setInput] = useState({
    description: '',
    rate: '',
    userId: props.id
  });
  const [idProductAdding, setIdProductAdding] = useState()
  const [infoEdit,setInfoEdit] = useState()
  const [deleteRev,setDeleteRev] = useState()

  const [productWithReview, setProductWithReview]= useState([])
  const [productWithoutReview, setProductWithoutReview]= useState([])
  
 //estado errores
 const [errors, setErrors] = useState({}); //---------------------------

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
  const handleInputChange = (e)=> {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({//---------------------------------------
      ...input,
      [e.target.name]: e.target.value
    }));
  
  }
  const resetInput= ()=>{
    setInput({
      description: '',
      rate: '',
      userId: props.id
    })
  }

  // añadir un review
  const handleOpenModal = (productId)=>{
    // console.log(productId)
    setIdProductAdding(productId)
    toggleAdd()
  }
  const handleAddReview= async (productId)=>{
    // console.log(productId,input)
    await dispatch(addReview(productId,input))
    await dispatch(getProductStateComplete(props.id))
    await dispatch(getAllReviewsUser(props.id))
    resetInput()
    toggleAdd()
  }

  //editar un review
  const handleEditReview= (productId, reviewId, data)=>{
//  console.log("entra al handke")
    setInfoEdit({productId, reviewId})
    setInput({...input,...data})
    toggleEdit() 
  }
  const handleSendEditReview = ()=>{
    dispatch(editReview(infoEdit.productId,infoEdit.reviewId,input))
    dispatch(getProductStateComplete(props.id))
    dispatch(getAllReviewsUser(props.id))
    resetInput()
    toggleEdit()
  }

  //eliminar un review
  const handleDelete= (productId, reviewId)=>{
   setDeleteRev({productId, reviewId})
   toggleDelete()
  }

  const handleDeleteReview= async ()=>{
    await dispatch(deleteReview(deleteRev.productId, deleteRev.reviewId))
    toggleDelete() 
    await dispatch(getProductStateComplete(props.id))
    await dispatch(getAllReviewsUser(props.id))
  }


useEffect(()=>{

  let conRev= [];
  let sinRev=[];

  for(let i=0; i<productsComplete.length; i++){

    let bandera= 0;

    for(let j=0; j<reviews.length; j++){
    
      if(productsComplete[i].OrderDetails.productId === reviews[j].productId){
        bandera++
        conRev.push({...productsComplete[i], reviews: reviews[j] } )
        break
      }
    }
    if(bandera===0 ) sinRev.push(productsComplete[i])
  }
console.log("con", conRev);
console.log("sin", sinRev);

setProductWithReview(conRev);
setProductWithoutReview(sinRev)

}, [productsComplete, reviews])

  return (

    <Container className={styles.container}>
        {/* productos sin reseña, solo boton añadir */}
<h1>Productos sin Reseña</h1>
{productWithoutReview.length > 0 && <h3>{productWithoutReview.length}</h3>}
      <Table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripcion</th>

            <th>Opciones</th>
         
          </tr>
        </thead>
        <tbody>
         
          {productWithoutReview.length>0 && productWithoutReview.map(((product, index)=>(

            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>

              <td>

                <Button className= {styles.button_} onClick={()=> handleOpenModal(product.OrderDetails.productId)} >Añadir</Button>
              </td>
            </tr>

            
          )))}
        

        </tbody>
      </Table>
{/* productos que ya tienen reseña, y quiero editar o borrar */}

      <h1>Mis Reseñas</h1>
      {productWithReview.length > 0 && <h3>{productWithReview.length}</h3>}
      <Table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Reseña</th>
            <th>Puntuacion</th>
            <th>Opciones</th>
         
          </tr>
        </thead>
        <tbody>
          {productWithReview.length>0 && productWithReview.map((review, index)=>(
              //  console.log("esto es review del map", review),
              <tr key={index}>
                <td>{review.name}</td>
                <td>{review.reviews.description}</td>
                <td>{review.reviews.rate}</td>
                
              <td>

                <Button className= {styles.button_} onClick={()=> handleEditReview(review.reviews.productId ,review.reviews.id,{description:review.reviews.description, rate:review.reviews.rate})} >Editar</Button>
                <Button className= {styles.button_} onClick={()=> handleDelete(review.reviews.productId ,review.reviews.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
        

        </tbody>
      </Table>
      

      {/* -------------MODAL POST--------------- */}
      <div>
        <Modal isOpen={modal} toggle={toggleAdd} className={props.className}>
          <Form  onSubmit={e=>e.preventDefault()}>
            <ModalHeader toggle={toggleAdd}>Añadir Reseña</ModalHeader>
            <ModalBody>

              <FormGroup  onSubmit={e=>e.preventDefault()}>
                <Label for="description"> Descripcion</Label>
                <Input type="textarea" className={`${errors.description} && 'danger', "form-group"`}  name="description" id='description' placeholder='Deja tu comentario...'value={input.description} onChange={handleInputChange} />
                {errors.description && (
                  <p className={styles.danger}>{errors.description}</p>
                )}
              </FormGroup>
              <FormGroup  onSubmit={e=>e.preventDefault()}>
                <Label for="rate"> Puntuacion </Label>
                <select class="form-select" aria-label="Default select example" name="rate" id="rate" rows="1" value={input.rate} onChange={handleInputChange}>
                <option selected>Puntuá</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </FormGroup>

            </ModalBody>
            <ModalFooter>


             {errors.description?  <Button color="danger" onClick={toggleAdd}>Añadir reseña</Button>:
             <Button className= {styles.button_} type= 'submit' onClick={()=>{ handleAddReview(idProductAdding)}}
                >Añadir Reseña</Button> }


              <Button className= {styles.button_} onClick={toggleAdd}>Salir</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

      {/* -----------------MODAL PUT------------------- */}

      <div>
        <Modal isOpen={modal2} toggle={toggleEdit} className={props.className}>
          <Form  onSubmit={e=>e.preventDefault()}>
            <ModalHeader toggle={toggleEdit}>Modificar Reseña</ModalHeader>
            <ModalBody>


              <FormGroup  onSubmit={e=>e.preventDefault()}>
              <br/>
                <Label for="description">Descripcion</Label>
                <Input type="textarea" className={`${errors.description} && 'danger', "form-group"`} name="description" id='description' value={input.description} onChange={handleInputChange} />
                {errors.description && (
                  <p className={styles.danger}>{errors.description}</p>
                )}
              
              </FormGroup>
              <FormGroup  onSubmit={e=>e.preventDefault()}>
              <Label for="rate"> Puntuacion </Label>
              {/* <Input type="textarea" className="form-group" name="rate" id="rate" rows="1" value={input.rate} onChange={handleInputChange} /> */}
              <select class="form-select" aria-label="Default select example"  name="rate" id="rate" rows="1" value={input.rate} onChange={handleInputChange}>
              <option selected>Puntuá</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              {errors.description? <Button color="danger" onClick={toggleEdit}>Modificar Reseña</Button> : <Button className={styles.button_} onClick={()=> handleSendEditReview()}>Modificar Reseña</Button>}
              <Button className={styles.button_} onClick={toggleEdit}>Salir</Button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>


      {/* ----------------MODAL DELETE------------------- */}
      <div>
        <Modal isOpen={modal3} toggle={toggleDelete} className={props.className}>
          <Form onSubmit={e=>e.preventDefault()}>
            <ModalHeader toggle={toggleDelete}>¿Estas Seguro?</ModalHeader>

            <ModalFooter>
              <Button className= {styles.button_} type="submit" onClick={() => handleDeleteReview()}>Si</Button>
              <Button className= {styles.button_} onClick={toggleDelete}>No</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </Container>
  );

 }