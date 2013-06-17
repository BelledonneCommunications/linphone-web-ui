linphone.ui.popup = {
	updatePopups: function(base) {
		var popup = base.find('.content .popup');
		if(popup.children().filter(function() { return $(this).css("display") != "none" }).length > 0) {
			popup.css('display','block');
		} else {
			popup.css('display','none');
		}
	},
	showError: function(base) {
		
		linphone.ui.popup.updatePopups(base);
	}
};
