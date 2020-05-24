import React from 'react';
import './Logo.css';
import AnimatingDistortion from '../AnimatingDistortion/AnimatingDistortion';

export default function(){
    return(
        <div className="logo">
            <AnimatingDistortion param={{img:true}}>
                <object  data="./img/logo.svg" aria-label='logo'/>
            </AnimatingDistortion>
        </div> 
    )
}