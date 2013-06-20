/*globals jQuery,linphone*/

linphone.ui.view.plugin = {
	init: function(base) {
		linphone.ui.view.plugin.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .plugin .reload').click(function(){
			base.find('> .content .view > .plugin').hide();
			base.find('> .content .view > .login').show();
			base.find('> .content .view > .login .accountAdvanced').hide();
		});	
	},
	translate: function(base) {
		
	}
};