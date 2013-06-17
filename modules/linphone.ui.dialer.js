linphone.ui.dialer = {
}

jQuery('.linphoneweb > .content .dialer .goOutcall').click(function(){
	jQuery('.linphoneweb > .content .popup .outcall').show();
});

jQuery('.linphoneweb > .content .dialer .number').mouseover(function(){
		jQuery('.linphoneweb > .content .dialer table').show();
});

jQuery('.linphoneweb > .content .dialer .number').mouseleave(function(){
	jQuery('.linphoneweb > .content .dialer table').hide();
});