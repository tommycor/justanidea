
uniform vec2 uResolution;
uniform sampler2D uImage;
uniform sampler2D uDistortionMap;

void main(void) {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1. );

    gl_Position = projectionMatrix * mvPosition;
}