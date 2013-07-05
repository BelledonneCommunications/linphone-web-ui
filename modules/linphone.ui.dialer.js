/*globals jQuery,linphone*/

linphone.ui.dialer = {
	init: function(base) {
		linphone.ui.dialer.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .dialer .call').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.dialer.call(base);
		}));
		
		base.find('> .content .dialer .address').keyup(linphone.ui.exceptionHandler(base, function(event) {
			if(event.which === jQuery.ui.keyCode.ENTER) {
				linphone.ui.dialer.call(base);
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
		base.find('> .content .dialer .address').watermark(jQuery.i18n.translate('content.dialer.address'), {className: 'watermark', useNative: false});
	},
	
	/* */
	call: function(base) {
		var addressStr = base.find('> .content .dialer .address').val();
		console.log(linphone.ui.getCore(base).defaultProxy);
		var address = linphone.ui.utils.getAddress(base, addressStr);
		if(address) {
			var core = linphone.ui.getCore(base);
			core.inviteAddress_async(address);
			linphone.ui.logger.log(base, "Call: " + address.asString());
			
			// Reset input
			base.find('> .content .dialer .address').val('');
		} else {
			linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
		}
	}
};