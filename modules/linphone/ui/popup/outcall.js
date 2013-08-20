/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.popup.outcall = {
	init: function(base) {
		linphone.ui.popup.outcall.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .popup > .outcall .callOff').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.popup.hide(base, 'outcall');
		}));
	},
	translate: function(base) {
		
	}
};