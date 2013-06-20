/*globals jQuery,linphone*/

linphone.ui.dialer = {
	init: function(base) {
		linphone.ui.dialer.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .dialer .call').click(function(){
			base.find('> .content .popup > .outcall').show();
			linphone.ui.popup.updatePopups(base);
		});
		
		base.find('> .content .dialer .number').click(function(){
			base.find('> .content .dialer .pinpad').toggle();
		});
	},
	translate: function(base) {
		base.find('> .content .dialer .address').watermark(jQuery.i18n.translate('content.dialer.address'));
	}
};