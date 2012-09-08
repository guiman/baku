// File: main.js
// Handles global app dependencies

requirejs.config({
    baseUrl: 'public/scripts/lib',

    paths: {
        app: '../app',
        socketio: '../../../socket.io/socket.io'
    },

    shim: {
        'socketio': {
            exports: 'io'
        }
    }

});

// Start the main app logic.
requirejs(['app/baku_core'], function(baku_core) {
    console.log("Baku is ready.");
    //Example setup below...
    var options = {'onMessage':console.log, 'context': console};
    baku_core.connect(options);
});
