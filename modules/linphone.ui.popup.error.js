linphone.ui.error = {
};

jQuery('.linphoneweb > .content .popup > .error .button').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb > .content .popup > .error').hide();
	linphone.ui.popup.updatePopups(base);
});