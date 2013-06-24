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
		var content;
		if(typeof error_id === 'undefined' || error_id === null) {
			content = jQuery("<div />").text(error).html();
		} else {
			content = jQuery.i18n.skeleton(error_id);
		}
		var list = base.find('> .content .popup');
		var error = linphone.ui.template(base, 'view.popup.error', {
			content: content
		});
		error.show();
		error.find('.button').click(function(event){
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			
			// Close itself
			var e = target.getSelfAndParents('.popup > .error');
			e.hide();
			linphone.ui.popup.updatePopups(base);
		});
		list.append(error);
		linphone.ui.popup.updatePopups(base);
	}
};
