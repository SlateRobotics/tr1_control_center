#!/usr/bin/env node

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./server/router');

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
	console.log(req.method + req.path);
	next();
});

app.use('/', router);

app.listen(8080);
console.log("Listening on port 8080");
