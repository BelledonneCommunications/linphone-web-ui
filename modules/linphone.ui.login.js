jQuery('.linphoneweb .view .login .goAccountOther').click(function(){
	jQuery('.linphoneweb .view .login .accountLinphone').css('display','none');
	jQuery('.linphoneweb .view .login .accountOther').css('display','block');	
});

jQuery('.linphoneweb .view .login .login').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb .view .login').css('display','none');
	jQuery('.linphoneweb .profil,.ringtone,.dialer,.menu').css('display','block');
	jQuery('.linphoneweb .view').css({'width':'710px','margin':'0','background':'#fff'});
	jQuery('.linphoneweb .popup .incall').css('display','block');
	jQuery('.linphoneweb .popup .error').css('display','block');
	linphone.ui.popup.showError(base);
});
