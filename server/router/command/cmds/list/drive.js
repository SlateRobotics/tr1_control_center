var nj = require('numjs');
var rosnodejs = require('rosnodejs');

module.exports = function (cmdr) {
	this.path = '/drive';
	this.route = function (req, res) {
		var x = req.body.x;
		var y = req.body.y;
		var w = req.body.w;
		var vector = nj.array([x, y]);

		var magnitude = Math.sqrt((x*x) + (y*y) + (w*w));

		var offset = Math.PI / 4.0;
		var c = Math.cos(offset);
		var s = Math.sin(offset);
		var rotationMatrix = nj.array([[c, -s], [s, c]]);

		var output = vector.dot(rotationMatrix);
		x = output.get(0);
		y = output.get(1);

		var mfl = y;
		var mfr = x;
		var mbl = y;
		var mbr = x;

		w = w * 2;
		mfl = mfl - w;
		mfr = mfr + w;
		mbl = mbl + w;
		mbr = mbr - w;

		var outputMagnitude = Math.abs(mfl);
		if (Math.abs(mfr) > outputMagnitude) {
			outputMagnitude = Math.abs(mfr);
		} else if (Math.abs(mbl) > outputMagnitude) {
			outputMagnitude = Math.abs(mbl);
		} else if (Math.abs(mbr) > outputMagnitude) {
			outputMagnitude = Math.abs(mbr);
		}

		if (outputMagnitude > 1.4142) {
			outputMagnitude = 1.4142;
		}

		var scale = magnitude / outputMagnitude;
		mfl = mfl * scale;
		mfr = mfr * scale * -1;
		mbl = mbl * scale;
		mbr = mbr * scale * -1;

		cmdr.pubs.get("/tr1/controller/effort/JointBaseWheelFL/command").publish({data: mfl});
		cmdr.pubs.get("/tr1/controller/effort/JointBaseWheelFR/command").publish({data: mfr});
		cmdr.pubs.get("/tr1/controller/effort/JointBaseWheelBL/command").publish({data: mbl});
		cmdr.pubs.get("/tr1/controller/effort/JointBaseWheelBR/command").publish({data: mbr});

		states.JointBaseWheelFL = mfl;
		states.JointBaseWheelFR = mfr;
		states.JointBaseWheelBL = mbl;
		states.JointBaseWheelBR = mbr;

		res.json({joints: states});
	}
}
