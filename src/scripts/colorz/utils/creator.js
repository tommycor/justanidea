/**
 *
 * Initialize Class from selector
 *
 * @param	string  selector css selector to get bojects
 * @param	Class  	Class 	Class to initialize
 * @param	args   	Object 	(optionnal) args to send to constructor
 * @param	DOM 	ctx 	(optionnal) root DOM element to look for items
 *
 * @return  array 	Initialized objects
 *
 */

function creator( selector, Class, args, ctx ) {
	selector 	= selector != void 0 ? selector : false;
	Class 		= Class != void 0 ? Class : false;

	if( !selector || !Class ) { return; }


	args 		= args != void 0 ? args : false;
	ctx 		= ctx != void 0 ? ctx : false;
	let itemsEl	= null;
	let items 	= new Array();


	if( !ctx ) {
		itemsEl = document.querySelectorAll( selector );
	}
	else {
		itemsEl = ctx.querySelectorAll( selector );
	}

	for( let i = 0 ; i < itemsEl.length ; i++ ) {
		if( !args ) {
			items.push( new Class( itemsEl[i] ) );
		}
		else {
			items.push( new Class( itemsEl[i], args ) );
		}
	}

	return items;
}

module.exports = creator;