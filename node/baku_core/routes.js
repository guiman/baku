/*
*
* baku_core routes.js
*
*/
//View-Module dependencies here
var site = require('./core.js');


module.exports = function(app, io, redis_cli){
	app.get('/', site.index);

	/* WebSockets area */
	io.sockets.on('connection', function (socket) {
  		socket.emit('notifications', { msg: 'connection establised!' });
  	});
  	/* END WebSockets area */

  	/* Redis area */

	redis_cli.on("message", function(channel, message){
		var data = JSON.parse(message).ir_data;
		//console.log("redis client channel: "+ channel + " with message: "+ data);
		//Pushing data to the client..
		io.sockets.emit('wiimote_ir', {data:data});

	});

	redis_cli.on("error", function (err) {
        console.log("Error " + err);
    });
	
  	/* End Redis area */
}