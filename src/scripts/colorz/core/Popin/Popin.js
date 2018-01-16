import Component from '../../Component';

module.exports = class Popin extends Component {
	onInit() {
		this.onOpen 			= this.onOpen.bind( this );
		this.open 				= this.open.bind( this );
		this.onClose 			= this.onClose.bind( this );
		this.close 				= this.close.bind( this );
		this.stopPropagation 	= this.stopPropagation.bind( this );
		this.remove 			= this.remove.bind( this );

		this.el 		= el;
		this.id 		= this.el.id;
		this.timeout 	= null;

		this.el.style.display = 'none';
		this.el.style.opacity = 0;

		this.btnOpen		= document.querySelectorAll('.js-popin-open[data-popin="' + this.id + '"]');
		this.btnClose 		= this.el.querySelectorAll('.js-popin-close');
		this.background 	= this.el.querySelector('.js-popin-bg');

		if( this.btnOpen != void 0 && this.btnOpen.length != 0 ) {
			for( var i = 0 ; i < this.btnOpen.length ; i++ ) {
				this.btnOpen[i].addEventListener('click', this.onOpen );
			}
		}

		if( this.btnClose != void 0 && this.btnClose.length != 0 ) {
			for( var i = 0 ; i < this.btnClose.length ; i++ ) {
				this.btnClose[i].addEventListener('click', this.onClose );
			}
		}
	}

	onOpen() {
		PopinManager.openPopin( this );
	}

	open() {
		this.el.style.display = 'block';

		var that = this;

		clearTimeout( this.timeout );

		requestAnimationFrame( function() {
			that.el.style.opacity = 1;
			that.el.addEventListener('click', that.stopPropagation );
			if( that.background != void 0 ) {
				that.background.addEventListener('click', that.onClose );
			}
			else {
				window.addEventListener('click', that.onClose );
			}
		});
	}

	onClose() {
		PopinManager.closePopin();
	}

	close() {
		this.el.style.opacity = 0;

		this.el.removeEventListener('click', this.stopPropagation );

		if( this.background != void 0 ) {
			this.background.removeEventListener('click', this.onClose );
		}
		else {
			window.removeEventListener('click', this.onClose );
		}

		var that = this;

		this.timeout = setTimeout( function() {
			that.el.style.display = 'none';
		}, 700);
	}

	stopPropagation( event ) {
		event.stopPropagation();
		return;		
	}

	remove() {
		this.close();

		if( this.btnOpen != void 0 && this.btnOpen.length != 0 ) {
			for( var i = 0 ; i < this.btnOpen.length ; i++ ) {
				this.btnOpen[i].removeEventListener('click', this.onOpen );
			}
		}

		if( this.btnClose != void 0 && this.btnClose.length != 0 ) {
			for( var i = 0 ; i < this.btnClose.length ; i++ ) {
				this.btnClose[i].removeEventListener('click', this.onClose );
			}
		}
	}
}