import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { connect } from "react-redux";
import { insertCategory, getCategories, editCategory, deleteCategory } from "../../actions/productActions";
import styles from './newCategoryForm.module.scss'

function NewCategoryForm(props) {
  // ESTADOS
  //estado inputs
  const [input, setInput] = useState({
    name: '',
    description: '',
    id: ''
  });
  //estado errores
  const [errors, setErrors] = useState({});

  //modal nueva categoria
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //modal2 editar categoria
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  //modal3 borrar categoria
  const [modal3, setModal3] = useState(false);
  const toggle3 = () => setModal3(!modal3);

  //FUNCIONES
  //get categorias
  useEffect(() => {
    props.getCategories()
  }, [])
  //validacion inputs
  const validate = function (input) {
    let errors = {};
    if (!input.name) {
      errors.name = '**Requiere un nombre';
    }
    return errors;
  }

  //funcion de estado inputs
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  // info de boton EDITAR de cada categoria
  const handleEdit = function (category) {
    toggle2();
    setInput(category);
  }


  // funcionalidad a boton EDITAR
  const handleEditModal = function (category) {
    props.putCategory(category);
    props.getCategories();
    toggle2()
    category.preventDefault();
  }
  // info de boton BORRAR de cada categoria
  const handleDelete = function (category) {
    toggle3();
    setInput(category);
  }
  // funcionalidad a boton BORRAR
  const handleDeleteModal = function (category) {
    props.destroyCategory(category);
    props.getCategories();
    toggle3()
    category.preventDefault();
  }
  // COMPONENTE
  return (

    <Container className={styles.container}>
      <h1>Administrar Categorías</h1>
      <Button color='primary' onClick={toggle}> + Agregar Categoría</Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {props.categories && props.categories.map(((category, index) => (
            <tr key={category.id}>
              <td>{(index) + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>

              <td>

                <Button color='primary' onClick={() => handleEdit(category)} >Editar</Button>
                <Button color='danger' onClick={() => handleDelete(category)}>Borrar</Button>
              </td>
            </tr>
          )))}

        </tbody>
      </Table>

      {/* -------------MODAL POST--------------- */}
      <div>
        <Modal isOpen={modal} toggle={toggle} className={props.className}>
          <Form>
            <ModalHeader toggle={toggle}>Nueva Categoría</ModalHeader>
            <ModalBody>

              <FormGroup>
                <Label for="name"> Nombre</Label>
                <Input type="text" className={`${errors.name} && 'danger', "form-group"`} name="name" id='name' value={input.name} onChange={handleInputChange} />
                {errors.name && (
                  <p className={styles.danger}>{errors.name}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="description"> Descripción </Label>
                <Input type="textarea" className="form-group" name="description" id="description" rows="1" value={input.description} onChange={handleInputChange} />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              {errors.name ? <Button color="danger" onClick={toggle}>Crear Categoría</Button> : <Button color="primary" type="submit" onClick={() => { 
                props.postCategories({ name: input.name, description: input.description })
                props.preventDefault()}}>Crear Categoría</Button>}

              <Button color="secondary" onClick={toggle}>Salir</Button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>

      {/* -----------------MODAL PUT------------------- */}

      <div>
        <Modal isOpen={modal2} toggle={toggle2} className={props.className}>
          <Form>
            <ModalHeader toggle={toggle2}>Modificar Categoría</ModalHeader>
            <ModalBody>


              <FormGroup>
                <Label for="name">Nombre</Label>
                <Input type="text" className={`${errors.name} && 'danger', "form-group"`} name="name" id='name' value={input.name} onChange={handleInputChange} />
                {errors.name && (
                  <p className={styles.danger}>{errors.name}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="description"> Descripción</Label>
                <Input className="form-group" name="description" id="description" rows="2" value={input.description} onChange={handleInputChange} />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
            {errors.name ? <Button color="danger" onClick={toggle2}>Modificar Categoría</Button> :<Button color="primary" type="submit" onClick={() => handleEditModal({ id: input.id, name: input.name, description: input.description })}>Modificar Categoría</Button>}
              <Button color="secondary" onClick={toggle2}>Salir</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>


      {/* ----------------MODAL DELETE------------------- */}
      <div>
        <Modal isOpen={modal3} toggle={toggle3} className={props.className}>
          <Form>
            <ModalHeader toggle={toggle3}>¿Estas Seguro?</ModalHeader>

            <ModalFooter>
              <Button color="primary" type="submit" onClick={() => handleDeleteModal(input.id)}>Si</Button>
              <Button color="secondary" onClick={toggle3}>No</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </Container>
  );

  // ---------------REDUX-----------------
}
//estados redux
const mapStateToProps = (state) => {
  return {
    categories: state.product.categories
  }
}
//acciones redux
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    postCategories: (categories) => dispatch(insertCategory(categories)),
    putCategory: (payload) => dispatch(editCategory(payload)),
    destroyCategory: (id) => dispatch(deleteCategory(id)),

  }
}
//store redux
export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryForm);
