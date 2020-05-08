import React from 'react';
import {Route} from 'react-router-dom'
import Slider from './Slider/Slider';
import Navigation from './Navigation/Navigation';

export default function(){
  return(
    <React.Fragment>
      <Navigation/>
      <Route path='/' exact component={Slider}/>
  
    </React.Fragment>

  )
}