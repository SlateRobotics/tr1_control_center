/*

	To Do:
	 - Dynamically add pubs if not in list
	 - Dynamically resolve conflicting pubs if requested pub conflicts with existing

*/

var rosnodejs = require('rosnodejs');

module.exports = function (Commander) {
	this._pubs = {};
	this._pubs["/tr1/go_to_position"] = Commander.nh.advertise('/tr1/go_to_position', 'geometry_msgs/Point');
	this._pubs["/tr1/controller/effort/JointBaseWheelFL/command"] = Commander.nh.advertise('/tr1/controller/effort/JointBaseWheelFL/command', 'std_msgs/Float64');
	this._pubs["/tr1/controller/effort/JointBaseWheelFR/command"] = Commander.nh.advertise('/tr1/controller/effort/JointBaseWheelFR/command', 'std_msgs/Float64');
	this._pubs["/tr1/controller/effort/JointBaseWheelBL/command"] = Commander.nh.advertise('/tr1/controller/effort/JointBaseWheelBL/command', 'std_msgs/Float64');
	this._pubs["/tr1/controller/effort/JointBaseWheelBR/command"] = Commander.nh.advertise('/tr1/controller/effort/JointBaseWheelBR/command', 'std_msgs/Float64');
	this._pubs["/tr1/controller/effort/JointHeadPan/command"] = Commander.nh.advertise('/tr1/controller/effort/JointHeadPan/command', 'std_msgs/Float64');
	this._pubs["/tr1/controller/effort/JointHeadTilt/command"] = Commander.nh.advertise('/tr1/controller/effort/JointHeadTilt/command', 'std_msgs/Float64');

	// should
	this.get = function (pubTopic) {
		if (pubTopic) {
			if (this._pubs[pubTopic]) {
				return this._pubs[pubTopic];
			} else {
				throw "pub topic does not exist in publisher list for tr1_control_center";
				// should add the ability to dynamically create in the future
			}
		} else {
			return this._pubs;
		}
	}
}
