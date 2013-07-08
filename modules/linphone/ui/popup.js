/*globals jQuery,linphone*/

linphone.ui.popup = {
	init: function(base) {
		linphone.ui.popup.uiInit(base);
		linphone.ui.popup.incall.init(base);
		linphone.ui.popup.outcall.init(base);
		linphone.ui.popup.error.init(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
		linphone.ui.popup.incall.translate(base);
		linphone.ui.popup.outcall.translate(base);
		linphone.ui.popup.error.translate(base);
	},
	
	/* TODO: Remove */
	show: function(base, view) {
		base.find('> .content .popup > .' + view).show();
		linphone.ui.popup.update.apply(this, [base].concat(Array.prototype.slice.call(arguments, 2)));
	},
	hide: function(base, view) {
		base.find('> .content .popup > .' + view).hide();
		linphone.ui.popup.update.apply(this, [base].concat(Array.prototype.slice.call(arguments, 2)));
	},
	
	/* */
	update: function(base) {
		var popup = base.find('.content .popup');
		if(popup.children().filter(function() { return jQuery(this).css("display") !== "none"; }).length > 0) {
			popup.show();
		} else {
			popup.hide();
		}
	},
	clear: function(base) {
		var popup = base.find('.content .popup');
		popup.children().each(function(index, object) {
			var jobject = jQuery(object);
			if(jobject.css("display") !== "none") {
				jobject.hide();
			}
		});
		linphone.ui.popup.update(base);
	}
};
