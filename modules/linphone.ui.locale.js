/*globals jQuery,linphone*/

linphone.ui.locale = {
	currentLocale: function(base) {
		var locale = (navigator.language) ? navigator.language : navigator.userLanguage;
		locale = locale.replace('-', '_');
		linphone.core.log('Browser language: ' + locale);
		if (typeof linphone.ui.data(base).locale !== "undefined") {
			return linphone.ui.data(base);
		} else {
			// Excat Match
			for (var a in linphone.ui.locales) {
				if (linphone.ui.locales[a].locale === locale) {
					linphone.core.log('Exact locale: ' + linphone.ui.locales[a].locale);
					return linphone.ui.locales[a];
				}
			}

			// Start Match
			for (var b in linphone.ui.locales) {
				if (linphone.ui.locales[b].locale.search(locale) === 0) {
					linphone.core.log('Approx locale: ' + linphone.ui.locales[b].locale);
					return linphone.ui.locales[b];
				}
			}

			// Take default (first)
			return linphone.ui.locales[0];
		}
	},
	update: function(base) {
		var locale = linphone.ui.locale.currentLocale(base);
		jQuery.i18n.change(locale.locale, base);
		linphone.ui.translate(base);
	},
	change: function (base, locale) {
		linphone.ui.data(base).locale = locale.locale;
		jQuery.i18n.change(locale.locale, base);
		linphone.ui.translate(base);
	},
	init: function(base) {
		linphone.ui.locale.uiInit(base);
	},
	uiInit: function(base) {
		var locale = linphone.ui.locale.currentLocale(base);
		jQuery.i18n.data = linphone.ui.i18n;
		jQuery.i18n.locale = locale;
	},
	translate: function(base) {
	
	}
};