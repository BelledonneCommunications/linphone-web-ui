/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.locale = {
	init: function(base) {
		linphone.ui.locale.uiInit(base);
	},
	uiInit: function(base) {
		var locale = linphone.ui.locale.currentLocale(base, false);
		jQuery.i18n.data = linphone.ui.i18n;
		jQuery.i18n.locale = locale;
	},
	translate: function(base) {
	
	},
	
	/**/
	currentLocale: function(base, log) {
		var locale;
		var locales = linphone.ui.configuration(base).locales;
		if(typeof log === 'undefined') {
			log = true;
		}
		
		// Get saved locale or browser one
		if (typeof linphone.ui.persistent(base).locale !== 'undefined') {
			if(log) {
				linphone.ui.logger.log(base, 'Saved locale: ' + linphone.ui.persistent(base).locale);
			}
			locale = linphone.ui.persistent(base).locale;
		} else {
			locale = (navigator.language) ? navigator.language : navigator.userLanguage;
			locale = locale.replace('-', '_');
			if(log) {
				linphone.ui.logger.log(base, 'Browser language: ' + locale);
			}
		}
		
		// Excat Match
		for (var a in locales) {
			if (locales[a].locale === locale) {
				if(log) {
					linphone.ui.logger.log(base, 'Exact locale: ' + locales[a].locale);
				}
				return locales[a];
			}
		}

		// Start Match
		for (var b in locales) {
			if (locales[b].locale.search(locale) === 0) {
				if(log) {
					linphone.ui.logger.log(base, 'Approx locale: ' + locales[b].locale);
				}
				return locales[b];
			}
		}

		// Take default (first)
		return locales[0];
	},
	update: function(base) {
		var locale = linphone.ui.locale.currentLocale(base);
		jQuery.i18n.change(locale.locale, base);
		linphone.ui.translate(base);
	},
	change: function (base, locale) {
		linphone.ui.persistent(base).locale = locale.locale;
		linphone.ui.logger.log(base, 'Change locale: ' + locale.locale);
		jQuery.i18n.change(locale.locale, base);
		linphone.ui.translate(base);
	}
};