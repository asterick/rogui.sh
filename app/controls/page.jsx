/** @jsx React.DOM */
var React = require('react'),
	Async = require('react-async');

module.exports = React.createClass({
	mixins: [Async.Mixin],

	getInitialStateAsync: function (cb) {
		setTimeout(function () {cb(null, { message: "hello" }); }, 1000);
	},

	componentDidMount: function () {
		var node = this.getDOMNode(),
			state = node.dataset.state || "{}";

		this.replaceState(JSON.parse(node.dataset.state))
	},

	render: function() {
		return (
			<div data-state={JSON.stringify(this.state)}>
				{this.state.message}
			</div>
		);
	}
});
