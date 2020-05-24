import React from 'react';
import {Route} from 'react-router-dom'
import Slider from './Slider/Slider';
import Navigation from './Navigation/Navigation';
import FilterEffect from './components/FilterEffect/FilterEffect';
import Logo from './components/Logo/Logo';

export default function(){
  return(
    <React.Fragment>
      <Logo/>
      <FilterEffect/>
      <Navigation/>
      <Route path='/' exact component={Slider}/>
  
    </React.Fragment>

  )
}