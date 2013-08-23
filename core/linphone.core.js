/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals console,localStorage */

var linphone = {};
linphone.core = {
	log: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.log(message);
		}
	},
	warn: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.warn(message);
		}
	},
	error: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.error(message);
		}
	},
	info: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.info(message);
		}
	},
	debug: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.debug(message);
		}
	},
	data: function() {
		try {
			if (typeof window.localStorage !== 'undefined') {
				return localStorage;
			}
		} catch(ex) {
		}
		return {};
	}
};
