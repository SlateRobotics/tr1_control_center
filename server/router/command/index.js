var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var rosnodejs = require('rosnodejs');

rosnodejs.initNode('/tr1/control_center/command/drive');
var nh = rosnodejs.nh;

var states = {} ;

var GoToPosition = nh.advertise('/tr1/go_to_position', 'geometry_msgs/Point');
var BaseWheelFL = nh.advertise('/tr1/controller/effort/JointBaseWheelFL/command', 'std_msgs/Float64');
var BaseWheelFR = nh.advertise('/tr1/controller/effort/JointBaseWheelFR/command', 'std_msgs/Float64');
var BaseWheelBL = nh.advertise('/tr1/controller/effort/JointBaseWheelBL/command', 'std_msgs/Float64');
var BaseWheelBR = nh.advertise('/tr1/controller/effort/JointBaseWheelBR/command', 'std_msgs/Float64');
var HeadPan = nh.advertise('/tr1/controller/effort/neck_base_to_neck/command', 'std_msgs/Float64');
var HeadTilt = nh.advertise('/tr1/controller/effort/neck_to_head/command', 'std_msgs/Float64');

router.post('/look', function (req, res) {
	var pan = req.body.pan;
	var tilt = req.body.tilt;

	HeadTilt.publish({data: tilt});
	HeadPan.publish({data: pan});

	states.HeadTilt = tilt;
	states.HeadPan = pan;

	res.json({joints: states});
});

router.post('/drive', function (req, res) {
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

	BaseWheelFL.publish({data: mfl});
	BaseWheelFR.publish({data: mfr});
	BaseWheelBL.publish({data: mbl});
	BaseWheelBR.publish({data: mbr});

	states.JointBaseWheelFL = mfl;
	states.JointBaseWheelFR = mfr;
	states.JointBaseWheelBL = mbl;
	states.JointBaseWheelBR = mbr;

	res.json({joints: states});
});


router.post('/say', function (req, res) {
	console.log('TR1 said: ' + req.body.speechText);
	res.json({joints: states});
});

router.post('/go_to_position', function (req, res) {
	GoToPosition.publish(req.body);
	res.json({joints: states, message: "Publishing data on /tr1/go_to_position"});
});

module.exports = router;
