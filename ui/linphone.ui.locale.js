/*
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (C) 2012  Yann Diorcet <yann.diorcet@linphone.org>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

/*globals jQuery,linphone*/

linphone.ui.locale = {
	load : function() {
		jQuery.i18n.data = linphone.ui.i18n;
		var locale = (navigator.language) ? navigator.language : navigator.userLanguage;
		locale = locale.replace('-', '_');
		linphone.core.log('Browser language: ' + locale);
		if (typeof linphone.core.data().locale !== "undefined") {
			jQuery.i18n.change(linphone.core.data().locale);
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
	var target = jQuery(event.target ? event.target : event.srcElement);
	var base = linphone.ui.getBase(target);
	
	// Click on locale item
	if (target.isOrParent('.linphone .window .tools .locales > a')) {
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
	if (target.isOrParent('.linphone .window .tools .locales-menu .flag')) {
		var locale_item = target.getSelfAndParent('.linphone .window .tools .locales-menu .flag');
		base.find('.window .tools .locales-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
		jQuery.i18n.change(locale_item.data('data').locale);
		linphone.core.data().locale = locale_item.data('data').locale;
	}
});
