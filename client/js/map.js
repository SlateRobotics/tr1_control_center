var $ = jQuery;

function Map () {
	this.state = {
		height: 200,
		width: 200,
	}

	this.update = function () {

		this.display();
	}

	this.display = function () {
		this._drawWorld();
		this._drawRobot();
	}

	this._drawWorld = function () {
		push();
		fill('rgba(0,0,0,0.4)');
		rect(canvasWidth - this.state.width, 0, this.state.width, this.state.height);
		pop();
	}

	this._drawRobot = function () {
		var robotSize = 3;

		push();
		fill('blue');
		rect(canvasWidth - (this.state.width / 2) - ((robotSize - 1) / 2), (this.state.height / 2) - ((robotSize - 1) / 2), robotSize, robotSize);
		pop();
	}
}
