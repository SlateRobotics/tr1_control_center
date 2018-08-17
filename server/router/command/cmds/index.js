var fs = require('fs');

var files = [];
fs.readdirSync(__dirname + '/list').forEach(file => {
  files.push(file);
});

module.exports = function (Commander) {
	this.parent = Commander;

	this._cmds = [];
	for (var i = 0; i < files.length; i++) {
		var cmd = require('./list/' + files[i]);
		this._cmds.push(new cmd(Commander)); 
	}

	this.get = function () {
		return this._cmds;
	}

	this.addToRouter = function (router) {
		for (var i = 0; i < this._cmds.length; i++) {
			router.post(this._cmds[i].path, this._cmds[i].route);
		}
	}
}
