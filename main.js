import './style.css'
import setup from './src/testLine.js'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas width="400" height="400"></canvas>
  </div>
`

setup()
