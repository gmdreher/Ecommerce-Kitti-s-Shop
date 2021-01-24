import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { connect } from "react-redux";

import {insertCategory, getCategories, editCategory, deleteCategory} from '../actions/productActions';


 function  NewCategoryForm(props) {
 // ESTADOS

    //estado inputs
    const [input, setInput] = useState({
        name: '',
        description: '',
        id: ''
      });

      
      //modal1
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

    //modal2
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => {
      setModal2(!modal2)
       
    };

    //FUNCIONES
    //get categorias
    useEffect(()=>{
        props.getCategories()
       },[])

    //funcion de estado inputs
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    }
   
    const handleEdit = function(category) {
      toggle2();
      setInput(category);
    }
    
    const handleEditModal = function(category) {
      
      props.putCategory(category);
      props.getCategories();
      toggle2()
      category.preventDefault();
    }
 
    const handleDeleteModal = function(id) {
      props.destroyCategory(id);
      props.getCategories();
    }
      
    

    return ( 
        <Container>
          <h2>Administrar Categorías</h2>
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
                {props.categories && props.categories.map(((category, index)=>(
                <tr key={category.id}>
                     <td>{(index) + 1}</td>
                     <td>{category.name}</td>
                     <td>{category.description}</td>
                  
                     <td>
                       
                       <Button color='primary' name={category.name} description={category.description} id={category.id} onClick={() =>handleEdit(category)} >Editar</Button>
                       <Button color='danger' onClick={() => handleDeleteModal(category.id)}>Borrar</Button>
                     </td>
                      </tr>
                )))}
             
            </tbody>
            </Table>

        {/* modal post */}
            <div>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
      <Form>
        <ModalHeader toggle={toggle}>Nueva Categoría</ModalHeader>
        <ModalBody>
       
        <FormGroup>
        <Label for="name"> Nombre</Label>
                  <Input type="text" className="form-group" name="name" id='name' value={input.name}  onChange={handleInputChange} />
         </FormGroup>
         <FormGroup>
         <Label for="description"> Descripción   </Label>
                  <Input type="textarea" className="form-group" name="description" id="description" rows="1" value={input.description} onChange={handleInputChange} />
        </FormGroup>
         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={()=>props.postCategories({name: input.name, description: input.description})}>Crear Categoría</Button>{' '}
          <Button color="secondary" onClick={toggle}>Salir</Button>
        
        </ModalFooter>
        </Form>
      </Modal>
    </div>

        {/* modal put */}

    <div>
      <Modal isOpen={modal2} toggle={toggle2} className={props.className}>
      <Form>
        <ModalHeader toggle={toggle2}>Modificar Categoría</ModalHeader>
        <ModalBody>
        
        
        <FormGroup>
        <Label for="name">Nombre</Label>
                  <Input type="text" className="form-group" name="name" id='name' value={input.name}  onChange={handleInputChange} />
         </FormGroup>
         <FormGroup>
         <Label for="description"> Descripción</Label>
                  <Input className="form-group" name="description" id="description" rows="2" value={input.description} onChange={handleInputChange} />
        </FormGroup>
         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={() => handleEditModal({id: input.id, name: input.name, description: input.description})}>Modificar Categoría</Button>{' '}
          <Button color="secondary" onClick={toggle2}>Salir</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
            </Container>
         
);

    }

    const mapStateToProps = (state) =>{
        return{
            categories:state.product.categories
        }
    }
    const mapDispatchToProps = (dispatch) => {
  
        return{
            getCategories: ()=>dispatch(getCategories()),
            postCategories: (categories) =>dispatch(insertCategory(categories)),
            putCategory:(payload) => dispatch(editCategory(payload)),
            destroyCategory:(id)=> dispatch(deleteCategory(id)),
    
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryForm);
