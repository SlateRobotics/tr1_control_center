var map;
var menu;
var robot;
var viewer;

var canvasWidth = window.innerWidth - 5;
var canvasHeight = window.innerHeight - 5;

var input;
var buttonFunction;
var buttonSettings;

var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	input = createInput();
	input.position(20, canvasHeight- 50);
	input.size(500, 20);
	input.style('background-color', 'rgba(255,255,255,0.7)');
	input.style('border', '1px solid #222');

	buttonFunction = createButton('f(x)');
	buttonFunction.mousePressed(buttonFunctionPressed);
	buttonFunction.position(canvasWidth - 60, canvasHeight - 60 - 40);
	buttonFunction.size(40, 40);
	buttonFunction.style('background-color', 'rgba(255,255,255,0.7)');
	buttonFunction.style('border', '1px solid #222');

	buttonSettings = createButton('⚙');
	buttonSettings.mousePressed(buttonFunctionPressed);
	buttonSettings.position(canvasWidth - 60, canvasHeight - 60);
	buttonSettings.size(40, 40);
	buttonSettings.style('background-color', 'rgba(255,255,255,0.7)');
	buttonSettings.style('border', '1px solid #222');

	robot = new Robot();
	viewer = new Viewer();
	map = new Map();
}

function draw() {
	handleControls();

	viewer.update();
	robot.update();
	map.update();

	displayState();
}

function getControlDrive() {
	var direction = robot.state.direction;

	if (keys[LEFT_ARROW]) {
		direction.x = 1;
	} else if (keys[RIGHT_ARROW]) {
		direction.x = -1;
	} else {
		direction.x = 0;
	}

	if (keys[DOWN_ARROW]) {
		direction.y = -1;
	} else if (keys[UP_ARROW]) {
		direction.y = 1;
	} else {
		direction.y = 0;
	}

	if (keys[32]) { // space bar
		direction = {x: 0, y: 0, w: 0};
	}

	return direction;
}

function getControlLook() {
	var a = 65;
	var w = 87;
	var s = 83;
	var d = 68;
	var look = robot.state.look;

	if (keys[a]) {
		look.pan = 0.9;
	} else if (keys[d]) {
		look.pan = -0.9;
	} else {
		look.pan = 0;
	}

	if (keys[s]) {
		look.tilt = -0.9;
	} else if (keys[w]) {
		look.tilt = 0.9;
	} else {
		look.tilt = 0;
	}

	if (keys[32]) { // space bar
		look = {pan: 0, tilt: 0};
	}

	return look;
}

function handleControls() {
	robot.state.look = getControlLook();
	robot.state.direction = getControlDrive();
}

function displayState() {
	var textBoxText = robot.getState();
	push();
	fill(255);
	text(textBoxText, 20, canvasHeight - 260, 500, 200);
	pop();
	push();
	noFill();
	stroke(100, 100, 100);
	rect(20, canvasHeight - 260, 500, 200);
	pop();
}

function buttonFunctionPressed () {

}
