import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

const app =   (
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
