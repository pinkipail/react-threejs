import React from 'react';
import './Navigation.scss';
import {NavLink} from 'react-router-dom';

export default function(){
  return(
    <nav className="nav nav-left js-nav">
        <ul>
          <li><NavLink className="distorted-link" to="/">домой</NavLink></li>
          <li><NavLink className="distorted-link" to="/portfolio">Портфолио</NavLink></li>
          <li><NavLink className="distorted-link" to="/about">обо мне</NavLink></li>
        </ul>
    </nav>
  )
}