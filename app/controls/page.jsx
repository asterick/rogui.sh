/** @jsx React.DOM */
var React = require('react'),
	Flux = require("../flux");

module.exports = React.createClass({
	mixins: [Flux.MessageStore.mixin()],

	findFluxDispatcher: function () {
		return this.props.dispatcher;
	},

	getAsyncInitalStateAsync: function (cb) {
		cb(null, {});
	},

	render: function() {
		if (!this.stores.messages) { return <div/>; }

		return (
			<div data-state={JSON.stringify(this.state)}>
				{this.stores.messages.message}
			</div>
		);
	}
});
