jQuery('.linphoneweb .header .profil,.ringtone,.dialer,.menu').css('display','none');

jQuery('.linphoneweb .header .profil .profilOpen').mouseover(function(){
	jQuery('.linphoneweb .header .profil').css('background','#2f3338');
	jQuery('.linphoneweb .header .profilModify').css('display','block');
	jQuery('.linphoneweb .header .profilModify').mouseleave(function(){
		jQuery(this).css('display','none');
		jQuery('.linphoneweb .header .profil').css('background','#23262a'); 
	});	
});

jQuery('.linphoneweb .header .subnav .goSettings').click(function(){
	jQuery('.linphoneweb .view>div').css('display','none');
	jQuery('.linphoneweb .menu').css('display','none');
	jQuery('.linphoneweb .view').css('width','940px');
	jQuery('.linphoneweb .view .settings').css('display','block');
	jQuery('.linphoneweb .view .settings .btnTxt').click(function(){
		jQuery('.linphoneweb .view .settings').css('display','none');
		jQuery('.linphoneweb .view').css('width','710px');
		jQuery('.linphoneweb .menu').css('display','block');
	});
});

jQuery('.linphoneweb .header .subnav .goAbout').click(function(){
	jQuery('.linphoneweb .view>div').css('display','none');
	jQuery('.linphoneweb .menu').css('display','none');
	jQuery('.linphoneweb .view').css('width','940px');
	jQuery('.linphoneweb .view .about').css('display','block');
	jQuery('.linphoneweb .view .about .btn').click(function(){
		jQuery('.linphoneweb .view .about').css('display','none');
		jQuery('.linphoneweb .view').css('width','710px');
		jQuery('.linphoneweb .menu').css('display','block');
	});
});