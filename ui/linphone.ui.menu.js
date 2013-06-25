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

linphone.ui.menu = {
		populateLocalesMenu : function(base) {
		// Locales
		var menu = base.find('.window .tools .locales-menu');
		menu.empty();
		for ( var index in linphone.ui.locales) {
			var item = linphone.ui.locales[index];
			var element = jQuery(base.find('.templates .Linphone-LocaleItem').render(item));
			element.find('a').data('data', item);
			menu.append(element);
		}
		menu.menu();
	}
};

// OnLoad
jQuery(function() {
	jQuery('.linphone .window .tools .settings-menu').menu();

	jQuery('.linphone .window .tools .video-menu').menu();
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target ? event.target : event.srcElement);
	var base = linphone.ui.getBase(target);

	// Click on settings
	if (target.is('.linphone .window .tools .settings-icon')) {
		base.find('.window .tools .settings-menu').fadeToggle('fast');
	} else if (target.parents(".linphone .window .tools .settings-icon").length === 0) {
		jQuery('.linphone .window .tools .settings-menu').fadeOut('fast');
	}
});
