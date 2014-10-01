/** @jsx React.DOM */
var React = require("React"),
	router = require("react-router");

// React router objects
var DefaultRoute = router.DefaultRoute,
	NotFoundRoute = router.NotFoundRoute,
	Redirect = router.Redirect,
	Route = router.Route,
	Routes = router.Routes,
	Link = router.Link,
	ActiveState = router.ActiveState,
	AsyncState = router.AsyncState;

// These are our route controllers
var App = require("./app.jsx"),
	Inbox = require("./inbox.jsx"),
	Calendar = require("./calendar.jsx"),
	Dashboard = require("./dashboard.jsx");

module.exports =
	<Routes location="history">
		<Route name="app" path="/" handler={App}>
			<Route name="inbox" handler={Inbox} />
			<Route name="calendar" handler={Calendar} />
			<DefaultRoute handler={Dashboard} />
		</Route>
	</Routes>;
