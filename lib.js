'use strict';

function createCanvas(width, height, className, mountPoint) {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.className = className;
  document.querySelector(mountPoint).appendChild(canvas);
  return canvas;
}

function getVertexShaderFromTemplate(id) {
  return document.querySelector('script[data-id="' + id + '"][type="x-shader/x-vertex"]')
    .textContent;
}

function getFragmentShaderFromTemplate(id) {
  return document.querySelector('script[data-id="' + id + '"][type="x-shader/x-fragment"]')
    .textContent;
}

function loadImage(name, callback) {
  var image = new Image();
  image.onload = function () { callback(image); };
  image.src = name;
}