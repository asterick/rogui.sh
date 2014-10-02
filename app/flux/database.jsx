/** @jsx React.DOM */
var React = require('react'),
	Async = require('react-async');

function Database(init) {
	this.storage = init || {};
}

Database.prototype.subscribe = function () {
	return {
		mixins: [Async.Mixin],

		getInitialStateAsync: function(cb) {
			setTimeout(function() {
				cb(null, { message: "hello world" });
			}, 1000);
		}
	}
};

module.exports = Database;
