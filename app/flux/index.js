var Dispatcher = require("./dispatcher.js"),
	Store = require("./store.js"),
	API = require("../api");

var MessageStore = new Store({
		name: "messages",
		async: true,

		initalize: function (done) {
			var xhr = new XMLHttpRequest();

			xhr.open("GET", "/ajax/data", true);
			xhr.send();

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) { return ; }
				if (xhr.status !== 200) { done( { error: "..." } ); }

				done(JSON.parse(xhr.response));
			}
		},

		actions: {
			"ACTION": function (a,b,c) {
				this.message = Math.random().toString();
				return true;
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
