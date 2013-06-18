/*globals jQuery,linphone*/

linphone.ui.popup.error = {
	init: function(base) {
		linphone.ui.popup.error.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .popup > .error .button').click(function(event){
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			base.find('> .content .popup > .error').hide();
			linphone.ui.popup.updatePopups(base);
		});
	}
};
