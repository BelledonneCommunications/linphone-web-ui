$(document).ready(function() {
$('aside nav li a').click(function(){
$('aside nav li a').removeClass('selected');
$('.wrapper>div').css('display','none');
});

$('#contactWrapper').click(function(){$('#contacts').css('display','block');
	$('#contactWrapper').addClass('selected');
});
$('#historyWrapper').click(function(){$('#history').css('display','block');
	$('#historyWrapper').addClass('selected');
});

$('#call').click(function(){$('#outcall').css('display','block');});


$('aside nav li li').mouseover(function() { $(this).append('<span class="closeContact"></span>');});
$('aside nav li li').mouseleave(function() { $('.closeContact',this).remove();});
$('header .profil .profilOpen').mouseover(function(){
	$('header .profil').css('background','#2f3338');
	$('header .profilModify').css('display','block');
	$('header .profilModify').mouseleave(function(){$(this).css('display','none');$('header .profil').css('background','#23262a'); });	
	});
$('.dialer .number').mouseover(function(){$('.dialer table').css('display','block');});
$('.dialer .number').mouseleave(function(){$('.dialer table').css('display','none');});
});