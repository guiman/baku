/******************************************************************************
*
*	baku_client.js
*
******************************************************************************/
var exports = this;

var BakuCore = (function ($) {
	/* Private Variables */
	var DOMAIN = "http://localhost";
	var socket;

	
	/* End Private Variables */

	/*** Public Interface ***/
	function publicConnect(){
		makeConnection();
	}
	/*** End Public Interface ***/

	/*** Private methods ***/
	function makeConnection(){
		socket = io.connect(DOMAIN);

		socket.on("notifications", function(data){
			console.log(data);
		});

		socket.on("wiimote_ir", function(data){
			console.log(data.data);
		})

	};

	
	/*** End Private methods ***/

	return {
		//define here public interface
		//eg: publicMethod: priv ateMethod,
		connect: publicConnect,
	}

}(Zepto));
