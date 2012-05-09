/*globals jQuery,linphone*/

linphone.ui.menu = {

};

// OnLoad
jQuery(function() {
	jQuery('.linphone .window .tools .settings-menu').menu();

	jQuery('.linphone .window .tools .video-menu').menu();
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);

	// Click on settings
	if (target.is('.linphone .window .tools .settings-icon')) {
		base.find('.window .tools .settings-menu').fadeToggle('fast');
	} else if (target.parents(".linphone .window .tools .settings-icon").length === 0) {
		jQuery('.linphone .window .tools .settings-menu').fadeOut('fast');
	}
});