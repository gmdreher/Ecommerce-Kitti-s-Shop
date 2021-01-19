import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button, Modal,ModalHeader,ModalBody,ModalFooter, Container, FormGroup} from 'reactstrap'


export default class CrudProductForm extends React.Component {
    state = {
        search:'',
        form:{
            name :'',
            description:'',
            price:'',
            stock:'',
            categoria:'',
            imagenes:''
        },
        modalInsertar:false,
        modalEditar:false
    }
    handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value,
            }
        })
    }
    
    mostrarModalInsertar =() =>{
        this.setState({modalInsertar:true})
    }
    mostrarModalEditar =() =>{
        this.setState({modalEditar:true})
    }
    ocultarModalInsertar =() =>{
        this.setState({modalInsertar:false})
    }
    ocultarModalEditar =() =>{
        this.setState({modalEditar:false})
    }
    render(){
        return(
            <>
            
            <Container>
            <div>
                <h1>Administrar Productos</h1>
                <Button color='primary' onClick={()=>this.mostrarModalInsertar()}> + Agregar Producto </Button>
            </div>

                <div>
            <input type="text" name= 'name' value={this.state.search} onChange={this.handleChange}/>
            <Button color='primary'>Buscar</Button>
            </div>

            <Table>
              <thead>
                  <tr>
                     <th>Nombre</th>
                     <th>Descripcion</th>
                     <th>Precio</th>
                     <th>Stock</th>
                     <th>Categoria</th> {/* este va a ser un desplegable al momemto de crear */}
                     <th>Imagenes</th> {/* este va a ser un boton con url de imagen al momento de crear */}
                  </tr>
             </thead>
             <tbody>
                <tr>
                  <td>Nombre de Producto</td> 
                  <td>Desc_producto</td>
                     <td>Precio_Producto</td>
                     <td>Stock_producto</td>
                     <td>Categoria_producto</td>
                     <td>Imagenes</td> {/*este va a ser una ventana emergente que me va a mostrar las iagenes y va a tener la posibilidad de hacer un crud en ellas*/}
                  <td>
                    <Button color='primary' onClick={()=>this.mostrarModalEditar()}>Edit</Button>
                    <Button color='danger'>Delete</Button>
                  </td>
                </tr>
              </tbody>
            </Table>


        </Container>


            <Modal isOpen={this.state.modalEditar}>
            <ModalHeader>
                <div>
                    <h3>Editar Producto</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Nombre</label>
                    <input name='name' type='text'  onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Descripcion</label>
                    <input name='description' type='text' onChange={this.handleChange}/>
                </FormGroup><FormGroup>
                    <label>Precio</label>
                    <input name='price' type='text' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Stock</label>
                    <input name='stock' type='text' onChange={this.handleChange}/>
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button color='primary'>Editar</Button>
                <Button color='primary' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
            </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
                <div>
                    <h3>Agregar Producto</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Nombre</label>
                    <input name='name' type='text' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Descripcion</label>
                    <input name='description' type='text' onChange={this.handleChange}/>
                </FormGroup><FormGroup>
                    <label>Precio</label>
                    <input name='price' type='text' onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <label>Stock</label>
                    <input name='stock' type='text' onChange={this.handleChange}/>
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button color='primary'>Insertar</Button>
                <Button color='primary' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
            </ModalFooter>
        </Modal>

            </>
        )
    }
}