/** @jsx React.DOM */
var React = require('react'),
	Router = require('react-router-component');

var Page404 = require("./controls/404.jsx"),
	Page = require("./controls/page.jsx"),
	Locations = Router.Locations,
	Location = Router.Location,
	NotFound = Router.NotFound;

var Application = React.createClass({
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

module.exports = Application;

if (typeof window !== 'undefined') {
	window.onload = function() {
		React.renderComponent(Application(), document.body);
	}
}
