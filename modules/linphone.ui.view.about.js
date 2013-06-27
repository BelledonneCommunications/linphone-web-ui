/*globals jQuery,linphone*/

linphone.ui.view.about = {
	init: function(base) {
		linphone.ui.view.about.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .about').data('linphoneweb-view', linphone.ui.view.about);
		
		base.find('> .content .view > .about .button').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.hide(base, 'about');
		}));
	},
	translate: function(base) {
		
	},
	
	show: function(base) {
		linphone.ui.menu.hide(base);
	},
	hide: function(base) {
	}
};