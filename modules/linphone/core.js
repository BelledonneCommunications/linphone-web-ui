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

/*globals console,localStorage */

var linphone = {};
linphone.core = {
	log: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.log(message);
		}
	},
	warn: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.warn(message);
		}
	},
	error: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.error(message);
		}
	},
	info: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.info(message);
		}
	},
	debug: function(message) {
		if (typeof window.console !== 'undefined') {
			window.console.debug(message);
		}
	},
	isValid: function(core) {
		return typeof core !== 'undefined' && typeof core.valid !== 'undefined' && core.valid;
	}
};
