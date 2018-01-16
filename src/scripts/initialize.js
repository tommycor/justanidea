import creator 			from './colorz/utils/creator';

import ActiveOnReady 	from './colorz/core/ActiveOnReady';

import Scene 			from './components/Scene';

window.scenes 	= creator( '#canvas-wrapper', Scene );
window.actives 	= creator( '.js-active-on-ready', ActiveOnReady );