/** @jsx React.DOM */
var React = require('react'),
	Flux = require("../flux");

module.exports = React.createClass({
	mixins: [Flux.MessageStore.mixin()],

	findFluxDispatcher: function () {
		return this.props.dispatcher;
	},

	getAsyncInitialState: function (cb) {
		cb(null, {
			crap: 1
		});
	},

	render: function() {
		if (!this.stores.messages) { return <div/>; }

		return (
			<div data-state={JSON.stringify(this.state)}>
				{this.state.crap}
				{this.stores.messages.message}
			</div>
		);
	}
});
