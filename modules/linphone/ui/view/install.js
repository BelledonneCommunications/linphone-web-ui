/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Sylvain Berfini <sylvain.berfini@belledonne-communications.com>
 
*/

/*globals jQuery,linphone*/

linphone.ui.view.install = {
	init: function(base) {
		linphone.ui.view.install.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .install').data('linphoneweb-view', linphone.ui.view.install);
		base.find('> .content .view > .install .imageChrome').hide();
		base.find('> .content .view > .install .reload').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.core.reload(base);
		}));
	},
	translate: function(base) {
		
	},
	
	/* */
	show: function(base) {
		linphone.ui.menu.hide(base);

		var config = linphone.ui.configuration(base);
		var install = base.find('> .content .view > .install');
		if (jQuery.client.os === 'Windows') {
			if (jQuery.client.browser === 'Chrome') {
				install.find('.imageChrome').show();
				jQuery.i18n.set(install.find('> .text'), 'content.view.install.text.install_mac_chrome');
			} else {
				jQuery.i18n.set(install.find('> .text'), 'content.view.install.text.install_windows');
			}
			
		} else if (jQuery.client.os === 'Mac') {
			if (jQuery.client.browser === 'Chrome') {
				install.find('.imageChrome').show();
				jQuery.i18n.set(install.find('> .text'), 'content.view.install.text.install_mac_chrome');
			} else {
				jQuery.i18n.set(install.find('> .text'), 'content.view.install.text.install_mac');
			}
		} else if (jQuery.client.os === 'Linux') {
			jQuery.i18n.set(install.find('> .text'), 'content.view.install.text.install_tar_gz');
		}
	},
	
	/* */
	hide: function(base) {
	}
};