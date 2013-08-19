/**
 * History engine using localstorage
 */
/*globals linphone,PersistentStorage */

linphone.models.history.localStorage = {
	/*
	 * Object
	 */
	object: {
	},
	
	/* 
	 * Engine
	 */
	engine: function(name, debug) {
		var dbname = name + ' History';
		
		// Get data from local storage or init
		this.ps = new PersistentStorage(dbname, {
			list: []
		}, 10000, debug);
		this.data = this.ps.config;
	}
};


//
// List
//

linphone.models.history.localStorage.engine.prototype.count = function(filters, callback) {
	if(typeof callback !== 'undefined') {
		callback(null, this.data.list.length);
	}
};
 
linphone.models.history.localStorage.engine.prototype.list = function(filters, callback) {
	if(typeof callback !== 'undefined') {
		callback(null, this.data.list);
	}
};


//
// CRUD
//
 
linphone.models.history.localStorage.engine.prototype.read = function(id, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};

linphone.models.history.localStorage.engine.prototype.create = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};
 
linphone.models.history.localStorage.engine.prototype.update = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};

linphone.models.history.localStorage.engine.prototype.remove = function(id, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};