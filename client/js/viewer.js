var $ = jQuery;

var cameraImageUrl = 'http://' + location.hostname + ':8081/stream?topic=/camera/rgb/image_raw&type=ros_compressed';

function DropDownItem (parent, label, onClick) {
	this.state = {};
	this.state.parent = parent;
	this.state.label = label;
	this.state.onClick = onClick;
	this.state.visible = false;
	this.state.x = 0;
	this.state.y = 0;
	this.state.size = {};
	this.state.size.x = 0;
	this.state.size.y = 20;
	this.state.isHovered = false;
	
	this.step = function () {
		this.setIsHovered();
		this.display();
	}

	this.setIsHovered = function () {
		var inX = mouseX > this.state.x && mouseX < this.state.x + this.state.size.x;
		var inY = mouseY > this.state.y && mouseY < this.state.y + this.state.size.y;
		this.state.isHovered = inX && inY;
	}
	
	this.display = function () {
		if (this.state.visible) {
			push();
			noStroke();
			fill(255);
			if (this.state.isHovered) fill('yellow');
			textSize(14);
			textStyle(BOLD);
			text(this.state.label, this.state.x + 5, this.state.y + 5, this.state.size.x - 5, this.state.size.y - 5);
			pop();
		}
	}

	this.setPosition = function (x, y) {
		this.state.x = x;
		this.state.y = y;
	}

	this.setSize = function (x, y) {
		this.state.size.x = x;
		this.state.size.y = y;
	}
}

function DropDownMenu () {
	this.state = {};
	this.state.visible = false;
	this.state.x;
	this.state.y;
	this.state.size = {};
	this.state.size.x = 200;
	this.state.size.y = 400;
	this.state.items = [];
	this.state.items.push(new DropDownItem(this, "Pickup", function () {
		console.log("clicked!")
	}));
	this.state.items.push(new DropDownItem(this, "Examine", function () {
		console.log("clicked!")
	}));
	this.state.items.push(new DropDownItem(this, "Cancel", function () {
		console.log("clicked!")
	}));

	this.setPositionAndDisplay = function (x, y) {
		this.state.x = x;
		this.state.y = y;
		this.state.visible = true;
		this.calculateItemPositions();
	}

	this.step = function () {
		this.setIsHovered();
		if (this.state.visible) {
			if (!this.state.isHovered) {
				this.hide();
			}
		}
		this.display();

		for (var i = 0; i < this.state.items.length; i++) {
			this.state.items[i].state.visible = this.state.visible;
			this.state.items[i].step();
		}
	}

	this.setIsHovered = function () {
		var inX = mouseX > this.state.x - 25 && mouseX < this.state.x + this.state.size.x + 25;
		var inY = mouseY > this.state.y - 25 && mouseY < this.state.y + this.state.size.y + 25;
		this.state.isHovered = inX && inY;
	}

	this.display = function () {
		if (this.state.visible) {
			push();
			fill('grey');
			rect(this.state.x, this.state.y, this.state.size.x, this.state.size.y);
			pop();
		}
	}

	this.hide = function () {
		this.state.visible = false;
	}
	
	this.calculateItemPositions = function () {
		this.state.size.y = 0;
		for (var i = 0; i < this.state.items.length; i++) {
			this.state.items[i].state.size.x = this.state.size.x;
			this.state.items[i].setPosition(this.state.x, this.state.y + this.state.size.y);
			this.state.size.y += this.state.items[i].state.size.y;
		}
		this.state.size.y += 5;
	}

	this.handleMousePressed = function (e) {
		 if (e.button == 0) {
			this.hide();
		} else if (e.button == 2) {
			this.state.items = [];
			this.state.items.push(new DropDownItem(this, "Pickup", function () {
				console.log("clicked!")
			}));
			this.state.items.push(new DropDownItem(this, "Examine", function () {
				console.log("clicked!")
			}));
			this.state.items.push(new DropDownItem(this, "Cancel", function () {
				console.log("clicked!")
			}));
			this.setPositionAndDisplay(e.clientX, e.clientY);
		}
	}
}

function Viewer () {
	this.img = createImg(cameraImageUrl);
	this.img.hide();

/*	$.ajax({
		url: cameraImageUrl,
		type: 'GET',
		contentType: 'image/jpeg',
		success: function (data) {
			console.log(data);
		}
	});*/

	background(0);

	this.update = function () {

		this.display();
	}

	this.display = function () {
		/*this.img.loadPixels();
		for(var x = 0; x < img.width; x++) {
		  for(var y = 0; y < img.height; y++) {
		    img.set(x, y, [0, 153, 204, a]); 
		  }
		}*/
		image(this.img, 0, 0, canvasWidth, canvasHeight);
	}
}
