import React, { Component } from 'react';
import './Slide.css'
import SliderTextLine from './SliderTextLine/SliderTextLine';

export default class Slide extends Component {
    constructor(props){
        super(props)
        this.props = props
        this.el = null
    }
    componentDidMount(){
        this.props.gettingLink(this.el, this.props.idx)
    }

    render(){
        return(
            <div className="slide" ref={ref => this.el = ref}>
                {this.props.texts?
                    <div className="slide-text">
                        {this.props.texts.map((text, idx) => <SliderTextLine text={text} key={idx}/>)}
                    </div>
                    : null
                    }
            </div>
        )
    }

}