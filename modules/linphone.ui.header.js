jQuery('header .profil,.ringtone,.dialer,aside').css('display','none');

jQuery('header .profil .profilOpen').mouseover(function(){
	jQuery('header .profil').css('background','#2f3338');
	jQuery('header .profilModify').css('display','block');
	jQuery('header .profilModify').mouseleave(function(){
		jQuery(this).css('display','none');
		jQuery('header .profil').css('background','#23262a'); 
	});	
});

jQuery('header .subnav .goSettings').click(function(){
	jQuery('.wrapper>div').css('display','none');
	jQuery('aside').css('display','none');
	jQuery('.wrapper').css('width','940px');
	jQuery('.wrapper .settings').css('display','block');
	jQuery('.wrapper .settings .btnTxt').click(function(){
		jQuery('.wrapper .settings').css('display','none');
		jQuery('.wrapper').css('width','710px');
		jQuery('aside').css('display','block');
	});
});

jQuery('header .subnav .goAbout').click(function(){
	jQuery('.wrapper>div').css('display','none');
	jQuery('aside').css('display','none');
	jQuery('.wrapper').css('width','940px');
	jQuery('.wrapper .about').css('display','block');
	jQuery('.wrapper .about .btn').click(function(){
		jQuery('.wrapper .about').css('display','none');
		jQuery('.wrapper').css('width','710px');
		jQuery('aside').css('display','block');
	});
});