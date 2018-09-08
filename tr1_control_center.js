#!/usr/bin/env node

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./server/router');
var config = require('./config.js');

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
	console.log(req.method + req.path);
	next();
});

app.use('/', router);

var httpServer = app.listen(8080);
console.log("Listening on port 8080");

var io = require('socket.io')(httpServer);
config.socketInteface.init(io);
config.socketInteface.ready();
