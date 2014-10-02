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
	getDefaultProps: function () {
		return {
			'path': '/',
			'dispatcher': new Flux()
		};
	},

	render: function() {
		return (
			<div>
				<Locations path={this.props.path}>
					<Location path="/message" handler={Page} />
					<NotFound handler={Page404} />
				</Locations>
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
			dispatcher: new Flux(stores)
		}), document.body);
	}
}

module.exports = Application;
