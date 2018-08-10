var map;
var menu;
var robot;
var viewer;

var canvasWidth = window.innerWidth - 5;
var canvasHeight = window.innerHeight - 5;

var input;
var buttonFunction;
var buttonSettings;

var textBoxText = [];

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
	input.elt.onfocus = function (e) { input.isfocused = true; }
	input.elt.onblur = function (e) { input.isfocused = false; }

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

	displayTextBox();
}

function getControlDrive() {
	var KEY_Z = 90;
	var KEY_X = 88;

	var direction = robot.state.direction;

	if (keys[SHIFT]) {
		if (keys[LEFT_ARROW]) {
			direction.w = 1;
			direction.x = 0;
		} else if (keys[RIGHT_ARROW]) {
			direction.w = -1;
			direction.x = 0;
		} else {
			direction.w = 0;
			direction.x = 0;
		}
	} else {
		if (keys[LEFT_ARROW]) {
			direction.x = 1;
			direction.w = 0;
		} else if (keys[RIGHT_ARROW]) {
			direction.x = -1;
			direction.w = 0;
		} else {
			direction.x = 0;
			direction.w = 0;
		}
	}

	if (keys[DOWN_ARROW]) {
		direction.y = -1;
	} else if (keys[UP_ARROW]) {
		direction.y = 1;
	} else {
		direction.y = 0;
	}

	if (keys[KEY_Z] && !keys[KEY_X]) {
		direction.x *= 0.75;
		direction.y *= 0.75;
		direction.w *= 0.75;
	} else if (keys[KEY_Z] && keys[KEY_X]) {
		direction.x *= 0.50;
		direction.y *= 0.50;
		direction.w *= 0.50;
	}

	if (keys[32] || input.isfocused == true) { // space bar
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
		map.state.viewAngle -= 0.005;
	} else if (keys[d]) {
		look.pan = -0.9;
		map.state.viewAngle += 0.005;
	} else {
		look.pan = 0;
	}

	if (keys[s]) {
		look.tilt = -0.9;
	} else if (keys[w]) {
		look.tilt = 0.3;
	} else {
		look.tilt = 0;
	}

	if (keys[32] || input.isfocused == true) { // space bar
		look = {pan: 0, tilt: 0};
	}

	if (keys[SHIFT]) {
		look.pan *= 0.75;
		look.tilt *= 0.75;
	}

	return look;
}

function handleControls() {
	robot.state.look = getControlLook();
	robot.state.direction = getControlDrive();
}

function displayTextBox() {
	var textBoxHeight = 12;
	var t = "";

	var startIndex = 0;
	if (textBoxText.length > textBoxHeight) {
		startIndex = textBoxText.length - textBoxHeight - 1;
	} else if (textBoxText.length <= textBoxHeight) {
		for (var i = 0; i < textBoxHeight - textBoxText.length + 1; i++) {
			t += "\n";
		}
	}

	for (var i = startIndex; i < textBoxText.length; i++) {
		t += textBoxText[i] + "\n";
	}

	push();
	fill(255);
	text(t, 20, canvasHeight - 260, 500, 200);
	pop();
	push();
	noFill();
	stroke(100, 100, 100);
	rect(20, canvasHeight - 260, 500, 200);
	pop();
}

function keyPressed () {
	var ENTER_KEY = 13;
	if (input.isfocused) {
		if (keyCode == ENTER_KEY) {
			var error = "";
			var command = input.value();

			var inputFunction = {};
			for (var i = 0; i < functions.length; i++) {
				if (command.startsWith(functions[i].name)) {
					inputFunction = functions[i];
				}
			}

			if (inputFunction.name) {
				var data = command.replace(inputFunction.name, '');
				data = data.replace('(','');
				data = data.replace(')','');
				data = data.split(',');
				
				if (data.length != inputFunction.arguments.length) {
					error += 'Invalid number of arguments: ' + data.length + '. Requires ' + inputFunction.arguments.length;;
				} else {
					var data2 = {};
					for (var i = 0; i < inputFunction.arguments.length; i++) {
						if (inputFunction.arguments[i] == "number") {
							data2[inputFunction.argumentNames[i]] = Number(data[i]);
						} else {
							data2[inputFunction.argumentNames[i]] = data[i];
						}
					}

					textBoxText.push(" > " + command);

					$.ajax({
						url: inputFunction.url,
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(data2),
						dataType: 'json',
						success: function (data) {
							if (data.message) {
								textBoxText.push(data.message);
							}
						}.bind(this)
					});
					input.value('');
				}
			} else {
				error += 'Function matching command ' + command + ' not found. ';
			}

			if (error) alert(error);

		}
	}
}

function buttonFunctionPressed () {

}
