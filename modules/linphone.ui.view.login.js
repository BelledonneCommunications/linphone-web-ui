/*globals jQuery,linphone*/

linphone.ui.view.login = {
	init: function(base) {
		linphone.ui.view.login.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .login .goAccountOther').click(function(){
			base.find('> .content .view > .login .accountSimple').hide();
			base.find('> .content .view > .login .accountAdvanced').show();	
		});
		
		base.find('> .content .view > .login .login').click(function(event){
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			base.find('> .header .profile').visible();
			base.find('> .header .settings').removeClass('disabled');
			base.find('> .content .view > .login').hide();
			base.find('> .content .mainbar').show();
			linphone.ui.menu.show(base);
			base.find('> .content .popup > .incall').show();
			base.find('> .content .popup > .error').show();
			linphone.ui.popup.showError(base);
		});
	},
	translate: function(base) {
		base.find('> .content .view > .login .accountSimple .account').watermark(jQuery.i18n.translate('content.view.login.accountSimple.account'));
		base.find('> .content .view > .login .accountSimple .password').watermark(jQuery.i18n.translate('content.view.login.accountSimple.password'));
		base.find('> .content .view > .login .accountAdvanced .account').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.account'));
		base.find('> .content .view > .login .accountAdvanced .password').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.password'));
		base.find('> .content .view > .login .accountAdvanced .proxy').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.proxy'));
	}
};

