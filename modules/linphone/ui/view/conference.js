/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.conference = {
	init: function(base) {
		linphone.ui.view.conference.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .conference').data('linphoneweb-view', linphone.ui.view.conference);
		
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
	},
	hide: function(base) {
	}
};