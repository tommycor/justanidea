import BaseLifeCycle from './BaseLifeCycle';

class OnResize extends BaseLifeCycle {

	constructor() {
		super( true );

		window.addEventListener('resize', this.onEvent);
	}
}

module.exports = new OnResize();