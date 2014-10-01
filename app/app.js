require('node-jsx').install({extension: '.jsx'});

var path = require("path"),
	express = require('express'),
	morgan  = require('morgan'),
	routes = require('./controls/router.jsx'),
	React = require('react');

var app = express(),
	static_path = path.join(__dirname, "/../public");

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, "/../views"));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

// Middleware layer
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('combined'));
}
app.use(express.static(static_path));

// TODO: CRAP

app.use(function(req, res, next){

	// TODO: MAKE THIS ASYNC COMPLIANT
	React.renderComponentToString(routes, req.path).then(function(markup) {
		res.render("layout.html", {
			content: markup,
			title: "game engine"
		});
	});
});

module.exports = app;
