import React, { useEffect, useState } from 'react';


export default function Rate() {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [review, setReview] = useState({
      rating: "",
      estrellas: "",
    });
    let numero= 3.5;


    const onChange = (e) => {
        setReview({
          ...review,
          [e.target.name]: e.target.value,
        });
      };

      // useEffect(()=>{
      //     console.log("esto",rating)
      // })
    return(
        <div>
             <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label key={i}>
                      <input
                      style={{display: "none"}}
                        type="radio"
                        name="estrellas"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        onChange={onChange}
                      />
                
                      <i class="fas fa-star"
                      
                      style={ratingValue <= (hover || rating) ?{color: "gold"} : {color:"grey"}}
                      size={40}
                      onMouseEnter={() => {
                          // console.log(ratingValue)
                          setHover(ratingValue)}}
                      onMouseLeave={() => setHover(null)}
                      ></i>

                    </label>
                  );
                })}
              </div>
              {/* <div>
             
              <i class={numero >= 1
              ? 'fa fa-star'
              : numero >= 0.5
              ? 'fa fa-star-half'
              : 'fa fa-star'}></i>

              <i class={numero >= 2
              ? 'fa fa-star'
              : numero >= 1.5
              ? 'fa fa-star-half'
              : 'fa fa-star'}></i>

              <i class={numero >= 3
              ? 'fa fa-star'
              : numero >= 2.5
              ? 'fa fa-star-half'
              : 'fa fa-star'}></i>

              <i class={numero >= 4
              ? 'fa fa-star'
              : numero >= 3.5
              ? 'fa fa-star-half'
              : 'fa fa-star'}></i>

              <i class={numero >= 5
              ? 'fa fa-star'
              : numero >= 4.5
              ? 'fa fa-star-half'
              : 'fa fa-star-o'}></i>

              </div> */}
        </div>

    )
}