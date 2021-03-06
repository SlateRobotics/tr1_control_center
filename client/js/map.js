var $ = jQuery;

function Map () {
	this.state = {
		height: 200,
		width: 200,
		viewAngle: 0.0,
	}

	this.center = {
		x: canvasWidth - (this.state.width / 2),
		y: (this.state.height / 2)
	}

	this.update = function () {
		this.state.viewAngle = this._getJointHeadPan();
		this.display();
	}

	this.display = function () {
		this._drawWorld();
		this._drawRobot();
	}

	this._getJointHeadPan = function () {
		var jointHeadPanIndex = -1;
		for (var i = 0; i < joint_states.name.length; i++) {
			if (joint_states.name[i] == 'JointHeadPan') {
				jointHeadPanIndex = i;
			}
		}
		
		if (jointHeadPanIndex > -1) {
			return joint_states.position[jointHeadPanIndex] * -1.0;
		} else {
			return 0;
		}
	}

	this._drawWorld = function () {
		push();
		fill('rgba(0,0,0,0.4)');
		rect(canvasWidth - this.state.width, 0, this.state.width, this.state.height);
		pop();
	}

	this._drawRobot = function () {
		var robotSize = 18;
		var viewHeight = 70;
		var viewWidth = 90;

		push();
		stroke('grey');
		strokeWeight(1);
		fill('white');
		rect(this.center.x - ((robotSize - 1) / 2), this.center.y - ((robotSize - 1) / 2), robotSize, robotSize);
		pop();

		push();
		translate(this.center.x, this.center.y);
		rotate(this.state.viewAngle);
		noStroke();
		fill('rgba(255,255,255,0.4)');
		triangle(0, 0, -viewWidth / 2, -viewHeight, viewWidth / 2, -viewHeight);
		pop();
	}
}
