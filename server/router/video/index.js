var express = require('express');
var router = express.Router();
var path = require('path');
var rosnodejs = require('rosnodejs');

rosnodejs.initNode('/tr1/control_center/command/drive');
var nh = rosnodejs.nh;

var _root = '../../../client/js';

router.get('/head', function (req, res, next) {

});

module.exports = router;
