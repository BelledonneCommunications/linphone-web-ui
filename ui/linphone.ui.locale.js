/*globals jQuery,linphone*/

linphone.ui.locale = {
	populate_locales_menu : function(target) {
		// Locales
		var menu = linphone.ui.getBase(target).find('.window .tools .locales-menu');
		menu.empty();
		for (var index in linphone.ui.locales) {
			var item = linphone.ui.locales[index];
			var element = jQuery(linphone.ui.getBase(target).find('.templates .Linphone-LocaleItem').render(item));
			element.find('a').data('data', item);
			menu.append(element);
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
		base.find('.window .tools .locales-menu').fadeOut('fast');
	} else {
		base.find('.window .tools .locales-menu').fadeIn('fast');
	}

	// Click on one locale
	if (target.is('.linphone .window .tools .locales-menu a')) {
		base.find('.window .tools .locales-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
		jQuery.i18n.change(target.data('data').locale);
		linphone.core.data()['locale'] = target.data('data').locale;
	}
});