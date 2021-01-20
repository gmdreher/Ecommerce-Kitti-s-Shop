import React, { Fragment } from 'react';
export default function NewCategoryForm() {

    //estado inputs
    const [input, setInput] = React.useState({
        name: '',
        description: '',
    });

    //funcion de estado inputs
    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    //funcion onsubmit
    const handleSubmit = function (e) {
        e.preventDefault()
        alert(`Nombre: ${input.name} Descripción: ${input.description}`);

    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <h1>Nueva Categoría</h1>

                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-group" name="name" value={input.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea className="form-group" name="description" rows="1" value={input.description} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary mb-2" >Crear Categoría</button>
            </form>


            <h2>Categorías</h2>
            <ul className="list-group list-group-flush" onSubmit={handleSubmit}>
                <li className="list-group-item list-group-item-light">{input.name}</li>
                <li className="list-group-item list-group-item-light">{input.description}</li>
            </ul>
        </Fragment>

    );
}
