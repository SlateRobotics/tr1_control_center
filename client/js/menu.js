var $ = jQuery;

function Menu () {
	this.state = {};
	this.state.width = 250;
	this.state.height = 400;
	this.state.position = {
		x: canvasWidth - this.state.width - 80,
		y: canvasHeight - this.state.height - 20
	}

	this.type = ''; // functions, settings
	this.visible = false;

	this.buttonFunction = createButton('f(x)');
	this.buttonFunction.mousePressed(function () {
		this.handleMousePressed_Functions();
	}.bind(this));
	this.buttonFunction.position(canvasWidth - 60, canvasHeight - 60 - 40);
	this.buttonFunction.size(40, 40);
	this.buttonFunction.style('background-color', 'rgba(255,255,255,0.7)');
	this.buttonFunction.style('border', '1px solid #222');
	this.buttonFunction.style('font-size', '14px');

	this.buttonSettings = createButton('⚙');
	this.buttonSettings.mousePressed(function () {
		this.handleMousePressed_Settings();
	}.bind(this));
	this.buttonSettings.position(canvasWidth - 60, canvasHeight - 60);
	this.buttonSettings.size(40, 40);
	this.buttonSettings.style('background-color', 'rgba(255,255,255,0.7)');
	this.buttonSettings.style('border', '1px solid #222');
	this.buttonSettings.style('font-size', '24px');

	this.update = function () {

		if (this.visible) {
			this.display();
		}
	}

	this.display = function () {
		this._drawMenu();
	}

	this._drawMenu = function () {
		push();
		fill('rgba(255,255,255,0.75)');
		rect(this.state.position.x, this.state.position.y, this.state.width, this.state.height);
		pop();

		push();
		stroke(255);
		text(this.type, this.state.position.x + 5, this.state.position.y + 5, this.state.width - 5, this.state.height - 5);
		pop();
	}

	this.handleMousePressed_Functions = function () {
		if (this.type == 'functions' || !this.type) this.visible = !this.visible;
		this.type = 'functions';
	};

	this.handleMousePressed_Settings = function () {
		if (this.type == 'settings' || !this.type) this.visible = !this.visible;
		this.type = 'settings';
	};
}
