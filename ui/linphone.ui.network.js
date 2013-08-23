/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.network = {
	protocols : [
		{name: "UDP", property: "udpPort"},
		{name: "TCP", property: "tcpPort"},
		//{name: "DTLS", property: "dtlsPort"},
		{name: "TLS", property: "tlsPort"}
	],
	update : function(target) {
		var base = linphone.ui.getBase(target);
		var core = linphone.ui.getCore(target);
		
		// Remove JQuery UI select style
		base.find('.window .network-options .transports').selectmenu('destroy');
		
		// Clear
		base.find('.window .network-options .transports').empty();
		
		// Transports
		for (var protocol_index in linphone.ui.network.protocols) {
			var protocol = linphone.ui.network.protocols[protocol_index];
			var protocol_option = '<option value="' + protocol.property + '">' + protocol.name + '</option>';
			base.find('.window .network-options .transports').append(protocol_option);
		}
		
		// Update port and transport
		var transports = core.sipTransports;
		for (var protocol_index2 in linphone.ui.network.protocols) {
			var protocol2 = linphone.ui.network.protocols[protocol_index2];
			var port = transports[protocol2.property];
			if(port > 0) {
				// Log
				linphone.core.log('Transport ' + protocol2.name + " on "  + port);
				base.find('.window .network-options .transports').val(protocol2.property);
				base.find('.window .network-options .port').val(port);
			}
		}		
	
		// Apply JQuery UI select style
		base.find('.window .network-options .transports').selectmenu();
		
		// Event
		base.find('.window .network-options .transports').unbind('change');
		base.find('.window .network-options .transports').change(linphone.ui.network.changeEvent);
	},
	applyChange: function(target) {
		var base = linphone.ui.getBase(target);
		var core = linphone.ui.getCore(target);
		var transport = base.find('.window .network-options .transports').val();
		var port = base.find('.window .network-options .port').val();
		var transports = core.sipTransports;
		for (var protocol_index in linphone.ui.network.protocols) {
			var protocol = linphone.ui.network.protocols[protocol_index];
			if(protocol.property === transport) {
				// Log
				linphone.core.log('Transport ' + protocol.name + " on "  + port);
				transports[protocol.property] = port;
			} else {
				transports[protocol.property] = 0;
			}
		}
		core.sipTransports = transports;
	},
	changeEvent: function(event) {
		var target = jQuery(event.target ? event.target : event.srcElement);
		var core = linphone.ui.getCore(target);
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target ? event.target : event.srcElement);
	var base = linphone.ui.getBase(target);
	
	// Click on account item
	if (target.isOrParent('.linphone .window .tools .network > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');

		linphone.ui.network.update(target);

		base.find('.window .network-options').fadeIn('fast');
	}
	if (target.parents('.linphone .window .network-options > .ui-dialog-titlebar').length > 0) {
		linphone.ui.network.applyChange(target);
	}
});
