jQuery('.linphoneweb .popup .error .btnTxt').click(function(event){
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	jQuery('.linphoneweb .popup .error').css('display','none');
	linphone.ui.popup.updatePopups(base);
});