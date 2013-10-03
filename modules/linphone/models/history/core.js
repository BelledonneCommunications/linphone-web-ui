/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

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
// Internal
//

linphone.models.history.core.engine.internal2external = function(id) {
	var log = id;
	
	// Map to JS object
	return {
		id: id,
		from: log.from.asString(),
		to: log.to.asString(),
		remote: log.remoteAddress.asString(),
		date: parseInt(log.startDate),
		duration: log.duration,
		direction: log.dir,
		status: log.status
	};
};


//
// List
//

linphone.models.history.core.engine.prototype.count = function(filters, callback) {
	var core = linphone.ui.getCore(this.base);
	var logs = core.callLogs;
	if(typeof callback !== 'undefined') {
		callback(null, logs.length);
	}
};
 
linphone.models.history.core.engine.prototype.list = function(filters, callback) {
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
	if(typeof callback !== 'undefined') {
		callback(null, ret.map(linphone.models.history.core.engine.internal2external));
	}
};


//
// CRUD
//
 
linphone.models.history.core.engine.prototype.read = function(id, callback) {
	if(typeof callback !== 'undefined') {
		callback(null, linphone.models.history.core.engine.internal2external(id));
	}
};

linphone.models.history.core.engine.prototype.create = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};
 
linphone.models.history.core.engine.prototype.update = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};

linphone.models.history.core.engine.prototype.remove = function(id, callback) {
	var core = linphone.ui.getCore(this.base);
	core.removeCallLog(id);
	this.onUpdate.fire(linphone.models.history.events.remove, id);
	if(typeof callback !== 'undefined') {
		callback(null, true);
	}
};