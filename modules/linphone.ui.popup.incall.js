/*globals jQuery,linphone*/

linphone.ui.popup.incall = {
	init: function(base) {
		linphone.ui.popup.incall.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .popup > .incall .callIn').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'call');
			
			linphone.ui.popup.hide(base, 'incall');
		}));
	},
	translate: function(base) {
		
	}
};
