var ReactAsync = require('react-async');

function Store(options) {
	this._options = options || {};
}

Store.prototype._getInstance = function (init) {
	var that = Object.create(this, {
		_listeners: { value: [] }
	});

	// Skip the initalization step and simply provide an empty store
	if (init) {
		that._dataset = init;
	} else if (!that._options.initalize) {
		that._dataset = {};
	}

	return that;
};

Store.prototype.changed = function (action) {
	this._listeners.forEach(function (target) {
		var listener = target.listener;

		if (listener.storeDidChange) {
			listener.storeDidChange(target.name, action, this._dataset, this);
		}
		listener.forceUpdate();
	});
};

Store.prototype.subscribe = function (name, listener) {
	this.unsubscribe(listener);

	this._listeners.push({
		name: name,
		listener: listener
	});
};

Store.prototype.unsubscribe = function (listener) {
	this._listeners = this._listeners.filter(function (old) {
		return old.listener !== listener;
	});
};

Store.prototype.requestInitalization = function (done) {
	var that = this;

	this._options.initalize.call(this._dataset, function (value) {
		that._dataset = value;
		done();
	});
};

Store.prototype.hasInitalized = function () {
	return this._dataset !== undefined;
};

Store.prototype.mixin = function (name) {
	name || (name = this._options.name);
	var storeType = this,
		mixin = {
			componentWillMount: function () {
				var dispatcher = this.findFluxDispatcher(),
					store = dispatcher.getStore(storeType);

				if (this.stores === undefined) { this.stores = {}; }

				Object.defineProperty(this.stores, name, {
					get: function () { return store._dataset; }
				});

				store.subscribe(name, this);
			},

			componentWillUnmount: function () {
				var dispatcher = this.findFluxDispatcher(),
					store = dispatcher.getStore(storeType);

				store.unsubscribe(this);
			}
		};

	if (this._options.async) {
		mixin.mixins = [ReactAsync.Mixin];
		mixin.getInitialStateAsync = function(cb) {
			var dispatcher = this.findFluxDispatcher(),
				store = dispatcher.getStore(storeType),
				that = this;

			function initState() {
				if (that.getAsyncInitalStateAsync) {
					that.getAsyncInitalStateAsync(cb);
				} else {
					cb (null, {});
				}
			}

			if (store.hasInitalized()) {
				initState();
			} else {
				store.requestInitalization(initState);
			}
		};
	} else {
		// TODO: ACTUALLY FIX THIS
		mixin.getInitialState = function () {
			var dispatcher = this.findFluxDispatcher(),
				store = dispatcher.getStore(storeType);

			if (!store.hasInitalized()) {
				store.requestInitalization();
			}
		};
	}
	return mixin;
};

module.exports = Store;
