import React from 'react';
import './Slide.css'
import SliderTextLine from './SliderTextLine/SliderTextLine';

export default function(props) {
    return(
        <div className="slide">
            {props.texts?
                <div className="slide-text">
                    {props.texts.map((text, idx) => <SliderTextLine text={text} key={idx}/>)}
                </div>
                : null
                }
        </div>
    )
}