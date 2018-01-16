

varying vec3 vNormal;
varying vec3 vColor;

void main(void) {
	vColor = color;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1. );

    gl_Position = projectionMatrix * mvPosition;
}