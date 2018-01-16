/**
 *
 * Get position of an element in its parent
 *
 * @param	DOM 	element Element to retrieve offset from
 *
 * @return  object 	object with top, left, right and bottom object's offset
 *
 */

function getRelativeOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

module.exports = getRelativeOffset;