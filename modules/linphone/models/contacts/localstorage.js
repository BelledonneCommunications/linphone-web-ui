/**
 * Contacts engine using localstorage
 */
/*globals linphone,PersistentStorage,jsonsql */

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

linphone.models.contacts.localStorage.engine.prototype.count = function() {
	var size = 0;
	var key;
	for (key in this.data.list) {
		if (this.data.list.hasOwnProperty(key)) {
			size++;
		} 
	}
	return size;
};
 
linphone.models.contacts.localStorage.engine.prototype.list = function(filters) {
	var data = this.data.list;
	var ret;
	if(typeof filters === 'string' && filters.length) {
		ret = jsonsql.query('SELECT * FROM json ' + filters, data);
    } else {
		ret =  data;
	}
	return ret;
};


//
// CRUD
//
 
linphone.models.contacts.localStorage.engine.prototype.read = function(id) {
	return this.data.list[id];
};

linphone.models.contacts.localStorage.engine.prototype.create = function(object) { 
	this.data.index = this.data.index +1; 
	object.id= this.data.index;
	this.data.list[this.data.index] = object;
};
 
linphone.models.contacts.localStorage.engine.prototype.update = function(id, object) {
	this.data.list[id] = object;
};

linphone.models.contacts.localStorage.engine.prototype.remove = function(id) {
	delete this.data.list[id];
};