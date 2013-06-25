/*globals jQuery,linphone*/

linphone.ui.dialer = {
	init: function(base) {
		linphone.ui.dialer.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .dialer .call').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.popup.show(base, '> .content .popup > .outcall');
		}));
		
		base.find('> .content .dialer .number').click(linphone.ui.exceptionHandler(base, function(){
			base.find('> .content .dialer .pinpad').toggle();
		}));
	},
	translate: function(base) {
		base.find('> .content .dialer .address').watermark(jQuery.i18n.translate('content.dialer.address'));
	}
};