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
			if(event.which === 13){
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
		login.find('.accountAdvanced .proxy').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.proxy'), {className: 'watermark', useNative: false});
	},
	
	/* */
	show: function(base) {
		linphone.ui.menu.hide(base);
		linphone.ui.mainbar.hide(base);
		linphone.ui.view.login.reset(base);
		linphone.ui.view.login.update(base, linphone.ui.view.login.state.simple);
		base.on('authInfoRequested', linphone.ui.view.login.onAuthInfoRequested); 
		base.on('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
	},
	hide: function(base) {
		base.off('authInfoRequested', linphone.ui.view.login.onAuthInfoRequested); 
		base.off('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
	},
	
	/* */
	reset: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.accountSimple .account').val('');
		login.find('.accountSimple .password').val('');
		login.find('.accountAdvanced .account').val('');
		login.find('.accountAdvanced .password').val('');
		login.find('.accountAdvanced .proxy').val('');
	},
	update: function(base, state) {
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
	
	login: function(base){
		var login = base.find('> .content .view > .login');
		if(login.find('.accountSimple').is(':visible')) {
			linphone.ui.view.login.loginSimple(base);
		} else {
			linphone.ui.view.login.loginAdvanced(base);
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
			return;
		}
		if (linphone.ui.view.login.state.simple.regex.password.exec(password) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
			return;
		}
		
		// Create proxy config
		var proxyConfig = core.newProxyConfig();
		
		// Set values
		proxyConfig.identity = 'sip:' + account + '@sip.linphone.org';
		proxyConfig.serverAddr = 'sip:sip.linphone.org';
		proxyConfig.expires = 3600;
		proxyConfig.registerEnabled = true;
		login.data('password', password);
		login.data('username', account);
		core.addProxyConfig(proxyConfig);
	},
	loginAdvanced: function(base) {
	},
	
	/* */
	onAuthInfoRequested: function(event, realm, username) {
		var base = jQuery(this);
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		
		var password = login.data('password');
		if(password && username === login.data('username')) {
			var authinfo = core.newAuthInfo(username, username, login.data('password'), "", realm);
			core.addAuthInfo(authinfo);
			
			// Reset challenge
			login.data('password', null);
			login.data('username', null);
		}
	},
	onRegistrationStateChanged: function(event, proxy, state, message) {
		var base = jQuery(this);
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		if(state === linphone.core.enums.registrationState.Ok) {
			// Reset challenge
			login.data('password', null);
			login.data('username', null);
			linphone.ui.view.login.reset(base);
			linphone.ui.login(base);
		} else if(state === linphone.core.enums.registrationState.Failed) {
			// Reset challenge
			login.data('password', null);
			login.data('username', null);
		
			core.clearProxyConfig();
			core.clearAllAuthInfo();
			
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.registrationFailed');
		}
	}
};

