import React, { Component } from "react"
import * as THREE from "three"
import {TweenMax, TimelineMax} from "gsap"

import './Slider.scss'

var WheelIndicator = require('wheel-indicator')
const style = {
  height: 500 // мы можем контролировать размер сцены, устанавливая размеры контейнера
};

class App extends Component {
  componentDidMount() {

    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    this.listener()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);

  }

  sceneSetup = () => {
 
      
 // получаем размеры контейнера и используем их для определения размера сцены
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; 
    // используется здесь для установки некоторого расстояния от куба, расположенного в точке z = 0
    // OrbitControls позволяет камере вращаться вокруг объекта
    // https://threejs.org/docs/#examples/controls/OrbitControls

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // монтируем используя React ref
  };

    // Здесь должен прийти пользовательский код.
  // Код ниже взят из примера Three.js BoxGeometry
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {

      
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);

    
 // Метод window.requestAnimationFrame () сообщает браузеру, что вы хотите выполнить
    // анимация и запрашивает, чтобы браузер вызвал указанную функцию
    // обновить анимацию перед следующей перерисовкой
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  listener = () => {
    window.addEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Обратите внимание, что после внесения изменений в большинство свойств камеры вы должны вызвать
    // .updateProjectionMatrix, чтобы изменения вступили в силу.
    this.camera.updateProjectionMatrix();

  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}



class Slider extends React.Component {
    constructor(props){
        super(props)

        
        this.images = [
            './img/bg/bg1.jpg',
            './img/bg/bg2.jpg',
            './img/bg/bg3.jpg',
            './img/bg/bg4.jpg'
        ]

        this.state = {
            total: this.images.length - 1,
            numberCurrentSlide: 0,
            numberNextSlide: 1,
            animating: false,
            initial: true
        }
    }

    boundsСhecking = (value) => {       
        if(value > this.state.total) 
            return 0 
        if(value < 0)
            return this.state.total
        return value
    }


    componentDidMount() {
        this.slides = [...this.el.querySelectorAll('.slide')]
        this.bullets = [...this.el.querySelectorAll('.slider-bullet')]
    
        this.sceneSetup()
        this.cameraSetup()
        this.loadTextures()
        this.createMesh()
        this.setInitStyles()
        this.rend()
        this.listeners()
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
      }

    setInitStyles() {
        this.slides.forEach((slide, index) => {
            if (index === 0){
                const currentText = slide.querySelectorAll('.slider__text-line div')
                TweenMax.fromTo(currentText, 2, {yPercent: 110}, {yPercent: 0, ease: 'power3.out', delay: 0.5}, )
                return
            } 
            
            TweenMax.set(slide, {
                autoAlpha: 0
            })
        })

        this.bullets.forEach((bullet, index) => {
            const txt = bullet.querySelector('.slider-bullet__text')
            const line = bullet.querySelector('.slider-bullet__line')
            TweenMax.set(line, {
                transformOrigin: 'right'
            })
            if (index === 0) return

            TweenMax.set(txt, {alpha: 0.5, scale: 0.75})
            TweenMax.set(line, {alpha: 0.5, scale: 0.75})
        })
    }

    estimationDirection = () => {       
        if(this.state.numberCurrentSlide < this.state.numberNextSlide)
            return true
        else 
            return false
        
    } 

    cameraSetup = () => {
        console.log('fds');
        
        this.camera = new THREE.OrthographicCamera(
            this.el.offsetWidth / -2,
            this.el.offsetWidth / 2,
            this.el.offsetHeight / 2,
            this.el.offsetHeight / -2,
            1,
            1000
        )

        this.camera.lookAt(this.scene.position)
        this.camera.position.z = 1
    }

    sceneSetup() {
        this.scene = new THREE.Scene()
        this.clock = new THREE.Clock(true)

        this.renderer = new THREE.WebGLRenderer({alpha: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)

        this.inner.appendChild(this.renderer.domElement)
    }
    loadTextures() {
        const loader = new THREE.TextureLoader()

        this.textures = []
        this.images.forEach((image, index) => {
            const texture = loader.load(image, this.rend)

            texture.minFilter = THREE.LinearFilter
            texture.generateMipmaps = false

            if (index === 0 && this.mat) {
                this.mat.uniforms.size.value = [
                    texture.image.naturalWidth,
                    texture.image.naturalHeight
                ]
            }

            this.textures.push(texture)
        })

        this.disp = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png', this.render)
        this.disp.magFilter = this.disp.minFilter = THREE.LinearFilter
        this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping
    }

    createMesh() {
        
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                dispPower: {type: 'f', value: 0.0},
                intensity: {type: 'f', value: 0.5},
                direction:{type: 'f', value: 1},
                res: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                size: {value: new THREE.Vector2(1, 1)},
                texture1: {type: 't', value: this.textures[0]},
                texture2: {type: 't',value: this.textures[1]},
                disp: {type: 't', value: this.disp}},
            transparent: true,
            vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            varying vec2 vUv;
        
            uniform sampler2D texture1;
            uniform sampler2D texture2;
            uniform sampler2D disp;
        
            uniform float dispPower;
            uniform float intensity;
            uniform float direction;
        
            uniform vec2 size;
            uniform vec2 res;
        
            vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
              float screenRatio = screenSize.x / screenSize.y;
              float imageRatio = imageSize.x / imageSize.y;
              vec2 newSize = screenRatio < imageRatio 
                  ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
                  : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
              vec2 newOffset = (screenRatio < imageRatio 
                  ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
                  : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
              return uv * screenSize / newSize + newOffset;
            }
        
            void main() {
              vec2 uv = vUv;
        
              vec4 disp = texture2D(disp, uv);
              vec2 dispVec = vec2(disp.x, disp.y);
        
              vec2 distPos1 = uv + (dispVec * intensity * dispPower)*direction;
              vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)))*direction;
        
              vec4 _texture1 = texture2D(texture1, distPos1);
              vec4 _texture2 = texture2D(texture2, distPos2);
        
              gl_FragColor = mix(_texture1, _texture2, dispPower);
            }
            `
        })

        const geometry = new THREE.PlaneBufferGeometry(
            this.el.offsetWidth,
            this.el.offsetHeight,
            1
        )
        const mesh = new THREE.Mesh(geometry, this.mat)

        this.scene.add(mesh)
    }
    animatingNext = () =>  {
        const direction = this.estimationDirection()
        this.changeTexture()
        const tl = new TimelineMax({paused: true})
        tl.to(this.mat.uniforms.dispPower, 2.5, {
            value: 1,
            ease: 'expo.inOut',
            onStart: () => {
                this.mat.uniforms.direction.value = (direction)? 1: -1
            },
            onUpdate: this.rend,
            onComplete: () => {
                this.mat.uniforms.dispPower.value = 0.0
                this.setState({...this.state, animating: false})
            }
        }, 0)
        
        const currentSlide = this.slides[this.state.numberCurrentSlide]
        const nextSlide = this.slides[this.state.numberNextSlide]



        const currentText = currentSlide.querySelectorAll('.slider__text-line div')
        const nextText = nextSlide.querySelectorAll('.slider__text-line div')

        const currentBullet = this.bullets[this.state.numberCurrentSlide]
        const nextBullet = this.bullets[this.state.numberNextSlide]

        const currentBulletTxt = currentBullet.querySelectorAll('.slider-bullet__text')
        const nextBulletTxt = nextBullet.querySelectorAll('.slider-bullet__text')

        const currentBulletLine = currentBullet.querySelectorAll('.slider-bullet__line')
        const nextBulletLine = nextBullet.querySelectorAll('.slider-bullet__line')

        if (this.state.initial) {
            TweenMax.to('.scroll', 1.5, {yPercent: 100, autoAlpha: 0, ease: 'power4.inOut'})

            this.setState({...this.state, initial: false})
        }
        
/*      .staggerFromTo(currentImages, 1.5, {yPercent: 0, scale: 1}, {yPercent: -185, scaleY: 1.5, ease: Expo.easeInOut}) */
/*      .staggerFromTo(nextImages, 1.5, {yPercent: 150, scaleY: 1.5}, {yPercent: 0, scaleY: 1, ease: Expo.easeInOut}, 0, 1) */

        tl.to(currentBulletTxt, 0.5, {alpha: 0.5, scale: 0.75}, 0)
          .to(currentBulletLine, 0.5, {alpha: 0.5, scale: 0.75}, 0)
          .to(nextBulletTxt, 0.5, {alpha: 1, scale: 1}, 1)
          .to(nextBulletLine, 0.5, {alpha: 1, scale: 1}, 1)
          .set(currentSlide, {autoAlpha: 0})
          .set(nextSlide, {autoAlpha: 1}, 1)

        if(direction)
            tl.fromTo(currentText, 2, {yPercent: 0}, {yPercent: -110, ease: 'power4.inOut'}, 0)
              .fromTo(nextText, 2, {yPercent: 110}, {yPercent: 0, ease: 'power3.out'}, 1.5)
        else 
            tl.fromTo(currentText, 2, {yPercent: 0}, {yPercent: 110, ease: 'power4.inOut'}, 0)
              .fromTo(nextText, 2, {yPercent: -110}, {yPercent: 0, ease: 'power3.out'}, 1.5)
              
        tl.play()
    }



   

    nextSlide = (numberNextSlide) => {
        if (this.state.animating) return
        if (numberNextSlide === this.state.numberCurrentSlide) return
        this.setState({...this.state, animating: true})

        this.setState({...this.state, numberNextSlide: this.boundsСhecking(numberNextSlide)})
        
        this.animatingNext()

        this.setState({...this.state, numberCurrentSlide: this.boundsСhecking(numberNextSlide)})
    }

    changeTexture() {
        this.mat.uniforms.texture1.value = this.textures[this.state.numberCurrentSlide]
        this.mat.uniforms.texture2.value = this.textures[this.state.numberNextSlide]
    }

    changeSizeWindow = () => {
        this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)
        this.render()
    }

    

    handlerClickSliderNav(){
        const arrowUp = document.querySelector('.arrow_up')
        const arrowDown = document.querySelector('.arrow_down')

        arrowUp.addEventListener('click', ()=>{
            this.nextSlide(this.state.numberCurrentSlide - 1)
        })
        arrowDown.addEventListener('click', ()=>{
            this.nextSlide(this.state.numberCurrentSlide + 1)
        })

        const bulletsNum = document.querySelectorAll('.slider-bullet__text')
        bulletsNum.forEach((bullet, ind)=>{
            bullet.addEventListener('click', ()=>{
                this.nextSlide(ind)
            })
        })

    }

    handlerScroll = () => {
        new WheelIndicator({
            callback: (e) => {
                if (e.direction === 'down')
                    this.nextSlide(this.state.numberCurrentSlide + 1)
                else
                    this.nextSlide(this.state.numberCurrentSlide - 1)
            }
        })
    }
    listeners = ()=> {
        this.handlerScroll()
        window.addEventListener('resize', this.changeSizeWindow)
        this.handlerClickSliderNav()

    }
    rend = () => {
        this.renderer.render(this.scene, this.camera)
    }
    render() {
        return (
            <div className="slider" ref={ref => (this.el = ref)}>
                <div className="slider__inner" ref={ref => (this.inner = ref)}></div>
                <div className="slide">
                    <div className="slider__text">
                      <div className="slider__text-line"><div>Хей, меня</div></div>
                      <div className="slider__text-line"><div>зoвут Василий</div></div>
                    </div>
                </div>
                <div className="slide">
                    <div className="slider__text">
                        <div className="slider__text-line"><div>я вырос</div></div>
                        <div className="slider__text-line"><div>в маленкой деревушке</div></div>
                        <div className="slider__text-line"><div>алтайского края</div></div>
                    </div>
                </div>
            
            <div className="slide">
                <div className="slider__text">
                    <div className="slider__text-line"><div>Мне нравится создавать</div></div>
                    <div className="slider__text-line"><div>интерактивные приложения</div></div>
                    <div className="slider__text-line"><div>на JavaScript с прицелом</div></div>
                    <div className="slider__text-line"><div>на анимированный контент.</div></div>
                  </div>
            </div>
            <div className="slide"></div>
            <nav className="slider__nav">
                <div className="arrow arrow_up">
                  <img src="./img/arrow.svg" alt="scroll"/>
                </div>
                <div className="slider-bullet">
                  <span className="slider-bullet__text">01</span>
                  <span className="slider-bullet__line"></span>
                </div>
                 <div className="slider-bullet">
                  <span className="slider-bullet__text">02</span>
                  <span className="slider-bullet__line"></span>
                </div>
                 <div className="slider-bullet">
                  <span className="slider-bullet__text">03</span>
                  <span className="slider-bullet__line"></span>
                </div>
                 <div className="slider-bullet">
                  <span className="slider-bullet__text">04</span>
                  <span className="slider-bullet__line"></span>
                </div>
                <div className="arrow arrow_down">
                  <img src="./img/arrow.svg" alt="scroll"/>
                </div>
            </nav>
        </div>
        )
    }
}
class Container extends React.Component {
  

  render() {
 
    return (
        <Slider/>
    )
  }
}

export default Container