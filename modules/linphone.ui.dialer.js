jQuery('.dialer .goOutcall').click(function(){
	jQuery('.popup-outcall').css('display','block');
});

jQuery('.dialer .number').mouseover(function(){
		jQuery('.dialer table').css('display','block');
});

jQuery('.dialer .number').mouseleave(function(){
	jQuery('.dialer table').css('display','none');
});