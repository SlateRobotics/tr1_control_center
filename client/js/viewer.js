var $ = jQuery;

function Viewer () {

	this.camera = createImg('http://192.168.1.16:8081/stream?topic=/camera/rgb/image_raw&type=ros_compressed');
	this.camera.hide();

	background(0);

	this.update = function () {

		this.display();
	}

	this.display = function () {
		image(this.camera, 0, 0, canvasWidth, canvasHeight);
	}
}
