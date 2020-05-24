import React from 'react';

export default function(){
    return(
        <svg className="hidden">
          <filter id="filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.7" numOctaves="5" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="0" in="SourceGraphic" in2="warp" />
          </filter>
      </svg>
    )
}