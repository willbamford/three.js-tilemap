var Tilemap = function (tileSize, nCols, nRows) {

  // THREE.Object3D.call(this);
  // this.type = 'Tilemap';

  var nCols1 = nCols + 1;
  var nRows1 = nRows + 1;

  var width = tileSize * nCols;
  var height = tileSize * nRows;

  var indices = new Uint16Array(nCols * nRows * 6);
  var vertices = new Float32Array(nCols * nRows * 4 * 3);
  var uvs = new Float32Array(nCols * nRows * 4 * 2);

  var offset12 = 0;
  var offset8 = 0;
  var offset6 = 0;
  var offset4 = 0;
  var ix, iy;
  var x, y;

  for (iy = 0; iy < nRows; iy += 1) {

    y = iy * tileSize - height / 2;

    for (ix = 0; ix < nCols; ix += 1) {

      x = ix * tileSize - width / 2;

      vertices[offset12 + 0 ] = x;
      vertices[offset12 + 1 ] = y;
      vertices[offset12 + 2 ] = 0;

      vertices[offset12 + 3 ] = x;
      vertices[offset12 + 4 ] = y + tileSize;
      vertices[offset12 + 5 ] = 0;

      vertices[offset12 + 6 ] = x + tileSize;
      vertices[offset12 + 7 ] = y;
      vertices[offset12 + 8 ] = 0;

      vertices[offset12 + 9 ] = x + tileSize;
      vertices[offset12 + 10] = y + tileSize;
      vertices[offset12 + 11] = 0;

      indices[offset6 + 0] = offset4;
      indices[offset6 + 1] = offset4 + 2;
      indices[offset6 + 2] = offset4 + 1;

      indices[offset6 + 3] = offset4 + 2;
      indices[offset6 + 4] = offset4 + 3;
      indices[offset6 + 5] = offset4 + 1;

      uvs[offset8 + 0] = 0;
      uvs[offset8 + 1] = 0;

      uvs[offset8 + 2] = 1;
      uvs[offset8 + 3] = 0;

      uvs[offset8 + 4] = 0;
      uvs[offset8 + 5] = 1;

      uvs[offset8 + 6] = 1;
      uvs[offset8 + 7] = 1;

      offset12 += 12;
      offset8 += 8;
      offset6 += 6;
      offset4 += 4;

      // x = ix * tileSize - (width / 2);
      // vertices[offset    ] = x;
      // vertices[offset + 1] = y;
      // uvs[offset2    ] = ix / nCols;
      // uvs[offset2 + 1] = 1 - (iy / nRows);
      // offset += 3;
      // offset2 += 2;
    }
  }

  // console.dir(vertices);

  // var indices = new Uint16Array(nCols * nRows * 6);
  // var uvs = new Float32Array(nCols * nRows * 12); /* 6 p/quad */
  // var a, b, c, d;
  // offset = 0;

  // for (iy = 0; iy < nRows1; iy += 1) {
  //   for (ix = 0; ix < nCols1; ix += 1) {

  //     a = ix + nCols1 * iy;
  //     b = ix + nCols1 * ( iy + 1 );
  //     c = (ix + 1) + nCols1 * (iy + 1);
  //     d = (ix + 1) + nCols1 * iy;

  //     indices[offset    ] = a;
  //     indices[offset + 1] = b;
  //     indices[offset + 2] = d;

  //     indices[offset + 3] = b;
  //     indices[offset + 4] = c;
  //     indices[offset + 5] = d;

      // uvs[offset2     ] = 0;
      // uvs[offset2 + 1 ] = 0;
      // uvs[offset2 + 2 ] = 1;
      // uvs[offset2 + 3 ] = 0;
      // uvs[offset2 + 4 ] = 1;
      // uvs[offset2 + 5 ] = 1;

      // uvs[offset2 + 6 ] = 0;
      // uvs[offset2 + 7 ] = 1;
      // uvs[offset2 + 8 ] = 1;
      // uvs[offset2 + 9 ] = 1;
      // uvs[offset2 + 10] = 1;
      // uvs[offset2 + 11] = 0;

      // offset += 6;
      // offset2 += 12;
    // }
  // }

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  this.geometry = geometry;
}

  // this.indices = indices;
  // this.vertices = vertices;
  // this.normals = normals;
  // this.uvs = uvs;

  // this.attributes['index'] = { array: indices, itemSize: 1 };
  // this.attributes['position'] = { array: vertices, itemSize: 3 };
  // this.attributes['normal'] = { array: normals, itemSize: 3 };
  // this.attributes['uv'] = { array: uvs, itemSize: 2 };

  // return this;

window.Tilemap = Tilemap;