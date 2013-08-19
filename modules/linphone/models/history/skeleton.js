/**
 * History engine Skeleton
 */

linphone.models.history.skeleton = {
	/*
	 * Object
	 */
	object: {
	},
	
	/* 
	 * Engine
	 */
	engine: function() {
		
	}
}


//
// List
//

linphone.models.history.skeleton.engine.prototype.count = function(filters, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};
 
linphone.models.history.skeleton.engine.prototype.list = function(filters, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null); 
	}
};


//
// CRUD
//
 
linphone.models.history.skeleton.engine.prototype.read = function(id, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};
 		
linphone.models.history.skeleton.engine.prototype.create = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};
 
linphone.models.history.skeleton.engine.prototype.update = function(object, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};

linphone.models.history.skeleton.engine.prototype.remove = function(id, callback) {
	// Do nothing
	if(typeof callback !== 'undefined') {
		callback("Not implemented", null);
	}
};