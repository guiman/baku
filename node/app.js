var express = require('express');
var stylus = require('stylus');

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var redis = require("redis");
var redis_cli = redis.createClient(); //Redis shouls be running before node initialization...

require('./config')(app, express, stylus, redis_cli);
require('./routes')(app, io, redis_cli);

server.listen(3000);
console.log('Listening on port 3000');
