var Tilemap = function (parameters) {

  'use strict';

  function randomTileUV() {
    var u = tileSizeU * Math.floor(Math.random() * spritesheetNumOfCols);
    var v = tileSizeV * (spritesheetNumOfRows / 2 + Math.floor(Math.random() * (spritesheetNumOfRows / 2)));
    return {
      u0: u,
      v0: v,
      u1: u + tileSizeU,
      v1: v + tileSizeV
    }
  }

  // THREE.Object3D.call(this);
  // this.type = 'Tilemap';

  parameters = parameters || {};

  var tileSize = parameters.tileSize;
  var numOfCols = parameters.numOfCols;
  var numOfRows = parameters.numOfRows;

  var spritesheetTileSize = parameters.spritesheetTileSize;
  var spritesheetWidth = parameters.spritesheetWidth;
  var spritesheetHeight = parameters.spritesheetHeight;
  var spritesheetNumOfCols = spritesheetWidth / spritesheetTileSize;
  var spritesheetNumOfRows = spritesheetHeight / spritesheetTileSize;

  var tileSizeU = spritesheetTileSize / spritesheetWidth;
  var tileSizeV = spritesheetTileSize / spritesheetHeight;

  var width = tileSize * numOfCols;
  var height = tileSize * numOfRows;

  var indices = new Uint16Array(numOfCols * numOfRows * 6);
  var vertices = new Float32Array(numOfCols * numOfRows * 4 * 3);
  var uvs = new Float32Array(numOfCols * numOfRows * 4 * 2);

  var offset12 = 0;
  var offset8 = 0;
  var offset6 = 0;
  var offset4 = 0;
  var ix, iy;
  var x, y;

  for (iy = 0; iy < numOfRows; iy += 1) {

    y = iy * tileSize - height / 2;

    for (ix = 0; ix < numOfCols; ix += 1) {

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

      var tile = randomTileUV();

      // console.log(tile);

      // uvs[offset8 + 0] = tile.u;
      // uvs[offset8 + 1] = tile.v;

      // uvs[offset8 + 2] = tile.u + tileSizeU;
      // uvs[offset8 + 3] = tile.v;

      // uvs[offset8 + 4] = tile.u;
      // uvs[offset8 + 5] = tile.v + tileSizeV;

      // uvs[offset8 + 6] = tile.u + tileSizeU;
      // uvs[offset8 + 7] = tile.v + tileSizeV;

      uvs[offset8 + 0] = tile.u0;
      uvs[offset8 + 1] = tile.v0;

      uvs[offset8 + 2] = tile.u1;
      uvs[offset8 + 3] = tile.v0;

      uvs[offset8 + 4] = tile.u0;
      uvs[offset8 + 5] = tile.v1;

      uvs[offset8 + 6] = tile.u1
      uvs[offset8 + 7] = tile.v1;

      offset12 += 12;
      offset8 += 8;
      offset6 += 6;
      offset4 += 4;

      // x = ix * tileSize - (width / 2);
      // vertices[offset    ] = x;
      // vertices[offset + 1] = y;
      // uvs[offset2    ] = ix / numOfCols;
      // uvs[offset2 + 1] = 1 - (iy / numOfRows);
      // offset += 3;
      // offset2 += 2;
    }
  }

  // console.dir(vertices);

  // var indices = new Uint16Array(numOfCols * numOfRows * 6);
  // var uvs = new Float32Array(numOfCols * numOfRows * 12); /* 6 p/quad */
  // var a, b, c, d;
  // offset = 0;

  // for (iy = 0; iy < numOfRows1; iy += 1) {
  //   for (ix = 0; ix < numOfCols1; ix += 1) {

  //     a = ix + numOfCols1 * iy;
  //     b = ix + numOfCols1 * ( iy + 1 );
  //     c = (ix + 1) + numOfCols1 * (iy + 1);
  //     d = (ix + 1) + numOfCols1 * iy;

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