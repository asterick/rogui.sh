var Dispatcher = require("./dispatcher.js"),
	Store = require("./store.js");

/***
 *** TODO: CREATE STORES
 ***/

module.exports = function (init) {
	var dispatcher = new Dispatcher(init);

	dispatcher.addStores();

	return dispatcher;
};
