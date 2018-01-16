/**
 *
 * Custom javascript to style element for prefiexd style properties
 *
 * @param	DOM 	el 		El on wich style must be applied
 * @param	value 	string 	property value
 *
 */

class Stylizer {
	transform( el, value ) {
		el.style.webkitTransform = value;
		el.style.MozTransform = value;
		el.style.msTransform = value;
		el.style.oTransform = value;
	}

	transformOrigin( el, value ) {
		el.style.webkitTransformOrigin = value;
		el.style.mozTransformOrigin = value;
		el.style.msTransformOrigin = value;
		el.style.oTransformOrigin = value;
	}
}

module.exports = new Stylizer();