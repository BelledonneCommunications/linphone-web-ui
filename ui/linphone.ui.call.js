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

linphone.ui.call = {
	call_number : 1,
	findCallTab : function(base, obj) {
		var ret = null;
		base.find('.window > .content .tabs .tab').each(function(index) {
			var element = jQuery(this);
			if (element.data('data') && element.data('data') === obj) {
				ret = element;
			}
		});
		return ret;
	},
	call_invite : function(base, dest) {
		linphone.ui.getCore(base).invite_async(dest, (function() {
			return function(plugin, call) {
				linphone.ui.call.call_invite_callback(base, dest, call);
			};
		}()));
	},
	create_call_tab : function(base, call, template) {
		if (call) {
			var call_number = linphone.ui.call.call_number;
			linphone.core.log('Add tab call-' + call_number);
			var div = jQuery('<div id="call-' + call_number + '" class="tab"></div>');
			base.find('.window > .content .tabs').append(div).tabs('add', '#call-' + call_number, 'Call ' + call_number);
			base.find('.window > .content .tabs').tabs('select', '#call-' + call_number);
			var element = base.find('.window > .content .tabs #call-' + call_number);
			element.data('data', call);

			var content = base.find(template).render(call);
			element.html(content);
			jQuery.i18n.update(element, true);
			linphone.ui.call.call_number++;
		}
	},
	call_invite_callback : function(base, dest, call) {
		if(call) {
			linphone.ui.call.create_call_tab(base, call, '.templates .Linphone-Call-OutgoingInit');
		} else {
			linphone.core.log("Null call");
		}
	},
	callStateChanged: function(event, call, state, message){
		var base = jQuery(this);
		if (state === linphone.core.enums.callState.Connected) {

		} else if (state === linphone.core.enums.callState.IncomingReceived) {
			linphone.ui.call.create_call_tab(base, call, '.templates .Linphone-Call-IncomingReceived');
		}

		var element = linphone.ui.call.findCallTab(base, call);
		if (element) {
			var content = base.find('.templates .Linphone-Call-' + linphone.core.enums.getCallStateText(state)).render(element.data('data'));
			element.html(content);
			jQuery.i18n.update(element, true);
		} else {
			linphone.core.log('Can\'t find call tab');
		}
	},
	getCurrentCall: function(base) {
		var selected = base.find('.window > .content .tabs div.ui-tabs-panel:not(.ui-tabs-hide)');
		return selected.data('data');
	},
	isInRunningCall: function(call) {
		if(call) {
			switch (call.state) {
				case linphone.core.enums.callState.Idle:
				case linphone.core.enums.callState.Error:
				case linphone.core.enums.callState.End:
				case linphone.core.enums.callState.Released:
					return false;
				default:
					return true;
			}
		}
		return false;
	},
	sendDTMF: function(base, call, dtmf) {
		var core = linphone.ui.getCore(base);
		linphone.core.log(core);
		core.sendDtmf(dtmf);
	}
};

//OnLoad
jQuery(function() {
	jQuery(document).on('callStateChanged', '.linphone', linphone.ui.call.callStateChanged);  
	
	// Disable selection on tools
	jQuery('.linphone .window .content .pad').disableSelection();
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	var element;
	var call;
	
	if (target.is('.linphone .window .dial-button')) {
		linphone.ui.call.call_invite(base, target.parent().find('.destination').val());
	}
	
	if (target.is('.linphone .window .pad-button')) {
		base.find('.window .content .pad').toggle('slide', {direction: 'down'});
	}
	
	if (target.is('.linphone .window > .content .pad button') || target.parents('.linphone .window > .content .pad button') .length !== 0) {
		var dtmf = target.text();
		linphone.core.log("Dtmf: " + dtmf);
		call = linphone.ui.call.getCurrentCall(base);
		if(linphone.ui.call.isInRunningCall(call)) {
			linphone.ui.call.sendDTMF(base, call, dtmf);
		} else {
			var composer = base.find('.window > .composer > .dest');
			composer.val(composer.val() + dtmf);
		}
	}
	
	if (target.is('.linphone .window .answer-button')) {
		element = target.parents('.tab');
		if (element && element.data('data')) {
			linphone.ui.getCore(target).acceptCall(element.data('data'));
		} else {
			linphone.core.log('Can\'t find call tab');
		}
	}

	if (target.is('.linphone .window .teminate-button')) {
		element = target.parents('.tab');
		if (element && element.data('data')) {
			linphone.ui.getCore(target).terminateCall(element.data('data'));
		} else {
			linphone.core.log('Can\'t find call tab');
		}
	}

	if (target.is('.linphone .window .ui-tabs-close .ui-icon')) {
		var tab = target.parents('li');
		var tabId = tab.find('a').attr('href');
		element = base.find('.window > .content .tabs ' + tabId);
		if (element && element.data('data')) {
			call = element.data('data');
			element.data('data', null);
			linphone.ui.getCore(target).terminateCall(call);
		} else {
			linphone.core.log('Can\'t find call tab');
		}
		base.find('.window > .content .tabs ').tabs('remove', tab.prevAll('li').length);
	}

});
