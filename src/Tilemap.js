var Tilemap = function (parameters) {

  'use strict';

  parameters = parameters || { spritesheet: {} };

  var tileSize = this.tileSize = parameters.tileSize;
  var numOfCols = this.numOfCols = parameters.numOfCols;
  var numOfRows = this.numOfRows = parameters.numOfRows;
  var width = this.width = tileSize * numOfCols;
  var height = this.height = tileSize * numOfRows;

  var spritesheet = parameters.spritesheet;

  spritesheet.numOfCols = spritesheet.width / spritesheet.tileSize;
  spritesheet.numOfRows = spritesheet.height / spritesheet.tileSize;

  spritesheet.tileSizeU = spritesheet.tileSize / spritesheet.width;
  spritesheet.tileSizeV = spritesheet.tileSize / spritesheet.height;

  this.spritesheet = spritesheet;

  var indices = new Uint16Array(numOfCols * numOfRows * 6);
  var vertices = new Float32Array(numOfCols * numOfRows * 4 * 3);
  var uvs = new Float32Array(numOfCols * numOfRows * 4 * 2);

  var offset12 = 0;
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

      vertices[offset12 + 3 ] = x + tileSize;
      vertices[offset12 + 4 ] = y;
      vertices[offset12 + 5 ] = 0;

      vertices[offset12 + 6 ] = x;
      vertices[offset12 + 7 ] = y + tileSize;
      vertices[offset12 + 8 ] = 0;

      vertices[offset12 + 9 ] = x + tileSize;
      vertices[offset12 + 10] = y + tileSize;
      vertices[offset12 + 11] = 0;

      indices[offset6 + 0] = offset4 + 0;
      indices[offset6 + 1] = offset4 + 1;
      indices[offset6 + 2] = offset4 + 2;

      indices[offset6 + 3] = offset4 + 1;
      indices[offset6 + 4] = offset4 + 3;
      indices[offset6 + 5] = offset4 + 2;

      offset12 += 12;
      offset6 += 6;
      offset4 += 4;
    }
  }

  var geometry = new THREE.BufferGeometry();
  geometry.dynamic = true;
  geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  // ... normal, color

  var material = new THREE.MeshBasicMaterial({
    map: spritesheet.texture
    // side: THREE.FrontSide
    // vertexColors: THREE.VertexColors
    // color: 0x00ff00,
    // shading: THREE.FlatShading,
    // wireframe: true
  });
  var mesh = new THREE.Mesh(geometry, material);

  this.mesh = mesh;

  // this.randomiseTiles();
}

Tilemap.prototype.randomiseTiles = function () {

  var ix, iy;
  var offset8 = 0;
  var geometry = this.mesh.geometry;

  var uvs = geometry.attributes.uv.array;

  for (iy = 0; iy < this.numOfRows; iy += 1) {

    for (ix = 0; ix < this.numOfCols; ix += 1) {

      var u0 = this.randomTileU();
      var u1 = u0 + this.spritesheet.tileSizeU;

      var v0 = this.randomTileV();
      var v1 = v0 + this.spritesheet.tileSizeV;

      uvs[offset8 + 0] = u0;
      uvs[offset8 + 1] = v0;

      uvs[offset8 + 2] = u1;
      uvs[offset8 + 3] = v0;

      uvs[offset8 + 4] = u0;
      uvs[offset8 + 5] = v1;

      uvs[offset8 + 6] = u1
      uvs[offset8 + 7] = v1;

      offset8 += 8;
    }
  }

  // geometry.uvsNeedUpdate = true;
  geometry.attributes.uv.needsUpdate = true;
};

Tilemap.prototype.randomTileU = function () {
  return this.spritesheet.tileSizeU * Math.floor(Math.random() * this.spritesheet.numOfCols);
};

Tilemap.prototype.randomTileV = function () {
  return this.spritesheet.tileSizeV *
    (this.spritesheet.numOfRows / 2 + Math.floor(Math.random() * (this.spritesheet.numOfRows / 2)));
};

window.Tilemap = Tilemap;