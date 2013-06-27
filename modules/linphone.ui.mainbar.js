/*globals jQuery,linphone*/

linphone.ui.mainbar = {
	init: function(base) {
		linphone.ui.mainbar.uiInit(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
	},
	
	show: function(base, view) {
		base.find('> .content .mainbar').show();
	},
	hide: function(base, view) {
		base.find('> .content .mainbar').hide();
	},
};