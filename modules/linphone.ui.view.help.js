/*globals jQuery,linphone*/

linphone.ui.view.help = {
	init: function(base) {
		linphone.ui.view.help.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .help').data('linphoneweb-view', linphone.ui.view.help);
		
		base.find('> .content .view > .help .button').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.hide(base, 'help');
		}));
	},
	translate: function(base) {
	}
};