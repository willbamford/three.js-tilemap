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

// var geometry = new THREE.BufferGeometry();
// var vertexPositions = [
//   [-1.0, -1.0, 1.0],
//   [ 1.0, -1.0, 1.0],
//   [ 1.0,  1.0, 1.0],

//   [ 1.0,  1.0, 1.0],
//   [-1.0,  1.0, 1.0],
//   [-1.0, -1.0, 1.0]
// ];

// var vertices = new Float32Array(vertexPositions.length * 3);
// for (var i = 0; i < vertexPositions.length; i += 1) {
//   vertices[i * 3 + 0] = vertexPositions[i][0] * 100;
//   vertices[i * 3 + 1] = vertexPositions[i][1] * 100;
//   vertices[i * 3 + 2] = vertexPositions[i][2] * 100;
// }

// geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
// var material = new THREE.MeshBasicMaterial({color: 0xff0000});
// var mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

var geometry = new THREE.Geometry();
var colors = [];
var sprite = THREE.ImageUtils.loadTexture('led.png');

for (var i = 0; i < 1000; i += 1) {
  var vertex = new THREE.Vector3();
  vertex.x = 2000 * Math.random() - 1000;
  vertex.y = 2000 * Math.random() - 1000;
  vertex.z = 2000 * Math.random() - 1000;
  geometry.vertices.push(vertex);

  colors[i] = new THREE.Color(0xffffff);
  colors[i].setHSL(Math.random(), 1, 0.5);
}

geometry.colors = colors;

var material = new THREE.PointCloudMaterial({
  size: 85,
  map: sprite,
  blending: THREE.AdditiveBlending,
  vertexColors: THREE.VertexColors,
  depthTest: false,
  transparent: true
});
// material.color.setHSL(1.0, 1.0, 1.0);

var particles = new THREE.PointCloud(geometry, material);
scene.add(particles);

var now;
var before;
var delta = 0;

function update() {

  requestAnimationFrame(update);

  stats.begin();

  now = Date.now();
  delta = before ? now - before : (1000 / 60);
  before = now;

  // mesh.rotation.x += delta * 0.0001;
  // mesh.rotation.y += delta * 0.0002;

  particles.rotation.x += delta * 0.0001;
  particles.rotation.y += delta * 0.0002;

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

update();