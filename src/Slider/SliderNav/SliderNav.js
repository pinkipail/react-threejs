import React from 'react';
import './SliderNav.css'
import SliderNavBullet from './SliderNavBullet/SliderNavBullet';

export default function() {
    const bullets = ['01', '02', '03', '04']
    return(
        <nav className="slider-nav">
            <div className="arrow arrow_up">
              <img src="./img/arrow.svg" alt="scroll"/>
            </div>
            {bullets.map((bullet, idx) => 
                <SliderNavBullet num={bullet} key={idx}/>
            )}
            <div className="arrow arrow_down">
              <img src="./img/arrow.svg" alt="scroll"/>
            </div>
        </nav>
    )
}