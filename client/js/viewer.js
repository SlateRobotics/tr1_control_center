var $ = jQuery;

var cameraImageUrl = 'http://' + location.hostname + ':8081/stream?topic=/camera/rgb/image_raw&type=ros_compressed';

function Viewer () {
	this.img = loadImage(cameraImageUrl);
	//this.img.hide();

	$.ajax({
		url: cameraImageUrl,
		type: 'GET',
		contentType: 'image/jpeg',
		success: function (data) {
			console.log(data);
		}
	});

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
