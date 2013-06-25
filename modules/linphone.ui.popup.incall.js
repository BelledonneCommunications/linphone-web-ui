/*globals jQuery,linphone*/

linphone.ui.popup.incall = {
	init: function(base) {
		linphone.ui.popup.incall.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .popup > .incall .callIn').click(linphone.ui.exceptionHandler(base, function(event){
			var target = jQuery(event.target ? event.target : event.srcElement);
			var base = linphone.ui.getBase(target);
			base.find('> .content .view > .call').show();
			linphone.ui.popup.hide(base, '.incall');
		}));
	},
	translate: function(base) {
		
	}
};
