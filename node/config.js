/*
*
* General App Configuration
*
*/

//Module dependencies
//...
path = require('path');

module.exports = function(app, express, io, redis_cli, store){

    function compile(str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }

    function prepare_app(module_name){
        app.set('views', __dirname + '/views/' + module_name);
        app.set('view engine', 'jade');
    }

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);

        /*
        app.use(require('stylus').middleware({
            force: true,
            src: __dirname + '/public/stylesheets',
            compile: compile
        }));
        */
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        app.use(express.favicon());


        app.use(require('stylus').middleware(__dirname + '/public'));
        app.use(app.router);
        app.use('/public', express.static(path.join(__dirname, 'public')));
        app.use(express.cookieParser());
        app.use(express.session({
            store: store,
            key: 'sid',
            secret: 'some_secret_here' //Math.random() * 10000000
        }));
        /*
        app.set('view options', {
            layout: false
        });
    */
        app.use(express.logger('dev'));

        //app.use('/public', express.static(__dirname + '/public'));

        /* Subscribing to wiimote redis channel */
        redis_cli.subscribe("wiimote_ir_channel");

    });

    app.configure(function(){
        [
            //'Put your applications HERE',
            'baku_core',
        ].map(prepare_app);
    });

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
        app.use(express.errorHandler());
    });


}