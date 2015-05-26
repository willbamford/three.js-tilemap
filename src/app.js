'use strict';

function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  return stats;
}

var stats = initStats();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.z = 1500;

var sprite = THREE.ImageUtils.loadTexture('led.png');

var tilemap = new Tilemap(10, 120, 120);

// var geometry = new THREE.BufferGeometry();
// var vertices = [
//   [-1.0, -1.0, 1.0],
//   [ 1.0, -1.0, 1.0],
//   [ 1.0,  1.0, 1.0],

//   [ 1.0,  1.0, 1.0],
//   [-1.0,  1.0, 1.0],
//   [-1.0, -1.0, 1.0]
// ];

// var positions = new Float32Array(vertices.length * 3);
// var colors = new Float32Array(vertices.length * 3);
// var uvs = new Float32Array(vertices.length * 2);
// uvs[0] = 0;
// uvs[1] = 0;

// uvs[2] = 0;
// uvs[3] = 1;

// uvs[4] = 1;
// uvs[5] = 0;

// uvs[6] = 1;
// uvs[7] = 0;

// uvs[8] = 1;
// uvs[9] = 0;

// uvs[10] = 1;
// uvs[11] = 1;

// for (var i = 0; i < vertices.length; i += 1) {
//   positions[i * 3 + 0] = vertices[i][0] * 100;
//   positions[i * 3 + 1] = vertices[i][1] * 100;
//   positions[i * 3 + 2] = vertices[i][2] * 100;
//   colors[i * 3 + 0] = Math.random();
//   colors[i * 3 + 1] = Math.random();
//   colors[i * 3 + 2] = Math.random();
// }

// geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
// geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
// geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

var material = new THREE.MeshBasicMaterial({
  map: sprite
  // side: THREE.BackSide,
  // vertexColors: THREE.VertexColors
  // color: 0x00ff00,
  // shading: THREE.FlatShading,
  // wireframe: true
});
var mesh = new THREE.Mesh(tilemap.geometry, material);

scene.add(mesh);

// var geometry = new THREE.Geometry();
// var colors = [];
// var sprite = THREE.ImageUtils.loadTexture('led.png');

// for (var i = 0; i < 10000; i += 1) {
//   var vertex = new THREE.Vector3();
//   vertex.x = 2000 * Math.random() - 1000;
//   vertex.y = 2000 * Math.random() - 1000;
//   vertex.z = 2000 * Math.random() - 1000;
//   geometry.vertices.push(vertex);

//   colors[i] = new THREE.Color(0xffffff);
//   colors[i].setHSL(Math.random(), 1, 0.5);
// }

// geometry.colors = colors;

// var material = new THREE.PointCloudMaterial({
//   size: 85,
//   map: sprite,
//   blending: THREE.AdditiveBlending,
//   vertexColors: THREE.VertexColors,
//   depthTest: false,
//   transparent: true
// });

// var particles = new THREE.PointCloud(geometry, material);
// scene.add(particles);

var now;
var before;
var delta = 0;
var running = true;

function update() {

  if (!running)
    return;
  
  requestAnimationFrame(update);

  stats.begin();

  now = Date.now();
  delta = before ? now - before : 0;
  before = now;

  mesh.rotation.x += delta * 0.0008;
  mesh.rotation.y += delta * 0.0008;

  // for (var i = 0; i < geometry.colors.length; i += 1) {
  //   geometry.colors[i].setHSL(Math.random(), 1, 0.5);
  // }
  // geometry.colorsNeedUpdate = true;

  // particles.rotation.x += delta * 0.0001;
  // particles.rotation.y += delta * 0.0002;

  renderer.render(scene, camera);

  stats.end();
}

function onResize(event) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

var renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

renderer.domElement.addEventListener('mousedown', function () {
  running = !running;
  if (running) {
    before = Date.now();
    update();
  }
});

update();