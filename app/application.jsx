/** @jsx React.DOM */
var React = require('react'),
	Router = require('react-router-component'),
	Flux = require('./flux');

var Page404 = require("./controls/404.jsx"),
	Page = require("./controls/page.jsx"),
	Locations = Router.Locations,
	Location = Router.Location,
	NotFound = Router.NotFound;

var Application = React.createClass({
	click: function () {
		this.props.dispatcher.trigger("ACTION", 1, 2, 3);
	},

	render: function() {
		return (
			<div>
				<Locations path={this.props.path}>
					<Location path="/" handler={Page} dispatcher={this.props.dispatcher} />
					<NotFound handler={Page404} />
				</Locations>
				<button onClick={this.click}>Click</button>
			</div>
		)
	}
});

if (typeof window !== 'undefined') {
	window.onload = function() {
		var stores;

		if (document.body.dataset.fluxstores) try {
			stores = JSON.parse(document.body.dataset.fluxstores);
			delete document.body.dataset.fluxstores;
		} catch (e) { null ; }

		React.renderComponent(Application({
			dispatcher: new Flux.Dispatcher(stores)
		}), document.body);
	}
}

module.exports = Application;
