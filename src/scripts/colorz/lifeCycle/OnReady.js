import BaseLifeCycle from './BaseLifeCycle';

class OnReady extends BaseLifeCycle {

	constructor() {
		super( true );

		window.addEventListener('DOMContentLoaded', this.onEvent);
	}
}

module.exports = new OnReady();