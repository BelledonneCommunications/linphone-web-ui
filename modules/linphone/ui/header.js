/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.header = {	
	/* */
	init: function(base) {
		linphone.ui.header.uiInit(base);
		base.on('registrationStateChanged', linphone.ui.header.onRegistrationStateChanged);
		base.on('networkStateChanged', linphone.ui.header.onNetworkStateChanged);
	},
	uiInit: function(base) {
		var configuration = linphone.ui.configuration(base);
		var header = base.find('> .header');
		header.find('.navigation').visible();
		
		header.find('.profile .open').mouseover(function(event){
			linphone.ui.header.menu.open(base);
			header.find('.profile').mouseleave(function(){
				linphone.ui.header.menu.close(base);
			});
		});
		
		header.find('.logo').click(linphone.ui.exceptionHandler(base, function(event){
			if(linphone.ui.isLogged(base)) {
				linphone.ui.view.show(base, 'main');
			}
		}));
		
		// Populate status list
		header.find('.profile .menu .list').empty();
		if(!configuration.disablePresence) {
			// Wrap the function in orther function in order to detach status from the status variable
			var _updateStatus = function(status) {
					return function(event) {
						linphone.ui.logger.log(base, 'Change status to ' + linphone.getStatusText(status.value));
						var core = linphone.ui.getCore(base);
						core.presenceInfo = status.value;
						linphone.ui.header.profile.update(base, status);
						linphone.ui.header.menu.close(base);
					};
			};
			for(var i in linphone.ui.utils.status) {
				var status = linphone.ui.utils.status[i];
				var elem = jQuery('<li/>').html(linphone.ui.template(base, 'header.profile.status', status));
				elem.click(linphone.ui.exceptionHandler(base, _updateStatus(status)));
				header.find('.profile .menu .list').append(elem);
			}
		}
		
		header.find('.profile .menu .logout').click(linphone.ui.exceptionHandler(base, function(event){
			// Unregister from SIP server
			var core = linphone.ui.getCore(base);
			linphone.ui.core.stop(core);
			
			// Normally do by callback (but not done)
			linphone.ui.header.update(base, null);
			
			linphone.ui.header.menu.close(base);
			linphone.ui.logout(base);
		}));
		
		/* Navigation */
		header.find('.navigation .settings').click(linphone.ui.exceptionHandler(base, function(event){
			if(jQuery(this).hasClass('disabled')) {
				return;
			}
			linphone.ui.view.show(base, 'settings');
		}));
		
		header.find('.navigation .help').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'help');
		}));

		header.find('.navigation .about').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'about');
		}));
		
		/* Language */
		header.find('.language .list').click(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			if (target.isOrParent('.linphoneweb > .header .language .list > li')) {
				var locale = target.data('data');
				linphone.ui.locale.change(base, locale);
			}
		}));
	},
	translate: function(base) {
		linphone.ui.header.reloadLanguageList(base);
	},
	
	/* Languages */
	reloadLanguageList: function(base) {
		var list = base.find('> .header .language .list');
		list.empty();
		var locales = linphone.ui.configuration(base).locales;
		for(var i = 0; i < locales.length; ++i) {
			var locale = locales[i];
			var element = linphone.ui.template(base, 'header.language.list.entry', {
				name: locale.name,
				title: locale.title,
				current: (locale.locale === jQuery.i18n.locale)
			});
			element.data('data', locale);
			
			list.append(element);
		}
		
		list.tooltip({
			tooltipClass: "linphonewebcls",
			position: { my: "left top+10", at: "left bottom", collision: "flipfit" }
		});
	},
	
	/* Menu */
	menu: {
		open: function(base) {
			base.find('> .header .profile').addClass('highlight');
			base.find('> .header .menu').show();
		},
		close: function(base) {
			base.find('> .header .menu').hide();
			base.find('> .header .profile').removeClass('highlight'); 
		}
	},
	
	/* Proxy config updating */
	onRegistrationStateChanged: function(event, proxy, state, message) {
		var base = jQuery(this);

		if(proxy.error === linphone.Reason.IOError && !linphone.ui.view.top(base).hasClass("login")) {
			linphone.ui.header.update(base, proxy,linphone.ui.networkState.Offline);
		} else {
			linphone.ui.header.update(base, proxy, null);
		}	
	},
	onNetworkStateChanged: function(event, status) {
		var base = jQuery(this);
		linphone.ui.header.update(base, null, status);
	},
	update: function(base, proxy, network) {
		linphone.ui.logger.log(base, 'Header: update');
		var header = base.find('> .header');
		
		// If not provided try to use first proxy config
		if(typeof proxy === 'undefined' || !proxy) {
			proxy = linphone.ui.utils.getMainProxyConfig(base);
		}
		// If not provided try to use getNetworkState
		if(typeof network === 'undefined' || !network) {
			network = linphone.ui.getNetworkState(base);
		}
		
		if(network === linphone.ui.networkState.Online) {
			header.find('.offline').hide();
			if(proxy && proxy.state === linphone.RegistrationState.Ok) {
				linphone.ui.header.profile.update(base);
				header.find('.empty').hide();
				header.find('.profile').show();
				header.find('.settings').removeClass('disabled');
				header.find('.profile .identity').text(linphone.ui.utils.getUsername(base, proxy.identity));
			} else {
				header.find('.empty').show();
				header.find('.profile').hide();
				header.find('.settings').addClass('disabled');
			}
		} else {
			header.find('.offline').show();
			header.find('.empty').hide();
			header.find('.profile').hide();
		}
	},
	
	/* Profile */
	profile: {
		/* Find eq item to presence info */
		findStatus: function(value) {
			var item = linphone.ui.utils.status.online;
			for(var i in linphone.ui.utils.status) {
				var a = linphone.ui.utils.status[i];
				if(a.value === value) {
					item = a;
					break;
				}
			}
			return item;
		},
		update: function(base) {
			var configuration = linphone.ui.configuration(base);
			linphone.ui.logger.log(base, 'Header: update profile');
			if(!configuration.disablePresence) {
				var core = linphone.ui.getCore(base);
				var item = linphone.ui.header.profile.findStatus(core.presenceInfo);
				base.find('> .header .profile .status').html(linphone.ui.template(base, 'header.profile.status', item));
			} else {
				base.find('> .header .profile .status').hide();
			}
		}
	}
};
