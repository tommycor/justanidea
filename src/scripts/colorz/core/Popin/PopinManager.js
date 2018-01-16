import Component 	from '../../Component';
import Popin 		from './Popin';

module.exports = class PopinManager extends Component {
	onInit() {
		this.refresh 		= this.refresh.bind( this );
		this.getPopinById 	= this.getPopinById.bind( this );

		this.popins = new Array();
		this.currentPopin = null;
	}

	onReady() {
		this.refresh();
	}

	register( popin ) {
		for( var i = 0 ; i < popins.length ; i++ ) {
			var newPopin 	= popins[i];
			var isDefined 	= false;

			for( var j = 0 ; j < this.popins.length ; j++ ) {
				var oldPopin = this.popins[j];

				if( newPopin.id == oldPopin.id ) {
					isDefined = true;
					break;
				}
			}

			if( !isDefined ) {
				this.popins.push( new Popin ( popins[i] ) );
			}
		}
	}

	openPopin( popin ) {
		if( this.currentPopin != null ) {
			this.currentPopin.close();
		}

		this.currentPopin = popin;

		this.currentPopin.open();
	}

	closePopin( popin ) {
		if( this.currentPopin != null ) {
			this.currentPopin.close();
		}

		this.currentPopin = null;
	}

	refresh() {
		for( var i = 0 ; i < this.popins.length ; i++ ) {
			this.popins[i].remove();
		}

		var itemsEl = document.querySelectorAll('.js-popin');

		if( itemsEl === void 0 || !itemsEl.length ) { return; }

		this.register( itemsEl );
	}

	getPopinById( id ) {
		for( var i = 0 ; i < this.popins.length ; i++ ) {
			if( this.popins[i].id == id ) {
				return this.popins[i];
			}
		}

		return null;
	}
};