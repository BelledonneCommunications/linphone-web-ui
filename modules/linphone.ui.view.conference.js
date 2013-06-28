/*globals jQuery,linphone*/

linphone.ui.view.conference = {
	init: function(base) {
		linphone.ui.view.conference.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .conference').data('linphoneweb-view', linphone.ui.view.conference);
		
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
	},
	hide: function(base) {
	}
};