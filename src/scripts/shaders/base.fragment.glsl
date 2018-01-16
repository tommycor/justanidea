
uniform vec2 uResolution;
uniform sampler2D uImage;
uniform sampler2D uDistortionMap;

void main( void ) {
	vec2 uv  = gl_FragCoord.xy/uResolution;

	gl_FragColor = vec4( 1., .5, .5, 1. );
}