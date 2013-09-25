/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

/**
 * Contacts engine using core
 */
/*globals linphone,jsonsql */

linphone.models.contacts.core = {    
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

linphone.models.contacts.core.engine.prototype.count = function(filters, callback) {
    var core = linphone.ui.getCore(this.base);
    var friends = core.getFriendList();
    if(typeof callback !== 'undefined') {
        callback(null, friends.length);
    }
};
 
linphone.models.contacts.core.engine.prototype.list = function(filters, callback) {
    var core = linphone.ui.getCore(this.base);
    var friends = core.getFriendList();
    
    var ret = friends;
    if(typeof callback !== 'undefined') {
        callback(null, ret);
    }
};


//
// CRUD
//
 
linphone.models.contacts.core.engine.prototype.read = function(id, callback) {
    if(typeof callback !== 'undefined') {
        callback(null, linphone.models.contacts.core.engine.internal2external(id));
    }
};

linphone.models.contacts.core.engine.prototype.create = function(object, callback) {
    var core = linphone.ui.getCore(this.base);
    var friend =  object.friend;
	var address = object.address;
	var name = object.name;
	
	friend.address = address;
    friend.name =  name;
	friend.subscribesEnabled = false;
	friend.incSubscribePolicy = linphone.core.enums.subscribePolicy.Deny;
    core.addFriend(friend);
    if(typeof callback !== 'undefined') {
        callback(null, true);
    }
};
 
linphone.models.contacts.core.engine.prototype.update = function(object, callback) {
	var friend =  object.friend;
	var address = object.address;
	var name = object.name;
	
    friend.edit();
	friend.address = address;
	friend.name = name;
	friend.done();
    if(typeof callback !== 'undefined') {
        callback("Not implemented", null);
    }
};

linphone.models.contacts.core.engine.prototype.remove = function(object, callback) {
    var core = linphone.ui.getCore(this.base);
    core.removeFriend(object);
    if(typeof callback !== 'undefined') {
        callback(null, true);
    }
};