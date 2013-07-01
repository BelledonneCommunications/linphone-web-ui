/*globals jQuery,linphone*/

linphone.ui.view.login = {
	init: function(base) {
		linphone.ui.view.login.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .login').data('linphoneweb-view', linphone.ui.view.login);
		
		base.find('> .content .view > .login .goAccountOther').click(linphone.ui.exceptionHandler(base, function(){
			base.find('> .content .view > .login .accountSimple').hide();
			base.find('> .content .view > .login .accountAdvanced').show();	
		}));
		
		base.find('> .content .view > .login .login').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.login(base);
			linphone.ui.popup.show(base, 'incall');
			linphone.ui.popup.error.show(base, null, 'ullam quis nunc massa, et bibendum lorem. Curabitur vulputate molestie hendrerit.');
		}));
	},
	translate: function(base) {
		base.find('> .content .view > .login .accountSimple .account').watermark(jQuery.i18n.translate('content.view.login.accountSimple.account'));
		base.find('> .content .view > .login .accountSimple .password').watermark(jQuery.i18n.translate('content.view.login.accountSimple.password'));
		base.find('> .content .view > .login .accountAdvanced .account').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.account'));
		base.find('> .content .view > .login .accountAdvanced .password').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.password'));
		base.find('> .content .view > .login .accountAdvanced .proxy').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.proxy'));
	},
	
	/**/
	show: function(base) {
		base.find('> .content .view > .login .accountSimple').show();	
		base.find('> .content .view > .login .accountAdvanced').hide();
	},
	hide: function(base) {
	}
};

