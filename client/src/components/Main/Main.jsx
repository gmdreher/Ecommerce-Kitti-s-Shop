import React, { useEffect } from 'react';
import Carrusel from '../Carrusel/Carrusel'
import Catalogue from '../catalogue/Catalogue'


export default function Main(props) {

  return (
    <div>
      <Carrusel />
      <Catalogue />
    </div>
  )

}