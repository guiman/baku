/*
 * baku_core views
 */
 


exports.index = function(req, res){
  res.cookie('rememberme', 'yes', { maxAge: 900000, httpOnly: false});
	res.render('index', { title: 'BAKU' });
}