/*globals jQuery,linphone*/

linphone.ui.about = {
		
};

//Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	
	// Click on about item 
	if (target.is('.linphone .window .tools .about > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');
		base.find('.window .about-options .title').text(linphone.config.name);
		base.find('.window .about-options .version_number').text(linphone.config.version);
		base.find('.window .about-options .core_version_number').text(linphone.ui.getCore(target).version);
		base.find('.window .about-options').fadeIn('fast');
	}
});