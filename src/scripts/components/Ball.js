import * as THREE 			from "three";

import Component from '../colorz/Component';

module.exports = class Ball extends Component {
	onInit( args ) {
		this.geometry 	= new THREE.SphereGeometry(1, 30, 30);
		this.material 	= new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			emissive: 0x333333,
			roughness: .1,
			metalness: .34,
			side: THREE.DoubleSide
		});
		this.mesh 				= new THREE.Mesh( this.geometry, this.material );
		this.mesh.castShadow 	= true;

		this.mesh.position.set( Math.random() * args.width - args.width * .5,  Math.random() * args.height - args.height * .5, args.depth );
	}
}