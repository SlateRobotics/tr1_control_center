var $ = jQuery;

function Terminal () {
	this.state = {};
	this.state.text = [];
	this.state.commandIndex = -1;
	this.state.commands = [];
	this.state.width = 500;
	this.state.height = 200;
	this.state.position = {
		x: 20,
		y: canvasHeight - 260
	}

	this.input = createInput();
	this.input.position(20, canvasHeight- 50);
	this.input.size(500, 20);
	this.input.style('background-color', 'rgba(255,255,255,0.7)');
	this.input.style('border', '1px solid #222');
	this.input.style('font-size', '14px');
	this.input.elt.onfocus = function (e) { this.input.isfocused = true; }.bind(this);
	this.input.elt.onblur = function (e) { this.input.isfocused = false; }.bind(this);

	this.addText = function (t) {
		this.state.text.push(t);
	}

	this.update = function () {
		this.display();
	}

	this.display = function () {
		var textBoxHeight = 12;
		var t = "";

		var startIndex = 0;
		if (this.state.text.length > textBoxHeight) {
			startIndex = this.state.text.length - textBoxHeight - 1;
		} else if (this.state.text.length <= textBoxHeight) {
			for (var i = 0; i < textBoxHeight - this.state.text.length + 1; i++) {
				t += "\n";
			}
		}

		for (var i = startIndex; i < this.state.text.length; i++) {
			t += this.state.text[i] + "\n";
		}

		push();
		fill('rgba(0,0,0,0.5)');
		stroke('rgba(100,100,100,0.5)');
		rect(this.state.position.x, this.state.position.y, this.state.width, this.state.height);
		pop();

		push();
		fill(255);
		text(t, this.state.position.x, this.state.position.y, this.state.width, this.state.height);
		pop();
	}

	this._incrementCommandIndex = function () {
		if (this.state.commandIndex >= this.state.commands.length - 1) return;
		else this.state.commandIndex++;
	}

	this._decrementCommandIndex = function () {
		if (this.state.commandIndex <= -1) return;
		else this.state.commandIndex--;
	}

	this._handleArrows = function () {
		if (keyCode == UP_ARROW) {
			this._incrementCommandIndex();
			if (this.state.commandIndex <= -1) {
				this.input.value('');
			} else {
				this.input.value(this.state.commands[this.state.commandIndex]);
			}
		} else if (keyCode == DOWN_ARROW) {
			this._decrementCommandIndex();
			if (this.state.commandIndex <= -1) {
				this.input.value('');
			} else {
				this.input.value(this.state.commands[this.state.commandIndex]);
			}
		}
	}

	this.handleKeyPressed = function () {
		var ENTER_KEY = 13;
		if (this.input.isfocused) {
			this._handleArrows();
			if (keyCode == ENTER_KEY) {
				var error = [];
				var command = this.input.value();

				if (command) this.state.commands.unshift(command);

				if (!command) {
					this.addText(" > ");
					return;
				}

				this.addText(" > " + command);

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

					if (data.length == 1 && data[0] == "") data = [];

					if (data.length != inputFunction.arguments.length) {
						error.push('Invalid number of arguments: ' + data.length + '. Requires ' + inputFunction.arguments.length + ' (' + this.getFunctionArgumentsString(inputFunction) + ').');
					} else {
						var data2 = {};
						for (var i = 0; i < inputFunction.arguments.length; i++) {
							if (inputFunction.arguments[i] == "number") {
								data2[inputFunction.argumentNames[i]] = Number(data[i]);
							} else {
								data2[inputFunction.argumentNames[i]] = data[i];
							}
						}

						$.ajax({
							url: inputFunction.url,
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify(data2),
							dataType: 'json',
							success: function (data) {
								if (data.message) {
									var message = data.message.match(/.{1,70}/g);
									for (var i = 0; i < message.length; i++) {
										this.addText(message[i]);
									}
									//data.message = data.message.replace(/:/g, ': ');
									//data.message = data.message.replace(/,/g, ', ');
								}
							}.bind(this)
						});
						this.state.commandIndex = -1;
					}
				} else {
					error.push('Function matching command ' + command + ' not found.');
				}


				if (error.length > 0) {
					this.addText("Failed to execute command. " + error.length + " error(s) occurred.");
					for (var i = 0; i < error.length; i++) {
						this.addText("Error: " + error[i]);
					}
				}

				this.input.value('');
			}
		}
	}

	this.getFunctionArgumentsString = function (inputFunction) {
		var result = "";
		for (var i = 0; i < inputFunction.arguments.length; i++) {
			result += inputFunction.argumentNames[i] + " : " + inputFunction.arguments[i] + ", ";
		}
		result = result.substring(0, result.length - 2);
	return result;
	}
}
