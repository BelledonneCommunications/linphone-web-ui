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

linphone.ui.slider = {
};

// Transform hp/mic/bell div to slider
jQuery(function() {
	jQuery(".linphone .window .tools .hp-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['play_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).playLevel = ui.value;
		}
	});
	jQuery(".linphone .window .tools .mic-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['rec_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).recLevel = ui.value;
		}
	});
	jQuery(".linphone .window .tools .bell-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['ring_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).ringLevel = ui.value;
		}
	});
});

// Show/Hide slider
jQuery('html').click(function(event) {
	var target = jQuery(event.target);

	if (!target.is('.linphone .window .tools .hp-icon')) {
		jQuery('.linphone .window .tools .hp-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .hp-slider').fadeToggle('fast');
	}
	
	if (!target.is('.linphone .window .tools .mic-icon')) {
		jQuery('.linphone .window .tools .mic-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .mic-slider').fadeToggle('fast');
	}
	
	if (!target.is('.linphone .window .tools .bell-icon')) {
		jQuery('.linphone .window .tools .bell-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .bell-slider').fadeToggle('fast');
	}
});