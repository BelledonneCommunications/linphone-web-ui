jQuery('.linphoneweb .dialer .goOutcall').click(function(){
	jQuery('.linphoneweb .popup .outcall').css('display','block');
});

jQuery('.linphoneweb .dialer .number').mouseover(function(){
		jQuery('.linphoneweb .dialer table').css('display','block');
});

jQuery('.linphoneweb .dialer .number').mouseleave(function(){
	jQuery('.linphoneweb .dialer table').css('display','none');
});