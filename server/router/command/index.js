var express = require('express');
var router = express.Router();
var path = require('path');
var nj = require('numjs');
var rosnodejs = require('rosnodejs');

var msgs = require('./msgs');
var pubs = require('./pubs');
var subs = require('./subs');
var cmds = require('./cmds');

var Commander = function () {
	this.states = {};
	this.jointStates = {};

	rosnodejs.initNode('/tr1_control_center_node');
	this.nh = rosnodejs.nh;

	this.msgs = new msgs(this);
	this.pubs = new pubs(this);
	this.subs = new subs(this);
	this.cmds = new cmds(this);

	this.cmds.addToRouter(router);
}

Commander();

module.exports = router;
