# pst-obj

_pst-obj_ is a cheap and quick utility for setting up a persistence layer in your app for [node](http://nodejs.org).

It extends the Object prototype with a single non-enumerable function that allows you persist that object to a specified location.

## Example
```javascript
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
```
## Installation

    $ npm install pst-obj

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
