/*globals jQuery,linphone,setSlider */

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
	init: function(base) {
		linphone.ui.uiInit(base);
		linphone.ui.header.init(base);
		linphone.ui.menu.init(base);
		linphone.ui.mainbar.init(base);
		linphone.ui.dialer.init(base);
		linphone.ui.view.init(base);
		linphone.ui.popup.init(base);
	},
	uiInit: function(base) {
		base.find('.scroll-pane').each(function(){
			setSlider(jQuery(this));
		});
		base.find('> .content .loading').hide();
	}
};

