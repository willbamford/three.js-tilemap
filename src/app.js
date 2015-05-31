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

var texture = THREE.ImageUtils.loadTexture('images/tileset1-spaced.png');

texture.wrapS = THREE.ClampToEdgeWrapping; // THREE.Repeat;
texture.wrapT = THREE.ClampToEdgeWrapping; // THREE.Repeat;

texture.magFilter = THREE.LinearFilter;             // THREE.NearestFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter; // THREE.NearestFilter;

var tilesetNumOfCols = 192 / 24;

var tilemap = new Tilemap({
  tileSize: 32,
  numOfCols: 768 / 24,
  numOfRows: 600 / 24,
  tileset: {
    texture: texture,
    tileSize: 24,
    spacing: 1,
    width: 256,
    height: 256,
    numOfCols: 8,
    numOfRows: 8
  }
});

var map = [1.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.3,6.4,6.4,6.4,6.4,1.3,0,6,0,0,0,0,0,0,6,0,0,0,0,0,2.3,6.4,6.4,6.4,2.3,4.3,4.3,4.3,4.3,4.3,0,0,1.3,1.3,5.4,5.4,1.3,1.3,0,0,0,0,2.1,3.1,3.1,3.1,3.1,4.1,0,0,0,0,2.3,5.4,5.4,5.4,2.3,0,0,0,0,0,0,0,0,1.3,1.3,1.3,1.3,0,0,0,0,0,5.1,5.1,5.1,5.1,5.1,5.1,0,6,0,0,2.3,5.4,5.4,5.4,2.3,0,0,0,0,0,0,0,0,7.7,0,1.3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.3,2.3,2.3,2.3,2.3,0,0,6,0,0,0,0,0,7.7,0,1.3,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7.7,6,1.3,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,7.7,0,1.3,4,0,6.1,2.2,0.2,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,4,0,7.7,0,1.3,5.2,5.7,1.7,1.7,6.7,0,0,6.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,7.1,7.1,0,4,0,7.7,0,1.3,1.3,2.6,3.6,3.6,4.6,0,0,6.2,0,0,0,0,0,0,0,0,0,2.1,3.1,3.1,4.1,0,0,0.3,0.3,0.3,0,0.2,0,7.7,6,0,0,2.6,1.4,3.6,4.6,0,0,6.2,0,0,4,0,0,0,0,0,0,5.1,5.1,5.1,5.1,0,0,0,1.6,0,0,0,0,7.7,0,0,0,2.6,3.6,2.4,4.6,0,0,6.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1.6,0,0,0,0,7.7,4.3,4.3,4.3,2.6,3.6,1.4,4.6,0.1,0,6.2,0,0,3.2,3.2,4.2,4.2,0,0,0,0,0,0,0,0,0,0,1.6,0,0,4,0.2,7.7,0,6,0,2.6,2.4,3.6,4.6,7.2,7.2,7.2,0,0,3.2,1.2,7.1,4.2,0,5.2,5.2,0,0,0,0,0,0,0,1.6,0,0,0,0,7.7,0,0,0,2.6,1.4,3.6,4.6,1.5,1.5,1.5,0,3.7,6.6,6.6,6.6,6.6,6.6,6.6,6.6,4.7,0,0,0,0,0,0,1.6,0,0.2,0,0,7.7,0,0,0,2.6,3.6,2.4,4.6,0,4,0,0,5.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,7.5,0,0,1.2,0,1.2,0,1.6,6,0,0,0,7.7,4,0,0,2.6,3.6,1.4,4.6,6.6,4.7,0,0,5.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,7.5,0.6,0.6,0.6,0.6,0.6,0.6,1.6,0,0.5,0.5,0.5,0.4,0,0,0,2.6,2.4,3.6,4.6,6.5,7.5,4,0,5.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,7.5,0,0,0,0,0,0,1.6,0,7.4,7.4,7.4,0.4,0,4,0,2.6,1.4,3.6,4.6,6.5,7.5,0,0,5.5,6.5,6.5,6.5,6.5,6.5,6.5,6.5,7.5,0,0,0,0,0,0,1.6,0,7.4,7.4,7.4,0.4,0,0,0,2.6,3.6,3.6,4.6,6.5,7.5,0,0,5.5,0.3,1.4,0.3,6.5,6.5,6.5,6.5,7.5,0,0,0,0,0,0,1.6,3,7.4,7.4,7.4,0.4,7,7,7,2.6,3.6,3.6,4.6,6.5,7.5,1.2,1.1,5.5,0.3,0.3,0.3,6.5,6.5,6.5,6.5,7.5,1.1,1.1,1.1,6.1,0.1,2,1.6,1,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,6.6];
map = mapConvertor(map);

tilemap.setMap(map);

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


var distance = 1000;
var frustumHeight = 2.0 * distance * Math.tan(Math.PI * camera.fov / 180 * 0.5);
console.log(frustumHeight);

renderer.domElement.addEventListener('mousedown', function () {
  running = !running;
  if (running) {
    before = Date.now();
    update();
  }
});

update();
