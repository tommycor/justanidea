/**
 *
 * Easing transtion values
 *
 * @param	string  	type 		Type of easing. See switch to get easings type
 * @param	duration  	float 		Duration of the easing
 * @param	start   	float 		Value to start easing
 * @param	end 		float 		Value to end easing 
 * @param	callback 	function 	Callback function for when easing ends
 *
 */

import Component from '../Component';

module.exports = class Easing extends Component {
	onInit( args ) {
		this.type 		= args.type != void 0 ? args.type : false;
		this.duration 	= args.duration != void 0 ? args.duration : false;
		this.start 		= args.start != void 0 ? args.start : false;
		this.end 		= args.end != void 0 ? args.end : false;
		this.callback 	= args.callback != void 0 ? args.callback : false;

		if( this.duration === false ) { console.warn( 'Easing needs duration argument' ); return;}
		if( this.start === false ) { console.warn( 'Easing needs start argument' ); return;}
		if( this.end === false ) { console.warn( 'Easing needs end argument' ); return;}

		this.time 		= 0;
		this.value		= 0;
		this.isActive 	= false;
		this.delta 		= this.end - this.start;
	}

	onUpdate( delta ) {
		this.time += delta;

		let t = this.time / this.duration;
		let Limit = t;

		this.value = 0;

		switch (this.type) {
			case 'linear':
				t = t;
				break;
			case 'easeInQuad':
				t = t*t;
				break;
			case 'easeOutQuad':
				t = t*(2-t);
				break;
			case 'easeInOutQuad':
				t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
				break;
			case 'easeInCubic':
				t = t*t*t;
				break;
			case 'easeOutCubic':
				t = (--t)*t*t+1;
				break;
			case 'easeInOutCubic':
				t = t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
				break;
			case 'easeInQuart':
				t = t*t*t*t;
				break;
			case 'easeOutQuart':
				t = 1-(--t)*t*t*t;
				break;
			case 'easeInOutQuart':
				t = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
				break;
			case 'easeInQuint':
				t = t*t*t*t*t;
				break;
			case 'easeOutQuint':
				t = 1+(--t)*t*t*t*t;
				break;
			case 'easeInOutQuint':
				t = (t<.5) ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;
				break;
			default:
				t = t;
		}

		this.value = this.start + t * this.delta;

		if( Limit >= 1 ) {
			this.isActive = false;
		}
	}

	onDesactivate() {
		if( this.callback ) {
			this.callback();
		}
	}
}