/*globals jQuery,linphone*/

linphone.ui.view.login = {
	init: function(base) {
		linphone.ui.view.login.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .login .goAccountOther').click(linphone.ui.exceptionHandler(base, function(){
			base.find('> .content .view > .login .accountSimple').hide();
			base.find('> .content .view > .login .accountAdvanced').show();	
		}));
		
		base.find('> .content .view > .login .login').click(linphone.ui.exceptionHandler(base, function(event){
			var target = jQuery(event.target ? event.target : event.srcElement);
			var base = linphone.ui.getBase(target);
			base.find('> .header .profile').visible();
			base.find('> .header .settings').removeClass('disabled');
			base.find('> .content .view > .login').hide();
			base.find('> .content .mainbar').show();
			linphone.ui.menu.show(base);
			linphone.ui.popup.show(base, '.incall');
			linphone.ui.popup.error.show(base, null, 'ullam quis nunc massa, et bibendum lorem. Curabitur vulputate molestie hendrerit.');
		}));
	},
	translate: function(base) {
		base.find('> .content .view > .login .accountSimple .account').watermark(jQuery.i18n.translate('content.view.login.accountSimple.account'));
		base.find('> .content .view > .login .accountSimple .password').watermark(jQuery.i18n.translate('content.view.login.accountSimple.password'));
		base.find('> .content .view > .login .accountAdvanced .account').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.account'));
		base.find('> .content .view > .login .accountAdvanced .password').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.password'));
		base.find('> .content .view > .login .accountAdvanced .proxy').watermark(jQuery.i18n.translate('content.view.login.accountAdvanced.proxy'));
	}
};

