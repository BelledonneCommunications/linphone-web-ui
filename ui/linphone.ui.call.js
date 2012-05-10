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
			return function(plugin, obj) {
				linphone.ui.call.call_invite_callback(base, dest, obj);
			};
		}()));
	},
	create_call : function(base, obj, template) {
		if (obj) {
			var call_number = linphone.ui.call.call_number;
			linphone.core.log('Add tab call-' + call_number);
			var div = jQuery('<div id="call-' + call_number + '" class="tab"></div>');
			base.find('.window > .content .tabs').append(div).tabs('add', '#call-' + call_number, 'Call ' + call_number);
			base.find('.window > .content .tabs').tabs('select', '#call-' + call_number);
			var element = base.find('.window > .content .tabs #call-' + call_number);
			element.data('data', obj);

			var content = base.find(template).render(obj);
			element.html(content);
			jQuery.i18n.update(element, true);
			linphone.ui.call.call_number++;
		}
	},
	call_invite_callback : function(base, dest, obj) {
		linphone.ui.call.create_call(base, obj, '.templates .Linphone-Call-OutgoingInit');
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	var element;
	if (target.is('.linphone .window .dial-button')) {
		linphone.ui.call.call_invite(base, target.parent().find('.dest').val());
	}

	if (target.is('.linphone .window .answer-button')) {
		element = target.parents('.tab');
		if (element && element.data('data')) {
			linphone.ui.getCore(target).acceptCall(element.data('data'));
		} else {
			linphone.core.log('Can\'t find call: ' + element);
		}
	}

	if (target.is('.linphone .window .teminate-button')) {
		element = target.parents('.tab');
		if (element && element.data('data')) {
			linphone.ui.getCore(target).terminateCall(element.data('data'));
		} else {
			linphone.core.log('Can\'t find call: ' + element);
		}
	}

	if (target.is('.linphone .window .ui-tabs-close .ui-icon')) {
		var tab = target.parents('li');
		var tabId = tab.find('a').attr('href');
		element = base.find('.window > .content .tabs ' + tabId);
		if (element && element.data('data')) {
			linphone.ui.getCore(target).terminateCall(element.data('data'));
			element.data('data', null);
		} else {
			linphone.core.log('Can\'t find call: ' + element);
		}
		base.find('.window > .content .tabs ').tabs('remove', tab.prevAll('li').length);
	}

});