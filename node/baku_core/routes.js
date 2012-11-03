/*
*
* baku_core routes.js
*
*/
//View-Module dependencies below
var site = require('./core.js');


module.exports = function(app, io, redis_cli, store){
	/* Express routes area */
	app.get('/', site.index);
	//app.get('/presentacion', site.presentacion);


	/* End Express routes area */


	/* WebSockets area */

	/* general sockets authorization */
	
	//io.sockets.authorization(function(data, accept){
	io.configure(function (){
			io.set('authorization', function(data, accept){
				console.log(data.headers);
	      if (data.headers.cookie){
	          var cookies = require('express/node_modules/cookie').parse(data.headers.cookie);

	          data.sessionID = require('express/node_modules/connect/lib/utils').parseSignedCookies(cookies, 'some_secret_here');

	          data.sessionStore = store;

	          data.sessionStore.get(data.sessionID['sid'], function(err, session){
	              if (err || !session){
	                  console.log("ERROR", err);
	                  console.log("session:", session);
	                  //return accept("Invalid session", false);
	              }
	              console.log("creating session data");
	              data.session = session;
	              accept(null, true);
	          });
	      }
	      else{
	          return accept("No cookie transmitted.", false);
	      }
	  });
  });
	

	//IR CHANNEL
    var ir_channel = io
		.of("/ir")
    	.on("connection", function (socket) {
			socket.emit("notifications", { msg: 'connection establised!' });
		})
    	.on("configupdate", function(socket, data){
			var session = socket.handshake.session;
			//Here we reflect baku config changes on the session
			session.heartRate = data.heartRate;
			session.save();
			console.log("New heart rate for session: ", data.heartRate);
		});

	//another CHANNEL ...

	/* END WebSockets area */

	/* Redis area */

	redis_cli.on("message", function(channel, message){
		var data = JSON.parse(message).ir_data;

		//console.log("redis client channel: "+ channel + " with message: "+ data);

		ir_channel.emit('wii_ir', {data:data});	//Pushing data to the client..

	});

	redis_cli.on("error", function (err) {
		console.log("Error " + err);
	});

	/* End Redis area */

}