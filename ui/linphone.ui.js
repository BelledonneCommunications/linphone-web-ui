/*globals linphone,getBase,jQuery */
linphone.ui = {};

linphone.ui.locales = [ {
	name : 'English(US)',
	locale : 'en_US',
	icon : 'style/images/flags/us.png'
}, {
	name : 'Français',
	locale : 'fr_FR',
	icon : 'style/images/flags/fr.png'
}, {
	name : 'Deutsche',
	locale : 'de_DE',
	icon : 'style/images/flags/de.png'
}, {
	name : 'Italiano',
	locale : 'it_IT',
	icon : 'style/images/flags/it.png'
} ];

// OnLoad
jQuery(function() {
	jQuery.fn.disableSelection = function() {
		return this.each(function() {
			jQuery(this).attr('unselectable', 'on').css({
				'-moz-user-select' : 'none',
				'-webkit-user-select' : 'none',
				'user-select' : 'none',
				'-ms-user-select' : 'none'
			}).each(function() {
				this.onselectstart = function() {
					return false;
				};
			});
		});
	};

	// Tabs
	jQuery('.linphone .window > .content .tabs').tabs({
		closable : true,
		scrollable : true
	});

	// Apply JQuery UI button style
	jQuery(".linphone .window button").button();

	
	// Disable selection on tools
	jQuery('.linphone .window .tools').disableSelection();

	// Disable selection on dialog titlebar
	jQuery('.linphone .window .options .ui-dialog-titlebar').disableSelection();

	jQuery('.linphone .window .options .ui-dialog-titlebar-close').click(function(event) {
		jQuery(this).parents('.options').fadeOut('fast');
	});

	jQuery('.linphone .window .options .ui-dialog-titlebar-close').hover(function() {
		jQuery(this).addClass("ui-state-hover");
	}, function() {
		jQuery(this).removeClass("ui-state-hover");
	});
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = getBase(target);

});