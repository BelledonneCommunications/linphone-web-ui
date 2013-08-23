/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

function PersistentStorage(name, defaultConfig, timeout, debug) {
	this.name = name;
	this.__timeout = null;
	this.config = jQuery.extend(true, {}, defaultConfig);
	this.debug = debug;
	if(typeof timeout === 'undefined') {
		timeout = 10000;
	}
	var sync = true;
	try {
		if (typeof window.localStorage !== 'undefined') {
			if (typeof window.localStorage[this.name] !== 'undefined') {
				this.config = JSON.parse(window.localStorage[this.name]);
				sync = false;
			}
		}
	} catch(ex) {
		linphone.ui.logger.error(base, 'PersistentStorage | Can\'t read persistent storage, reset!');
	}
	this.sync();
	if(timeout) {
		this.start(timeout);
	}
};

PersistentStorage.prototype.sync = function () {
	window.localStorage[this.name] = JSON.stringify(this.config);
	if(this.debug) {
		linphone.core.log('PersistentStorage | Sync "' + this.name + '"');
	}
};

PersistentStorage.prototype.stop = function() {
	if(this.__timeout) {
		if(this.debug) {
			linphone.core.log('PersistentStorage | Stop automatic saving of "' + this.name + '"');
		}
		window.clearInterval(this.__timeout);
		this.__timeout = null;
		if (window.removeEventListener) { 
			window.removeEventListener("unload", this.fct, false); 
		} else if (window.attachEvent) { 
			window.detachEvent("onunload", this.fct); 
		}
	}
};

PersistentStorage.prototype.start = function(timeout) {
	var that = this;
	if(!this.__timeout) {
		if(this.debug) {
			linphone.core.log('PersistentStorage | Start automatic saving of "' + this.name + '"');
		}
		this.fct = function() {
			if(that.debug) {
				linphone.core.log('PersistentStorage | Automatic saving of "' + that.name + '"');
			}
			that.sync();
		};
		this.__timeout = window.setInterval(this.fct, timeout);
		if (window.addEventListener) { 
			window.addEventListener("unload", this.fct, false); 
		} else if (w.attachEvent) { 
			window.attachEvent("onunload", this.fct); 
		}
	}
};