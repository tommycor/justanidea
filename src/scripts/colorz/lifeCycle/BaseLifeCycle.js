module.exports = class BaseLifeCycle {

	constructor( isSingleEvent ) {
		this.singleEvent 	= isSingleEvent == void 0 ? true : isSingleEvent;

		this.onEvent 		= this.onEvent.bind( this );
		this.register 		= this.register.bind( this );
		this.unRegister 	= this.unRegister.bind( this );

		this.event 			= null;
		this.callbacks		= new Array();
	}

	register( callback ) {
		if( typeof callback != 'function' ) { console.warn(callback + ' is not a function on ' + this.constructor.name + '.register'); return; }

		if( this.event !== null && this.singleEvent ) {
			callback( this.event );
		}

		return this.callbacks.push({
			isActive: true,
			callback: callback
		});
	}

	unRegister( id ) {
		if( this.callbacks[id] == void 0 ) { console.warn(callback + ' id does not exists on ' + this.constructor.name + '.unregister'); return; }

		this.callbacks[id].isActive = false;
	}

	onEvent( event ) {
		this.callCallbacks( event );

		this.event = event;

		return;
	}

	callCallbacks( event ) {
		for( let i = 0 ; i < this.callbacks.length ; i++ ) {
			if( this.callbacks[i].isActive ) {
				this.callbacks[i].callback( event );
			}
		}
	}
}