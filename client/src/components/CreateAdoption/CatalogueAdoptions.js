import React, { useEffect, useState } from 'react';
import AdoptionCard from '../CreateAdoption/AdoptionCard.js';
import './catalogue.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdoptionsAcept } from '../../actions/adoptionAction.js';
import { useHistory } from 'react-router-dom';
import { searchProduct } from '../../actions/productActions.js'

export default function CatalogueAdoptins() {
    const history = useHistory();
    const adoptions = useSelector((store) => store.adoption.allAdoptions);
    //alert(adoptions)
    const [pagina, setPagina] = useState(1);
    const [adopcionesPaginadas, setAdopcionesPaginadas] = useState([]);
    const [paginasDisponibles, setPaginasDisponibles] = useState("");


    const dispatch = useDispatch();

    useEffect(() => {

         dispatch(getAllAdoptionsAcept())
    }, [])

    useEffect(() => {
        setAdopcionesPaginadas(adoptions.slice(pagina * 8 - 8, pagina * 8))

    }, [pagina, adoptions])

    return (
        <div className="catalogueadop">
            <h2 className="titleadop">Galeria de Gatitos en Adopción</h2>

            <div className="contentadops">
                {adopcionesPaginadas && adopcionesPaginadas.map((infoAdoption) => {
                   
                        return <AdoptionCard key={infoAdoption.id} adopt={infoAdoption} />
                    
                })}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" onClick={() => setPagina(pagina - 1)}>
                        <a class="page-link" aria-label="Previous" >
                            <span aria-hidden="true"  >&laquo;</span>
                        </a>
                    </li>
                    {
                        adopcionesPaginadas == 0 ? <h5>Volver</h5> :
                            <li class="page-item" onClick={() => setPagina(pagina + 1)}>
                                <a class="page-link" aria-label="Next">
                                    <span aria-hidden="true" >&raquo;</span>
                                </a>
                            </li>
                    }
                </ul>
            </nav>
        </div>
    )

}



