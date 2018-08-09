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
		// get state from server
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
}
