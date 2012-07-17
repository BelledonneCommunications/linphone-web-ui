/*!
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

linphone.ui.about = {
		
};

//Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	var core = linphone.ui.getCore(base);
	
	// Click on about item 
	if (target.is('.linphone .window .tools .about > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');
		base.find('.window .about-options .title').text(linphone.config.name);
		base.find('.window .about-options .core_version_number').text(core.version);
		base.find('.window .about-options .plugin_version_number').text(core.pluginVersion);
		base.find('.window .about-options').fadeIn('fast');
	}
});