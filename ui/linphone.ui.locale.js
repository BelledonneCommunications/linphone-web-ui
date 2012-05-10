/*globals jQuery,linphone*/

linphone.ui.locale = {
	load : function() {
		jQuery.i18n.data = linphone.ui.i18n;
		var locale = (navigator.language) ? navigator.language : navigator.userLanguage;
		locale = locale.replace('-', '_');
		linphone.core.log('Browser language: ' + locale);
		if (linphone.core.data()['locale'] != null) {
			jQuery.i18n.change(linphone.core.data()['locale']);
		} else {
			// Excat Match
			for (var a in linphone.ui.locales) {
				if (linphone.ui.locales[a].locale === locale) {
					linphone.core.log('Change locale: ' + linphone.ui.locales[a].locale);
					jQuery.i18n.change(linphone.ui.locales[a].locale);
					return;
				}
			}

			// Start Match
			for (var b in linphone.ui.locales) {
				if (linphone.ui.locales[b].locale.search(locale) === 0) {
					linphone.core.log('Change locale: ' + linphone.ui.locales[b].locale);
					jQuery.i18n.change(linphone.ui.locales[b].locale);
					return;
				}
			}

			// Take default (first)
			jQuery.i18n.change(linphone.ui.locales[0].locale);
		}
	}
};

//
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	
	// Click on locale item
	if (target.is('.linphone .window .tools .locales > a')) {
		// Update selected element
		base.find('.window .tools .locales-menu .flag').each(function(index) {
			var element = jQuery(this);
			if (element.data('data').locale === jQuery.i18n.locale) {
				element.addClass('ui-state-selected');
			} else {
				element.removeClass('ui-state-selected');
			}
		});
		base.find('.window .tools .locales-menu').fadeToggle('fast');
	} else if (target.parents(".linphone .window .tools .locales").length === 0) {
		jQuery('.linphone .window .tools .locales-menu').fadeOut('fast');
	}

	// Click on one locale
	if (target.is('.linphone .window .tools .locales-menu a')) {
		base.find('.window .tools .locales-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
		jQuery.i18n.change(target.data('data').locale);
		linphone.core.data()['locale'] = target.data('data').locale;
	}
});