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
	remoteProvisioningUriBase: window.location.protocol + "//" + window.location.host + window.location.pathname + "conf/",

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

		base.on('authInfoRequested', linphone.ui.view.login.onAuthInfoRequested);
		base.on('globalStateChanged', linphone.ui.view.login.onGlobalStateChanged);
		base.on('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);

		var link = login.find('.createAccount');
		link.empty();
		var linphoneAccount = configuration.linphone_account;
		var elem = linphone.ui.template(base, 'view.login.createAccount', linphoneAccount);
		link.append(elem);

		var configFileName = linphone.ui.utils.readCookie("linphone-configfilename");
		if(configFileName){
			var chatDbFilename = linphone.ui.utils.readCookie("linphone-dbfilename");
			core.fileManager.exists(configFileName, function(exist, error) {
				if(exist){
					linphone.ui.view.login.update(base, linphone.ui.view.login.state.automaticallyConnect);
					linphone.ui.view.login.startCore(base, configFileName, chatDbFilename);
				} else {
					var dtExpire = new Date();
					dtExpire.setTime(dtExpire.getTime() -1);
					linphone.ui.utils.setCookie("linphone-configfilename",'',dtExpire,'/');	
				}
			});
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
		login.find('.accountAdvanced .proxy').val('');
		login.find('input[name=transport][value="udp"]').prop('checked', 'checked');
		login.find('input[name=outbandProxy][value="off"]').prop('checked', 'checked');
		login.find('.actions .rememberMe').prop('checked',false);
	},
	update: function(base, state) {
		if(linphone.ui.view.login.isLocked(base)) {
			return;
		}
		var login = base.find('> .content .view > .login');
		switch(state) {
			case linphone.ui.view.login.state.simple:
				login.find('.accountSimple').show();
				login.find('.actions').show();
				login.find('.accountAdvanced').hide();
				login.find('.actions .advanced').show();
				login.find('.actions .simple').hide();
			break;
			case linphone.ui.view.login.state.automaticallyConnect:
				login.find('.accountSimple').hide();
				login.find('.accountAdvanced').hide();
				login.find('.actions').hide();
			break;
			case linphone.ui.view.login.state.advanced:
				login.find('.accountAdvanced').show();
				login.find('.actions').show();
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
		login.find('.actions input').prop('disabled', true);
	},
	unlock: function(base) {
		var login = base.find('> .content .view > .login');
		login.find('.wait').hide();
		login.removeClass('disabled');
		login.find('form input').prop('disabled', false);
		login.find('.actions input').prop('disabled', false);
	},
	isLocked: function(base) {
		var login = base.find('> .content .view > .login');
		return login.hasClass('disabled');
	},
	isSimpleState: function(base) {
		var login = base.find('> .content .view > .login');
		return login.find('.accountSimple').is(':visible');
	},

	getAccount: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return login.find('.accountSimple .account').val();
		} else {
			return login.find('.accountAdvanced .account').val();
		}
	},
	getPassword: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return login.find('.accountSimple .password').val();
		} else {
			return login.find('.accountAdvanced .password').val();
		}
	},
	getDomain: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return linphone.ui.view.login.simpleDomain;
		} else {
			return login.find('.accountAdvanced .domain').val();
		}
	},
	getTransport: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return null;
		} else {
			return login.find('input[name=transport]:checked').val();
		}
	},
	getProxy: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return null;
		} else {
			return login.find('.accountAdvanced .proxy').val();
		}
	},
	getOutbandProxy: function(base) {
		var login = base.find('> .content .view > .login');
		if (linphone.ui.view.login.isSimpleState(base)) {
			return false;
		} else {
			return login.find('input[name=outbandProxy]:checked').val();
		}
	},
	getConfigFilename: function(base) {
		return 'local:///.linphonerc_' + linphone.ui.view.login.getAccount(base) + '@' + linphone.ui.view.login.getDomain(base);
	},
	getChatDatabaseFilename: function(base) {
		return 'local:///.chatdb_' + linphone.ui.view.login.getAccount(base) + '@' + linphone.ui.view.login.getDomain(base);
	},
	computeHash: function(base) {
		var account = linphone.ui.view.login.getAccount(base);
		var password = linphone.ui.view.login.getPassword(base);
		var domain = linphone.ui.view.login.getDomain(base);
		return CryptoJS.SHA1(account + '@' + domain + ':' + password).toString(CryptoJS.enc.Hex);
	},
	checkLoginInformation: function(base) {
		var account = linphone.ui.view.login.getAccount(base);
		var password = linphone.ui.view.login.getPassword(base);
		if (linphone.ui.view.login.isSimpleState(base)) {
			if (linphone.ui.view.login.state.simple.regex.account.exec(account) === null) {
				linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.account');
				return false;
			}
			if (linphone.ui.view.login.state.simple.regex.password.exec(password) === null) {
				linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
				return false;
			}
		} else {
			var domain = linphone.ui.view.login.getDomain(base);
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
		}
		return true;
	},
	login: function(base){
		if (linphone.ui.view.login.isLocked(base)) {
			return;
		}
		if (linphone.ui.view.login.checkLoginInformation(base)) {
			linphone.ui.view.login.loginRegister(base);
		}
	},
	startCore: function(base, configFilename, chatDbFilename) {
		var core = linphone.ui.getCore(base);
		linphone.ui.view.login.lock(base);
		linphone.ui.core.start(core, configFilename, chatDbFilename);
		core.iterateEnabled = true;
	},
	loginRegister: function(base) {
		var core = linphone.ui.getCore(base);
		var account = linphone.ui.view.login.getAccount(base);
		var domain = linphone.ui.view.login.getDomain(base);
		var configFilename = linphone.ui.view.login.getConfigFilename(base);
		var chatDbFilename = linphone.ui.view.login.getChatDatabaseFilename(base);
		core.fileManager.exists(configFilename, function(exist, error) {
			var config = core.newLpConfig(configFilename);
			if (exist) {
				var password = linphone.ui.view.login.getPassword(base);
				var hash = linphone.ui.view.login.computeHash(base);
				var storedHash = config.getString('app', 'identity_hash', '');
				if ((storedHash === '') || (hash === storedHash)) {
					linphone.ui.view.login.startCore(base, configFilename, chatDbFilename);
				} else {
					linphone.ui.popup.error.show(base, 'content.view.login.accountSimple.errors.password');
				}
			} else {
				var uri = linphone.ui.view.login.remoteProvisioningUriBase;
				if (linphone.ui.view.login.isSimpleState(base)) {
					uri += 'simple.xml';
				} else {
					uri += 'advanced.xml';
				}
				config.setString('misc', 'config-uri', uri);
				config.sync();
				linphone.ui.view.login.startCore(base, configFilename,chatDbFilename);
			}
		});
	},
	loginConfigure: function(base) {
		var core = linphone.ui.getCore(base);
		var account = linphone.ui.view.login.getAccount(base);
		var password = linphone.ui.view.login.getPassword(base);

		var proxyConfig = core.createProxyConfig();
		var address = core.newAddress(proxyConfig.identity);
		address.username = account;

		if (linphone.ui.view.login.isSimpleState(base)) {
			proxyConfig.identity = address.asString();
		} else {
			var domain = linphone.ui.view.login.getDomain(base);
			var transport = linphone.ui.view.login.getTransport(base);
			var proxy = linphone.ui.view.login.getProxy(base);

			address.domain = domain;
			proxyConfig.identity = address.asString();

			if (proxy !== null && proxy !== '') {
				proxyConfig.serverAddr = proxy;
			} else {
				proxyConfig.serverAddr = domain;
			}
			address = core.newAddress(proxyConfig.serverAddr);
			if (transport === 'tcp') {
				address.transport = linphone.TransportType.Tcp;
			} else if (transport === 'tls') {
				address.transport = linphone.TransportType.Tls;
			} else {
				address.transport = linphone.TransportType.Udp;
			}
			proxyConfig.serverAddr = address.asString();
			if (linphone.ui.view.login.getOutbandProxy(base)) {
				proxyConfig.route = proxyConfig.serverAddr;
			}
		}

		var ret = core.addProxyConfig(proxyConfig);
		if (ret === 0) {
			core.defaultProxy = proxyConfig;
		} else {
			linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
			linphone.ui.core.stop(core);
		}
	},

	/* Results */
	error: function(base, error) {
		linphone.ui.view.login.unlock(base);
		linphone.ui.popup.error.show(base, error);
	},
	done: function(base) {
		var login = base.find('> .content .view > .login');

		base.off('authInfoRequested', linphone.ui.view.login.onAuthInfoRequested);
		base.off('globalStateChanged', linphone.ui.view.login.onGlobalStateChanged);
		base.off('registrationStateChanged', linphone.ui.view.login.onRegistrationStateChanged);
		linphone.ui.view.login.unlock(base);

		// Force if we are still on this view
		linphone.ui.login(base, linphone.ui.view.top(base).is(login));
	},

	/* On core events */
	onAuthInfoRequested: function(event, realm, username, domain) {
		var base = jQuery(this);
		var core = linphone.ui.getCore(base);
		var authinfo = core.newAuthInfo(username, username, linphone.ui.view.login.getPassword(base), null, realm, domain);
		if (core.authInfoList.length === 0){	
			core.addAuthInfo(authinfo);
		} else {
			var configFilename = linphone.ui.view.login.getConfigFilename(base);
			var proxyList = core.proxyConfigList;
			var proxy = proxyList[0];
			if((proxy.error === linphone.Reason.BadCredentials) || (proxy.error === linphone.Reason.NotFound)) {
				linphone.ui.core.stop(core);
				core.fileManager.remove(configFilename, function(success, msg) {
					linphone.ui.view.login.error(base, 'content.view.login.errors.account');
				});
			} else if (proxy.error === linphone.Reason.Unauthorized) {
				linphone.ui.core.stop(core);
				core.fileManager.remove(configFilename, function(success, msg) {
					linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
				});
			}
			
		}
	},
	onGlobalStateChanged: function(event, state, message) {
		if (state === linphone.GlobalState.On) {
			var base = jQuery(this);
			var core = linphone.ui.getCore(base);

			// Init sound and image properties
			core.staticPicture = 'internal:///share/images/nowebcamCIF.jpg';
			core.ring = 'internal:///share/sounds/linphone/rings/oldphone.wav';
			core.ringback = 'internal:///share/sounds/linphone/ringback.wav';
			core.playFile = 'internal:///share/sounds/linphone/rings/toy-mono.wav';
			core.usePreviewWindow = false;

			if (core.defaultProxy === null) {
				/* The proxy config has not yet been created, configure the login */
				linphone.ui.view.login.loginConfigure(base);
			}
		}
	},
	onRegistrationStateChanged: function(event, proxy, state, message) {
		var base = jQuery(this);
		var login = base.find('> .content .view > .login');
		var core = linphone.ui.getCore(base);
		if (state === linphone.RegistrationState.Ok) {
			if (core.config.getString('app', 'identity_hash', '') === '') {
				var hash = linphone.ui.view.login.computeHash(base);
				core.config.setString('app', 'identity_hash', hash);
			}
			if(login.find('.actions .rememberMe').is(':checked')){
				var dtExpire = new Date();
				dtExpire.setTime(dtExpire.getTime() + 3600 * 1000 * 24 * 365);
				linphone.ui.utils.setCookie("linphone-configfilename",linphone.ui.view.login.getConfigFilename(base),dtExpire,'/');
				linphone.ui.utils.setCookie("linphone-dbfilename",linphone.ui.view.login.getChatDatabaseFilename(base),dtExpire,'/');
			}
			linphone.ui.view.login.done(base);
		} else if(state === linphone.RegistrationState.Failed) {
			if((proxy.error === linphone.Reason.BadCredentials) || (proxy.error === linphone.Reason.NotFound)) {
				var configFilename = linphone.ui.view.login.getConfigFilename(base);
				linphone.ui.core.stop(core);
				core.fileManager.remove(configFilename, function(success, msg) {
					linphone.ui.view.login.error(base, 'content.view.login.errors.account');
				});
			} else if (proxy.error !== linphone.Reason.Unauthorized) {
				linphone.ui.core.stop(core);
				linphone.ui.view.login.error(base, 'content.view.login.errors.registrationFailed');
			}
		}
	}
};
