/**
 *
 * Get position of an element in the whole page
 *
 * @param	DOM 	element Element to retrieve offset from
 *
 * @return  object 	object with top, left, right and bottom object's offset
 *
 */

function getAbsoluteOffset( element ) {
	var bodyRect = document.body.getBoundingClientRect(),
		elemRect = element.getBoundingClientRect();

	return {
		top: elemRect.top - bodyRect.top,
		left: elemRect.left - bodyRect.left,
		bottom: elemRect.bottom - bodyRect.bottom,
		right: elemRect.right - bodyRect.right,
	};
}

module.exports = getAbsoluteOffset;