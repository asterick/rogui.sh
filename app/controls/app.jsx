/** @jsx React.DOM */
var React = require("React"),
	router = require("react-router");

// React router objects
var Link = router.Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<header>
					<ul>
						<li><Link to="app">Dashboard</Link></li>
						<li><Link to="inbox">Inbox</Link></li>
						<li><Link to="calendar">Calendar</Link></li>
					</ul>
				</header>

				<this.props.activeRouteHandler/>
			</div>
		);
	}
});
