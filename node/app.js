var express = require('express');
//var stylus = require('stylus');

var app = express();
var http = require('http');
var server = http.createServer(app);

var store = new express.session.MemoryStore({reapInterval: 60000 * 10}); //aka sessionStore
var redis = require("redis");

var redis_host = "localhost";
var redis_port = 6379;

var redis_cli = redis.createClient(); //Redis server should be running before node initialization...

require('./config')(app, express, redis_cli, store);

server.listen(app.get('port'));
var io = require('socket.io').listen(server);
require('./routes')(app, io, redis_cli, store);
console.log('express server listening on port ' + app.get('port'));
