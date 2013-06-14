jQuery('.wrapper-login .goAccountOther').click(function(){
	jQuery('.wrapper-login .accountLinphone').css('display','none');
	jQuery('.wrapper-login .accountOther').css('display','block');	
});

jQuery('.wrapper-login .login').click(function(){
	jQuery('.wrapper-login').css('display','none');
	jQuery('.profil,.ringtone,.dialer,aside').css('display','block');
	jQuery('.wrapper').css({'width':'710px','margin':'0','background':'#fff'});
	jQuery('.popup-incall').css('display','block');
	jQuery('.popup-error').css('display','block');
});
