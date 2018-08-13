var map;
var menu;
var robot;
var viewer;
var terminal;

var canvasWidth = window.innerWidth - 5;
var canvasHeight = window.innerHeight - 5;

var input;

var textBoxText = [];

var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	robot = new Robot();
	viewer = new Viewer();
	map = new Map();
	menu = new Menu();
	terminal = new Terminal();
}

function draw() {
	viewer.update();
	robot.update();
	map.update();
	menu.update();
	terminal.update();
}

function keyPressed () {
	terminal.handleKeyPressed();
}
