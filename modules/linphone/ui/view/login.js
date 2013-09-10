/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.login = {
	state: {
		simple: {
				regex: {
					account: new RegExp(linphone.ui.utils.regex.sip.username),
					password: new RegExp("(.*)")
				}
		},
		advanced: {
				regex: {
					account: new RegExp(linphone.ui.utils.regex.sip.complete),
					password: new RegExp("(.*)")
				}
		}
	},
	
	/* */
	init: function(base) {
		linphone.ui.view.login.uiInit(base);
		base.on('authInfoRequested', linphone.ui.view.login.onAuthInfoRequested); 
		base.on('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
	},
	uiInit: function(base) {
		var login = base.find('> .content .view > .login');
		login.data('linphoneweb-view', linphone.ui.view.login);
		
		login.find('.actions .advanced').click(linphone.ui.exceptionHandler(base, function(event) {	
			linphone.ui.view.login.update(base, linphone.ui.view.login.state.advanced);
		}));
		
		login.find('.actions .simple').click(linphone.ui.exceptionHandler(base, function(event) {	
			linphone.ui.view.login.update(base, linphone.ui.view.login.state.simple);
		}));
		
		login.find('.actions .login').click(linphone.ui.exceptionHandler(base, function(event) {
			linphone.ui.view.login.login(base);
		}));
		
		login.find('.password').keyup(linphone.ui.exceptionHandler(base, function(event) {
			if(event.which === jQuery.ui.keyCode.ENTER){
				linphone.ui.view.login.login(base);
			}
		}));
		
		login.find('.domain').keyup(linphone.ui.exceptionHandler(base, function(event) {
			if(event.which === jQuery.ui.keyCode.ENTER) {
				linphone.ui.view.login.login(base);
			}
		}));
		
		login.find('.account').keyup(linphone.ui.exceptionHandler(base, function(event) {
			if(event.which === jQuery.ui.keyCode.ENTER) {
				linphone.ui.view.login.login(base);
			}
		}));
	},
	translate: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.accountSimple .account').watermark(jQuery.i18n.translate('content.view.login.accountSimple.account'), {className: 'watermark', useNative: false});
		login.find('.accountSimple .password').watermark(jQuery.i18n.translate('content.view.login.accountSimple.password'), {className: 'watermark', useNative: false});
		login.find('.accountAdvanced .account').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.account'), {className: 'watermark', useNative: false});
		login.find('.accountAdvanced .password').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.password'), {className: 'watermark', useNative: false});
		login.find('.accountAdvanced .domain').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.domain'), {className: 'watermark', useNative: false});
	},
	
	/* */
	show: function(base) {
		var core = linphone.ui.getCore(base);
		
		// Get first proxy
		var proxy = linphone.ui.utils.getMainProxyConfig(base);
		
		// Test if already registered
		if(proxy && proxy.state === linphone.core.enums.registrationState.Ok) {
			linphone.ui.login(base, true);
			return;
		}
		
		linphone.ui.menu.hide(base);
		linphone.ui.view.login.reset(base);
		linphone.ui.view.login.update(base, linphone.ui.view.login.state.simple);
	},
	hide: function(base) {
	},
	
	/* */
	reset: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.accountSimple .account').val('');
		login.find('.accountSimple .password').val('');
		login.find('.accountAdvanced .account').val('');
		login.find('.accountAdvanced .password').val('');
		login.find('.accountAdvanced .domain').val('');
	},
	update: function(base, state) {
		if(linphone.ui.view.login.isLocked(base)) {
			return;
		}
		var login = base.find('> .content .view > .login');
		switch(state) {
			case linphone.ui.view.login.state.simple:
				login.find('.accountSimple').show();	
				login.find('.accountAdvanced').hide();
				login.find('.actions .advanced').show();	
				login.find('.actions .simple').hide();
			break;
			case linphone.ui.view.login.state.advanced:
				login.find('.accountAdvanced').show();	
				login.find('.accountSimple').hide();
				login.find('.actions .simple').show();	
				login.find('.actions .advanced').hide();
			break;
			default:
			break;
		}
	},
	lock: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.wait').show();
		login.addClass('disabled');
		login.find('form input').prop('disabled', true);
	},
	unlock: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.wait').hide();
		login.removeClass('disabled');
		login.find('form input').prop('disabled', false);
	},
	isLocked: function(base) {
		var login = base.find('> .content .view > .login');
		return login.hasClass('disabled');
	},
	
	login: function(base){
		if(linphone.ui.view.login.isLocked(base)) {
			return;
		}
		var login = base.find('> .content .view > .login');
		var ret;
		if(login.find('.accountSimple').is(':visible')) {
			ret = linphone.ui.view.login.loginSimple(base);
		} else {
			ret = linphone.ui.view.login.loginAdvanced(base);
		}
		if(ret) {
			linphone.ui.view.login.lock(base);
		}
	},
	loginSimple: function(base) {
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		core.clearProxyConfig();
		core.clearAllAuthInfo();
		
		// Get values
		var account = login.find('.accountSimple .account').val();
		var password = login.find('.accountSimple .password').val();
		
		// Check values
		if (linphone.ui.view.login.state.simple.regex.account.exec(account) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.account');
			return false;
		}
		if (linphone.ui.view.login.state.simple.regex.password.exec(password) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
			return false;
		}
		return linphone.ui.view.login.loginRegistration(base,account,password,"sip.linphone.org",'tls');
	},
	loginAdvanced: function(base) {
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		core.clearProxyConfig();
		core.clearAllAuthInfo();
		
		// Get values
		var account = login.find('.accountAdvanced .account').val();
		var password = login.find('.accountAdvanced .password').val();
		var domain = login.find('.accountAdvanced .domain').val();
		var transport = login.find('input[name=transport]:checked').val();
		//var outbandProxy = login.find('input[name=outbandProxy]:checked').val();
		
		// Check values
		if (linphone.ui.view.login.state.simple.regex.account.exec(account) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.account');
			return false;
		}
		if (linphone.ui.view.login.state.simple.regex.password.exec(password) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
			return false;
		}
		return linphone.ui.view.login.loginRegistration(base,account,password,domain,transport);
		
	},
	
	loginRegistration: function(base,account,password,domain,transport){
		var core = linphone.ui.getCore(base);
		
		// Create proxy config
		var proxyConfig = core.newProxyConfig();
		
		// Set auth info
		if(account){
			if(password){
				var authinfo = core.newAuthInfo(account, account, password, null,null);
				core.addAuthInfo(authinfo);
			} else {
				linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
				return false;
			}
		}
		
		// Set proxy values
		if(domain){
			proxyConfig.identity = 'sip:' + account + '@' + domain;
			proxyConfig.serverAddr = 'sip:' + domain;
			if(transport) {
				if(transport === 'tcp') {
					proxyConfig.serverAddr+=';transport=tcp';
				} else if(transport === 'tls') {
					proxyConfig.serverAddr+=';transport=tls';
				}  
			}
			proxyConfig.expires = 600;
			proxyConfig.registerEnabled = true;
			core.addProxyConfig(proxyConfig);
			core.defaultProxy = proxyConfig;
			
		} else {
				linphone.ui.popup.error.show(base, 'content.view.login.accountAdvanced.errors.domain');
			return false;
		}
		return true;
	},
	
	/* Results */
	error: function(base, error) {
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		
		linphone.ui.view.login.unlock(base);
	
		core.clearProxyConfig();
		core.clearAllAuthInfo();
		
		linphone.ui.popup.error.show(base, error);
	},
	done: function(base) {
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		
		linphone.ui.view.login.unlock(base);

		// Force if we are still on this view
		linphone.ui.login(base, linphone.ui.view.top(base).is(login));
	},
	
	/* On core events */
	onAuthInfoRequested: function(event, realm, username) {
		
	},
	onRegistrationStateChanged: function(event, proxy, state, message) {
		var base = jQuery(this);
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		if(state === linphone.core.enums.registrationState.Ok) {
			linphone.ui.view.login.done(base);
		} else if(state === linphone.core.enums.registrationState.Failed) {
			if(	proxy.error === linphone.core.enums.reason.BadCredentials 
				|| proxy.error === linphone.core.enums.reason.Unauthorized
				|| proxy.error === linphone.core.enums.reason.NotFound) {
				linphone.ui.view.login.error(base, 'content.view.login.errors.account');
			} else {
				linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
			}
		}
	}
};

