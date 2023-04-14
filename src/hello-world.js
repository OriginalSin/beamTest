import { Beam, ResourceTypes } from 'beam-gl'
import { PolygonColor } from './shaders/basic-graphics-shaders.js'
const { VertexBuffers, IndexBuffer } = ResourceTypes

export default () => {
// Remember to create a `<canvas>` element in HTML
const canvas = document.querySelector('canvas')
// Init Beam instance
const beam = new Beam(canvas)

// Init shader for triangle rendering
const shader = beam.shader(PolygonColor)

// Init vertex buffer resource
const vertexBuffers = beam.resource(VertexBuffers, {
  position: [
    -1, -1, 0, // vertex 0, bottom left
    0, 1, 0, // vertex 1, top middle
    1, -1, 0 // vertex 2, bottom right
  ],
  color: [
    1, 0, 0, // vertex 0, red
    0, 1, 0, // vertex 1, green
    0, 0, 1 // vertex 2, blue
  ]
})
// Init index buffer resource with 3 indices
const indexBuffer = beam.resource(IndexBuffer, {
  array: [0, 1, 2]
})

// Clear the screen, then draw with shader and resources
beam
  .clear()
  .draw(shader, vertexBuffers, indexBuffer)

}