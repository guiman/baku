/******************************************************************************

	baku_core.js

	Handles websocket channel (auth) connection and configuration.
	Provides an entry point for module extension.

******************************************************************************/
define(['socketio', 'zepto'], function(io, $){

	/* Private Variables  */
	var DOMAIN = "http://192.168.0.37";
	var IRDOMAIN = "http://192.168.0.37/ir";
	//add other doimains here..
	var DEFAULT_HEART_RATE = 0.7;
	var channel;
	/* End Private Variables */

	/*** Public Interface ***/

	function publicConnect(options){
		turnOn(options);
	};

	function publicDisconnect(someSocket){
		turnOff(someSocket);
	};

	/*** End Public Interface ***/

	/*** Private methods ***/

	function turnOn(options){
		/*
		options can be:
			onIR: function which will be applied when a IR message arrives. [DEFAULT: console logging]
			onButton: function which will be applied when a button message arrives. [DEFAULT: console logging]
			heartRate: a value between 0 and 1 which indicates the rate of upcomming messages. [DEFAULT: 0.7]
			onError: function applied when an error happens. [DEFAULT: console logging]
			onConnect: function applied as a callback after connect event happens. [DEFAULT: console logging]

		*/

		checkOptions(options);

		sio = io.connect(DOMAIN);

		channel = sio.socket;

		channel.of("/ir")
			.on("notifications", function(data){
				console.log(data);
			})
			.on("wii_ir", function(data){
				if (binaryWeightedRandom(options.heartRate)){
					options.onIR.apply(options.context, [data.data]);
				}
			})
			.on("connect_failed", function(reason) {
				console.log("connection failed: ", reason);
			})
			.on("error", function(reason){
				console.log("Error reason: ", reason);
			});

	};

	function turnOff(someSocket){
		console.log("Switching off baku's channel...");
		channel.disconnect();
	};


	function checkOptions(options){
		/*
		Handles baku core's initialization errors.
		*/

		if (!options.hasOwnProperty('onIR') || (typeof(options.onIR) != 'function')){
			//add default function
			options.onIR = console.log;
		}

		if (!options.hasOwnProperty('onError') || (typeof(options.onError) != 'function')){
			options.onError = console.log;
		}

		if (!options.hasOwnProperty('heartRate')){
			options.heartRate = DEFAULT_HEART_RATE;
		}

	};


	function weightedRandom(weightItemList){
		var n = Math.random();
		var itemValue = null;
		var itemWeight = null;
		var idx;
		for (idx=0; idx < weightItemList.length ; idx++) {
			var item = weightItemList[idx];
			itemValue = item.value;
			itemWeight = item.weight;
			if (n < itemWeight){
				break;
			}
			n = n - itemWeight;
		}
		return itemValue;
	};


	function binaryWeightedRandom(trueWeight, falseWeight){
		trueWeight = (typeof(trueWeight) != 'undefined')? trueWeight : 0.5;
		falseWeight = (typeof(falseWeight) != 'undefined')? falseWeight : 1 - trueWeight;
		var binaryWeightedList = [ {value:true, weight:trueWeight}, {value:false, weight:falseWeight} ];
		return weightedRandom(binaryWeightedList);
	}


	/*** End Private methods ***/

	return {
		//define here public interface
		//eg: publicMethod: privateMethod,
		connect: publicConnect,
		disconnect: publicDisconnect,

	}

});
