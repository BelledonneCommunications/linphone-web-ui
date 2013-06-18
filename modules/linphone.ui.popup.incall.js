linphone.ui.incall = {
};

jQuery('.linphoneweb > .content .popup .incall .callIn').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb .popup .incall').hide();
	jQuery('.linphoneweb .view .call').show();
	linphone.ui.popup.updatePopups(base);
});