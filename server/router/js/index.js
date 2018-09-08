var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../../client/js';

router.use('/p5.js', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/p5.min.js'));
});

router.use('/p5.dom.js', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/p5.dom.js'));
});

router.use('/jquery.js', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/jquery-3.3.1.min.js'));
});

router.use('/socket.io.js', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/socket.io.js'));
});

router.use('/socket.io.js.map', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/socket.io.js.map'));
});

router.use('*', function (req, res, next) {
	var fileName = path.join(__dirname, _root, '/' + req.originalUrl.replace('/js/',''));
	res.sendFile(fileName);
});

module.exports = router;
