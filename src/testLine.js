import { Beam, ResourceTypes } from 'beam-gl'
import { PolygonColor } from './shaders/testLineShaders.js'
import PLineNormals from 'polyline-normals';

const { VertexBuffers, IndexBuffer, Uniforms } = ResourceTypes

export default () => {
	// Remember to create a `<canvas>` element in HTML
	const canvas = document.querySelector('canvas')
	// Init Beam instance
	const beam = new Beam(canvas)

	// Init shader for triangle rendering
	const shader = beam.shader(PolygonColor)
	
	let path = [[[-100, -50], [1, 2], [200, 15]]];
	const createLineData = function (pathArr, outVertices, outOrders, outIndexes) {
		var index = 0;
	 
		outIndexes.push(0, 0);
	 
		for ( var j = 0; j < pathArr.length; j++ ) {
			path = pathArr[j];
			var startIndex = index;
			var last = [path[0][0] + path[0][0] - path[1][0], path[0][1] + path[0][1] - path[1][1]];
			outVertices.push(last[0], last[1], last[0], last[1], last[0], last[1], last[0], last[1]);
			outOrders.push(1, -1, 2, -2);
	 
			//На каждую вершину приходится по 4 элемента
			for ( var i = 0; i < path.length; i++ ) {
				var cur = path[i];
				outVertices.push(cur[0], cur[1], cur[0], cur[1], cur[0], cur[1], cur[0], cur[1]);
				outOrders.push(1, -1, 2, -2);
				outIndexes.push(index++, index++, index++, index++);
			}
	 
			var first = [path[path.length - 1][0] + path[path.length - 1][0] - path[path.length - 2][0],  path[path.length - 1][1] + path[path.length - 1][1] - path[path.length - 2][1]];
			outVertices.push(first[0], first[1], first[0], first[1], first[0], first[1], first[0], first[1]);
			outOrders.push(1, -1, 2, -2);
			outIndexes.push(index - 1, index - 1, index - 1, index - 1);
	 
			if ( j < pathArr.length - 1 ) {
				index += 8;
				outIndexes.push(index, index);
			}
		}
	};

	var vertices = [],
		 orders = [],
		 indexes = [];

	createLineData(path, vertices, orders, indexes);
	console.log('hhh', vertices, orders, indexes);
	// var vb = this._verticesBuffer;
	// gl.bindBuffer(gl.ARRAY_BUFFER, vb);
	// gl.vertexAttribPointer(sha.prev._pName, vb.itemSize, gl.FLOAT, false, 8, 0);
	// gl.vertexAttribPointer(sha.current._pName, vb.itemSize, gl.FLOAT, false, 8, 32);
	// gl.vertexAttribPointer(sha.next._pName, vb.itemSize, gl.FLOAT, false, 8, 64);
	 
	// gl.bindBuffer(gl.ARRAY_BUFFER, this._ordersBuffer);
	// gl.vertexAttribPointer(sha.order._pName, this._ordersBuffer.itemSize, gl.FLOAT, false, 4, 0);

	const vertexBuffers = beam.resource(VertexBuffers, {
	  vertices,
	  orders,
	})
	// const ordersBuffers = beam.resource(VertexBuffers, {
	// })
	// Init index buffer resource with 3 indices
	const indexBuffer = beam.resource(IndexBuffer, {
	  array: indexes
	})
	var thickness = 1;
	var color = [1, 1, 1, 1];
	const pbrOptions = beam.resource(Uniforms, {
	  thickness,
	  color,
	  viewport: [canvas.width, canvas.height]
	})
	pbrOptions
	  .set('thickness', 2)
	  .set('viewport', [canvas.width, canvas.height])
	  // .set('view', view)
	  // .set('thickness', thickness)
	  .set('color', color)

		  const resources = [
			vertexBuffers,
			// ordersBuffers,
			indexBuffer,
			pbrOptions
		  ]

		// Clear the screen, then draw with shader and resources
		beam
		  .clear()
		  .draw(shader, ...resources)
		  // .draw(shader, vertexBuffers, indexBuffer)

}
/*
path = [
    [
        26.5,
        403.5
    ],
    [
        76.5,
        378.5
    ],
    [
        81.15106964111328,
        387.44012451171875
    ],
    [
        90.2380599975586,
        402.79351806640625
    ],
    [
        99.04581451416016,
        414.96087646484375
    ],
    [
        107.58348846435547,
        424.16192626953125
    ],
    [
        115.86023712158203,
        430.61639404296875
    ],
    [
        123.88521575927734,
        434.54400634765625
    ],
    [
        131.6675796508789,
        436.16448974609375
    ],
    [
        139.21648406982422,
        435.69757080078125
    ],
    [
        146.54108428955078,
        433.36297607421875
    ],
    [
        153.6505355834961,
        429.38043212890625
    ],
    [
        160.55399322509766,
        423.96966552734375
    ],
    [
        167.26061248779297,
        417.35040283203125
    ],
    [
        176.97149658203125,
        405.63623046875
    ],
    [
        189.31585693359375,
        387.83837890625
    ],
    [
        206.68798828125,
        360.04296875
    ],
    [
        222.90655517578125,
        336.20263671875
    ],
    [
        230.6604995727539,
        327.61956787109375
    ],
    [
        235.71916961669922,
        323.63702392578125
    ],
    [
        240.70001983642578,
        321.30242919921875
    ],
    [
        245.6122055053711,
        320.83551025390625
    ],
    [
        250.46488189697266,
        322.45599365234375
    ],
    [
        255.26720428466797,
        326.38360595703125
    ],
    [
        260.02832794189453,
        332.83807373046875
    ],
    [
        264.75740814208984,
        342.03912353515625
    ],
    [
        269.4636001586914,
        354.20648193359375
    ],
    [
        274.1560592651367,
        369.55987548828125
    ],
    [
        276.5,
        378.5
    ],
    [
        326.5,
        403.5
    ]
];
*/
/*
const closed = false;
const tags = PLineNormals(path, closed);
if (closed) { // closed
	path = path.slice();
	path.push(path[0]);
	tags.push(tags[0])
}
var normal = tags.map(function(x) {
	return x[0]
});
var miter = tags.map(function(x) {
	return x[1]
});
const duplicate = function (nestedArray, mirror) {
	var out = [];
	nestedArray.forEach(function(x) {
		var x1 = mirror ? -x : x;
		out.push(x1, x)
	});
	return out
};

var position = duplicate(path);

normal = duplicate(normal);
miter = duplicate(miter, true);

const createIndices = function (length) {
  let indices = new Uint16Array(length * 6);
	// var indices = new Array(length * 6);
	var c = 0
	  , index = 0;
	for (var j = 0; j < length; j++) {
		var i = index;
		indices[c++] = i + 0;
		indices[c++] = i + 1;
		indices[c++] = i + 2;
		indices[c++] = i + 2;
		indices[c++] = i + 1;
		indices[c++] = i + 3;
		index += 2;
	}
	return indices
};
const dtype = function (dtype) {
            switch (dtype) {
            case "int8":
                return Int8Array;
            case "int16":
                return Int16Array;
            case "int32":
                return Int32Array;
            case "uint8":
                return Uint8Array;
            case "uint16":
                return Uint16Array;
            case "uint32":
                return Uint32Array;
            case "float32":
                return Float32Array;
            case "float64":
                return Float64Array;
            case "array":
                return Array
            }
        };

const pack = function (arr, type) {
	type = type || "float32";
	if (!arr[0] || !arr[0].length) {
		return arr
	}
	var Arr = typeof type === "string" ? dtype(type) : type;
	var dim = arr[0].length;
	var out = new Arr(arr.length * dim);
	var k = 0;
	for (var i = 0; i < arr.length; i++)
		for (var j = 0; j < dim; j++) {
			out[k++] = arr[i][j]
		}
	return out
};
let count = (path.length - 1) * 6;

// var indexUint16 = createIndices(count);
// var indexUint16 = createIndices(path.length - 1);
var indexUint16 = createIndices(path.length);
 
console.log('hhh', tags);
const identity = function (out) {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out
};
              // positionBuffer.update(pack(positions));
                // normalBuffer.update(pack(normals));
                // miterBuffer.update(pack(miters));
                // indexBuffer.update(indexUint16);

	// Init vertex buffer resource
position = pack(position, 'array');
normal = pack(normal, 'array');
miter = pack(miter, 'array');
	const vertexBuffers = beam.resource(VertexBuffers, {
	  position,
	  normal,
	  miter,
	})
	// Init index buffer resource with 3 indices
	const indexBuffer = beam.resource(IndexBuffer, {
	  array: indexUint16
	})

var model = identity([]);
var projection = identity([]);
var view = identity([]);
var thickness = 1;
var inner = 0;
var color = [1, 1, 1];
// Resourecs: other options
const pbrOptions = beam.resource(Uniforms, {
  projection: projection,
  model,
  view,
  thickness,
  color,
})
pbrOptions
  .set('projection', projection)
  .set('model', model)
  .set('view', view)
  .set('thickness', thickness)
  .set('color', color)

      const resources = [
        vertexBuffers,
        indexBuffer,
        pbrOptions
      ]
*/