import * as THREE 			from "three";
import SimplexNoise 		from 'simplex-noise';

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';
import getAbsoluteOffset 	from '../colorz/utils/getAbsoluteOffset';
import webglAvailable 		from '../colorz/utils/webglAvailable';

import getIntersectionMouse from '../utils/getIntersectionMouse';

import Ball 				from './Ball';

module.exports = class Scene extends Component {
	onInit( el ) {
		this.onPointermove 			= this.onPointermove.bind( this );

		this.el 				= el;
		this.mousePosX 			= 0;
		this.currentMousePosX 	= 0;
		this.time 				= 0;
		this.mouvX 				= Math.random() < .5 ? -1 : 1;
		this.mouvY 				= Math.random() < .5 ? -1 : 1;
		this.pNoise 			= new SimplexNoise();
		this.nbrBounce 			= 0;
		this.noiseHeight		= 0;
		this.noiseTime			= 0;

		this.heightBounce 		= 12;
		this.speedBounce 		= 0.001;
		this.period 			= 1;
		this.speed 				= .28;
		this.isWebGLAvailable 	= webglAvailable();

	}

	onReady() {

		if( !this.isWebGLAvailable ) {
			this.isActive = false;
			return;
		}

		this.canvas  = document.createElement( 'canvas' );
		this.context = this.canvas.getContext('2d');

		this.scene 	   			= new THREE.Scene();
		this.camera 		   	= new THREE.PerspectiveCamera(30, this.ratio, 10, 300);
		this.camera.position.x 	= 0;
		this.camera.position.y 	= 0;
		this.camera.position.z 	= 130;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setClearColor(0x1d5ea8);
		this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
		this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMapSoft 	= true;

		this.onResize();

		// this.axisHelper =  new THREE.AxesHelper( 5 );
		// this.scene.add( this.axisHelper );

		this.ambient = new THREE.AmbientLight( 0xffffff );
		this.scene.add( this.ambient );

		this.spotLight = new THREE.SpotLight( 0xffffff, 1, 1000, Math.PI/3, 0, 4 );
		this.spotLight.position.set( 0, this.heightViewMax, 100 );
		this.spotLight.castShadow = true;
		this.spotLight.shadow.camera.near = 10;
		this.spotLight.shadow.camera.far  = 1000;
		// this.spotLight.penumbra = .5;
		// this.spotLight.shadowCameraVisible = true;
		this.spotLight.shadow.mapSize.width 	= 2048;
		this.spotLight.shadow.mapSize.height 	= 2048;
		// this.spotLight.shadowDarkness = 0.5;
		this.scene.add( this.spotLight );

		this.ball = new Ball({
			height: this.heightView - 10,
			width: this.widthView - 10,
			depth: 0 
		});

		this.scene.add( this.ball.mesh );

		this.el.appendChild( this.renderer.domElement );
		this.el.addEventListener( device.pointermove, this.onPointermove );
	}

	onResize() {
		if( !this.isWebGLAvailable ) { return; }

		this.offset 	= getAbsoluteOffset( this.el );
		this.width 		= this.el.offsetWidth;
		this.height 	= this.el.offsetHeight;

		this.renderer.setSize(this.width, this.height);
		this.ratio = this.width / this.height;
		this.camera.aspect  = this.ratio;
		this.camera.updateProjectionMatrix();

		// var vFOV = THREE.Math.degToRad( camera.fov ); // convert vertical fov to radians
		// var height = 2 * Math.tan( vFOV / 2 ) * dist; // visible height
		// var width = height * camera.aspect;           // visible width

		let vFOV = THREE.Math.degToRad( this.camera.fov );

		this.heightViewMax 	= 2 * Math.tan( vFOV / 2 ) * this.camera.position.z;
		this.widthViewMax 	= this.heightViewMax * this.ratio;

		this.heightView 	= 2 * Math.tan( vFOV / 2 ) * ( this.camera.position.z - this.heightBounce );
		this.widthView 		= this.heightView * this.ratio;

		this.minX 			= this.widthView * -.5;
		this.maxX 			= this.widthView * .5;
		this.minY 			= this.heightView * -.5;
		this.maxY 			= this.heightView * .5;

		this.scene.remove( this.plane );
		this.createPlane();
	}

	createPlane() {
		this.planeGeometry 	= new THREE.PlaneGeometry( this.widthViewMax, this.heightViewMax, 32 );
		this.planeMaterial 	= new THREE.MeshPhongMaterial( {
			color: 0x0c4587,
			side: THREE.DoubleSide,
			shininess: 10,
			emissive: 0x00000,
			specular: 0x00000
		});
		this.plane 			= new THREE.Mesh( this.planeGeometry, this.planeMaterial );
		this.plane.receiveShadow = true;
		this.scene.add( this.plane );
	}

	onPointermove( event ) {
		let mousePosX  = event.clientX;
		let mousePosY  = event.clientY - ( this.offset.top - device.scroll.top );

		let intersection = getIntersectionMouse( mousePosX, mousePosY, this.plane, this.camera );

		if( !intersection.length ) { return; }

		this.mousePosX = intersection[0].point.x;
	}

	onUpdate( delta ) {
		if( this.ball == void 0 ) { return; }
		this.time += delta * this.speedBounce * ( 1 + this.noiseTime );

		let z = Math.cos( this.time * ( 10 * this.period / Math.PI ) );
		z *= this.heightBounce;
		z *= 1 + this.noiseHeight;
		z  = Math.abs( z ) + .7;

		if( z < 1 ) {
			this.nbrBounce++;
			this.noiseHeight = this.pNoise.noise2D( 0, this.nbrBounce) * .5;
			this.noiseTime = this.pNoise.noise2D( 1, this.nbrBounce) * .3;
		}

		this.ball.mesh.position.setZ( z );

		this.movementXY();

		this.currentMousePosX += ( this.mousePosX - this.currentMousePosX ) * .02;
		this.spotLight.position.set( this.currentMousePosX, this.heightViewMax, 100 );

		this.renderer.render(this.scene, this.camera);
	}

	movementXY() {
		if( this.ball.mesh.position.x + this.mouvX * this.speed >= this.maxX ) {
			this.mouvX = -1;
		}
		else if( this.ball.mesh.position.x + this.mouvX * this.speed <= this.minX ) {
			this.mouvX = 1;	
		}
		if( this.ball.mesh.position.y + this.mouvY * this.speed >= this.maxY ) {
			this.mouvY = -1;
		}
		else if( this.ball.mesh.position.y + this.mouvY * this.speed <= this.minY ) {
			this.mouvY = 1;	
		}


		let x = this.ball.mesh.position.x + this.mouvX * this.speed;
		let y = this.ball.mesh.position.y + this.mouvY * this.speed;
		this.ball.mesh.position.setX( x );
		this.ball.mesh.position.setY( y );
	}
}