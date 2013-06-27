/*
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (C) 2012  Yann Diorcet <yann.diorcet@linphone.org>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

/*globals linphone,jQuery,InstallTrigger,chrome */

linphone.ui = {
	core_number: 1,
	core_data: [],
	helpers: {},
	locales: [ {
		name : 'English(US)',
		locale : 'en_US',
		icon : 'flag_us'
	}, {
		name : 'Français',
		locale : 'fr_FR',
		icon : 'flag_fr'
	}, {
		name : 'Deutsche',
		locale : 'de_DE',
		icon : 'flag_de'
	}, {
		name : 'Italiano',
		locale : 'it_IT',
		icon : 'flag_it'
	} ],
	getCore: function(target) {
		var base = linphone.ui.getBase(target);
		var nodes = base.get(0).childNodes;
		
		// jQuery and embedded objects are not friends: use DOM
		for(var i = 0; i < nodes.length; ++i) {
			var node = nodes[i];
			var obj = jQuery(node);
			if(obj.hasClass('core')) {
				return node;
			}
		}
		return null;
	},
	getBase: function(target) {
		if (typeof target === 'undefined') {
			target = jQuery(this);
		}
		if (target.is('.linphone')) {
			return target;
		} else {
			return target.parents('.linphone');
		}
	},
	_addEvent: null,
	addEvent: function(obj, name, func) {
		linphone.ui._addEvent(obj, name, func);
	},
	logHandler: function(level, message) {
		if(level === "error" || level === "fatal") {
			linphone.core.error(message);
		} else if(level === "warning") {
			linphone.core.warn(message);
		} else {
			linphone.core.log(message);
		}
	},
	loadHandler: function(core) {
		if(typeof core === 'undefined' || typeof core.valid === 'undefined') {
			return;
		}
		
		linphone.core.log('Load Core');
		var base = linphone.ui.core_data[core.magic];
		if(typeof base === 'undefined') {
			return;
		}
		base.find('.window .install').hide(); // Force hide
	
		// Enable debug only if lpdebug is set to true	
		if(jQuery.getUrlVar('lpdebug') === '1' ||
			jQuery.getUrlVar('lpdebug') === 'true' ||
			jQuery.getUrlVar('lpdebug') === 'yes') {
			core.logHandler = linphone.ui.logHandler;
		}

		linphone.ui.addEvent(core, 'globalStateChanged', linphone.ui.globalStateChanged);
		linphone.ui.addEvent(core, 'callStateChanged', linphone.ui.callStateChanged);
		linphone.ui.addEvent(core, 'registrationStateChanged', linphone.ui.registrationStateChanged);
		linphone.ui.addEvent(core, 'authInfoRequested', linphone.ui.authInfoRequested);
		linphone.ui.addEvent(core, 'displayStatus', linphone.ui.displayStatus);
		linphone.ui.addEvent(core, 'displayMessage', linphone.ui.displayMessage);
		linphone.ui.addEvent(core, 'displayWarning', linphone.ui.displayWarning);
		linphone.ui.addEvent(core, 'displayUrl', linphone.ui.displayUrl);
		var init_count = (typeof linphone.core.data().init_count !== "undefined") ? linphone.core.data().init_count : 0;
		var ret_value = core.init("local:///.linphonerc");
		if (ret_value !== 0) {
			linphone.ui.error(base, jQuery.i18n.get('errors.core.' + ret_value));
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
			base.find('.window .tools .mic-slider').slider('value', rec_level);
			core.recLevel = rec_level;

			var play_level = (typeof linphone.core.data().play_level !== "undefined") ? linphone.core.data().play_level : 100;
			base.find('.window .tools .hp-slider').slider('value', play_level);
			core.playLevel = play_level;

			var ring_level = (typeof linphone.core.data().ring_level !== "undefined") ? linphone.core.data().ring_level : 100;
			base.find('.window .tools .bell-slider').slider('value', ring_level);
			core.ringLevel = ring_level;

			base.find('.window .load').hide();

			linphone.ui.video.updateSelfView(base);
			linphone.ui.video.updateVideoView(base);
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
		}
	},
	globalStateChanged: function(core, state, message) {
		linphone.core.log(core + '| State: ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('globalStateChanged', [state, message]);
		base.find('.window > .footer > .status').html(jQuery.i18n.get('globalstatetext.' + linphone.core.enums.getGlobalStateText(state)));
	},
	registrationStateChanged: function(core, proxy, state, message) {
		linphone.core.log(core + '| (' + proxy + '): ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('registrationStateChanged', [proxy, state, message]);
	},
	callStateChanged: function(core, call, state, message) {
		linphone.core.log(core + '| (' + call + '): ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('callStateChanged', [call, state, message]);
	},
	authInfoRequested: function(core, realm, username) {
		linphone.core.log(core + '| Auth: ' + realm + ', ' + username);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('authInfoRequested', [realm, username]);
	},
	displayStatus: function(core, message) {
		linphone.core.log(core + '| Status: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayStatus', [message]);
	},
	displayMessage: function(core, message) {
		linphone.core.log(core + '| Message: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayMessage', [message]);
	},
	displayWarning: function(core, message) {
		linphone.core.log(core + '| Warning: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayWarning', [message]);
	},
	displayUrl: function(core, message, url) {
		linphone.core.log(core + '| Url: ' + message + ' - ' + url);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayUrl', [message, url]);
	},
	error: function(base, msg) {
		base.find('.window .load').hide();
		base.find('.window .error .text').html(msg);
		base.find('.window .error').show();
	},
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
		linphone.core.log('Detection: ...');
		var core = linphone.ui.getCore(base);
		var config = base.data('linphoneConfig');
		if (typeof core !== 'undefined' && typeof core.valid !== 'undefined' && core.valid) {
			if(!linphone.ui.outdated(config.version, core.pluginVersion)) {
				linphone.core.log('Detection: Ok');
				base.find('.window .install').hide();
				return true;
			} else {
				linphone.core.log('Detection: Outdated');
				linphone.ui.unload(base);
				if (config.description_browser === 'Explorer') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else if (config.description_browser === 'Firefox') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else if (config.description_browser === 'Chrome') {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_auto'));
				} else {
					jQuery('.linphone .window .install .text').html(jQuery.i18n.translate('base.install.text.outdated_download'));
				}
				if (config.description_browser === "Firefox") {
					if (InstallTrigger.updateEnabled()) {
						InstallTrigger.install({
							"Linphone-Web": {
								URL: config.description.file,
								IconURL: config.description.icon
							}
						});
					}
				} else if (config.description_browser === "Chrome") {
					chrome.webstore.install(config.description.file, function(){linphone.ui.unload(base);linphone.ui.load(base);}, function(){});
				} /*else if (config.description_browser === 'Explorer') {
					linphone.ui.init(base, true);
					linphone.ui.load(base);
				}*/
			}
		} else if(typeof config.description !== 'undefined'){
			linphone.core.log('Detection: Not installed');
			if (config.description_browser === "Firefox") {
				if (InstallTrigger.updateEnabled()) {
					InstallTrigger.install({
						"Linphone-Web": {
							URL: config.description.file,
							IconURL: config.description.icon
						}
					});
				}
			} else if (config.description_browser === "Chrome") {
				chrome.webstore.install(config.description.file, function(){linphone.ui.unload(base);linphone.ui.load(base);}, function(){});
			}
		}
		return false;
	},
	unload: function(base) {
		linphone.core.log('Unload');
		base.find('.window .load').show();
		
		// jQuery and embedded objects are not friends: use DOM
		var nodes = base.get(0).childNodes;
		for(var i = 0; i < nodes.length; ++i) {
			var node = nodes[i];
			var obj = jQuery(node);
			if(obj.hasClass('core')) {
				base.get(0).removeChild(node);
				delete linphone.ui.core_data[node.magic];
			}
		}
	},
	load: function(base) {
		linphone.core.log('Loading ...');
		base.find('.window .install').show();
		base.find('.window .error').hide();
		navigator.plugins.refresh(false);
		var config = base.data('linphoneConfig');
		var coreTemplate = base.find('.templates .Linphone-Core').render({
			magic : linphone.ui.core_number,
			codebase : config.codebase
		});
		var core = jQuery(coreTemplate);
		linphone.ui.core_data[linphone.ui.core_number] = base;
		linphone.ui.core_number = linphone.ui.core_number + 1;
		core.appendTo(base);

		linphone.ui.detect(base);
	},
	configure: function(base, config) {
		base.data('linphoneConfig', config);
	},
	init: function(base, versionForced) {
		if(typeof versionForced === 'undefined') {
			versionForced = true;
		}

		var config = base.data('linphoneConfig');
		// Find the correct plugin file
		if (typeof config.files[jQuery.client.os] !== 'undefined') {
			if(typeof config.files[jQuery.client.os][jQuery.client.arch] !== 'undefined') {
				if (typeof config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser] !== 'undefined') {
					config.description = config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser];
					config.description_browser = jQuery.client.browser;
				} else {
					config.description = config.files[jQuery.client.os][jQuery.client.arch].DEFAULT;
					config.description_browser = 'DEFAULT';
				}
			}
		}

		// Update
		config.codebase = "";
		if (typeof config.description !== 'undefined') {
			if (config.description_browser === 'Explorer') {
				base.find('.window .install .text').addClass('{translate: \'base.install.text.auto_or_update\'}');
				config.codebase = base.data('linphoneConfig').description.file;
				if(versionForced) {
					config.codebase += '#Version=' + base.data('linphoneConfig').description.version;
				}
			} else if (config.description_browser === 'Firefox') {
				base.find('.window .install .text').addClass('{translate: \'base.install.text.auto\'}');
			} else if (config.description_browser === 'Chrome') {
				base.find('.window .install .text').addClass('{translate: \'base.install.text.auto\'}');
			} else {
				base.find('.window .install .text').addClass('{translate: \'base.install.text.download\'}');
				
				var content = '';
				content = '<button type="button" onclick="window.open(\'' + config.description;
				content += '\', \'_blank\')" class="{translate: \'base.install.download\'}">Download !</button>';
				base.find('.window .install .buttons').html(content);
				jQuery.i18n.update(base.find('.window .install .buttons'), true);
				base.find('.window .install button').button();
			} 
		} else {
			base.find('.window .install .text').hide();
			base.find('.window .install .refresh').hide();
			base.find('.window .install .unavailable').show();
		}
		
		linphone.core.log('Init Linphone Web');
		linphone.ui.locale.load();
		linphone.ui.menu.populateLocalesMenu(base);
	}
};

if (!jQuery.browser.msie) {
	linphone.ui._addEvent = function(obj, name, func) {
		obj.addEventListener(name, func, false);
	};
} else {
	linphone.ui._addEvent = function(obj, name, func) {
		obj.attachEvent("on" + name, func);
	};
}

// OnLoad
jQuery(function() {
	jQuery.extend({
		getUrlVars: function(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		},
		getUrlVar: function(name){
			return jQuery.getUrlVars()[name];
		}
	});
	jQuery.fn.disableSelection = function() {
		return this.each(function() {
			jQuery(this).attr('unselectable', 'on').css({
				'-moz-user-select' : 'none',
				'-webkit-user-select' : 'none',
				'user-select' : 'none',
				'-ms-user-select' : 'none'
			}).each(function() {
				this.onselectstart = function() {
					return false;
				};
			});
		});
	};
	jQuery.fn.isOrParent = function(selector) {
		return this.is(selector) || this.parent(selector).length !== 0;
	};
	jQuery.fn.isOrParents = function(selector) {
		return this.is(selector) || this.parents(selector).length !== 0;
	};
	jQuery.fn.getSelfAndParent = function(selector) {
		return this.parent('*').andSelf().filter(selector);
	};
	jQuery.fn.getSelfAndParents = function(selector) {
		return this.parents('*').andSelf().filter(selector);
	};

	// Tabs
	jQuery('.linphone .window > .content .tabs').tabs({
		closable : true,
		scrollable : true
	});

	// Apply JQuery UI button style
	jQuery(".linphone .window button").button();

	// Disable selection on tools
	jQuery('.linphone .window .tools').disableSelection();

	// Disable selection on dialogs titlebar
	jQuery('.linphone .window .dialogs .ui-dialog-titlebar').disableSelection();
	
	// Disable selection on options titlebar
	jQuery('.linphone .window .options .ui-dialog-titlebar').disableSelection();

	jQuery('.linphone .window .options .ui-dialog-titlebar-close').click(function(event) {
		jQuery(this).parents('.options').fadeOut('fast');
	});

	jQuery('.linphone .window .options .ui-dialog-titlebar-close').hover(function() {
		jQuery(this).addClass("ui-state-hover");
	}, function() {
		jQuery(this).removeClass("ui-state-hover");
	});

	// Add template helper
	jQuery.views.registerHelpers({
		linphone_ui_helpers_getLinphoneRegistrationStateText : function(val) {
			return linphone.core.enums.getRegistrationStateText(val);
		}
	});
	// Add template helper
	jQuery.views.registerHelpers({
		linphone_ui_helpers_payloadTypeEnabled : function(val) {
			return this.core.payloadTypeEnabled(val);
		}
	});
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target ? event.target : event.srcElement);
	var base = linphone.ui.getBase(target);
});
