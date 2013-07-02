/*globals jQuery,linphone*/

linphone.ui.dialer = {
	init: function(base) {
		linphone.ui.dialer.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .dialer .call').click(linphone.ui.exceptionHandler(base, function() {
			var address = base.find('> .content .dialer .address').val();
			var url = linphone.ui.utils.formatAddress(base, address);
			if(url) {
				linphone.ui.logger.log(base, url);
				linphone.ui.popup.show(base, 'outcall');
				
				// Reset input
				base.find('> .content .dialer .address').val('');
			} else {
				linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
			}
		}));
		
		base.find('> .content .dialer .number').click(linphone.ui.exceptionHandler(base, function(){
			base.find('> .content .dialer .pinpad').toggle();
		}));
		
		base.find('> .content .dialer .pinpad').disableSelection();
		
		if(linphone.ui.configuration(base).disableChat) {
			base.find('> .content .dialer .actions .chat').hide();
		}
	},
	translate: function(base) {
		base.find('> .content .dialer .address').watermark(jQuery.i18n.translate('content.dialer.address'));
	}
};