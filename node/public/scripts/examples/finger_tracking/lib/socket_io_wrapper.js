/******************************************************************************

   File: socket_io_wrapper.js

    Creates a wrapper from commonjs to require.js.
******************************************************************************/

define(function(require, exports) {
    var mod = require("socket.io");
    exports.value = "exposed";
});
