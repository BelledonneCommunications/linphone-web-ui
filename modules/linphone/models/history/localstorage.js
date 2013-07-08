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

linphone.models.history.localStorage.engine.prototype.count = function() {
	return this.data.list.length;
};
 
linphone.models.history.localStorage.engine.prototype.list = function(filters) {
	return this.data.list;
};


//
// CRUD
//
 
linphone.models.history.localStorage.engine.prototype.read = function(id) {
};

linphone.models.history.localStorage.engine.prototype.create = function(object) {
};
 
linphone.models.history.localStorage.engine.prototype.update = function(id, object) {
};

linphone.models.history.localStorage.engine.prototype.remove = function(id) {
};