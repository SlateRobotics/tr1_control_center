module.exports = function (cmdr) {
	this.path = '/go_to_position';
	this.route = function (req, res) {
		cmdr.pubs.get("/tr1/go_to_position").publish(req.body);
		res.json({joints: states, message: "Publishing data on /tr1/go_to_position"});
	}
}
