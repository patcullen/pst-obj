// whole lot of options here
var config = {
	persisterName: 'persist'
};

// provide an objct that can be persisted.
var persistent_object = function(location, defaultValue, cb) {

	var fs = require('fs');

	// a function factory that provides a persistor for the object we return.
	var persister = function(obj) {
		return function(icb) {
			fs.writeFile(location, JSON.stringify(obj), function(err) {
				if (icb) icb(err);
			}); 
		};
	};
	
	// used below, factored like this to reduce code repitition.
	var doCallback = function(o, err) {
		Object.defineProperty(o, config.persisterName, { value: persister(o), enumerable: false });
		if (cb) cb(o, err)
	};
	
	// if the object exists and can be deserialized from the source, then we will use that, else a default object
	fs.readFile(location, 'utf8', function (err, data) {
		if (err) {
			doCallback(JSON.parse(JSON.stringify(defaultValue)), err);
		} else {
			try {
				doCallback(JSON.parse(data), null);
			} catch(cantRead) {
				doCallback(JSON.parse(JSON.stringify(defaultValue)), cantRead);
			}
		}
	});
	
};

// for setting/customizing the one option available...
var setConfig = function(o) {
	config = o;
};

// our api.
module.exports = {
	
	config: setConfig,
	
	get: persistent_object
	
};