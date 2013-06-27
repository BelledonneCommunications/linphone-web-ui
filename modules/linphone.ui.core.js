/*globals jQuery,linphone,InstallTrigger,chrome*/

linphone.ui.core = {
	instanceCount: 1,
	instances: [],
	init: function(base) {

		/* addEvent following Browser */
		if (jQuery.client.browser !== 'Explorer') {
			linphone.ui.core._addEvent = function(obj, name, func) {
				obj.addEventListener(name, func, false);
			};
		} else {
			linphone.ui.core._addEvent = function(obj, name, func) {
				obj.attachEvent("on" + name, func);
			};
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
		config.file.codebase = "";
		if (typeof config.file.description !== 'undefined') {
			if (config.file.browser === 'Explorer') {
				config.file.codebase = config.file.description.file;
				if(forceVersion) {
					config.file.codebase += '#Version=' + config.file.description.version;
				}
			}
		}
	},
	translate: function(base) {
	},
	
	/* Callbacks */
	_globalStateChanged: function(core, state, message) {
		linphone.core.log(core + '| State: ' + state + ', ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('globalStateChanged', [state, message]);
		})();
	},
	_registrationStateChanged: function(core, proxy, state, message) {
		linphone.core.log(core + '| (' + proxy + '): ' + state + ', ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('registrationStateChanged', [proxy, state, message]);
		})();
	},
	_callStateChanged: function(core, call, state, message) {
		linphone.core.log(core + '| (' + call + '): ' + state + ', ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('callStateChanged', [call, state, message]);
		})();
	},
	_authInfoRequested: function(core, realm, username) {
		linphone.core.log(core + '| Auth: ' + realm + ', ' + username);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {

			base.trigger('authInfoRequested', [realm, username]);
		})();
	},
	_displayStatus: function(core, message) {
		linphone.core.log(core + '| Status: ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {

			base.trigger('displayStatus', [message]);
		})();
	},
	_displayMessage: function(core, message) {
		linphone.core.log(core + '| Message: ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayMessage', [message]);
		})();
	},
	_displayWarning: function(core, message) {
		linphone.core.log(core + '| Warning: ' + message);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayWarning', [message]);
		})();
	},
	_displayUrl: function(core, message, url) {
		linphone.core.log(core + '| Url: ' + message + ' - ' + url);
		var base = linphone.ui.core.instances[core.magic];
		linphone.ui.exceptionHandler(base, function() {
			base.trigger('displayUrl', [message, url]);
		})(base);
	},
	
	/* Helpers */
	_addEvent: null,
	addEvent: function(obj, name, func) {
		linphone.ui.core._addEvent(obj, name, func);
	},
	
	/* */
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
		linphone.core.log('Core detection ...');
		var core = linphone.ui.getCore(base);
		var config = linphone.ui.configuration(base);
		if (typeof core !== 'undefined' && typeof core.valid !== 'undefined' && core.valid) {
			if(!linphone.ui.core.outdated(config.version, core.pluginVersion)) {
				linphone.core.log('Core detection: Ok');
				// UI TODO
				base.find('.window .install').hide();
				return true;
			} else {
				linphone.core.log('Core detection: Outdated');
				linphone.ui.core.unload(base);
				
				// UI TODO
				if (config.file.browser === 'Explorer') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else if (config.file.browser === 'Firefox') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else if (config.file.browser === 'Chrome') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_download'));
				}
				if (config.file.browser === "Firefox") {
					if (InstallTrigger.updateEnabled()) {
						InstallTrigger.install({
							"Linphone-Web": {
								URL: config.file.description.file,
								IconURL: config.file.description.icon
							}
						});
					}
				} else if (config.file.browser === "Chrome") {
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
			}
		} else if(typeof config.file.description !== 'undefined'){
			linphone.core.log('Core detection: Not installed');
			if (config.file.browser === "Firefox") {
				if (InstallTrigger.updateEnabled()) {
					InstallTrigger.install({
						"Linphone-Web": {
							URL: config.file.description.file,
							IconURL: config.file.description.icon
						}
					});
				}
			} else if (config.file.browser === "Chrome") {
				chrome.webstore.install(config.file.description.file, 
					function(){
						linphone.ui.core.unload(base);
						linphone.ui.core.load(base);
					}, function(){});
			}
		}
		return false;
	},
	unload: function(base) {
		linphone.ui.exceptionHandler(base, function() {
			linphone.core.log('Unload Core');

			base.find('> .content .loading').show();
	
			// jQuery and embedded objects are not friends: use DOM
			var nodes = base.get(0).childNodes;
			for(var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				var obj = jQuery(node);
				if(obj.hasClass('core')) {
					base.get(0).removeChild(node);
					delete linphone.ui.core.instances[node.magic];
				}
			}
		});
	},
	load: function(base) {
		linphone.ui.exceptionHandler(base, function() {
			linphone.core.log('Loading Core...');

			// UI TODO
			base.find('.window .install').show();
			base.find('.window .error').hide();
			
			navigator.plugins.refresh(false);
			var config = linphone.ui.configuration(base);
			var functionName = '__linphone_ui_core_loadHandler' + linphone.ui.core.instanceCount;
			window[functionName] = function (core) {
				linphone.ui.core._loadHandler(core);
				window[functionName] = undefined;
			    try{
					delete window[functionName];
			    } catch(e) {
			    }
			};
			var core = linphone.ui.template(base, 'object.core', {
				fct: functionName,
				magic : linphone.ui.core.instanceCount,
				codebase : config.codebase
			});
			linphone.ui.core.instances[linphone.ui.core.instanceCount] = base;
			linphone.ui.core.instanceCount = linphone.ui.core.instanceCount + 1;
			core.appendTo(base);
	
			linphone.ui.core.detect(base);
		})();
	},
	
	/* */
	_loadHandler: function(core) {
		linphone.core.log('Core handler');
		if(typeof core === 'undefined' || typeof core.valid === 'undefined') {
			linphone.core.error('_loadHandler fail: \'core\' object is invalid');
			return;
		}
		var base = linphone.ui.core.instances[core.magic];
		if(typeof base === 'undefined') {
			linphone.core.error('_loadHandler fail: can\'t retrieve \'core\' data');
			return;
		}
		linphone.ui.exceptionHandler(base, function() {
			base.find('.window .install').hide(); // Force hide
		
			// Enable debug only if lpdebug is set to true	
			if(jQuery.getUrlVar('lpdebug') === '1' ||
				jQuery.getUrlVar('lpdebug') === 'true' ||
				jQuery.getUrlVar('lpdebug') === 'yes') {
				core.logHandler = linphone.ui.logHandler;
			}
	
			linphone.ui.core.addEvent(core, 'globalStateChanged', linphone.ui.core._globalStateChanged);
			linphone.ui.core.addEvent(core, 'callStateChanged', linphone.ui.core._callStateChanged);
			linphone.ui.core.addEvent(core, 'registrationStateChanged', linphone.ui.core._registrationStateChanged);
			linphone.ui.core.addEvent(core, 'authInfoRequested', linphone.ui.core._authInfoRequested);
			linphone.ui.core.addEvent(core, 'displayStatus', linphone.ui.core._displayStatus);
			linphone.ui.core.addEvent(core, 'displayMessage', linphone.ui.core._displayMessage);
			linphone.ui.core.addEvent(core, 'displayWarning', linphone.ui.core._displayWarning);
			linphone.ui.core.addEvent(core, 'displayUrl', linphone.ui.core._displayUrl);
			var init_count = (typeof linphone.core.data().init_count !== "undefined") ? linphone.core.data().init_count : 0;
			var ret_value = core.init("local:///.linphonerc");
			if (ret_value !== 0) {
				linphone.core.log('Core init error: ' + ret_value);
				linphone.ui.error(base, 'errors.core.' + ret_value);
			} else {
				// Random port at first init
				if(init_count === 0) {
					core.sipPort = Math.floor((Math.random()*(65535 - 1024)) + 1024);
				}
				linphone.core.log('Sip port: ' + core.sipPort);
				
				// Init properties 
				core.staticPicture = "internal:///share/images/nowebcamCIF.jpg";
				core.ring = "internal:///share/sounds/linphone/rings/oldphone.wav";
				core.ringback = "internal:///share/sounds/linphone/ringback.wav";
				core.playFile = "internal:///share/sounds/linphone/rings/toy-mono.wav";
				core.rootCa = "internal:///share/linphone/rootca.pem";		
	
				// Init volumes settings
				var rec_level = (typeof linphone.core.data().rec_level !== "undefined") ? linphone.core.data().rec_level : 100;
				core.recLevel = rec_level;
	
				var play_level = (typeof linphone.core.data().play_level !== "undefined") ? linphone.core.data().play_level : 100;
				core.playLevel = play_level;
	
				var ring_level = (typeof linphone.core.data().ring_level !== "undefined") ? linphone.core.data().ring_level : 100;
				core.ringLevel = ring_level;
	
				base.find('> .content .loading').hide();
	
				linphone.core.data().init_count = init_count + 1;
				
				// Force network updates (hack)
				var transports = core.sipTransports;
				if(transports.tlsPort !== 0) {
					transports.udpPort = transports.tlsPort;
					transports.tlsPort = 0;
					core.sipTransports = transports;
					transports.tlsPort = transports.udpPort;
					transports.udpPort = 0;
					core.sipTransports = transports;
				}
	
				core.iterateEnabled = true;
				linphone.core.log('Core loaded');
			}
		})();
	}
};