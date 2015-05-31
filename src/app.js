'use strict';

// Format kicked out by http://apps.elias.media/Online-Tile-Map-Editor
function mapConvertor(m) {
  return m.map(function (t) {
    var s = t.toString();
    if (s.length === 1) {
      s = s + '.0';
    }
    var a = s.split('.');
    return parseInt(a[0]) + parseInt(a[1]) * tilesetNumOfCols;
  });
}

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

scene.add(new THREE.AmbientLight(0xffffff));
// var light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1, 1, 1);
// scene.add(light);

var axisHelper = new THREE.AxisHelper(50);
scene.add(axisHelper);

var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 800;

window.camera = camera;

var texture = THREE.ImageUtils.loadTexture('images/leds.png');

texture.wrapS = THREE.ClampToEdgeWrapping; // THREE.Repeat;
texture.wrapT = THREE.ClampToEdgeWrapping; // THREE.Repeat;

texture.magFilter = THREE.LinearFilter;             // THREE.NearestFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter; // THREE.NearestFilter;

var tilesetNumOfCols = 1024 / 32;

var tilemap = new Tilemap({
  tileSize: 16,
  numOfCols: 40,
  numOfRows: 20,
  tileset: {
    texture: texture,
    tileSize: 32,
    spacing: 0,
    width: 256,
    height: 1024,
    numOfCols: 256 / 32,
    numOfRows: 1024 / 32
  }
});

tilemap.fill(8 * 2 - 1);

// var plane = new THREE.PlaneGeometry(400, 1200, 1, 1);
// var mesh = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({color: 'red'}));
// mesh.position.z = -200;
// scene.add(mesh);

scene.add(tilemap.mesh);

window.tilemap = tilemap;

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

  // tilemap.mesh.position.z -= 1;

  // tilemap.mesh.rotation.x += delta * 0.0005;
  // tilemap.mesh.rotation.y += delta * 0.000;

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

var renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setPixelRatio(window.devicePixelRatio || 1);
// renderer.gammaInput = true;
// renderer.gammaOutput = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, false);

// var distance = 1000;
// var frustumHeight = 2.0 * distance * Math.tan(Math.PI * camera.fov / 180 * 0.5);
// console.log(frustumHeight);

renderer.domElement.addEventListener('mousedown', function () {
  running = !running;
  if (running) {
    before = Date.now();
    update();
  }
});

update();
