import * as THREE   from "three";

import device 		from '../colorz/utils/device';

function getIntersectionMouse(x, y, mesh, camera) {

    // On détecte la position de la souris
    var vector = new THREE.Vector3( ( x / device.width ) * 2 - 1, - ( y / device.height ) * 2 + 1, 0.5 );
    vector.unproject(camera);
    // On balance le raycaster en fonction de la souris
    var raycaster = new THREE.Raycaster(camera.position,vector.sub(camera.position).normalize() );
    // On regarde les intersections entre le plan locate (invisible et au niveau des cubes) et le raycaster
    var intersect = raycaster.intersectObject( mesh );

    return intersect;
}

module.exports = getIntersectionMouse;