/**
 * History engine using core
 */
/*globals linphone,jsonsql */

linphone.models.history.core = {	
	/* 
	 * Engine
	 */
	engine: function(base, debug) {
		linphone.models.history.constructor.call(this);
		this.base = base;
		this.debug = debug;
		
		// Use base callStateChanged event for engine create event
		base.on('callStateChanged', { engine: this }, linphone.models.history.core.onCallStateChanged);
	},
	
	/* Call state */
	onCallStateChanged: function(event, call, state, message) {
		var that = event.data.engine;
		if(state === linphone.core.enums.callState.End ||
			state === linphone.core.enums.callState.Error) {
			that.onUpdate.fire(linphone.models.history.events.create, call.callLog);
		}
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
		filters = filters.replace(/date/g, 'startDate');
		ret = jsonsql.query('SELECT * FROM json ' + filters, logs);
    } else {
		ret =  logs;
	}
	
	return ret.map(linphone.models.history.core.engine.internal2external);
};

linphone.models.history.core.engine.internal2external = function(id) {
	var log = id;
	
	// Map to JS object
	return {
		id: id,
		from: log.from.asString(),
		to: log.to.asString(),
		remote: log.remoteAddress.asString(),
		date: log.startDate,
		duration: log.duration,
		direction: log.dir,
		status: log.status
	};
};

//
// CRUD
//
 
linphone.models.history.core.engine.prototype.read = function(id) {
	return linphone.models.history.core.engine.internal2external(id);
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
	this.onUpdate.fire(linphone.models.history.events.remove, id);
};