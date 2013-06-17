jQuery('.linphoneweb .popup .incall .callIn').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb .popup .incall').css('display','none');
	jQuery('.linphoneweb .view .call').css('display','block');
	linphone.ui.popup.updatePopups(base);
});