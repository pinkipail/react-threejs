import React from 'react';
import './SliderNavBullet.css'

export default function({num}) {
    return(
        <div className="slider-bullet">
          <span className="slider-bullet__text">{num}</span>
          <span className="slider-bullet__line"></span>
        </div>
    )
}