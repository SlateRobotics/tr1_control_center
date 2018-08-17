module.exports = function (cmdr) {
	this.path = '/get_joint_states';
	this.route = function (req, res) {
		var jointStates = cmdr.subs.get("/joint_states").getPreviousMessage();
		res.json({message: JSON.stringify(jointStates)});
	}
}
