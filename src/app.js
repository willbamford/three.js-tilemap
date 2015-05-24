function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  return stats;
}

var stats = initStats();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

// var geometry = new THREE.BoxGeometry(200, 200, 200);
// var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

var geometry = new THREE.PlaneGeometry(1000, 1000, 2, 2);
var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide, wireframe: true});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);

window.plane = plane;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function update() {

  requestAnimationFrame(update);

  stats.begin();

  plane.rotation.x += 0.001;
  plane.rotation.y += 0.002;

  renderer.render(scene, camera);

  stats.end();
}

update();