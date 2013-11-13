/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone,CryptoJS*/

linphone.ui.view.login = {
	simpleDomain: "sip.linphone.org",
	simpleTransport: 'tls',

	state: {
		simple: {
				regex: {
					account: new RegExp(linphone.ui.utils.regex.sip.username),
					password: new RegExp("(.*)")
				}
		},
		advanced: {
				regex: {
					account: new RegExp(linphone.ui.utils.regex.sip.username),
					password: new RegExp("(.*)"),
					domain: new RegExp(linphone.ui.utils.regex.sip.domain)
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

		login.find('.proxy').keyup(linphone.ui.exceptionHandler(base, function(event) {
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
		login.find('.accountAdvanced .proxy').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.proxy'), {className: 'watermark', useNative: false});
	},

	/* */
	show: function(base) {
		var core = linphone.ui.getCore(base);
		var configuration = linphone.ui.configuration(base);
		var login = base.find('> .content .view > .login');
		
		base.on('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
		
		// Get first proxy
		var proxy = linphone.ui.utils.getMainProxyConfig(base);

		// Test if already registered
		if(proxy && proxy.state === linphone.RegistrationState.Ok) {
			linphone.ui.login(base, true);
			return;
		}

		var link = login.find('.createAccount');
		link.empty();
		var linphoneAccount = configuration.linphone_account;
		var elem = linphone.ui.template(base, 'view.login.createAccount', linphoneAccount);
		link.append(elem);	

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
		login.find('.accountAdvanced .proxy').val('');
		login.find('input[name=transport][value="udp"]').prop('checked', 'checked');
		login.find('input[name=outbandProxy][value="off"]').prop('checked', 'checked');
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
	isSimpleState: function(base) {
		var login = base.find('> .content .view > .login');
		return login.find('.accountSimple').is(':visible');
	},

	computeHash: function(account, password, domain) {
		return CryptoJS.SHA1(account + '@' + domain + ':' + password).toString(CryptoJS.enc.Hex);
	},
	login: function(base){
		if(linphone.ui.view.login.isLocked(base)) {
			return;
		}
		var login = base.find('> .content .view > .login');
		var ret;
		if(login.find('.accountSimple').is(':visible')) {
			linphone.ui.view.login.loginSimple(base);
		} else {
			linphone.ui.view.login.loginAdvanced(base);
		}
		if(ret) {
			linphone.ui.view.login.lock(base);
		}
	},
	loginSimple: function(base) {
		var login = base.find('> .content .view > .login');
		
		// Get values
		var account = login.find('.accountSimple .account').val();
		var password = login.find('.accountSimple .password').val();
		var domain = linphone.ui.view.login.simpleDomain;
		var transport = linphone.ui.view.login.simpleTransport;
		
		return linphone.ui.view.login.loginRegister(base, account, password, domain, transport, null, false);
	},
	loginAdvanced: function(base) {
		var login = base.find('> .content .view > .login');

		// Get values
		var account = login.find('.accountAdvanced .account').val();
		var password = login.find('.accountAdvanced .password').val();
		var domain = login.find('.accountAdvanced .domain').val();
		var transport = login.find('input[name=transport]:checked').val();
		var proxy = login.find('.accountAdvanced .proxy').val();
		var outbandProxy = login.find('input[name=outbandProxy]:checked').val();
		
		return linphone.ui.view.login.loginRegister(base, account, password, domain, transport, proxy, outbandProxy);
	},

	loginRegister: function(base, account, password, domain, transport, proxy, outbandProxy) {
		// Check values
		if (linphone.ui.view.login.state.simple.regex.account.exec(account) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.account');
			return false;
		}
		if (linphone.ui.view.login.state.simple.regex.password.exec(password) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
			return false;
		}
		
		if (linphone.ui.view.login.state.advanced.regex.account.exec(account) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountAdvanced.errors.account');
			return false;
		}
		if (linphone.ui.view.login.state.advanced.regex.password.exec(password) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountAdvanced.errors.password');
			return false;
		}
		if (linphone.ui.view.login.state.advanced.regex.domain.exec(domain) === null) {
			linphone.ui.popup.error.show(base, 'content.view.login.accountAdvanced.errors.domain');
			return false;
		}

		var core = linphone.ui.getCore(base);
		var configFilename = 'local:///.linphonerc_' + account + '@' + domain;
		core.fileManager.exists(configFilename, function(exist, error) {
			if (exist) {
				var config = core.newLpConfig(configFilename);
				var hash = linphone.ui.view.login.computeHash(account, password, domain);
				var storedHash = config.getString('app', 'identity_hash', '');
				if ((storedHash === '') || (hash === storedHash)) {
					linphone.ui.view.login.lock(base);
					linphone.ui.core.start(core, configFilename);
					core.clearProxyConfig();
					core.clearAllAuthInfo();
					linphone.ui.view.login.loginConfigure(base, account, password, domain, transport, proxy, outbandProxy);
				} else {
					linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
					return false;
				}
			} else {
				linphone.ui.view.login.lock(base);
				linphone.ui.core.start(core, configFilename);
				linphone.ui.view.login.loginConfigure(base, account, password, domain, transport, proxy, outbandProxy);
			}
		});
		return true;
	},
	loginConfigure: function(base, account, password, domain, transport, proxy, outbandProxy) {
		var core = linphone.ui.getCore(base);

		// Create proxy config
		var proxyConfig = core.newProxyConfig();

		// Activate ICE 
		if(linphone.ui.view.login.isSimpleState(base)){
			core.stunServer = "stun.linphone.org";
			core.firewallPolicy = linphone.FirewallPolicy.UseIce;
		} else {
			core.firewallPolicy = linphone.FirewallPolicy.NoFirewall;
		}
		
		// Set auth info
		var authinfo = core.newAuthInfo(account, account, password, null, null, null);
		core.addAuthInfo(authinfo);

		// Set proxy values
		proxyConfig.identity = 'sip:' + account + '@' + domain;
		
		if(proxy !== null && proxy !== ''){
			proxyConfig.serverAddr = 'sip:' + proxy;
		} else {
			proxyConfig.serverAddr = 'sip:' + domain;
		}
		
		if(outbandProxy){
			proxyConfig.route = proxy;
		}
		
		if(transport) {
			if(transport === 'tcp') {
				proxyConfig.serverAddr+=';transport=tcp';
			} else if(transport === 'tls') {
				proxyConfig.serverAddr+=';transport=tls';
			}
		}
		proxyConfig.expires = 600;
		proxyConfig.registerEnabled = true;
		var ret = core.addProxyConfig(proxyConfig);
		if(ret === 0){
			core.defaultProxy = proxyConfig;
		} else {
			linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
			linphone.ui.core.stop(core);
		}
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
		
		base.off('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
		linphone.ui.view.login.unlock(base);

		// Force if we are still on this view
		linphone.ui.login(base, linphone.ui.view.top(base).is(login));
	},

	/* On core events */
	onAuthInfoRequested: function(event, realm, username, domain) {
	},
	onRegistrationStateChanged: function(event, proxy, state, message) {
		var base = jQuery(this);
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		if (state === linphone.RegistrationState.Ok) {
			if (core.config.getString('app', 'identity_hash', '') === '') {
				// Get values
				var account = '';
				var password = '';
				var domain = '';
				if (linphone.ui.view.login.isSimpleState(base)) {
					account = login.find('.accountSimple .account').val();
					password = login.find('.accountSimple .password').val();
					domain = linphone.ui.view.login.simpleDomain;
				} else {
					account = login.find('.accountAdvanced .account').val();
					password = login.find('.accountAdvanced .password').val();
					domain = login.find('.accountAdvanced .domain').val();
				}
				var hash = linphone.ui.view.login.computeHash(account, password, domain);
				core.config.setString('app', 'identity_hash', hash);
			}
			linphone.ui.view.login.done(base);
		} else if(state === linphone.RegistrationState.Failed) {
			if((proxy.error === linphone.Reason.BadCredentials) || (proxy.error === linphone.Reason.Unauthorized) || (proxy.error === linphone.Reason.NotFound)) {
				linphone.ui.view.login.error(base, 'content.view.login.errors.account');
			} else {
				linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
			}
			linphone.ui.core.stop(core);
		}
	}
};
