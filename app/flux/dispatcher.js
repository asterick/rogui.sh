var Store = require("./store.js");

function Dispatcher(init) {
	this._actions = {};
	this._storeInstances = [];

	this._initalizer = init || {};
}

Dispatcher.prototype.trigger = function (name) {
	var data = Array.prototype.slice.call(arguments, 1),
		targets = this._actions[name];

	if (!targets) { return ; }

	targets.forEach(function (call) {
		call.action.apply(call.context, data);
	}, this);
}

Dispatcher.prototype.serialize = function () {
	return JSON.stringify(
		this._storeInstances.reduce(function (bundle, store) {
			var options = Object.getPrototypeOf(store)._options;

			if (options.name) { bundle[options.name] = store._dataset; }

			return bundle;
		}, {}));
}

Dispatcher.prototype.getStore = function (store) {
	return this._storeInstances.reduce(function (acc, target) {
		return (Object.getPrototypeOf(target) === store) ? target : acc;
	}, null);
}

Dispatcher.prototype.addStores = function () {
	var stores = Array.prototype.slice.call(arguments, 0);

	stores.forEach(function (store) {
		var init = this._initalizer[store._options.name]
			binders = store._options.actions,
			inst = store._getInstance(init);

		this._storeInstances.push(inst);

		Object.keys(binders).forEach(function (action) {
			var set = this._actions[action] || (this._actions[action] = []),
				call = binders[action];

			set.push({ context: inst, action: call });
		}, this);
	}, this);
};

Dispatcher.prototype.respondsTo = function (name) {
	var keys = Object.keys(this._actions);

	if (name) { return keys.indexOf(name) >= 0; }

	return keys;
}

module.exports = Dispatcher;
