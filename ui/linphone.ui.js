/*!
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

/*globals linphone,jQuery,InstallTrigger */

linphone.ui = {
	core_number : 1,
	core_data : [],
	helpers : {},
	locales : [ {
		name : 'English(US)',
		locale : 'en_US',
		icon : 'style/images/flags/us.png'
	}, {
		name : 'Français',
		locale : 'fr_FR',
		icon : 'style/images/flags/fr.png'
	}, {
		name : 'Deutsche',
		locale : 'de_DE',
		icon : 'style/images/flags/de.png'
	}, {
		name : 'Italiano',
		locale : 'it_IT',
		icon : 'style/images/flags/it.png'
	} ],
	downloadPlugin : function(file) {
		window.open(file, '_blank');
	},
	getCore : function(base) {
		base = linphone.ui.getBase(base);
		return base.find('> .core').get()[0];
	},
	getBase : function(target) {
		if (typeof target === 'undefined') {
			target = jQuery(this);
		}
		if (target.is('.linphone')) {
			return target;
		} else {
			return target.parents('.linphone');
		}
	},
	_addEvent : null,
	addEvent : function(obj, name, func) {
		linphone.ui._addEvent(obj, name, func);
	},
	loadHandler : function(core) {
		linphone.core.log('Load Core');
		var base = linphone.ui.core_data[core.magic];

		base.find('.window .install').hide(); // Force

		linphone.ui.addEvent(core, 'globalStateChanged', linphone.ui.globalStateChanged);
		linphone.ui.addEvent(core, 'callStateChanged', linphone.ui.callStateChanged);
		linphone.ui.addEvent(core, 'registrationStateChanged', linphone.ui.registrationStateChanged);
		linphone.ui.addEvent(core, 'authInfoRequested', linphone.ui.authInfoRequested);
		linphone.ui.addEvent(core, 'displayStatus', linphone.ui.displayStatus);
		linphone.ui.addEvent(core, 'displayMessage', linphone.ui.displayMessage);
		linphone.ui.addEvent(core, 'displayWarning', linphone.ui.displayWarning);
		linphone.ui.addEvent(core, 'displayUrl', linphone.ui.displayUrl);
		var ret_value = core.init();
		if (ret_value !== 0) {
			linphone.ui.error(base, jQuery.i18n.get('errors.core.' + ret_value));
		} else {
			// Init volumes settings
			var rec_level = (linphone.core.data()['rec_level'] != null) ? linphone.core.data()['rec_level'] : 100;
			base.find('.window .tools .mic-slider').slider('value', rec_level);
			core.recLevel = rec_level;

			var play_level = (linphone.core.data()['play_level'] != null) ? linphone.core.data()['play_level'] : 100;
			base.find('.window .tools .hp-slider').slider('value', play_level);
			core.playLevel = play_level;

			var ring_level = (linphone.core.data()['ring_level'] != null) ? linphone.core.data()['ring_level'] : 100;
			base.find('.window .tools .bell-slider').slider('value', ring_level);
			core.ringLevel = ring_level;

			linphone.core.log('Sip port: ' + core.sip_port);

			base.find('.window .load').hide();

			linphone.ui.video.updateSelfView(base);
			linphone.ui.video.updateVideoView(base);
		}
	},
	globalStateChanged : function(core, state, message) {
		linphone.core.log(core + '| State: ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('globalStateChanged', [state, message]);
		base.find('.window > .footer > .status').html(jQuery.i18n.get('globalstatetext.' + linphone.core.enums.getGlobalStateText(state)));
	},
	registrationStateChanged : function(core, proxy, state, message) {
		linphone.core.log(core + '| (' + proxy + '): ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('registrationStateChanged', [proxy, state, message]);
	},
	callStateChanged : function(core, call, state, message) {
		linphone.core.log(core + '| (' + call + '): ' + state + ', ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('callStateChanged', [call, state, message]);
	},
	authInfoRequested : function(core, realm, username) {
		linphone.core.log(core + '| Auth: ' + realm + ', ' + username);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('authInfoRequested', [realm, username]);
	},
	displayStatus : function(core, message) {
		linphone.core.log(core + '| Status: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayStatus', [message]);
	},
	displayMessage : function(core, message) {
		linphone.core.log(core + '| Message: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayMessage', [message]);
	},
	displayWarning : function(core, message) {
		linphone.core.log(core + '| Warning: ' + message);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayWarning', [message]);
	},
	displayUrl : function(core, message, url) {
		linphone.core.log(core + '| Url: ' + message + ' - ' + url);
		var base = linphone.ui.core_data[core.magic];
		base.trigger('displayUrl', [message, url]);
	},
	error : function(base, msg) {
		base.find('.window .load').hide();
		base.find('.window .error .text').html(msg);
		base.find('.window .error').show();
	},
	detect : function(base) {
		linphone.core.log('Detect');
		var core = base.find('.core').get()[0];
		if (typeof core !== 'undefined' && typeof core.valid !== 'undefined' && core.valid) {
			base.find('.window .install').hide();
			return true;
		} else {
			if (jQuery.client.os === "Linux" && jQuery.client.browser === "Firefox") {
				if (InstallTrigger.updateEnabled()) {
					InstallTrigger.install({
						"Linphone Web" : linphone.config.codebase
					});
				}
			}
		}
		return false;
	},
	unload : function(base) {
		linphone.core.log('Unload');
		base.find('.window .load').show();
		var core = base.find('> .core').get()[0];
		if (typeof core !== 'undefined') {
			delete linphone.ui.core_data[core.magic];
			base.get()[0].removeChild(core); // Use of dom: issue with jQuery
												// and embedded object
		}
	},
	load : function(base) {
		linphone.core.log('Load');
		base.find('.window .install').show();
		base.find('.window .error').hide();
		navigator.plugins.refresh(false);
		var coreTemplate = base.find('.templates .Linphone-Core').render({
			magic : linphone.ui.core_number,
			codebase : linphone.config.codebase
		});
		var core = jQuery(coreTemplate);
		linphone.ui.core_data[linphone.ui.core_number] = base;
		linphone.ui.core_number = linphone.ui.core_number + 1;
		core.appendTo(base);

		linphone.ui.detect(base);
	},
	init : function() {
		linphone.core.log('Init LinphoneJS');
		var base = jQuery('.linphone');
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
});

// OnLoad
jQuery(function() {
	// Find the correct plugin file
	if (typeof linphone.config.files[jQuery.client.os] !== 'undefined') {
		if( typeof linphone.config.files[jQuery.client.os][jQuery.client.arch] !== 'undefined') {
			if (typeof linphone.config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser] !== 'undefined') {
				linphone.config.codebase = linphone.config.files[jQuery.client.os][jQuery.client.arch][jQuery.client.browser];
			}
			linphone.config.file = linphone.config.files[jQuery.client.os][jQuery.client.arch]['DEFAULT'];
		}
	}

	// Update
	if (linphone.config.file !== null) {
		var content = '';
		content = '<button type="button" onclick="linphone.ui.downloadPlugin(\'' + linphone.config.file;
		content += '\')" class="{translate: \'base.install.download\'}">Download !</button>';
		jQuery('.linphone .window .install .buttons').html(content);
		jQuery.i18n.update(jQuery('.linphone .window .install .buttons'), true);
		jQuery('.linphone .window .install button').button();
	} else {
		jQuery('.linphone .window .install .text').hide();
		jQuery('.linphone .window .install .refresh').hide();
		jQuery('.linphone .window .install .unavailable').show();
	}

	if (jQuery.client.os === 'Windows' && jQuery.client.browser === 'Explorer') {
		linphone.config.codebase = linphone.config.codebase + '#Version=' + linphone.config.version.replace('.', ',');
	} else if (jQuery.client.os === 'Linux' && jQuery.client.browser === 'Firefox') {
		linphone.config.codebase = linphone.config.codebase;
	}
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);

});
