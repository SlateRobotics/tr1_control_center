module.exports = function (cmdr) {
	this.path = '/say';
	this.route = function (req, res) {
		console.log('TR1 said: ' + req.body.speechText);
		res.json({joints: states});
	}
}
