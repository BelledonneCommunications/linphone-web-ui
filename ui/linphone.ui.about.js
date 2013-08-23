/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.about = {
		
};

//Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target ? event.target : event.srcElement);
	var base = linphone.ui.getBase(target);
	var core = linphone.ui.getCore(base);
	var config = base.data('linphoneConfig');
	
	// Click on about item 
	if (target.isOrParent('.linphone .window .tools .about > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');
		base.find('.window .about-options .title').text(config.name);
		base.find('.window .about-options .core_version_number').text(core.version);
		base.find('.window .about-options .plugin_version_number').text(core.pluginVersion);
		base.find('.window .about-options').fadeIn('fast');
	}
});
