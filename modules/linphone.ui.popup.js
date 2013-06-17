linphone.ui.popup = {
	updatePopups: function(base) {
		var popup = base.find('.content .popup');
		if(popup.children().filter(function() { return $(this).css("display") != "none"; }).length > 0) {
			popup.show();
		} else {
			popup.hide();
		}
	},
	showError: function(base) {
		
		linphone.ui.popup.updatePopups(base);
	}
};
