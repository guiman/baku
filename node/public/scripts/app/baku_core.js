/******************************************************************************

	baku_core.js

	Handles websocket channel (auth) connection and configuration.
	Provides an entry point for module extension.

******************************************************************************/
define(['socketio', 'zepto'], function(io, $){

	/* Private Variables  */
	var DOMAIN = "http://localhost";
	var DEFAULT_HEART_RATE = 0.7;
	var socket;
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
			onMessage: function which will be applied when a message arrives. [REQUIRED]
			heartRate: a value between 0 and 1 which indicates the rate of upcomming messages. [DEFAULT: 0.7]
			onError: function applied when an error happens. [DEFAULT: console logging]
			onConnect: function applied as a callback after connect event happens. [DEFAULT: console loggings]

		*/

		checkOptions(options);

		var wiimote_cn = io.connect(DOMAIN);

		wiimote_cn.on("notifications", function(data){
			console.log(data);
		});

		wiimote_cn.on("wii_ir", function(data){
			if (binaryWeightedRandom(options.heartRate)){
				options.onMessage.apply(options.context, [data.data]);
			}
		});
		return wiimote_cn;

	};

	function turnOff(someSocket){
		console.log("Switching off baku's channel...");
		someSocket.disconnect();
	};


	function checkOptions(options){
		/*
		Handles errors with baku initialization object.
		*/

		if (typeof(options) != 'object'){
			throw "options is an object defining at least onMessage function";
		}

		if (!options.hasOwnProperty('onMessage')){
			throw "options is an object defining at least onMessage function";
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
