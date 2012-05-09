/*globals jQuery,linphone*/

linphone.ui.call = {
	call_number : 1,
	findCallTab : function(obj) {
		var ret = null;
		jQuery('#linphone .window > .content .tabs .tab').each(function(index) {
			var element = jQuery(this);
			if (element.data('data') && element.data('data') === obj) {
				ret = element;
			}
		});
		return ret;
	},
	call_invite : function(target, dest) {
		linphone.ui.getCore(target).invite_async(dest, (function() {
			return function(plugin, obj) {
				linphone.ui.call.call_invite_callback(target, dest, obj);
			};
		}()));
	},
	create_call : function(target, obj, template) {
		if (obj) {
			var call_number = linphone.ui.call.call_number;
			linphone.core.log('Add tab call-' + call_number);
			var div = jQuery('<div id="call-' + call_number + '" class="tab"></div>');
			linphone.ui.getBase(target).find('.window > .content .tabs').append(div).tabs('add', '#call-' + call_number, 'Call ' + call_number);
			linphone.ui.getBase(target).find('.window > .content .tabs').tabs('select', '#call-' + call_number);
			var element = linphone.ui.getBase(target).find('.window > .content .tabs #call-' + call_number);
			element.data('data', obj);

			var content = linphone.ui.getBase(target).find(template).render(obj);
			element.html(content);
			jQuery.i18n.update(element, true);
			linphone.ui.call.call_number++;
		}
	},
	call_invite_callback : function(target, dest, obj) {
		linphone.ui.call.create_call(target, obj, '.templates .Linphone-Call-OutgoingInit');
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);
	var element;
	if (target.is('.linphone .window .dial-button')) {
		linphone.ui.call.call_invite(target, target.parent().find('.dest').val());
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
		} else {
			linphone.core.log('Can\'t find call: ' + element);
		}
		base.find('.window > .content .tabs ').tabs('remove', tab.prevAll('li').length);
	}

});