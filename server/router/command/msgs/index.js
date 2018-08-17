/*

	To Do:

*/

var rosnodejs = require('rosnodejs');

module.exports = function (Commander) {
	this._msgs = {};
	this._msgs["sensor_msgs"] = rosnodejs.require('sensor_msgs');

	this.get = function (msgName) {
		if (msgName) {
			if (this._msgs[msgName]) {
				return this._msgs[msgName].msg;
			} else {
				this._msgs[msgName] = rosnodejs.require(msgName);
				return this._msgs[msgName].msg;
			}
		} else {
			return this._msgs;
		}
	}
}
