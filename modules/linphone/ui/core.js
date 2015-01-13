/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone,InstallTrigger,chrome*/

linphone.ui.core = {
	instanceCount: 1,
	instances: [],
	detectionStatus: {
		Installed: 0,
		NotInstalled: 1,
		Outdated: 2
	},
	
	/* Helpers */
	_addEvent: null,
	addEvent: function(obj, name, func) {
		linphone.ui.core._addEvent(obj, name, func);
	},
	
	/* Init */
	init: function(base) {
		var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
		/* addEvent following Browser */
		if (jQuery.client.browser !== 'Explorer') {
			linphone.ui.core._addEvent = function(obj, name, func) {
				obj.addEventListener(name, func, false);
			};
		} else {
			if (isIE11) {
				linphone.ui.core._addEvent = function(obj, name, func) {
					obj['on' + name] = func;
				};
			} else {
				linphone.ui.core._addEvent = function(obj, name, func) {
					obj.attachEvent('on' + name, func);
				};
			}
		}
		
		var config = linphone.ui.configuration(base);
	
		// Force version
		var forceVersion = config.forceVersion;
		if(typeof forceVersion === 'undefined') {
			forceVersion = true;
		}

		// Find the correct plugin file
		config.file = {};
		if (typeof config.files[jQuery.client.os] !== 'undefined') {
			if(typeof config.files[jQuery.client.os][jQuery.client.arch] !== 'undefined') {
				if (typeof config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser] !== 'undefined') {
					config.file.description = config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser];
					config.file.browser = jQuery.client.browser;
				} else {
					config.file.description = config.files[jQuery.client.os][jQuery.client.arch].DEFAULT;
					config.file.browser = 'DEFAULT';
				}
			}
		}

		// Specific updates
		config.file.codebase = '';
		if (typeof config.file.description !== 'undefined') {
			if (config.file.browser === 'Explorer') {
				config.file.codebase = config.file.description.file;
				if(forceVersion) {
					config.file.codebase += '#Version=' + config.file.description.version;
				}
			}
		}
		
		base.on('networkStateChanged', linphone.ui.core.onNetworkStateChanged); 
	},
	translate: function(base) {
	},
	
	/* Callbacks */
	_globalStateChanged: function(core, state, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_globalStateChanged fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_globalStateChanged fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| State: ' + state + ', ' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('globalStateChanged', [state, message]);
		})();
	},
	_registrationStateChanged: function(core, proxy, state, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_registrationStateChanged fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_registrationStateChanged fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| (' + proxy + '): ' + state + ', ' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('registrationStateChanged', [proxy, state, message]);
		})();
	},
	_callStateChanged: function(core, call, state, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_callStateChanged fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_callStateChanged fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| (' + call + '): ' + state + ', ' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('callStateChanged', [call, state, message]);
		})();
	},
	_authInfoRequested: function(core, realm, username, domain) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayStatus fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_authInfoRequested fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Auth: ' + realm + ', ' + username + ', ' + domain );
		linphone.ui.exceptionHandler(base, function() {

			base.trigger('authInfoRequested', [realm, username, domain]);
		})();
	},
	_notifyPresenceReceived: function(core, friend) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayStatus fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_notifyPresenceReceived fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		//linphone.ui.logger.log(base, core + '| Presence: ' + fr + ', ' + username);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('notifyPresenceReceived', [core, friend]);
		})();
	},
	_newSubscriptionRequested: function(core, friend, url) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayStatus fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_newSubscriptionRequested fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		//linphone.ui.logger.log(base, core + '| Auth: ' + realm + ', ' + username);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('newSubscriptionRequested', [core, friend, url]);
		})();
	},
	_displayStatus: function(core, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayStatus fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_displayStatus fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Status: ' + message);
		linphone.ui.exceptionHandler(base, function() {

			base.trigger('displayStatus', [message]);
		})();
	},
	_displayMessage: function(core, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayMessage fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_displayMessage fail: can\'t retrieve data associated to the \'core\' objecta');
			return;
		}
		linphone.ui.logger.log(base, core + '| Message: ' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayMessage', [message]);
		})();
	},
	_displayWarning: function(core, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayWarning fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_displayWarning fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Warning: ' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayWarning', [message]);
		})();
	},
	_displayUrl: function(core, message, url) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_displayUrl fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_displayUrl fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Url: ' + message + ' - ' + url);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayUrl', [message, url]);
		})();
	},
	_callStatsUpdated: function(core, call, stats) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_callStatsUpdated fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_callStatsUpdated fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| (' + call + '): ' + stats);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('callStatsUpdated', [call, stats]);
		})();
	},
	_messageReceived: function(core, room, message) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_messageReceived fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_messageReceived fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Message received' + ':' + message);
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('messageReceived', [room, message]);
		})();
	},
	_isComposingReceived: function(core, room) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, '_isComposingReceived fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, '_isComposingReceived fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, core + '| Contact is composing' + ':' + room.peerAddress.asString());
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('isComposingReceived', [room]);
		})();
	},
	
	/* Core management */
	outdated: function(actual, plugin) {
		var version1 = actual.split('.');
		var version2 = plugin.split('.');
		for(var i = 0; i < version1.length && i < version2.length; ++i) {
			if(i >= version1.length) {
				return false;
			}
			if(i >= version2.length) {
				return true;
			}
			var number1 = parseInt(version1[i], 10);
			var number2 = parseInt(version2[i], 10);
			if(number2 < number1) {
				return true;
			} else if(number2 > number1) {
				return false;
			}
		}
		return false;
	},
	detect: function(base) {
		linphone.ui.logger.log(base, 'Core detection ...');
		var core = linphone.ui.getCore(base);
		var config = linphone.ui.configuration(base);
		if (linphone.core.isValid(core)) {			
			if(!linphone.ui.core.outdated(config.version, core.pluginVersion)) {
				linphone.ui.logger.log(base, 'Core detection: Ok');
				return linphone.ui.core.detectionStatus.Installed;
			} else {
				linphone.ui.logger.log(base, 'Core detection: Outdated');
				linphone.ui.core.unload(base);
				
				// Browser update
				if (config.file.browser === 'Firefox') {
					if (InstallTrigger.updateEnabled()) {
						InstallTrigger.install({
							'Linphone-Web': {
								URL: config.file.description.file,
								IconURL: config.file.description.icon
							}
						});
					}
				} else if (config.file.browser === 'Chrome') {
					chrome.webstore.install(config.file.description.file, 
						function() {
							linphone.ui.core.unload(base);
							linphone.ui.core.load(base);
						}, function(){});
				} /*else if (config.file.browser === 'Explorer') {
					linphone.ui.configuration(base).forceVersion = true;
					linphone.ui.core.init(base);
					linphone.ui.core.load(base);
				}*/
				return linphone.ui.core.detectionStatus.Outdated;
			}
		} else if(typeof config.file.description !== 'undefined'){
			linphone.ui.logger.log(base, 'Core detection: Not installed');
			
			// Browser installation
			if (config.file.browser === 'Firefox') {
				if (InstallTrigger.updateEnabled()) {
					InstallTrigger.install({
						'Linphone-Web': {
							URL: config.file.description.file,
							IconURL: config.file.description.icon
						}
					});
				}
			} else if (config.file.browser === 'Chrome') {
				chrome.webstore.install(config.file.description.file, 
					function(){
						linphone.ui.core.unload(base);
						linphone.ui.core.load(base);
					}, function(){});
			}
		}
		return linphone.ui.core.detectionStatus.NotInstalled;
	},
	unload: function(base) {
		linphone.ui.exceptionHandler(base, function() {
			linphone.ui.logger.log(base, 'Unload Core');

			base.find('> .content .loading').show();
	
			// jQuery and embedded objects are not friends: use DOM
			var table = base.find('> .objecttable').get(0);
			var nodes = table.childNodes;
			for(var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				var obj = jQuery(node);
				if(obj.hasClass('core')) {
					table.removeChild(node);
					delete linphone.ui.core.instances[node.magic];
				}
			}
			
			var configuration = linphone.ui.configuration(base);
			configuration.core.running = false;
		})();
	},
	load: function(base) {
		linphone.ui.exceptionHandler(base, function() {
			linphone.ui.logger.log(base, 'Loading Core...');
			
			navigator.plugins.refresh(false);
			var config = linphone.ui.configuration(base);
			var functionName = '__linphone_ui_core_loadHandler' + linphone.ui.core.instanceCount;
			window[functionName] = function (core) {
				linphone.ui.core._loadHandler(core);
				/* 
				 * 
				 * We must keep the function, because if the element is hidden, 
				 * when it will re-appear this function will be called again.
				 * 
				 */
				/*
				window[functionName] = undefined;
				try{
					delete window[functionName];
				} catch(e) {
				}
				*/
			};
			var core = linphone.ui.template(base, 'object.core', {
				fct: functionName,
				magic : linphone.ui.core.instanceCount,
				codebase : config.file.codebase
			});
			linphone.ui.core.instances[linphone.ui.core.instanceCount] = base;
			linphone.ui.core.instanceCount = linphone.ui.core.instanceCount + 1;
			var table = base.find('> .objecttable');
			table.append(core);
	
			var ret = linphone.ui.core.detect(base);
			if(ret !== linphone.ui.core.detectionStatus.Installed) {
				linphone.ui.core.error(base, ret);
			}
		})();
	},
	reload: function(base) {
		linphone.ui.reset(base);
		linphone.ui.core.unload(base);
		linphone.ui.core.load(base);
	},
	
	/* Call after detection */
	error: function(base, ret) {
		base.find('> .content .loading').hide();
		linphone.ui.view.show(base, 'plugin', ret);
	},
	loaded: function(base, core) {
		base.find('> .content .loading').hide();
		linphone.ui.view.show(base, 'login');
	},
	started: function(base, core) {
		var configuration = linphone.ui.configuration(base);
		configuration.core.running = true;
	},
	stopped: function(base, core) {
		var configuration = linphone.ui.configuration(base);
		configuration.core.running = false;
	},
	isRunning: function(base) {
		var configuration = linphone.ui.configuration(base);
		return configuration.core.running;
	},

	/* */
	_loadHandler: function(core) {
		if(!linphone.core.isValid(core)) {
			linphone.ui.logger.error(null, 'Core _loadHandler fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, 'Core _loadHandler fail: can\'t retrieve data associated to the \'core\' object');
			return;
		}
		linphone.ui.logger.log(base, 'Core handler');

		linphone.ui.exceptionHandler(base, function() {
			base.find('.window .install').hide(); // Force hide
			var config = linphone.ui.configuration(base);
			if(config.logs) {
				linphone.ui.logger.log(base, 'Enable core logging');
				core.logHandler = linphone.ui.logger.coreHandler(base);
			}
			linphone.ui.core.loaded(base, core);
		})();
	},

	start: function(core, configFilename, chatDbFilename) {
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			linphone.ui.core.addEvent(core, 'globalStateChanged', linphone.ui.core._globalStateChanged);
			linphone.ui.core.addEvent(core, 'callStateChanged', linphone.ui.core._callStateChanged);
			linphone.ui.core.addEvent(core, 'registrationStateChanged', linphone.ui.core._registrationStateChanged);
			linphone.ui.core.addEvent(core, 'authInfoRequested', linphone.ui.core._authInfoRequested);
			linphone.ui.core.addEvent(core, 'notifyPresenceReceived', linphone.ui.core._notifyPresenceReceived);
			linphone.ui.core.addEvent(core, 'newSubscriptionRequested', linphone.ui.core._newSubscriptionRequested);
			linphone.ui.core.addEvent(core, 'displayStatus', linphone.ui.core._displayStatus);
			linphone.ui.core.addEvent(core, 'displayMessage', linphone.ui.core._displayMessage);
			linphone.ui.core.addEvent(core, 'displayWarning', linphone.ui.core._displayWarning);
			linphone.ui.core.addEvent(core, 'displayUrl', linphone.ui.core._displayUrl);
			linphone.ui.core.addEvent(core, 'callStatsUpdated', linphone.ui.core._callStatsUpdated);
			linphone.ui.core.addEvent(core, 'messageReceived', linphone.ui.core._messageReceived);
			linphone.ui.core.addEvent(core, 'isComposingReceived', linphone.ui.core._isComposingReceived);
			var init_count = (typeof linphone.ui.persistent(base).init_count !== 'undefined') ? linphone.ui.persistent(base).init_count : 0;
			var ret_value = core.init(configFilename);
			if (ret_value !== 0) {
				linphone.ui.logger.log(base, 'Core init error: ' + ret_value);
				linphone.ui.error(base, 'errors.core.' + ret_value);
			} else {
				init_count++;
				linphone.ui.persistent(base).init_count = init_count;
				core.rootCa = 'internal:///share/linphone/rootca.pem';
				core.chatDatabasePath = chatDbFilename;
				core.fileTransferServer = "https://www.linphone.org:444/lft.php";

				// Set network state
				if(linphone.ui.isHeartBeatRunning(base)) {
					core.networkReachable = (linphone.ui.getNetworkState(base) === linphone.ui.networkState.Online);
				}

				linphone.ui.logger.log(base, 'Core started');
				linphone.ui.core.started(base, core);
			}
		})();
	},

	stop: function(core) {
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			linphone.ui.core.stopped(base, core);
			core.uninit();
			linphone.ui.logger.log(base, 'Core stopped');
		})();
	},

	/* Network events */
	onNetworkStateChanged: function(event, status) {
		var base = jQuery(this);
		var core = linphone.ui.getCoreNull(base);
		var configuration = linphone.ui.configuration(base);
		
		if(linphone.core.isValid(core) && configuration.core.running) {
			if(status === linphone.ui.networkState.Online) {
				core.networkReachable = true;
			} else {
				core.networkReachable = false;
			}
		}
	}
};
