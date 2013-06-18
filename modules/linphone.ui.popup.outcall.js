linphone.ui.popup.outcall = {
	init: function(base) {
		linphone.ui.popup.outcall.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .popup > .outcall .callOff').click(function(){
			base.find('> .content .popup > .outcall').hide();
		});
	}
};