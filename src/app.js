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

var axisHelper = new THREE.AxisHelper(50);
scene.add(axisHelper);

var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

var texture = THREE.ImageUtils.loadTexture('lttp-tiles_2048x1024.png');

texture.wrapS = THREE.ClampToEdgeWrapping; // THREE.Repeat;
texture.wrapT = THREE.ClampToEdgeWrapping; // THREE.Repeat;

texture.magFilter = THREE.LinearFilter;             // THREE.NearestFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter; // THREE.NearestFilter;

var tilemap = new Tilemap({
  tileSize: 32,
  numOfCols: 80,
  numOfRows: 80,
  spritesheet: {
    texture: texture,
    tileSize: 16,
    width: 2048,
    height: 1024
  }
});

scene.add(tilemap.mesh);

window.tilemap = tilemap;

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

  tilemap.randomiseTiles();

  tilemap.mesh.rotation.x += delta * 0.0001;
  tilemap.mesh.rotation.y += delta * 0.0002;

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

var renderer = new THREE.WebGLRenderer({antialias: true});
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