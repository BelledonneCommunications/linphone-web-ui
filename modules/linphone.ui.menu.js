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
		
		/* Samples */
		var list = base.find('> .content .menu .calls .list');
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Myrtille"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Apollin"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "César"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'pause',
			name: "Bénédicte"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Violaine"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Simon"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Jehann"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Yann"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Véronique"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'pause',
			name: "Violaine"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Simon"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Jehann"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'pause',
			name: "Yann"
		}));
		list.append(linphone.ui.template(base, 'menu.calls.list.entry', {
			cls: 'play',
			name: "Véronique"
		}));
		
		
		list = base.find('> .content .menu .chat .list');
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
	
	/**/
	show: function(base) {
		base.find('> .content .menu').show();
		base.find('> .content .menu .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
		base.find('> .content .menu').hide();
	}
};