/*globals jQuery,linphone*/

linphone.ui.view.main = {
	init: function(base) {
		linphone.ui.view.main.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .main').data('linphoneweb-view', linphone.ui.view.main);
	},
	translate: function(base) {
		
	},
	
	/* */
	show: function(base) {
		linphone.ui.menu.show(base);
		linphone.ui.mainbar.show(base);
	},
	hide: function(base) {
	}
};