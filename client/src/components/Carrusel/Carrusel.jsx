import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './carrusel.module.scss';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { getDiscountActive } from '../../actions/discountsActions';
import { useDispatch, useSelector } from 'react-redux';

const items = [
  {
    src: require('../../img/21.jpg'),
    altText: 'Gatito',

  },
  {
    src: require('../../img/22.jpg'),
    altText: 'Slide 2',

  },
  {
    src: require('../../img/24.jpg'),
    altText: 'Slide 3',

  }
];

const Example = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const dispatch = useDispatch()
  const discounts = useSelector((state)=>state.auth.discounts)
  const [showDiscounts, setShowDiscounts] = useState([])

  useEffect(()=>{
    dispatch(getDiscountActive())
  },[])

  useEffect(()=>{
    if(discounts == undefined || discounts.length <1)return
    let aux =discounts.sort((a, b)=> {
      if (a.percentage < b.percentage) {
          return 1;
      }
      if (a.percentage > b.percentage) {
          return -1;
      }
      // a must be equal to b
      return 0;
  }).slice(0,3)
    setShowDiscounts(aux)
  },[discounts])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item,indice) => {
    return (

      <CarouselItem

        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className={styles.prueba}
        >
        <img src={item.src} alt={item.altText} />
        {showDiscounts[indice] &&
        <div className={styles.contentDiscount}>
          <h2 >HOY DESCUENTO {showDiscounts[indice].percentage} %</h2>
          <h4>En compras mayores a ${showDiscounts[indice].mount}</h4>

        </div>
        }
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>

    );
  });

  return (
    <div className={styles.mainWelcome}>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );

}

export default Example;




