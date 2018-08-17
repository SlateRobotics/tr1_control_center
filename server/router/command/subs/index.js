/*

	To Do:
	 - Dynamically add subs if not in list
	 - Dynamically resolve conflicting subs if requested sub conflicts with existing

*/

var rosnodejs = require('rosnodejs');

var sub = function (topicName, msgType) {
	this._listeners = [];

	this._previousMessage = '';

	this._hook = function (msg) {
		this._previousMessage = msg;
		for (var i = 0; i < this._listeners.length; i++) {
			this._listeners[i].callback(msg);
		}
	}.bind(this);

	this.getPreviousMessage = function () {
		return this._previousMessage;
	}

	this.addListener = function (id, listenerMethod) {
		this._listeners.push({
			id: id,
			callback: listenerMethod
		});
	}

	this.removeListener = function (id) {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].id == id) {
				this._listeners.splice(i, 1);
				return;
			}
		}
	}

	nh.subscribe(topicName, msgType, this._hook);
}

module.exports = function (cmdr) {
	this._subs = {};
	this._subs["/joint_states"] = new sub('/joint_states', cmdr.msgs.get('sensor_msgs').JointState);

	this.get = function (subTopic) {
		if (subTopic) {
			if (this._subs[subTopic]) {
				return this._subs[subTopic];
			} else {
				throw "sub topic does not exist";
				// should add the ability to dynamically create in the future
			}
		} else {
			return this._subs;
		}
	}
}
