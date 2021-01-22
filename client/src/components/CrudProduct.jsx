import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup ,Label, Input} from 'reactstrap'

import {connect} from 'react-redux';
import {searchCategories, searchProducts ,insertProduct,deleteProduct,searchAllProducts,editProduct} from '../redux/actions/actionsCRUD';

class CrudProductForm extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            form: {
                id:'',
                name: '',
                description: '',
                price: '',
                stock: ''
            },
            modalInsertar: false,
            modalEditar: false,
            search: '',
        };
      }
   
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true })
        this.props.getCategories();
    }
    mostrarModalEditar = (product) => {
        this.setState({ modalEditar: true ,form: product })
    }
    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false })
    }
    ocultarModalEditar = (product) => {
        this.setState({ modalEditar: false });
        console.log('el id para edit es '+ product.id)
        if(product){
           this.props.putProduct(product) 
        }
        

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.getProducts(this.state.form.search);
      }
      handleDelete(id){
          //event.preventDefault();
          console.log('entra y este es el event '+ id)
          this.props.destroyProduct(id);
          this.props.getAllProducts();

      }
      handleEdit(product){
        this.mostrarModalEditar(product)

      }
      componentDidMount(){
          this.props.getAllProducts();
      }

      
    render() {
        return (
            <>

                <Container>
                    <div>
                        <h1>Administrar Productos</h1>
                        <Button color='primary' onClick={() => this.mostrarModalInsertar()}> + Agregar Producto </Button>
                    </div>

                    <div>
                    
                        <input  name='search' type="text"  onChange={this.handleChange} />
                        <Button color='primary' onClick={e => this.handleSubmit(e)}>Buscar</Button>
                    </div>

                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Stock</th>
                             {/*    <th>Categoria</th> {/* este va a ser un desplegable al momemto de crear */}
                             {/*    <th>Imagenes</th> este va a ser un boton con url de imagen al momento de crear */}
                             </tr>
                        </thead>
                        <tbody>
                            
                            {this.props.products && this.props.products.map((product=>(
                                <tr>
                                    {/*console.log('este es el id '+product.id)*/}
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                {/* <td>Categoria_producto</td>
                                <td>Imagenes</td> */} {/*este va a ser una ventana emergente que me va a mostrar las iagenes y va a tener la posibilidad de hacer un crud en ellas*/}
                                <td>
                                    <Button color='primary' onClick ={() => this.handleEdit(product)}>Edit</Button>
                                    <Button color='danger' onClick  ={(e)=>this.handleDelete(product.id)}>Delete</Button>
                                </td>
                            </tr>  
                            )))}
                                
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
                            <input name='name' type='text' value={this.state.form.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Descripcion</label>
                            <input name='description' type='text' value={this.state.form.description} onChange={this.handleChange} />
                        </FormGroup><FormGroup>
                            <label>Precio</label>
                            <input name='price' type='text' value={this.state.form.price} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Stock</label>
                            <input name='stock' type='text' value={this.state.form.stock} onChange={this.handleChange} />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() =>this.ocultarModalEditar(this.state.form)}>Editar</Button>
                        <Button color='primary' onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
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
                            <input name='name' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Descripcion</label>
                            <input name='description' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Precio</label>
                            <input name='price' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Stock</label>
                            <input name='stock' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <h4>Categorias</h4>
                        <FormGroup >
                         
                             {this.props.categories && this.props.categories.map((cate=>(
                                <Label check> 
                                    <Input type="checkbox" />
                                    {'      '}
                                    {cate.name}
                                    {'      '}
                                
                                </Label>
                             )))}
                            
                          
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.props.postProducts({name:this.state.form.name,description:this.state.form.description,price:this.state.form.price,stock:this.state.form.stock})}>Insertar</Button>
                        <Button color='primary' onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                
            </>

        )
    }
}

const mapsStateToProps = (state) =>{
    return{
        products: state.products,
        categories:state.categories
    }
}
const mapDispatchToprops = (dispatch) => {
    return{
        getProducts: search =>dispatch(searchProducts(search)),
        getCategories: ()=>dispatch(searchCategories()),
        postProducts: (products) =>dispatch(insertProduct(products)),
        destroyProduct:(id)=> dispatch(deleteProduct(id)),
        getAllProducts: () => dispatch(searchAllProducts()),
        putProduct:(payload) => dispatch(editProduct(payload))

    }
}
export default  connect(mapsStateToProps,mapDispatchToprops)(CrudProductForm)