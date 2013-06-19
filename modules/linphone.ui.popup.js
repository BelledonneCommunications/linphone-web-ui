/*globals jQuery,linphone*/

linphone.ui.popup = {
	updatePopups: function(base) {
		var popup = base.find('.content .popup');
		if(popup.children().filter(function() { return jQuery(this).css("display") !== "none"; }).length > 0) {
			popup.show();
		} else {
			popup.hide();
		}
	},
	showError: function(base) {
		linphone.ui.popup.updatePopups(base);
	},
	init: function(base) {
		linphone.ui.popup.uiInit(base);
		linphone.ui.popup.incall.init(base);
		linphone.ui.popup.outcall.init(base);
		linphone.ui.popup.error.init(base);
	},
	uiInit: function(base) {
	}
};
