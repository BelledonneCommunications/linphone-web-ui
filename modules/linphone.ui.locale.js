/*globals jQuery,linphone*/

linphone.ui.locale = {
	update: function(base) {
		jQuery.i18n.data = linphone.ui.i18n;
		var locale = (navigator.language) ? navigator.language : navigator.userLanguage;
		locale = locale.replace('-', '_');
		linphone.core.log('Browser language: ' + locale);
		if (typeof linphone.core.data().locale !== "undefined") {
			jQuery.i18n.change(linphone.core.data().locale, base);
		} else {
			// Excat Match
			for (var a in linphone.ui.locales) {
				if (linphone.ui.locales[a].locale === locale) {
					linphone.core.log('Change locale: ' + linphone.ui.locales[a].locale);
					jQuery.i18n.change(linphone.ui.locales[a].locale, base);
					return;
				}
			}

			// Start Match
			for (var b in linphone.ui.locales) {
				if (linphone.ui.locales[b].locale.search(locale) === 0) {
					linphone.core.log('Change locale: ' + linphone.ui.locales[b].locale);
					jQuery.i18n.change(linphone.ui.locales[b].locale, base);
					return;
				}
			}

			// Take default (first)
			jQuery.i18n.change(linphone.ui.locales[0].locale, base);
		}
	},
	init: function(base) {
		linphone.ui.locale.uiInit(base);
	},
	uiInit: function(base) {
		linphone.ui.locale.update(base);
	}
};