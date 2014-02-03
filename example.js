// Start ye'r engines
var
	http = require('http'),
	persist = require('pst-obj'),
	state = { hits: 0 }
;

// api/layer to interface with state object
function getPageCount() {
	state.hits++;
	state.persist();
	return state.hits;
}

// initialize state object
persist.get('state.json', state, function(data, err) {
	state = data;
	console.log('Stored state ' + (err ? 'created' : 'fetched') + ', number of site hits: ' + state.hits);
});

// Create an HTTP server
var app = http.createServer(function (req, res) {
	if (req.url == '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<h2>Welcome to a test</h2><p>This page has been loaded ' + getPageCount() + ' times.</p>');
	} else {
		res.end();
	}
});

// served
app.listen(8081);
console.log('Listening on http://0.0.0.0:8081');
