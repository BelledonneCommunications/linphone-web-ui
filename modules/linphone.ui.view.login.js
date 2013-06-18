/*globals jQuery,linphone*/

linphone.ui.view.login = {
	init: function(base) {
		linphone.ui.view.login.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view .login .goAccountOther').click(function(){
			base.find('> .content .view .login .accountLinphone').hide();
			base.find('> .content .view .login .accountOther').show();	
		});
		
		base.find('> .content .view .login .login').click(function(event){
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			base.find('> .header .profile').show();
			base.find('> .header .settings').removeClass('disabled');
			base.find('> .content .view .login').hide();
			base.find('> .content .mainbar').show();
			base.find('> .content .menu').show();
			base.find('> .content .popup > .incall').show();
			base.find('> .content .popup > .error').show();
			linphone.ui.popup.showError(base);
		});
	}
};

