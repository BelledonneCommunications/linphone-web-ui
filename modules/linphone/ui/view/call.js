/*globals jQuery,linphone*/

linphone.ui.view.call = {
	init: function(base) {
		linphone.ui.view.call.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .call').data('linphoneweb-view', linphone.ui.view.call);
		
		base.find('> .content .view > .call .actions .conference').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'conference');
		}));
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
