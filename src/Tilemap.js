var Tilemap = function (parameters) {

  'use strict';

  parameters = parameters || { tileset: {} };

  this.tileSize = parameters.tileSize;
  this.numOfCols = parameters.numOfCols;
  this.numOfRows = parameters.numOfRows;
  this.numOfCells = this.numOfCols * this.numOfRows;
  this.width = this.tileSize * this.numOfCols;
  this.height = this.tileSize * this.numOfRows;

  var tileset = parameters.tileset;

  tileset.numOfCols = tileset.width / tileset.tileSize;
  tileset.numOfRows = tileset.height / tileset.tileSize;

  tileset.tileSizeU = tileset.tileSize / tileset.width;
  tileset.tileSizeV = tileset.tileSize / tileset.height;

  this.tileset = tileset;

  var indices = new Uint16Array(this.numOfCells * 6);
  var vertices = new Float32Array(this.numOfCells * 4 * 3);
  var uvs = new Float32Array(this.numOfCells * 4 * 2);

  var offset12 = 0;
  var offset6 = 0;
  var offset4 = 0;
  var ix, iy;
  var x, y;

  for (iy = 0; iy < this.numOfRows; iy += 1) {

    y = iy * this.tileSize - this.height / 2;

    for (ix = 0; ix < this.numOfCols; ix += 1) {

      x = ix * this.tileSize - this.width / 2;

      vertices[offset12 + 0 ] = x;
      vertices[offset12 + 1 ] = y;
      vertices[offset12 + 2 ] = 0;

      vertices[offset12 + 3 ] = x + this.tileSize;
      vertices[offset12 + 4 ] = y;
      vertices[offset12 + 5 ] = 0;

      vertices[offset12 + 6 ] = x;
      vertices[offset12 + 7 ] = y + this.tileSize;
      vertices[offset12 + 8 ] = 0;

      vertices[offset12 + 9 ] = x + this.tileSize;
      vertices[offset12 + 10] = y + this.tileSize;
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
    map: tileset.texture
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

Tilemap.prototype.setMap = function (map) {

  var u0, v0, u1, v1, tile;
  var offset8 = 0;
  var geometry = this.mesh.geometry;
  var uvs = geometry.attributes.uv.array;

  if (map.length !== this.numOfCells) {
    console.log('Error: map has wrong dimensions');
    return;
  }

  for (var i = 0; i < map.length; i += 1) {

    tile = map[i];
    v0 = Math.floor(tile / this.tileset.numOfCols);
    u0 = tile - (this.tileset.numOfCols * v0);

    v0 = 1 - v0 * this.tileset.tileSizeV;
    u0 *= this.tileset.tileSizeU;

    v1 = v0 - this.tileset.tileSizeV;
    u1 = u0 + this.tileset.tileSizeU;

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

  geometry.attributes.uv.needsUpdate = true;
};

Tilemap.prototype.randomTileU = function () {
  return this.tileset.tileSizeU * Math.floor(Math.random() * this.tileset.numOfCols);
};

Tilemap.prototype.randomTileV = function () {
  return this.tileset.tileSizeV *
    (this.tileset.numOfRows / 2 + Math.floor(Math.random() * (this.tileset.numOfRows / 2)));
};

window.Tilemap = Tilemap;