/*globals linphone,jQuery */
linphone.ui = {
	core_number : 1,
	core_data : [],
	locales : [ {
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
	} ],
	downloadPlugin : function(file) {
		window.open(file, '_blank');
	},
	getCore : function(base) {
		base = linphone.ui.getBase(base);
		return base.find('> .core').get()[0];
	},
	getBase : function(base) {
		if (typeof base === 'undefined') {
			base = jQuery(this);
		}
		return base.parents('.linphone');
	}
};

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

// OnLoad
jQuery(function() {
	// Find the correct plugin file
	if (typeof linphone.config.files[jQuery.client.os] !== 'undefined') {
		if (typeof linphone.config.files[jQuery.client.os][jQuery.client.browser] !== 'undefined') {
			linphone.config.file = linphone.config.files[jQuery.client.os][jQuery.client.browser];
		} else {
			linphone.config.file = linphone.config.files[jQuery.client.os]['DEFAULT'];
		}
	}

	// Update
	if (linphone.config.file !== null) {
		var content = '';
		content = '<button type="button" onclick="linphone.ui.downloadPlugin(\'' + linphone.config.file;
		content += '\')" class="{translate: \'base.install.download\'}">Download !</button>';
		jQuery('.linphone .window .install .buttons').html(content);
		jQuery.i18n.update(jQuery('.linphone .window .install .button'), true);
	} else {
		jQuery('.linphone .window .install .text').hide();
		jQuery('.linphone .window .install .refresh').hide();
		jQuery('.linphone .window .install .unavailable').show();
	}

	if (jQuery.client.os === 'Windows' && jQuery.client.browser === 'Explorer') {
		linphone.config.codebase = linphone.config.file + '#Version=' + linphone.config.version.replace('.', ',');
	} else if (jQuery.client.os === 'Linux' && jQuery.client.browser === 'Firefox') {
		linphone.config.codebase = linphone.config.file;
	}
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);

});