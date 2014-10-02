var url = require("url"),
	path = require("path"),
	express = require('express'),
	ReactAsync = require('react-async');

var app = module.exports = express(),
	static_path = path.join(__dirname, "/../public"),
	Application = require('./application.jsx');

// Configure our application
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, "/../views"));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Middleware layer
app.use(express.static(static_path));

app.use(function(req, res, next){
	ReactAsync.renderComponentToStringWithAsyncState(
		Application({ path: req.path }),
		function(err, markup) {
			res.render("layout.html", {
				content: markup,
				title: "game engine"
			});
	});
});
