function getData( el, name ) {
	if( el == void 0 ) { console.warn( 'DOM element must be declared' ); return; }

	let data = el.getAttribute('data-' + name);

	if( data === '' || data === void 0 || data === 'false' || data === false ) {
		data = false;
	}
	else if( data === 'true' ) {
		data = true;
	}

	return data;
}

module.exports = getData;