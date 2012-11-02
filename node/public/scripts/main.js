// File: main.js
// Handles global app dependencies

requirejs.config({
    baseUrl: 'public/scripts/lib',

    paths: {
        app: '../app',
        socketio: '../../../socket.io/socket.io',
        zepto: '../wrappers/zepto',
        d3: 'd3.v2'
    },

    shim: {
        'socketio': {
            exports: 'io'
        },

        'd3': {
            exports: 'd3'
        }
    }

});

// Start the main app logic.
requirejs(['app/baku_core', 'app/first_test'], function(baku_core, first_test) {
    console.log("Baku is ready.");
    //Example setup below...
    first_test.initialize();
    var options = {'onIR':first_test.render, 'context': first_test};
    baku_core.connect(options);
});
