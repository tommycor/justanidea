import BaseLifeCycle from './BaseLifeCycle';

class OnScroll extends BaseLifeCycle {
	constructor() {
		super( true );

		window.addEventListener('scroll', this.onEvent);
	}
}

module.exports = new OnScroll();