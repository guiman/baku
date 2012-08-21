/*
 * baku_core code. aka the monster brain.
 */
 


exports.index = function(req, res){
	res.render('index', { title: 'BAKU' });
}