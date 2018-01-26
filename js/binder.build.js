//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var mesh1,
	mesh2,
	mesh3,
	mesh4;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotationSpeed = 0.001;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'album_container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 32;

	var cameraControls;

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 32;
	cameraControls.minDistance = 32;
	cameraControls.update();

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	var light1 = new THREE.PointLight( 0xffffff, 1, 300 );
	light1.position.set( 0, 0, 80 );
	scene.add( light1 );

	var light2 = new THREE.PointLight( 0xffffff, 1, 300 );
	light2.position.set( 80, 0, 0 );
	scene.add( light2 );

	var light3 = new THREE.PointLight( 0xffffff, 1, 300 );
	light3.position.set( -80, 0, 0 );
	scene.add( light3 );

	var light4 = new THREE.PointLight( 0xffffff, 1, 300 );
	light4.position.set( 0, 0, -80 );
	scene.add( light4 );

	var light5 = new THREE.PointLight( 0xffffff, 1, 300 );
	light5.position.set( 0, 80, 0 );
	scene.add( light5 );

	var light6 = new THREE.PointLight( 0xffffff, 1, 300 );
	light6.position.set( 0, -80, 0 );
	scene.add( light6 );

	// adding main shapes

	// LOAD TEXTURES //

	var coverTexture = new THREE.ImageUtils.loadTexture( 'img/cover.jpg' );

	var coverMaterial = new THREE.MeshPhongMaterial( { map: coverTexture, side:THREE.FrontSide } );

	var backTexture = new THREE.ImageUtils.loadTexture( 'img/back_cover.jpg' );

	var backMaterial = new THREE.MeshPhongMaterial( { map: backTexture, side:THREE.FrontSide } );
	 
	// BINDER //

	binderGroup = new THREE.Group();

	var geometry1 = new THREE.PlaneGeometry( 20, 20 );
	var binderFace1 = new THREE.Mesh( geometry1, coverMaterial );
	binderFace1.position.z = 0.75;
	binderGroup.add( binderFace1 );

	var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
	var binderFace2 = new THREE.Mesh( geometry1, backMaterial );
	binderFace2.position.z = -0.75;
	binderFace2.rotation.y = 3.14;
	binderGroup.add( binderFace2 );

	var geometry3 = new THREE.BoxGeometry( .5, 20, 1.4 );
	var spine = new THREE.Mesh( geometry3, material );
	spine.position.x = -9.75;
	spine.position.z = 0;
	binderGroup.add( spine );


	// var sideMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );

	var opening = new THREE.Mesh( geometry3, material );
	opening.position.x = 9.75;
	opening.position.z = 0;
	binderGroup.add( opening );

	var geometry4 = new THREE.BoxGeometry( 20, 0.5,  1.4);
	var top = new THREE.Mesh( geometry4, material );
	top.position.y = 9.75;
	top.position.z = 0;
	binderGroup.add( top );

	var bottom = new THREE.Mesh( geometry4, material );
	bottom.position.y = -9.75;
	bottom.position.z = 0;
	binderGroup.add( bottom );


	scene.add (binderGroup);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {
	binderGroup.rotation.y += .005;
	renderer.render(scene, camera);
};