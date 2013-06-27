/*globals jQuery,linphone*/

linphone.ui.view.settings = {
	init: function(base) {
		linphone.ui.view.settings.uiInit(base);
		linphone.ui.view.settings.media.init(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .settings').data('linphoneweb-view', linphone.ui.view.settings);
	},
	translate: function(base) {
		
	},
	show: function(base) {
		linphone.ui.menu.hide(base);
		linphone.ui.view.settings.media.show(base);
	},
	hide: function(base) {
	}
};