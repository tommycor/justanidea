#define nbr 4

uniform vec2 uResolution;
uniform float uTime;


vec3 gradients[nbr];
vec3 currentGradient[nbr];
vec2 uv;
float fractal;
vec3 rgb;
float currentIndex;
float step;

vec3 getGradient(int id) {
    for (int i = 0 ; i < 4 ; i++ ) {
        if (i == id) return gradients[i];
    }
}

void main( void ) {
	uv   = gl_FragCoord.xy/uResolution;

	step = 1. / float( nbr );
	
	currentIndex = floor( uTime );
	fractal = fract( uTime );

	gradients[0]	= vec3( .70, .93, .70 );   // .0
	gradients[1]	= vec3(	.68, .89, .97 );   // .33
	gradients[2]	= vec3( .95, .82, .91 );   // .66
	gradients[3]	= vec3( .94, .71, .81 );   // 1.

	currentGradient[0] = mix( getGradient( int( mod( 0. + currentIndex, 4. ) ) ), getGradient( int( mod( 1. + currentIndex, 4. ) ) ), fractal );
	currentGradient[1] = mix( getGradient( int( mod( 1. + currentIndex, 4. ) ) ), getGradient( int( mod( 2. + currentIndex, 4. ) ) ), fractal );
	currentGradient[2] = mix( getGradient( int( mod( 2. + currentIndex, 4. ) ) ), getGradient( int( mod( 3. + currentIndex, 4. ) ) ), fractal );
	currentGradient[3] = mix( getGradient( int( mod( 3. + currentIndex, 4. ) ) ), getGradient( int( mod( 0. + currentIndex, 4. ) ) ), fractal );

	for( int i = 0 ; i < nbr ; i++ ) {
		float currentStep = float(i) * step;

		if( uv.x >= currentStep && uv.x < step * ( float( i + 1 ) ) ) {
			if( i == nbr - 1 ) {
				rgb = vec3( mix( currentGradient[ i ], currentGradient[ 0 ], (uv.x - currentStep) * float( nbr ) ) );
			}
			else {
				rgb = vec3( mix( currentGradient[ i ], currentGradient[ i+1 ], (uv.x - currentStep) * float( nbr ) ) );
			}
		}
	}

	gl_FragColor = vec4( rgb, 1. );
}