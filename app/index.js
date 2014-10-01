/**
 ** Server entry point
 **/

var app     = require("./app")

var http = app.listen(app.get('port'));

//sockets.mount({ httpServer: http });
console.log('Express server listening on port', app.get('port'));
