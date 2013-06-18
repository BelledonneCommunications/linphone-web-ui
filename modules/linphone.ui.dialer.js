linphone.ui.dialer = {
};

jQuery('.linphoneweb > .content .dialer .invite').click(function(){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb > .content .popup > .outcall').hide();
	linphone.ui.popup.updatePopups(base);
});

jQuery('.linphoneweb > .content .dialer .number').mouseover(function(){
	jQuery('.linphoneweb > .content .dialer table').show();
});

jQuery('.linphoneweb > .content .dialer .number').mouseleave(function(){
	jQuery('.linphoneweb > .content .dialer table').hide();
});