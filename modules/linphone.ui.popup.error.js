/*globals jQuery,linphone*/

linphone.ui.popup.error = {
	init: function(base) {
		linphone.ui.popup.error.uiInit(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
		
	},
	show: function(base, error_id, error) {
		// Create error message
		var content;
		if(typeof error_id === 'undefined' || error_id === null) {
			content = jQuery("<div />").text(error).html();
		} else {
			content = jQuery.i18n.skeleton(error_id);
		}
		
		// Generate error popup
		var list = base.find('> .content .popup');
		var errorPopup = linphone.ui.template(base, 'view.popup.error', {
			content: content
		});
		errorPopup.find('.button').click(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			var base = linphone.ui.getBase(target);
			
			// Close itself
			target.getSelfAndParents('.popup > .error').hide();
			linphone.ui.popup.updatePopups(base);
		}));
		
		// Append to DOM
		list.append(errorPopup);
		errorPopup.show();
		linphone.ui.popup.updatePopups(base);
	}
};
