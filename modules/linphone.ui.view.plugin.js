/*globals jQuery,linphone*/

linphone.ui.view.plugin = {
	init: function(base) {
		linphone.ui.view.plugin.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .plugin').data('linphoneweb-view', linphone.ui.view.plugin);
		base.find('> .content .view > .plugin .reload').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'login');
		}));	
	},
	translate: function(base) {
		
	},
	
	show: function(base) {
		linphone.ui.mainbar.hide(base);
		linphone.ui.menu.hide(base);
	},
	hide: function(base) {
		linphone.ui.mainbar.show(base);
	}
};