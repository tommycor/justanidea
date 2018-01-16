
varying vec3 vNormal;
varying vec3 vColor;

void main( void ) {
	gl_FragColor = vec4( vec3( vColor.x ) , vColor.z );
}