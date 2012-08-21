/* 
*
* baku's project General Routes. 
*
*/

//Module dependencies here
var baku_core_routes = require('./baku_core/routes.js');

//sort of initialize
module.exports = function(app, io, redis_cli){
	baku_core_routes(app, io, redis_cli);
}