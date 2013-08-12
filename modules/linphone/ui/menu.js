/*globals jQuery,linphone*/

linphone.ui.menu = {
	init: function(base) {
		linphone.ui.menu.uiInit(base);
	},
	uiInit: function(base) {
		linphone.ui.menu.hide(base);
		
		// Disable menu element selection
		base.find('> .content .menu ul li').disableSelection();
		
		base.find('> .content .menu .history').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'history');
		}));
		
		base.find('> .content .menu .contacts').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'contacts');
		}));
		
		var list = base.find('> .content .menu .chat .list');
		list.append(linphone.ui.template(base, 'menu.chat.list.entry', {
			name: 'Cunégonde',
			unreadMessage: 0
		}));
		list.append(linphone.ui.template(base, 'menu.chat.list.entry', {
			name: 'Roger',
			unreadMessage: 21
		}));
		
		// Must refresh mouse events
		base.find('> .content .menu .list .entry').mouseover(linphone.ui.exceptionHandler(base, function() {
			jQuery(this).append('<span class="closeContact"></span>');
		}));
		
		base.find('> .content .menu .list .entry').mouseleave(linphone.ui.exceptionHandler(base, function() {
			jQuery(this).find('.closeContact').remove();
		}));
		
		base.find('> .content .menu .chat .entry').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'chat');
		}));
		
		if(linphone.ui.configuration(base).disableChat) {
			base.find('> .content .menu .chat').hide();
		}
	},
	translate: function(base) {
		
	},
	
	/* */
	show: function(base) {
		base.on('callStateChanged', linphone.ui.menu.onCallStateChanged);
		linphone.ui.menu.update(base);
		base.find('> .content .menu').show();
		base.find('> .content .menu .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
		base.off('callStateChanged', linphone.ui.menu.onCallStateChanged);
		base.find('> .content .menu').hide();
	},
	
	hightlightAnimation: function (elem) {
			elem.addClass('highlighted', 2000).removeClass('highlighted', 2000, function() {
				// Need to detach from callstack in order to avoid deadly loop
				var timeout = window.setTimeout(function() {
					window.clearTimeout(timeout);
					linphone.ui.menu.hightlightAnimation(elem);
				}, 1);
			});
	},
	
	update: function(base) {
		var list = base.find('> .content .menu .calls .list');
		var core = linphone.ui.getCore(base);
		list.empty();
		var calls = core.calls;
		
		var f = function(base, call) {
			return function() {
				if(linphone.ui.view.show(base,'call',call) === false) {
					linphone.ui.view.call.update(base,call);
				}
			};
		};
		
		for(var i = 0; i < calls.length; ++i) {
			var call = calls[i];
			var element = linphone.ui.template(base, 'menu.calls.list.entry', call);
			element.click(linphone.ui.exceptionHandler(base, f(base, call)));
			
			var contact = linphone.ui.utils.getContact(base, call.remoteAddress);
			if(contact) {
				var name = linphone.ui.utils.getContactName(base, contact);
				element.find('.name').text(name);
			}
			
			list.append(element);
			
			// Append animation
			if(call === core.currentCall) {
				linphone.ui.menu.hightlightAnimation(element);
				element.mouseenter(function() {
					var that = jQuery(this);
					that.stop(true, true).removeClass('highlighted');
					that.addClass('hover');
				});
				element.mouseleave(function() {
					var that = jQuery(this);
					that.stop(true, true).removeClass('hover');
					linphone.ui.menu.hightlightAnimation(that);
				});
			}
		}
		
		list.tooltip({
			tooltipClass: "linphonewebcls",
			position: { my: "middle top+5", at: "middle bottom", collision: "flipfit" }
		});
	},

	/* Events */
	onCallStateChanged: function(event, call, state, message) {
		var base = jQuery(this);
		linphone.ui.menu.update(base);
	},
	
	getCallStateClass: function(base, object) {
		if(object === linphone.core.enums.callState.Idle || object === linphone.core.enums.callState.OutgoingInit || object === linphone.core.enums.callState.OutgoingProgress) {
			return 'idle';
		}
		if(object === linphone.core.enums.callState.PausedByRemote || object === linphone.core.enums.callState.Paused){
			return 'pause';
		} 
		if(object === linphone.core.enums.callState.IncomingReceived || object === linphone.core.enums.callState.OutgoingRinging){
			return 'ringing';
		}
		return 'play';
	}
};