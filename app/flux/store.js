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
		that._dataset = inti;
	} else if (!that._options.initalize) {
		that._dataset = null;
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
	this._options.initalize.call(this, done);
};

Store.prototype.hasInitalized = function () {
	return store._dataset !== undefined;
};

Store.prototype.mixin = function (name) {
	var store = this,
		mixin = {
			componentWillMount: function () {
				this.stores || (this.stores = {});
				this.stores[name] = store._dataset;
				store.subscribe(name, this);
			},

			componentWillMount: function () {
				store.unsubscribe(this);
			}
		};

	if (this._options.async) {
		mixin.mixins = [ReactAsync.Mixin];
		mixin.getInitialStateAsync = function(cb) {
			var that = this;

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
				store.requestInitalization(initState());
			}
		};
	} else {
		// TODO: ACTUALLY FIX THIS
		mixin.getInitialState = function () {
			if (!store.hasInitalized()) {
				store.requestInitalization();
			}
		};
	}
};

module.exports = Store;
