linphone.ui = {
	getCore: function(target) {
		var base = linphone.ui.getBase(target);
		return base.find('> .core').get()[0];
	},
	getBase: function(target) {
		if (typeof target === 'undefined') {
			target = jQuery(this);
		}
		if (target.is('.linphoneweb')) {
			return target;
		} else {
			return target.parents('.linphoneweb');
		}
	},
	init: function(target) {
		var base = linphone.ui.getBase(target);
		base.find('.content .loading').hide();
	}
};

jQuery('.linphoneweb .scroll-pane').each(function(){
	setSlider(jQuery(this));
});