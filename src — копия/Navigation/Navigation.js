import React from 'react';
import './Navigation.scss';
import {NavLink} from 'react-router-dom';
import AnimatingDistortion from '../components/AnimatingDistortion/AnimatingDistortion';

export default function(){
  return(
    <nav className="nav nav-left js-nav">
        <ul>
            <li>
                <NavLink to="/" exact>
                    <AnimatingDistortion param={{line:true}}>
                      домой
                    </AnimatingDistortion>
                </NavLink>
            </li>
            <li>
                <NavLink to="/portfolio">
                    <AnimatingDistortion param={{line:true}}>
                        Портфолио
                    </AnimatingDistortion>
                </NavLink>
            </li>
            <li>
                <NavLink to="/about">
                    <AnimatingDistortion param={{line:true}}>
                        обо мне
                    </AnimatingDistortion>
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}