linphone.ui.login = {
};

jQuery('.linphoneweb > .content .view .login .goAccountOther').click(function(){
	jQuery('.linphoneweb > .content .view .login .accountLinphone').hide();
	jQuery('.linphoneweb > .content .view .login .accountOther').show();	
});

jQuery('.linphoneweb > .content .view .login .login').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb > .header .profile').show();
	jQuery('.linphoneweb > .header .settings').removeClass('disabled');
	jQuery('.linphoneweb > .content .view .login').hide();
	jQuery('.linphoneweb > .content .mainbar').show();
	jQuery('.linphoneweb > .content .menu').show();
	jQuery('.linphoneweb > .content .popup > .incall').show();
	jQuery('.linphoneweb > .content .popup > .error').show();
	linphone.ui.popup.showError(base);
});
