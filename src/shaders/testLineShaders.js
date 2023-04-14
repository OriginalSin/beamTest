import { SchemaTypes, GLTypes } from 'beam-gl'
import colorVS from './vert.glsl';
import colorFS from './frag.glsl';

const { vec2, vec4, mat4, float } = SchemaTypes

export const PolygonColor = {
  vs: colorVS,
  fs: colorFS,
  buffers: {
// var vb = this._verticesBuffer;
// gl.bindBuffer(gl.ARRAY_BUFFER, vb);
// gl.vertexAttribPointer(sha.prev._pName, vb.itemSize, gl.FLOAT, false, 8, 0);
// gl.vertexAttribPointer(sha.current._pName, vb.itemSize, gl.FLOAT, false, 8, 32);
// gl.vertexAttribPointer(sha.next._pName, vb.itemSize, gl.FLOAT, false, 8, 64);
 
// gl.bindBuffer(gl.ARRAY_BUFFER, this._ordersBuffer);
// gl.vertexAttribPointer(sha.order._pName, this._ordersBuffer.itemSize, gl.FLOAT, false, 4, 0);

    prev: { type: vec2 },
    current: { type: vec2 },
    next: { type: vec2 },
	order: { type: float },
  },
  uniforms: {
    color: { type: vec4 },
    viewport: { type: vec2 },
    thickness: { type: float },
  }
}
