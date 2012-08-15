var redis = require("redis");
var redis_cli = redis.createClient();

redis_cli.on("message", function(channel, message){
  console.log("redis client channel: "+ channel + " with message: "+ JSON.parse(message).ir_data);
});

redis_cli.subscribe("wiimote_ir_channel");
