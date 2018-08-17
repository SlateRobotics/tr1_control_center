module.exports = function (cmdr) {
	this.path = '/look';
	this.route = function (req, res) {
		var pan = req.body.pan;
		var tilt = req.body.tilt;

		cmdr.pubs.get("/tr1/controller/effort/neck_to_head/command").publish({data: tilt});
		cmdr.pubs.get("/tr1/controller/effort/neck_base_to_neck/command").publish({data: pan});

		cmdr.states.HeadTilt = tilt;
		cmdr.states.HeadPan = pan;

		res.json({joints: cmdr.states});
	}
}
