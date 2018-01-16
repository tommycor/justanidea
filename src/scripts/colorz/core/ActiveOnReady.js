import Component from '../Component';

module.exports = class ActiveOnReady extends Component {
	onInit( el ) {
		this.el = el;
	}

	onReady() {
		this.el.classList.add('is-loaded');

		setTimeout( ()=>{
			this.el.classList.add('is-active');
		}, 1000)
	}
}