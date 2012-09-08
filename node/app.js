var express = require('express');
var stylus = require('stylus');

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var store = new express.session.MemoryStore({reapInterval: 60000 * 10}); //aka sessionStore
var redis = require("redis");
var redis_cli = redis.createClient(); //Redis server should be running before node initialization...

require('./config')(app, express, io, stylus, redis_cli, store);
require('./routes')(app, io, redis_cli, store);

server.listen(3000);
console.log('Listening on port 3000');
