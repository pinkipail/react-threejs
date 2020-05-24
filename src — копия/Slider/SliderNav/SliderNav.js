import React from 'react';
import './SliderNav.css'
import SliderNavBullet from './SliderNavBullet/SliderNavBullet';

export default function({handlerClick}) {
    const bullets = ['01', '02', '03', '04']
    return(
        <nav className="slider-nav">
            <div className="arrow arrow_up" onClick={()=>{handlerClick('up')}}>
              <img src="./img/arrow.svg" alt="scroll"/>
            </div>
            {bullets.map((bullet, idx) => 
                <SliderNavBullet num={bullet} idx={idx} key={idx} handlerClick={handlerClick} />
            )}
            <div className="arrow arrow_down">
              <img src="./img/arrow.svg" alt="scroll" onClick={()=>{handlerClick('down')}}/>
            </div>
        </nav>
    )
}