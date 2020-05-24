import React, { Component} from 'react';
import './AnimatingDistortion.scss';
import { TimelineMax } from 'gsap/gsap-core';

class animatingDistortion extends Component{
    constructor(props){
        super(props)
        this.props = props
        
        this.animation = {
            text: props.param.text,
            line: props.param.line,
            img: props.param.img,
        }
        
    }
    componentDidMount = () => {
        this.initEvents()
    }

    animated = () => {
        this.feDisplacementMap.scale.baseVal = this.primitiveValues.scale
    }

    initFilter = () => {
        this.filterId = '#filter'
        this.feDisplacementMap = document.querySelector(`${this.filterId} > feDisplacementMap`)
        this.primitiveValues = {scale: 0}
    }

    createTimeline = () => {
        const tl = new TimelineMax({
            paused: true,
            onStart: () => {
                if (this.animation.line)
                    this.line.style.filter = `url(${this.filterId}` 
                if (this.animation.text)
                    this.text.style.filter = `url(${this.filterId}`
                if (this.animation.img)
                    this.img.style.filter = `url(${this.filterId})`
            },
            onUpdate: () => {
                this.animated()
            },
            onComplete: () => {
                if (this.animation.line)
                    this.line.style.filter = 'none'
                if (this.animation.text)
                    this.text.style.filter = 'none'
                if (this.animation.img)
                    this.img.style.filter = 'none'
            }
        })

        tl.to(this.primitiveValues, { 
            duration: 0.7,
            startAt: {scale: 40},
            ease: "rough({ template: none.out, strength: 2, points: 120, taper: 'none', randomize: true, clamp: false})",
            scale: 0
        }, 0)

        if (this.line)
            tl.to(this.line, { 
                duration: 0.7,
                startAt: {y: -5},
                ease: 'Expo.easeOut',
                y: 0
            }, 0)
        return tl
    }

    initEvents = () => {
        this.initFilter()
        this.tl = this.createTimeline()
    }


    render(){
        if(this.animation.line)
            return(
                <span className='distorted-link' ref={ref => (this.el = ref)} onMouseEnter={()=>{this.tl.restart()}}>
                    {this.props.children}
                    <span className='distorted-link-deco' ref={ref => (this.line = ref)}></span>
                </span>
                       
    
            )
        if(this.animation.img){
            this.el = this.props.children
            return(
                <div onMouseEnter={()=>{this.tl.restart()}} ref={ref => (this.img = ref)}>
                    {this.props.children}
                </div>
            )
        }

        return null
    }

}

export default animatingDistortion