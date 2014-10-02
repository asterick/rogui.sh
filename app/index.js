/**
 ** Server entry point
 **/

require('node-jsx').install({
	extension: '.jsx'
});

var app = require("./app")
var http = app.listen(app.get('port'));

console.log('Express server listening on port', app.get('port'));
