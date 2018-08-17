module.exports = function (Commander) {
	

	this.route = function (req, res) {
		var pan = req.body.pan;
		var tilt = req.body.tilt;

		HeadTilt.publish({data: tilt});
		HeadPan.publish({data: pan});

		states.HeadTilt = tilt;
		states.HeadPan = pan;

		res.json({joints: states});
	}
}
