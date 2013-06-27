/*globals jQuery,linphone*/

linphone.ui.view.contact = {
	init: function(base) {
		linphone.ui.view.contact.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .contact').data('linphoneweb-view', linphone.ui.view.contact);
		
	},
	translate: function(base) {
		
	},
	
	show: function(base) {
		linphone.ui.menu.show(base);
	},
	hide: function(base) {
	}
};