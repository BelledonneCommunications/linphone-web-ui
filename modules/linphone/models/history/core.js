/**
 * History engine using core
 */
/*globals linphone */

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
	return logs;
};


//
// CRUD
//
 
linphone.models.history.core.engine.prototype.read = function(id) {
	var log = id;
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