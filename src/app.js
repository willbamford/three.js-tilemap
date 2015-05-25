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

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.z = 1400;

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

var material = new THREE.PointCloudMaterial({size: 85, map: sprite, blending: THREE.AdditiveBlending, vertexColors: THREE.VertexColors, depthTest: false, transparent: true});
// material.color.setHSL(1.0, 1.0, 1.0);

var particles = new THREE.PointCloud(geometry, material);
scene.add(particles);


var lastNow;
var delta = 0;

function update() {

  requestAnimationFrame(update);

  stats.begin();

  now = Date.now();
  delta = lastNow ? now - lastNow : (1000 / 60);
  lastNow = now;

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