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
		var address = base.find('> .content .dialer .address').val();
		var url = linphone.ui.utils.formatAddress(base, address);
		if(url) {
			var core = linphone.ui.getCore(base);
			core.invite_async(url);
			linphone.ui.logger.log(base, "Call: " + url);
			
			// Reset input
			base.find('> .content .dialer .address').val('');
		} else {
			linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
		}
	}
};