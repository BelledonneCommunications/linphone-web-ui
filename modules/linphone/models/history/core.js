/**
 * History engine using core
 */
/*globals linphone,jsonsql */

linphone.models.history.core = {
	/*
	 * Object
	 */
	object: {
		from: null,
		to: null,
		date: null,
		duration: null,
		direction: null,
		status: null
	},
	
	/* 
	 * Engine
	 */
	engine: function(base, debug) {
		this.base = base;
		this.debug = debug;
	}
};


//
// List
//

linphone.models.history.core.engine.prototype.count = function() {
	var core = linphone.ui.getCore(this.base);
	var logs = core.callLogs;
	return logs.length;
};
 
linphone.models.history.core.engine.prototype.list = function(filters) {
	var core = linphone.ui.getCore(this.base);
	var logs = core.callLogs;
	
	var ret;
	if(typeof filters === 'string' && filters.length) {
		filters = filters.replace(/direction/g, 'dir');
		ret = jsonsql.query('SELECT * FROM json WHERE ' + filters, logs);
    } else {
		ret =  logs;
	}
	return ret;
};


//
// CRUD
//
 
linphone.models.history.core.engine.prototype.read = function(id) {
	var log = id;
	
	// Map to JS object
	return {
		from: log.from,
		to: log.to,
		date: log.startDate,
		duration: log.duration,
		direction: log.dir,
		status: log.status
	};
};

linphone.models.history.core.engine.prototype.create = function(object) {
	// Do nothing
};
 
linphone.models.history.core.engine.prototype.update = function(id, object) {
	// Do nothing
};

linphone.models.history.core.engine.prototype.remove = function(id) {
	var core = linphone.ui.getCore(this.base);
	core.removeCallLog(id);
};