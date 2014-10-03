var Dispatcher = require("./dispatcher.js"),
	Store = require("./store.js");

var MessageStore = new Store({
		name: "messages",
		async: true,

		initalize: function (done) {
			done({
				message: "Hello World"
			});
		},

		actions: {
			"ACTION": function (a,b,c) {
				this._dataset.message = Math.random().toString();
				this.changed();
			}
		}
	});

module.exports = {
	MessageStore: MessageStore,

	Dispatcher: function (init) {
		var dispatcher = new Dispatcher(init);

		dispatcher.addStores(MessageStore);

		return dispatcher;
	}
};
