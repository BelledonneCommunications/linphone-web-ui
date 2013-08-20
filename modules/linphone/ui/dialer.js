/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

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
		
		base.find('> .content .dialer .number').click(linphone.ui.exceptionHandler(base, function() {
			base.find('> .content .dialer .pinpad').toggle();
		}));
		
		base.find('> .content .dialer .pinpad .digit').mousedown(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			var digit = target.data('digit');
			if(typeof digit !== 'undefined' && digit !== null) {
				var core = linphone.ui.getCore(base);
				core.playDtmf(digit, 0);
				var call = core.currentCall;
				if(call) {
					core.sendDtmf(call, digit);
				} else {
					var address = base.find('> .content .dialer .address');
					address.val(address.val() + digit);
					linphone.ui.dialer.moveCaretToEnd(base);
				}
			}
		})).mouseup(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			var digit = target.data('digit');
			if(typeof digit !== 'undefined' && digit !== null) {
				var core = linphone.ui.getCore(base);
				core.stopDtmf(digit);
			}
		}));
		
		base.find('> .content .dialer .pinpad').disableSelection();
		
		if(linphone.ui.configuration(base).disableChat) {
			base.find('> .content .dialer .actions .chat').hide();
		}
	},
	translate: function(base) {
		base.find('> .content .dialer .address').watermark(jQuery.i18n.translate('content.dialer.address'), {className: 'watermark', useNative: false});
	},
	
	moveCaretToEnd: function(base) {
		var address = base.find('> .content .dialer .address');
		var el = address.get(0);
		if (typeof el.selectionStart === 'number') {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange !== 'undefined') {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	},
	
	/* */
	call: function(base) {
		var address = base.find('> .content .dialer .address').val();
		linphone.ui.utils.call(base, address, function() {
			// Reset input
			base.find('> .content .dialer .address').val('');
		}, function() {
			linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
		});
	}
};