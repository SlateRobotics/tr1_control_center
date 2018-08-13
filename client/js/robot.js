var $ = jQuery;

function Robot () {
	this.state = {
		previousLook: {pan: 0, tilt: 0},
		look: {pan: 0, tilt: 0},
		previousDirection: {x: 0, y: 0, w: 0},
		direction: {x: 0, y: 0, w: 0},
		joints: {}
	}

	this.look = function (pan, tilt) {
		this.state.look.pan = pan;
		this.state.look.tilt = tilt;

		var look = this.state.look;
		var plook = this.state.previousLook;

		if (look.pan == plook.pan && look.tilt == plook.tilt) {
			return;
		} else {
			this.state.previousLook.pan = this.state.look.pan;
			this.state.previousLook.tilt = this.state.look.tilt;

			$.ajax({
				url: '/command/look',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(this.state.look),
				dataType: 'json',
				success: function (data) {
					this.state.joints = data.joints;
				}.bind(this)
			});
		}
	}

	this.drive = function (x, y, w) {
		this.state.direction.x = x;
		this.state.direction.y = y;
		this.state.direction.w = w;

		var dir = this.state.direction;
		var pdir = this.state.previousDirection;

		if (dir.x == pdir.x && dir.y == pdir.y && dir.w == pdir.w) {
			return;
		} else {
			this.state.previousDirection.x = this.state.direction.x;
			this.state.previousDirection.y = this.state.direction.y;
			this.state.previousDirection.w = this.state.direction.w;

			$.ajax({
				url: '/command/drive',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(this.state.direction),
				dataType: 'json',
				success: function (data) {
					this.state.joints = data.joints;
				}.bind(this)
			});
		}
	}

	this.update = function () {
		this.handleControls();

		var dir = this.state.direction;
		var l = this.state.look;
		this.drive(dir.x, dir.y, dir.w);
		this.look(l.pan, l.tilt);
	}

	this.getState = function () {
		var state = JSON.stringify(this.state.joints);
		state = state.replace("{","");
		state = state.replace("}","");
		state = state.replace(/:/g, ": ");
		state = state.replace(/,/g, "\n");
		state = state.replace(/"/g, "");
		return state;
	}

	this.handleControls = function () {
		this.state.look = this.getLook();
		this.state.direction = this.getDirection();
	}

	this.getLook = function () {
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

		if (keys[32] || terminal.input.isfocused == true) { // space bar
			look = {pan: 0, tilt: 0};
		}

		if (keys[SHIFT]) {
			look.pan *= 0.75;
			look.tilt *= 0.75;
		}

		return look;
	}

	this.getDirection = function () {
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

		if (keys[32] || terminal.input.isfocused == true) { // space bar
			direction = {x: 0, y: 0, w: 0};
		}

		return direction;
	}
}
