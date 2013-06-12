$(document).ready(function() {
		$('.scroll-pane').each(function(){
	setSlider($(this));
});
$('.profil,.ringtone,.dialer,aside').css('display','none');
$('.wrapper').css({'width':'410px','margin':'20px 0 0 260px','background':'#e4edf2'});
$('.wrapper-plugin').css('display','block');

$('.wrapper-plugin').click(function(){
	$('.wrapper-plugin').css('display','none');
	$('.wrapper-login').css('display','block');
	$('.wrapper-login .accountOther').css('display','none');
});

$('.wrapper-login .goAccountOther').click(function(){
	$('.wrapper-login .accountLinphone').css('display','none');
	$('.wrapper-login .accountOther').css('display','block');	
});

$('.wrapper-login .login').click(function(){
	$('.wrapper-login').css('display','none');
	$('.profil,.ringtone,.dialer,aside').css('display','block');
	$('.wrapper').css({'width':'710px','margin':'0','background':'#fff'});
	$('.popup-incall').css('display','block');
	$('.popup-error').css('display','block');
});

$('.popup-error .btnTxt').click(function(){$('.popup-error').css('display','none');});
$('.popup-incall .callIn').click(function(){$('.popup-incall').css('display','none'); $('.wrapper-call').css('display','block');});
$('.wrapper-call .goConference').click(function(){$('.wrapper-call').css('display','none'); $('.wrapper-conference').css('display','block');});

$('aside .goContacts').click(function(){$('.wrapper-contacts').css('display','block');
	$('.scroll-pane').each(function(){
	setSlider($(this));
});
});
$('aside .goHistory').click(function(){$('.wrapper-history').css('display','block');
		$('.scroll-pane').each(function(){
	setSlider($(this));
});
});
$('aside .goChat').click(function(){$('.wrapper-chat').css('display','block');
	$('.scroll-pane').each(function(){
	setSlider($(this));
});
});

$('aside nav li a').click(function(){$('.wrapper>div').css('display','none');});


$('.subnav .goSettings').click(function(){
$('.wrapper>div').css('display','none');
$('aside').css('display','none');
$('.wrapper').css('width','940px');
$('.wrapper-settings').css('display','block');
$('.wrapper-settings .btnTxt').click(function(){
$('.wrapper-settings').css('display','none');
$('.wrapper').css('width','710px');
$('aside').css('display','block');
});
});

$('.subnav .goAbout').click(function(){
$('.wrapper>div').css('display','none');
$('aside').css('display','none');
$('.wrapper').css('width','940px');
$('.wrapper-about').css('display','block');
$('.wrapper-about .btn').click(function(){
$('.wrapper-about').css('display','none');
$('.wrapper').css('width','710px');
$('aside').css('display','block');
});
});



$('aside nav li li').mouseover(function() { $(this).append('<span class="closeContact"></span>');});
$('aside nav li li').mouseleave(function() { $('.closeContact',this).remove();});

$('.dialer .goOutcall').click(function(){$('.popup-outcall').css('display','block');});
$('.popup-outcall .callOff').click(function(){$('.popup-outcall').css('display','none');});

$('.wrapper-contacts .goContact').click(function(){$('.wrapper-contacts').css('display','none'); 
	$('.wrapper-contact').css('display','block');
});


$('.dialer .number').mouseover(function(){$('.dialer table').css('display','block');});
$('.dialer .number').mouseleave(function(){$('.dialer table').css('display','none');});


$('header .profil .profilOpen').mouseover(function(){
	$('header .profil').css('background','#2f3338');
	$('header .profilModify').css('display','block');
	$('header .profilModify').mouseleave(function(){$(this).css('display','none');$('header .profil').css('background','#23262a'); });	
	});

});

						
						

/*
jQuery('.call').click(function(event) {
        var target = jQuery(event.target);
        var base = linphone.ui.getBase(target);
        base.find('.outcall').css('display','block');
        });
        
        */