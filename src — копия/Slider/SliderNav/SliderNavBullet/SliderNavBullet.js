import React from 'react';
import './SliderNavBullet.css'

export default function({num, idx, handlerClick}) {
  
  
    return(
        <div className="slider-bullet">
          <span className="slider-bullet__text" onClick={()=>{handlerClick(idx)}}>{num}</span>
          <span className="slider-bullet__line"></span>
        </div>
    )
}