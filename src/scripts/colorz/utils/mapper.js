/**
 *
 * Translate value from a scale ton another
 *
 * @param	float 	val 	Original value
 * @param	float 	oMin 	Original minimum
 * @param	float 	oMax 	Original maximum
 * @param	float 	nMin 	Final minimum
 * @param	float 	nMax 	Final maximum
 *
 * @return  float 	Scaled value	
 *
 */

module.exports = function mapper(val, oMin, oMax, nMin, nMax) {
	var val = val - oMin;
	var oMax = oMax - oMin;
	var nMax = nMax - nMin;
	var res = ( ( val * nMax ) / oMax ) + nMin;

	return res;
}