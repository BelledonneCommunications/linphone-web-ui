/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals linphone,jQuery */

linphone.models.history = {
	/*
	 * Object
	 */
	object: {
		remote: null,
		local: null,
		date: null,
		duration: null,
		direction: null,
		status: null
	},
	
	/*
	 * Events
	 */
	events: {
		create: 0,
		update: 1,
		remove: 2
	},
	
	constructor: function() {
		this.onUpdate = jQuery.Callbacks();
	}
};