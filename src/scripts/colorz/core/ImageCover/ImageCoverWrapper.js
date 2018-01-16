import Component 	from '../../Component';

import creator 		from '../../utils/creator';
import ImageCover 	from './ImageCover';

module.exports = class ImageCoverWrapper extends Component {

	onInit( el ) {
		this.el = el;
		this.images = creator( '.js-image-cover', ImageCover, this, this.el );
	}

	onReady() {
		this.onResize();
	}

	onResize() {
		this.width = this.el.offsetWidth;
		this.height = this.el.offsetHeight;
		this.ratio  = this.width / this.height;
	}

}