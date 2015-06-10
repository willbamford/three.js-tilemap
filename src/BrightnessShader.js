/**
 * Super Simple Brightness Shader
 * Adjust brightness of image with an 'amount' Uniform
 * @author felixturner / http://airtight.cc/
 */

THREE.BrightnessShader = {

	uniforms: {
		'tDiffuse': { type: 't', value: null },
		'amount': { type: 'f', value: 1.0 }
	},

	vertexShader: [
		'varying vec2 vUv;',
		'void main() {',
			'vUv = uv;',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}'

	].join('\n'),

	fragmentShader: [
		'uniform sampler2D tDiffuse;',
		'uniform float amount;',
		'varying vec2 vUv;',

		'void main() {',

			'vec4 color = texture2D(tDiffuse, vUv);',
			'gl_FragColor = color * amount;',

		'}'
	].join('\n')

};
