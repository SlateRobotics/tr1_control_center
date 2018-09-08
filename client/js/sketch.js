var map;
var menu;
var robot;
var viewer;
var dropDownMenu;
var terminal;

var joint_states = {name: [], position: [], velocity: [], effort: []};

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
	dropDownMenu = new DropDownMenu();
	map = new Map();
	menu = new Menu();
	terminal = new Terminal();

  var socket = io('http://localhost:8080');
  socket.on('joint_states', function (data) {
    joint_states = data;
  });
}

function draw() {
	viewer.update();
	robot.update();
	map.update();
	menu.update();
	terminal.update();
	dropDownMenu.step();
}

function keyPressed () {
	terminal.handleKeyPressed();
}

function mousePressed (e) {
	dropDownMenu.handleMousePressed(e);
}

function mouseMove (e) {
	console.log(e)
}
