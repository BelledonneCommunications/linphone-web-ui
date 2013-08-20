/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */
/**
 * Contacts engine using localstorage
 */
/*globals linphone,PersistentStorage,jsonsql,jQuery */

linphone.models.contacts.localStorage = {
	/*
	 * Object
	 */
	object : {
		id: null,
		lastname: null,
		firstname: null,
		address: null,
		status: null,
		img : null
	},
	
	/* 
	 * Engine
	 */
	engine: function(name, debug) {
		var dbname = name + ' Contacts';
		
		// Get data from local storage or init
		this.ps = new PersistentStorage(dbname, {
			list: {},
			index: 0
		}, 10000, debug);
		this.data = this.ps.config;
	}
};


//
// List
//

linphone.models.contacts.localStorage.engine.prototype.count = function(filters, callback) {
	var size = 0;
	var key;
	for (key in this.data.list) {
		if (this.data.list.hasOwnProperty(key)) {
			size++;
		} 
	}
	if(typeof callback !== 'undefined') {
		callback(null, size);
	}
};
 
linphone.models.contacts.localStorage.engine.prototype.list = function(filters, callback) {
	var data = this.data.list;
	var ret;
	if(typeof filters === 'string' && filters.length) {
		ret = jsonsql.query('SELECT * FROM json ' + filters, data);
    } else {
		ret =  data;
	}
	if(typeof callback !== 'undefined') {
		callback(null, ret);
	}
};


//
// CRUD
//
 
linphone.models.contacts.localStorage.engine.prototype.read = function(id, callback) {
	if(typeof callback !== 'undefined') {
		callback(null, this.data.list[id]);
	}
};

linphone.models.contacts.localStorage.engine.prototype.create = function(object, callback) { 
	this.data.index = this.data.index + 1; 
	object.id = this.data.index;
	this.data.list[this.data.index] = object;
	if(typeof callback !== 'undefined') {
		callback(null, true);
	}
};
 
linphone.models.contacts.localStorage.engine.prototype.update = function(object, callback) {
	// Don't care to save id in object
	var dupObject = jQuery.extend(true, {}, object);
	delete dupObject.id;
	
	this.data.list[object.id] = dupObject;
	if(typeof callback !== 'undefined') {
		callback(null, true);
	}
};

linphone.models.contacts.localStorage.engine.prototype.remove = function(id, callback) {
	delete this.data.list[id];
	if(typeof callback !== 'undefined') {
		callback(null, true);
	}
};